const SOURCE_URL = 'https://traininfo.jr-central.co.jp/shinkansen/pc/ja/ti04.html?station=1&bound=2';
const CACHE_MS = 35000;

const TYPE_MAP = {
  'のぞみ':'nozomi', 'ひかり':'hikari', 'こだま':'kodama',
  'みずほ':'mizuho', 'さくら':'sakura', 'つばめ':'tsubame'
};
const DEST_MAP = {
  '博多':'hakata','広島':'hiroshima','岡山':'okayama','姫路':'himeji','新大阪':'shinOsaka',
  '名古屋':'nagoya','三島':'mishima','静岡':'shizuoka','浜松':'hamamatsu'
};

function mockPayload() {
  return {
    ok:true, source:'mock', sourceUrl:SOURCE_URL, updated:new Date().toISOString(),
    trains:[
      {type:'nozomi',no:55,time:'17:30',destKey:'hakata',destinationRaw:'博多',track:17,delay:12,cancelled:false,departureTbd:false,platformTbd:false,temporary:false,departed:false},
      {type:'hikari',no:653,time:'17:33',destKey:'shinOsaka',destinationRaw:'新大阪',track:16,delay:0,cancelled:false,departureTbd:false,platformTbd:false,temporary:false,departed:false},
      {type:'kodama',no:901,time:'17:36',destKey:'mishima',destinationRaw:'三島',track:null,delay:0,cancelled:false,departureTbd:false,platformTbd:true,temporary:false,departed:false},
      {type:'nozomi',no:203,time:'17:39',destKey:'hakata',destinationRaw:'博多',track:15,delay:5,cancelled:false,departureTbd:false,platformTbd:false,temporary:true,departed:false},
      {type:'nozomi',no:79,time:'17:48',destKey:'hiroshima',destinationRaw:'広島',track:18,delay:0,cancelled:true,departureTbd:false,platformTbd:false,temporary:false,departed:false}
    ]
  };
}

function getCache() {
  if (!globalThis.__TOKYO_BOARD_JR_CACHE) globalThis.__TOKYO_BOARD_JR_CACHE = {at:0,payload:null};
  return globalThis.__TOKYO_BOARD_JR_CACHE;
}

