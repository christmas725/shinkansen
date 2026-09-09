// v0.4.4 — synchronized stop captions with the longest-caption physical speed.
// All visible stop captions start each pass together. Short captions move at the
// exact same px/ms as the longest caption, finish earlier, wait off-screen, then
// restart together for pass #2.

window.__v044StopAnimations = window.__v044StopAnimations || [];

function clearV044StopAnimations() {
  window.__v044StopAnimations.forEach(anim => {
    try { anim.cancel(); } catch (_) {}
  });
  window.__v044StopAnimations = [];
}

function calibrateStopScrollSpeed() {
  clearV044StopAnimations();

  if (infoPhase !== 1) {
    stopLangDurationMs = STOP_SCROLL_BASE_PASS_MS * 2;
    return;
  }

  const scrollers = [...document.querySelectorAll('.info-scroll')];
  if (!scrollers.length) {
    stopLangDurationMs = STOP_SCROLL_BASE_PASS_MS * 2;
    return;
  }

  const metrics = scrollers.map(el => {
    // Disable the v0.4.3 CSS animation; v0.4.4 controls timing with WAAPI.
    el.style.animation = 'none';
    el.style.transform = 'translateX(0)';

    const win = el.closest('.info-scroll-window');
    const windowWidth = Math.max(1, win?.clientWidth || 1);
    const textWidth = Math.max(1, el.getBoundingClientRect().width);
    return {
      el,
      distance: windowWidth + textWidth
    };
  });

  // Reproduce the v0.4.3 longest-caption speed: its shared pass duration was
  // calculated from the slow 7-second baseline of the shortest visible caption.
  const shortestDistance = Math.min(...metrics.map(m => m.distance));
  const longestDistance = Math.max(...metrics.map(m => m.distance));
  const baselinePxPerMs = shortestDistance / STOP_SCROLL_BASE_PASS_MS;
  const sharedPassMs = Math.max(
    STOP_SCROLL_BASE_PASS_MS,
    longestDistance / baselinePxPerMs
  );
  const longestCaptionPxPerMs = longestDistance / sharedPassMs;

  // Give every row one common timeline start so all three caption forms launch
  // at the same instant on pass 1 and again at the same instant on pass 2.
  const commonStart = (document.timeline?.currentTime || performance.now()) + 80;

  metrics.forEach(({ el, distance }) => {
    const moveMs = distance / longestCaptionPxPerMs;
    const moveEndOffset = Math.min(1, moveMs / sharedPassMs);
    const endTransform = `translateX(-${distance}px)`;

    const anim = el.animate([
      { transform: 'translateX(0)', offset: 0 },
      { transform: endTransform, offset: moveEndOffset },
      { transform: endTransform, offset: 1 }
    ], {
      duration: Math.ceil(sharedPassMs),
      iterations: 2,
      easing: 'linear',
      fill: 'both'
    });

    try { anim.startTime = commonStart; } catch (_) {}
    window.__v044StopAnimations.push(anim);
  });

  stopLangDurationMs = Math.ceil(sharedPassMs * 2) + 180;
}