async function scrapeRealtime() {
  const puppeteer = require('puppeteer-core');
  const chromium = require('@sparticuz/chromium');
  let browser;
  try {
    const executablePath = process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath();
    browser = await puppeteer.launch({
      args:[...chromium.args,'--lang=ja-JP','--disable-dev-shm-usage'],
      defaultViewport:{width:1440,height:1100,deviceScaleFactor:1},
      executablePath,
      headless:chromium.headless,
      ignoreHTTPSErrors:false
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/149.0.0.0 Safari/537.36 TokyoDepartureBoard/0.4');
    await page.setExtraHTTPHeaders({'Accept-Language':'ja-JP,ja;q=0.9'});
    await page.setRequestInterception(true);
    page.on('request', req => {
      const type=req.resourceType();
      if (type==='image' || type==='font' || type==='media') req.abort();
      else req.continue();
    });

    await page.goto(SOURCE_URL,{waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForFunction(() => {
      const text=document.body?.innerText || '';
      return /(のぞみ|ひかり|こだま|みずほ|さくら|つばめ)\s*\d+/.test(text);
    },{timeout:12000}).catch(()=>{});
    await new Promise(r=>setTimeout(r,1200));

    const extracted = await page.evaluate(() => {
      const clean = s => (s || '').replace(/[\u00a0\t]+/g,' ').replace(/\s*\n\s*/g,'\n').replace(/[ ]{2,}/g,' ').trim();
      const typeRe=/(のぞみ|ひかり|こだま|みずほ|さくら|つばめ)\s*([0-9]+)\s*号?/;
      const timeColonRe=/(?:発車時刻\s*)?([0-2]?\d)[:：]([0-5]\d)/;
      const timeJaRe=/(?:発車時刻\s*)?([0-2]?\d)時\s*([0-5]\d)分/;

      function parseBlock(text, meta='') {
        text=clean(text);
        const tm=text.match(typeRe);
        if (!tm) return null;
        const timeM=text.match(timeColonRe) || text.match(timeJaRe);
        if (!timeM) return null;
        const hh=String(Number(timeM[1])).padStart(2,'0');
        const mm=String(Number(timeM[2])).padStart(2,'0');
        const destinationMatch=text.match(/(?:行先|行き先)?\s*([^\s　]{1,12})\s*行(?:き)?(?:\s|$)/);
        let destinationRaw=destinationMatch ? destinationMatch[1] : null;
        if (destinationRaw && /^(下り|上り|東京|方面)$/.test(destinationRaw)) destinationRaw=null;
        if (!destinationRaw) {
          const explicit=text.match(/(?:行先|行き先)\s*[:：]?\s*([^\s　]{1,12})/);
          if (explicit) destinationRaw=explicit[1];
        }
        const platformTbd=/番線未定|のりば未定/.test(text);
        let track=null;
        if (!platformTbd) {
          const pm=text.match(/(?:のりば|番線|ホーム)\s*[:：]?\s*([1-9][0-9]?)/) || text.match(/([1-9][0-9]?)\s*(?:番線|番のりば|番ホーム)/);
          if (pm) track=Number(pm[1]);
        }
        let delay=0;
        const dm=text.match(/(?:約\s*)?([0-9]{1,3})\s*分(?:程度)?\s*遅れ/) || text.match(/遅れ[^0-9]{0,10}([0-9]{1,3})\s*分/);
        if (dm) delay=Number(dm[1]);
        return {
          typeJa:tm[1], no:Number(tm[2]), time:`${hh}:${mm}`, destinationRaw,
          track, delay, cancelled:/運休/.test(text), departureTbd:/発車未定/.test(text),
          platformTbd, temporary:/臨時列車|臨時/.test(text),
          departed:/発車済|発車済み|出発済|発車しました/.test(text) || /(?:past|departed|departure-complete)/i.test(meta),
          raw:text.slice(0,800)
        };
      }

      const result=[];
      const seen=new Set();
      const selectors='a,li,tr,article,section,div,dl,dd';
      const all=[...document.querySelectorAll(selectors)];
      const anchors=all.filter(el=>{
        const txt=clean(el.innerText || el.textContent || '');
        return txt.length>0 && txt.length<260 && typeRe.test(txt);
      });

      for (const anchor of anchors) {
        let node=anchor;
        let chosen=null;
        let meta='';
        for (let i=0;i<7 && node;i++,node=node.parentElement) {
          const txt=clean(node.innerText || node.textContent || '');
          meta += ' ' + (typeof node.className==='string' ? node.className : '') + ' ' + (node.id || '');
          if (txt.length>=8 && txt.length<=1200 && typeRe.test(txt) && (timeColonRe.test(txt)||timeJaRe.test(txt))) {
            chosen=parseBlock(txt,meta);
            if (chosen && (/(行|行先|番線|のりば|遅れ|運休|発車)/.test(txt) || txt.length>25)) break;
          }
        }
        if (!chosen) continue;
        const key=`${chosen.typeJa}|${chosen.no}|${chosen.time}`;
        if (!seen.has(key)) { seen.add(key); result.push(chosen); }
      }

      if (result.length<2) {
        const lines=(document.body?.innerText || '').split(/\n+/).map(clean).filter(Boolean);
        for (let i=0;i<lines.length;i++) {
          if (!typeRe.test(lines[i])) continue;
          const block=lines.slice(Math.max(0,i-3),Math.min(lines.length,i+11)).join('\n');
          const parsed=parseBlock(block,'text-window');
          if (!parsed) continue;
          const key=`${parsed.typeJa}|${parsed.no}|${parsed.time}`;
          if (!seen.has(key)) { seen.add(key); result.push(parsed); }
        }
      }

      return {trains:result, bodySample:clean(document.body?.innerText || '').slice(0,1600)};
    });

    const trains=(extracted.trains || []).map(t=>({
      type:TYPE_MAP[t.typeJa] || t.typeJa,
      no:t.no,
      time:t.time,
      destKey:DEST_MAP[t.destinationRaw] || null,
      destinationRaw:t.destinationRaw,
      track:t.track,
      delay:Number.isFinite(t.delay)?t.delay:0,
      cancelled:!!t.cancelled,
      departureTbd:!!t.departureTbd,
      platformTbd:!!t.platformTbd,
      temporary:!!t.temporary,
      departed:!!t.departed,
      ...(process.env.JR_DEBUG==='1' ? {raw:t.raw} : {})
    })).filter(t=>['nozomi','hikari','kodama'].includes(t.type));

    if (!trains.length) {
      const err=new Error('JR page loaded, but no Tokyo departure rows could be parsed. The upstream page structure may have changed.');
      err.code='NO_ROWS_PARSED';
      if (process.env.JR_DEBUG==='1') err.bodySample=extracted.bodySample;
      throw err;
    }
    return {ok:true,source:'jr-central-departure-order',sourceUrl:SOURCE_URL,updated:new Date().toISOString(),trains};
  } finally {
    if (browser) await browser.close().catch(()=>{});
  }
}

module.exports = async function handler(req,res) {
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','s-maxage=35, stale-while-revalidate=120');
  if (req.query && String(req.query.mock)==='1') return res.status(200).json(mockPayload());

  const cache=getCache();
  if (cache.payload && Date.now()-cache.at<CACHE_MS) return res.status(200).json(cache.payload);

  try {
    const payload=await scrapeRealtime();
    cache.at=Date.now(); cache.payload=payload;
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(200).json({
      ok:false,
      source:'jr-central-departure-order',
      sourceUrl:SOURCE_URL,
      updated:new Date().toISOString(),
      error:error?.code || error?.message || 'REALTIME_FETCH_FAILED',
      ...(process.env.JR_DEBUG==='1' && error?.bodySample ? {bodySample:error.bodySample} : {})
    });
  }
};