// v0.4.5 — treat JR's no-service-hours response as a normal state, not an error.
// Before the first departure, show today's first trains. After the final departure,
// show the next service day's first trains instead of an ended/empty board.
function addDaysYmd(date, days) {
  const [y,m,d] = date.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth()+1).padStart(2,'0')}-${String(dt.getUTCDate()).padStart(2,'0')}`;
}

function getOvernightServiceDate(date, nowMin) {
  const lastDepartureMin = 22 * 60 + 48;
  return nowMin > lastDepartureMin ? addDaysYmd(date, 1) : date;
}

const __baseInfoFor = infoFor;
infoFor = function(train, lang, date) {
  return __baseInfoFor(train, lang, train.__serviceDate || date);
};

const __baseGetDisplayTrains = getDisplayTrains;
getDisplayTrains = function(date, nowMin) {
  if (!testInput.value && realtimeData.mode === 'offhours') {
    const targetDate = getOvernightServiceDate(date, nowMin);
    const targetNowMin = targetDate === date ? nowMin : -1;
    return timetable
      .filter(t => operatesOn(t, targetDate) && minutes(t.time) >= targetNowMin)
      .slice(0, 7)
      .map(t => ({...t, isLive:false, __serviceDate:targetDate, __nextServiceDay:targetDate !== date}));
  }
  return __baseGetDisplayTrains(date, nowMin);
};

const __baseSetRealtimeStatus = setRealtimeStatus;
setRealtimeStatus = function(lang) {
  const mode = testInput.value ? 'test' : realtimeData.mode;
  if (mode !== 'offhours') return __baseSetRealtimeStatus(lang);

  const labels = {
    ja:'運行時間外',
    en:'OUT OF SERVICE HOURS',
    ko:'운행시간 외'
  };
  realtimeStateEl.className='realtime-state offhours';
  sourceModeEl.className='offhours';
  realtimeLabelEl.textContent=labels[lang];
  realtimeUpdatedEl.textContent='';
  sourceModeEl.textContent=labels[lang];
};

const __baseRenderStatic = renderStatic;
renderStatic = function(lang, date) {
  __baseRenderStatic(lang, date);
  if (testInput.value || realtimeData.mode !== 'offhours') return;

  const p = jstNow();
  const nowMin = Number(p.hour) * 60 + Number(p.minute);
  const targetDate = getOvernightServiceDate(date, nowMin);
  const isNextDay = targetDate !== date;
  const messages = {
    ja: isNextDay ? '本日の運転は終了しました。次の運転日の始発列車を表示しています。' : '始発前です。本日の始発列車を表示しています。',
    en: isNextDay ? 'Service has ended for today. Showing the next service day’s first departures.' : 'Before first service. Showing today’s first departures.',
    ko: isNextDay ? '오늘 운행이 종료되어 다음 운행일 첫차부터 표시합니다.' : '첫차 운행 전으로 오늘 첫차부터 표시합니다.'
  };
  document.getElementById('tickerText').textContent=messages[lang];
  serviceDateEl.textContent=`· ${targetDate}`;
};

refreshRealtime = async function() {
  // Static/file preview has no serverless API, so the timetable remains fully usable.
  if (location.protocol==='file:') {
    realtimeData={mode:'fallback',trains:[],updated:null,error:'Static preview'};
    lastRenderKey=''; renderBoard(true); return;
  }
  if (realtimeData.mode!=='live' && realtimeData.mode!=='offhours') realtimeData={...realtimeData,mode:'loading'};
  lastRenderKey=''; renderBoard(true);
  try {
    const response=await fetch('/api/realtime',{cache:'no-store',headers:{'Accept':'application/json'}});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    const isNoService = data?.ok === true && Array.isArray(data.trains) && data.trains.length === 0 &&
      (data.serviceState === 'closed' || data.source === 'no-service-hours');

    if (isNoService) {
      realtimeData={mode:'offhours',trains:[],updated:data.updated || new Date().toISOString(),error:null,serviceState:'closed'};
    } else {
      if (!data.ok || !Array.isArray(data.trains) || data.trains.length===0) throw new Error(data.error || 'No realtime trains parsed');
      realtimeData={mode:'live',trains:data.trains,updated:data.updated || new Date().toISOString(),error:null};
    }
  } catch (err) {
    realtimeData={mode:'fallback',trains:[],updated:null,error:String(err?.message || err)};
  }
  lastRenderKey=''; renderBoard(true);
};

// Re-render once after the overrides are installed, and reschedule the current
// display cycle so the newly calculated stop-caption duration is respected.
try {
  lastRenderKey = '';
  renderBoard(true);
  scheduleDisplayCycle();
  refreshRealtime();
} catch (err) {
  console.warn('v0.4.4/v0.4.5 override initialization failed:', err);
}
