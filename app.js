// Tokyo Station Tokaido/Sanyo Shinkansen departure board v0.4.3
// Base timetable: JR Central timetable effective 2026-03-14.
// Date-specific services registered here are the services confirmed for 2026-08-23.
// A null platform is intentionally shown as "—" instead of guessing.

const timetable = [
  { time:'06:00', type:'nozomi', no:1, dest:'hakata', track:null, daily:true },
  { time:'06:15', type:'nozomi', no:3, dest:'hakata', track:null, daily:true },
  { time:'06:21', type:'hikari', no:631, dest:'shinOsaka', track:null, daily:true },
  { time:'06:30', type:'kodama', no:801, dest:'nagoya', track:19, daily:true },
  { time:'06:33', type:'nozomi', no:5, dest:'hakata', track:null, daily:true },
  { time:'06:42', type:'nozomi', no:231, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'06:48', type:'nozomi', no:7, dest:'hakata', track:null, daily:true },
  { time:'06:57', type:'kodama', no:803, dest:'shinOsaka', track:null, daily:true },
  { time:'07:00', type:'nozomi', no:233, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'07:03', type:'hikari', no:701, dest:'okayama', track:null, daily:true },
  { time:'07:12', type:'nozomi', no:9, dest:'hakata', track:18, daily:true },
  { time:'07:21', type:'nozomi', no:235, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'07:27', type:'kodama', no:805, dest:'nagoya', track:null, daily:true },
  { time:'07:30', type:'nozomi', no:11, dest:'hakata', track:null, daily:true },
  { time:'07:36', type:'hikari', no:633, dest:'shinOsaka', track:null, daily:true },
  { time:'07:39', type:'nozomi', no:237, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'07:48', type:'nozomi', no:13, dest:'hakata', track:null, daily:true },
  { time:'07:57', type:'kodama', no:807, dest:'shinOsaka', track:null, daily:true },
  { time:'08:00', type:'nozomi', no:61, dest:'hiroshima', track:null, daily:true },
  { time:'08:03', type:'hikari', no:703, dest:'okayama', track:null, daily:true },
  { time:'08:09', type:'nozomi', no:329, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'08:12', type:'nozomi', no:15, dest:'hakata', track:null, daily:true },
  { time:'08:21', type:'nozomi', no:239, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'08:27', type:'kodama', no:809, dest:'nagoya', track:null, daily:true },
  { time:'08:30', type:'nozomi', no:17, dest:'hakata', track:null, daily:true },
  { time:'08:33', type:'hikari', no:635, dest:'shinOsaka', track:null, daily:true },
  { time:'08:39', type:'nozomi', no:241, dest:'shinOsaka', track:17, dates:['2026-08-23'] },
  { time:'08:48', type:'nozomi', no:63, dest:'hiroshima', track:18, daily:true },
  { time:'08:51', type:'nozomi', no:339, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'08:57', type:'kodama', no:811, dest:'shinOsaka', track:null, daily:true },
  { time:'09:00', type:'nozomi', no:243, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'09:03', type:'hikari', no:705, dest:'okayama', track:14, daily:true },
  { time:'09:09', type:'nozomi', no:245, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'09:12', type:'nozomi', no:19, dest:'hakata', track:null, daily:true },
  { time:'09:18', type:'nozomi', no:343, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'09:21', type:'nozomi', no:247, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'09:27', type:'kodama', no:813, dest:'nagoya', track:null, daily:true },
  { time:'09:30', type:'nozomi', no:21, dest:'hakata', track:null, daily:true },
  { time:'09:36', type:'hikari', no:637, dest:'shinOsaka', track:null, daily:true },
  { time:'09:39', type:'nozomi', no:249, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'09:48', type:'nozomi', no:65, dest:'hiroshima', track:null, daily:true },
  { time:'09:57', type:'kodama', no:815, dest:'shinOsaka', track:null, daily:true },
  { time:'10:00', type:'nozomi', no:251, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'10:03', type:'hikari', no:707, dest:'okayama', track:null, daily:true },
  { time:'10:09', type:'nozomi', no:355, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'10:12', type:'nozomi', no:23, dest:'hakata', track:null, daily:true },
  { time:'10:21', type:'nozomi', no:253, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'10:27', type:'kodama', no:817, dest:'nagoya', track:null, daily:true },
  { time:'10:30', type:'nozomi', no:25, dest:'hakata', track:null, daily:true },
  { time:'10:33', type:'hikari', no:639, dest:'shinOsaka', track:null, daily:true },
  { time:'10:39', type:'nozomi', no:147, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'10:48', type:'nozomi', no:67, dest:'hiroshima', track:null, daily:true },
  { time:'10:51', type:'nozomi', no:367, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'10:57', type:'kodama', no:819, dest:'shinOsaka', track:null, daily:true },
  { time:'11:00', type:'nozomi', no:255, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'11:03', type:'hikari', no:709, dest:'okayama', track:null, daily:true },
  { time:'11:09', type:'nozomi', no:371, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'11:12', type:'nozomi', no:27, dest:'hakata', track:null, daily:true },
  { time:'11:18', type:'nozomi', no:373, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'11:27', type:'kodama', no:821, dest:'nagoya', track:null, daily:true },
  { time:'11:30', type:'nozomi', no:29, dest:'hakata', track:null, daily:true },
  { time:'11:33', type:'hikari', no:641, dest:'shinOsaka', track:null, daily:true },
  { time:'11:39', type:'nozomi', no:155, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'11:48', type:'nozomi', no:69, dest:'hiroshima', track:null, daily:true },
  { time:'11:57', type:'kodama', no:823, dest:'shinOsaka', track:null, daily:true },
  { time:'12:00', type:'nozomi', no:257, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'12:03', type:'hikari', no:711, dest:'okayama', track:null, daily:true },
  { time:'12:12', type:'nozomi', no:31, dest:'hakata', track:null, daily:true },
  { time:'12:18', type:'nozomi', no:389, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'12:24', type:'nozomi', no:393, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'12:27', type:'kodama', no:825, dest:'nagoya', track:null, daily:true },
  { time:'12:30', type:'nozomi', no:33, dest:'hakata', track:null, daily:true },
  { time:'12:33', type:'hikari', no:643, dest:'shinOsaka', track:null, daily:true },
  { time:'12:39', type:'nozomi', no:163, dest:'hiroshima', track:null, dates:['2026-08-23'] },
  { time:'12:48', type:'nozomi', no:71, dest:'hiroshima', track:null, daily:true },
  { time:'12:57', type:'kodama', no:827, dest:'shinOsaka', track:null, daily:true },
  { time:'13:00', type:'nozomi', no:167, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'13:03', type:'hikari', no:713, dest:'okayama', track:null, daily:true },
  { time:'13:09', type:'nozomi', no:403, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'13:12', type:'nozomi', no:35, dest:'hakata', track:null, daily:true },
  { time:'13:21', type:'nozomi', no:407, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'13:27', type:'kodama', no:829, dest:'nagoya', track:null, daily:true },
  { time:'13:30', type:'nozomi', no:37, dest:'hakata', track:null, daily:true },
  { time:'13:33', type:'hikari', no:645, dest:'shinOsaka', track:null, daily:true },
  { time:'13:42', type:'nozomi', no:173, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'13:48', type:'nozomi', no:73, dest:'hiroshima', track:null, daily:true },
  { time:'13:57', type:'kodama', no:831, dest:'shinOsaka', track:null, daily:true },
  { time:'14:00', type:'nozomi', no:261, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'14:03', type:'hikari', no:715, dest:'okayama', track:null, daily:true },
  { time:'14:12', type:'nozomi', no:39, dest:'hakata', track:null, daily:true },
  { time:'14:18', type:'nozomi', no:421, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'14:21', type:'nozomi', no:177, dest:'hiroshima', track:null, dates:['2026-08-23'] },
  { time:'14:24', type:'nozomi', no:425, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'14:27', type:'kodama', no:833, dest:'nagoya', track:null, daily:true },
  { time:'14:30', type:'nozomi', no:41, dest:'hakata', track:null, daily:true },
  { time:'14:33', type:'hikari', no:647, dest:'shinOsaka', track:15, daily:true },
  { time:'14:39', type:'nozomi', no:179, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'14:48', type:'nozomi', no:75, dest:'hiroshima', track:19, daily:true },
  { time:'14:57', type:'kodama', no:835, dest:'shinOsaka', track:15, daily:true },
  { time:'15:00', type:'nozomi', no:183, dest:'hakata', track:17, dates:['2026-08-23'] },
  { time:'15:03', type:'hikari', no:717, dest:'okayama', track:14, daily:true },
  { time:'15:09', type:'nozomi', no:435, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'15:12', type:'nozomi', no:43, dest:'hakata', track:18, daily:true },
  { time:'15:18', type:'nozomi', no:437, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'15:21', type:'nozomi', no:185, dest:'hiroshima', track:null, dates:['2026-08-23'] },
  { time:'15:27', type:'kodama', no:837, dest:'nagoya', track:16, daily:true },
  { time:'15:30', type:'nozomi', no:45, dest:'hakata', track:18, daily:true },
  { time:'15:33', type:'hikari', no:649, dest:'shinOsaka', track:19, daily:true },
  { time:'15:39', type:'nozomi', no:187, dest:'hakata', track:16, dates:['2026-08-23'] },
  { time:'15:48', type:'nozomi', no:77, dest:'hiroshima', track:18, daily:true },
  { time:'15:51', type:'nozomi', no:445, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'15:57', type:'kodama', no:839, dest:'shinOsaka', track:17, daily:true },
  { time:'16:00', type:'nozomi', no:191, dest:'hakata', track:16, dates:['2026-08-23'] },
  { time:'16:03', type:'hikari', no:719, dest:'okayama', track:15, daily:true },
  { time:'16:09', type:'nozomi', no:449, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'16:12', type:'nozomi', no:47, dest:'hakata', track:19, daily:true },
  { time:'16:18', type:'nozomi', no:451, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'16:21', type:'nozomi', no:193, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'16:24', type:'nozomi', no:455, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'16:27', type:'kodama', no:841, dest:'nagoya', track:18, daily:true },
  { time:'16:30', type:'nozomi', no:49, dest:'hakata', track:19, daily:true },
  { time:'16:33', type:'hikari', no:651, dest:'shinOsaka', track:14, daily:true },
  { time:'16:39', type:'nozomi', no:195, dest:'hakata', track:17, dates:['2026-08-23'] },
  { time:'16:48', type:'nozomi', no:51, dest:'hakata', track:19, daily:true },
  { time:'16:51', type:'nozomi', no:459, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'16:57', type:'kodama', no:843, dest:'nagoya', track:15, daily:true },
  { time:'17:00', type:'nozomi', no:199, dest:'hakata', track:17, dates:['2026-08-23'] },
  { time:'17:03', type:'hikari', no:721, dest:'okayama', track:16, daily:true },
  { time:'17:09', type:'nozomi', no:463, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'17:12', type:'nozomi', no:53, dest:'hakata', track:18, daily:true },
  { time:'17:18', type:'nozomi', no:465, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'17:21', type:'nozomi', no:273, dest:'shinOsaka', track:17, dates:['2026-08-23'] },
  { time:'17:24', type:'nozomi', no:467, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'17:27', type:'kodama', no:845, dest:'nagoya', track:14, daily:true },
  { time:'17:30', type:'nozomi', no:55, dest:'hakata', track:18, daily:true },
  { time:'17:33', type:'hikari', no:653, dest:'shinOsaka', track:16, daily:true },
  { time:'17:36', type:'kodama', no:901, dest:'mishima', track:null, dates:['2026-08-23'] },
  { time:'17:39', type:'nozomi', no:203, dest:'hakata', track:15, dates:['2026-08-23'] },
  { time:'17:48', type:'nozomi', no:79, dest:'hiroshima', track:18, daily:true },
  { time:'17:54', type:'nozomi', no:473, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'17:57', type:'kodama', no:847, dest:'nagoya', track:14, daily:true },
  { time:'18:00', type:'nozomi', no:207, dest:'hakata', track:15, dates:['2026-08-23'] },
  { time:'18:03', type:'hikari', no:655, dest:'shinOsaka', track:17, daily:true },
  { time:'18:09', type:'nozomi', no:475, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'18:12', type:'nozomi', no:57, dest:'hakata', track:16, daily:true },
  { time:'18:18', type:'nozomi', no:477, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'18:21', type:'nozomi', no:279, dest:'shinOsaka', track:17, dates:['2026-08-23'] },
  { time:'18:27', type:'kodama', no:849, dest:'nagoya', track:18, daily:true },
  { time:'18:30', type:'nozomi', no:81, dest:'hiroshima', track:16, daily:true },
  { time:'18:33', type:'hikari', no:657, dest:'shinOsaka', track:19, daily:true },
  { time:'18:36', type:'kodama', no:903, dest:'mishima', track:18, daily:true },
  { time:'18:39', type:'nozomi', no:281, dest:'shinOsaka', track:17, dates:['2026-08-23'] },
  { time:'18:42', type:'nozomi', no:211, dest:'hakata', track:null, dates:['2026-08-23'] },
  { time:'18:48', type:'nozomi', no:483, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'18:51', type:'nozomi', no:59, dest:'hakata', track:16, daily:true },
  { time:'18:57', type:'kodama', no:851, dest:'nagoya', track:17, daily:true },
  { time:'19:00', type:'nozomi', no:283, dest:'shinOsaka', track:15, dates:['2026-08-23'] },
  { time:'19:03', type:'hikari', no:659, dest:'shinOsaka', track:14, daily:true },
  { time:'19:09', type:'nozomi', no:83, dest:'hiroshima', track:16, daily:true },
  { time:'19:12', type:'nozomi', no:487, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'19:18', type:'nozomi', no:489, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'19:21', type:'nozomi', no:85, dest:'okayama', track:15, daily:true },
  { time:'19:24', type:'nozomi', no:491, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'19:27', type:'kodama', no:853, dest:'nagoya', track:14, daily:true },
  { time:'19:30', type:'hikari', no:661, dest:'shinOsaka', track:16, daily:true },
  { time:'19:33', type:'nozomi', no:493, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'19:36', type:'kodama', no:905, dest:'mishima', track:17, dates:['2026-08-23'] },
  { time:'19:39', type:'nozomi', no:87, dest:'hiroshima', track:15, daily:true },
  { time:'19:48', type:'nozomi', no:285, dest:'shinOsaka', track:16, dates:['2026-08-23'] },
  { time:'19:54', type:'nozomi', no:499, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'19:57', type:'kodama', no:855, dest:'shinOsaka', track:15, daily:true },
  { time:'20:00', type:'nozomi', no:89, dest:'hiroshima', track:17, daily:true },
  { time:'20:03', type:'nozomi', no:501, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'20:09', type:'nozomi', no:287, dest:'shinOsaka', track:16, dates:['2026-08-23'] },
  { time:'20:12', type:'hikari', no:663, dest:'shinOsaka', track:14, daily:true },
  { time:'20:18', type:'nozomi', no:503, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'20:21', type:'nozomi', no:91, dest:'okayama', track:18, daily:true },
  { time:'20:24', type:'nozomi', no:505, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'20:27', type:'kodama', no:857, dest:'nagoya', track:19, daily:true },
  { time:'20:30', type:'nozomi', no:507, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'20:39', type:'nozomi', no:93, dest:'okayama', track:18, daily:true },
  { time:'20:48', type:'nozomi', no:511, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'20:51', type:'kodama', no:907, dest:'mishima', track:16, daily:true },
  { time:'20:54', type:'nozomi', no:95, dest:'himeji', track:19, daily:true },
  { time:'21:03', type:'nozomi', no:289, dest:'shinOsaka', track:15, dates:['2026-08-23'] },
  { time:'21:06', type:'hikari', no:665, dest:'nagoya', track:14, daily:true },
  { time:'21:09', type:'nozomi', no:515, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'21:12', type:'nozomi', no:291, dest:'shinOsaka', track:19, dates:['2026-08-23'] },
  { time:'21:15', type:'kodama', no:909, dest:'shizuoka', track:18, daily:true },
  { time:'21:21', type:'nozomi', no:517, dest:'shinOsaka', track:null, dates:['2026-08-23'] },
  { time:'21:24', type:'nozomi', no:293, dest:'shinOsaka', track:14, dates:['2026-08-23'] },
  { time:'21:33', type:'hikari', no:667, dest:'nagoya', track:17, daily:true },
  { time:'21:45', type:'kodama', no:911, dest:'hamamatsu', track:18, daily:true },
  { time:'22:00', type:'nozomi', no:549, dest:'nagoya', track:null, dates:['2026-08-23'] },
  { time:'22:03', type:'hikari', no:669, dest:'nagoya', track:15, daily:true },
  { time:'22:12', type:'kodama', no:913, dest:'shizuoka', track:14, daily:true },
  { time:'22:48', type:'kodama', no:915, dest:'mishima', track:14, daily:true },
];

const copy = {
  ja: {
    direction:'東海道・山陽新幹線\n新大阪・博多方面', heads:['時刻','列車','行先','番線','ご案内'], track:'番線',
    ended:'本日の東京駅発の運転は終了しました', endedSub:'次の運転日は当日の運転条件に基づいて表示します。',
    coverage:'06:00〜22:48 東京発・当日運転列車のみ表示',
    ticker:'自由席案内と停車駅案内を交互に表示しています。停車駅案内は各言語で2回ずつスクロール表示します。時刻表ベースの表示です。遅延・運休・当日の番線変更はリアルタイム反映されません。',
    free:'自由席', stops:'停車駅', every:'各駅に停車', otherStops:'ほか停車', unknownTrack:'未確認'
  },
  en: {
    direction:'Tokaido / Sanyo Shinkansen\nfor Shin-Osaka / Hakata', heads:['Time','Train','Destination','Track','Information'], track:'Track',
    ended:'Tokyo departures have finished for today', endedSub:'The next service day is filtered by its operating-date conditions.',
    coverage:'06:00–22:48 from Tokyo · operating trains only',
    ticker:'Non-reserved-seat information and stop information alternate on the board. Stop information scrolls twice in each language. This is timetable-based; delays, cancellations and same-day platform changes are not live.',
    free:'Non-reserved', stops:'Stops', every:'Stops at every station', otherStops:'other stops', unknownTrack:'unverified'
  },
  ko: {
    direction:'도카이도·산요 신칸센\n신오사카·하카타 방면', heads:['시각','열차','행선지','번선','안내'], track:'번선',
    ended:'오늘 도쿄역 출발 운행이 종료되었습니다', endedSub:'다음 운행일에는 해당 날짜의 운전 조건에 맞는 열차만 표시합니다.',
    coverage:'06:00~22:48 도쿄 출발 · 당일 운행 열차만 표시',
    ticker:'자유석 안내와 정차역 안내가 번갈아 표시됩니다. 정차역 안내는 언어별로 2회씩 슬라이드 표시됩니다. 예정 시각표 기반이며 지연·운휴·당일 승강장 변경은 실시간 반영되지 않습니다.',
    free:'자유석', stops:'정차역', every:'각 역 정차', otherStops:'그 외 정차', unknownTrack:'미확인'
  }
};

const trainNames = {
  ja: {nozomi:'のぞみ',hikari:'ひかり',kodama:'こだま'},
  en: {nozomi:'NOZOMI',hikari:'HIKARI',kodama:'KODAMA'},
  ko: {nozomi:'노조미',hikari:'히카리',kodama:'고다마'}
};
const destinations = {
  ja: {hakata:'博多',hiroshima:'広島',okayama:'岡山',himeji:'姫路',shinOsaka:'新大阪',nagoya:'名古屋',mishima:'三島',shizuoka:'静岡',hamamatsu:'浜松'},
  en: {hakata:'Hakata',hiroshima:'Hiroshima',okayama:'Okayama',himeji:'Himeji',shinOsaka:'Shin-Osaka',nagoya:'Nagoya',mishima:'Mishima',shizuoka:'Shizuoka',hamamatsu:'Hamamatsu'},
  ko: {hakata:'하카타',hiroshima:'히로시마',okayama:'오카야마',himeji:'히메지',shinOsaka:'신오사카',nagoya:'나고야',mishima:'미시마',shizuoka:'시즈오카',hamamatsu:'하마마쓰'}
};

const romanDest = {hakata:'Hakata',hiroshima:'Hiroshima',okayama:'Okayama',himeji:'Himeji',shinOsaka:'Shin-Osaka',nagoya:'Nagoya',mishima:'Mishima',shizuoka:'Shizuoka',hamamatsu:'Hamamatsu'};

let selectedLang = 'auto';
const DISPLAY_LANGS = ['ja','en','ko'];
const FREE_LANG_MS = 8000;
const STOP_SCROLL_BASE_PASS_MS = 7000; // the slowest visible caption keeps the original 7-second pass
let stopLangDurationMs = STOP_SCROLL_BASE_PASS_MS * 2; // recalculated from the longest travel distance
let displayLangIndex = 0;
let infoPhase = 0; // 0 = non-reserved seats, 1 = stops
let cycleTimer = null;
let lastRenderKey = '';

const rowsEl = document.getElementById('rows');
const clockEl = document.getElementById('jstClock');
const testInput = document.getElementById('testTime');
const serviceDateEl = document.getElementById('serviceDate');
const realtimeStateEl = document.getElementById('realtimeState');
const realtimeLabelEl = document.getElementById('realtimeLabel');
const realtimeUpdatedEl = document.getElementById('realtimeUpdated');
const sourceModeEl = document.getElementById('sourceMode');

const REALTIME_REFRESH_MS = 45000;
let realtimeData = { mode:'loading', trains:[], updated:null, error:null };

const liveCopy = {
  ja:{live:'JR LIVE',fallback:'時刻表 FALLBACK',test:'TEST MODE',connecting:'CONNECTING',cancelled:'運休',depTbd:'発車未定',trackTbd:'番線未定',extra:'臨時',delay:n=>`${n}分遅れ`,ticker:'JR東海「発車順序案内」の最新情報を約45秒ごとに取得しています。発車時刻は時刻表上の時刻で、遅れは別表示です。取得できない場合は自動的に時刻表表示へ切り替わります。'},
  en:{live:'JR LIVE',fallback:'TIMETABLE FALLBACK',test:'TEST MODE',connecting:'CONNECTING',cancelled:'CANCELLED',depTbd:'DEPARTURE TBD',trackTbd:'TRACK TBD',extra:'EXTRA',delay:n=>`${n} min late`,ticker:'Latest JR Central departure-order information is checked about every 45 seconds. Departure time remains the timetable time; delays are shown separately. The board automatically falls back to the timetable if realtime data is unavailable.'},
  ko:{live:'JR 실시간',fallback:'시간표 FALLBACK',test:'TEST MODE',connecting:'연결 중',cancelled:'운휴',depTbd:'출발 미정',trackTbd:'번선 미정',extra:'임시',delay:n=>`${n}분 지연`,ticker:'JR도카이 발차순서 안내의 최신 정보를 약 45초마다 확인합니다. 출발시각은 시각표상 시각을 유지하고 지연분은 별도로 표시합니다. 실시간 정보를 가져오지 못하면 자동으로 시간표 모드로 전환됩니다.'}
};

function pad(n) { return String(n).padStart(2,'0'); }
function jstNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(new Date());
  return Object.fromEntries(parts.filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
}
function serviceDate(parts) { return `${parts.year}-${parts.month}-${parts.day}`; }
function minutes(s) { const [h,m]=s.split(':').map(Number); return h*60+m; }
function currentLang() { return selectedLang==='auto' ? DISPLAY_LANGS[displayLangIndex] : selectedLang; }
function operatesOn(train, date) { return !!train.daily || (Array.isArray(train.dates) && train.dates.includes(date)); }

function isNozomiAllReserved(date) {
  // JR Central's announced peak all-reserved periods for 2026/27.
  const periods = [
    ['2026-04-24','2026-05-06'],['2026-08-07','2026-08-16'],['2026-09-18','2026-09-23'],
    ['2026-10-10','2026-10-12'],['2026-11-21','2026-11-23'],['2026-12-25','2027-01-05'],
    ['2027-01-09','2027-01-11'],['2027-03-20','2027-03-22']
  ];
  return periods.some(([a,b])=>date>=a && date<=b);
}

function freeSeatInfo(train, lang, date) {
  const c=copy[lang];
  if (train.type==='nozomi') {
    if (isNozomiAllReserved(date)) return {title:`${lang==='ja'?'全席指定席':lang==='en'?'All seats reserved':'전 좌석 지정석'}`, sub: lang==='ja'?'繁忙期の「のぞみ」は全席指定席です。':lang==='en'?'NOZOMI is all-reserved during designated peak periods.':'혼잡기 노조미는 전 좌석 지정석으로 운행합니다.'};
    return {title:`${lang==='ja'?'1・2号車':lang==='en'?'Cars 1–2':'1·2호차'}`, sub: lang==='ja'?'のぞみ3号車は指定席です。':lang==='en'?'Car 3 is reserved seating.':'노조미 3호차는 지정석입니다.'};
  }
  if (train.type==='hikari') return {title:`${lang==='ja'?'1〜5号車':lang==='en'?'Cars 1–5':'1~5호차'}`, sub: lang==='ja'?'列車により座席設定が変更される場合があります。':lang==='en'?'Seat arrangements may vary by train.':'열차에 따라 좌석 설정이 변경될 수 있습니다.'};
  return {title:`${lang==='ja'?'自由席あり':lang==='en'?'Available':'있음'}`, sub: lang==='ja'?'号車は列車により異なる場合があります。':lang==='en'?'Car locations may vary by train.':'열차에 따라 자유석 호차가 달라질 수 있습니다.'};
}

function stationName(key, lang) { return destinations[lang][key]; }
function stopInfo(train, lang) {
  const c=copy[lang];
  if (!train.dest || !destinations[lang][train.dest]) {
    return {title: lang==='ja'?'停車駅はJR公式情報をご確認ください':lang==='en'?'See JR Central for stop details':'정차역은 JR 공식 정보를 확인해 주세요', sub:''};
  }
  const d=stationName(train.dest,lang);
  if (train.type==='kodama') return {title:`${c.every}`, sub:`→ ${d}`};
  const sep = lang==='en' ? ' · ' : '・';
  let keys=[];
  if (train.type==='nozomi') {
    const route=['shinagawa','shinYokohama','nagoya','kyoto','shinOsaka','shinKobe','okayama','hiroshima','kokura','hakata'];
    const endIndex={nagoya:2,shinOsaka:4,himeji:5,okayama:6,hiroshima:7,hakata:9}[train.dest] ?? 4;
    keys=route.slice(0,endIndex+1);
    if(train.dest==='himeji') keys=['shinagawa','shinYokohama','nagoya','kyoto','shinOsaka','shinKobe','himeji'];
  } else {
    // "Major stops" avoids claiming every Hikari stopping pattern, which can differ by service.
    keys = train.dest==='nagoya' ? ['shinagawa','shinYokohama','shizuoka','hamamatsu','nagoya'] : ['shinagawa','shinYokohama','nagoya','kyoto','shinOsaka'];
    if(train.dest==='okayama') keys.push('shinKobe','okayama');
  }
  const labels={
    ja:{shinagawa:'品川',shinYokohama:'新横浜',nagoya:'名古屋',kyoto:'京都',shinOsaka:'新大阪',shinKobe:'新神戸',himeji:'姫路',okayama:'岡山',hiroshima:'広島',kokura:'小倉',hakata:'博多',shizuoka:'静岡',hamamatsu:'浜松'},
    en:{shinagawa:'Shinagawa',shinYokohama:'Shin-Yokohama',nagoya:'Nagoya',kyoto:'Kyoto',shinOsaka:'Shin-Osaka',shinKobe:'Shin-Kobe',himeji:'Himeji',okayama:'Okayama',hiroshima:'Hiroshima',kokura:'Kokura',hakata:'Hakata',shizuoka:'Shizuoka',hamamatsu:'Hamamatsu'},
    ko:{shinagawa:'시나가와',shinYokohama:'신요코하마',nagoya:'나고야',kyoto:'교토',shinOsaka:'신오사카',shinKobe:'신코베',himeji:'히메지',okayama:'오카야마',hiroshima:'히로시마',kokura:'고쿠라',hakata:'하카타',shizuoka:'시즈오카',hamamatsu:'하마마쓰'}
  }[lang];
  // v0.3: the stop line scrolls, so keep the full route instead of truncating it.
  const shown=keys.map(k=>labels[k]);
  return {title:`${shown.join(sep)}`, sub: train.type==='hikari' ? (lang==='ja'?'※ 列車により停車駅が異なります。':lang==='en'?'Stopping patterns vary by train.':'열차별 정차역이 다를 수 있습니다.') : `→ ${d}`};
}

function infoFor(train, lang, date) { return infoPhase===0 ? freeSeatInfo(train,lang,date) : stopInfo(train,lang); }


// v0.4.3: synchronize every stop-information row to the longest visible caption.
// First, keep the v0.4.1 slow-speed rule to calculate how long the longest caption needs.
// Then assign that SAME one-pass duration to every row, so all rows begin/end each pass
// together and repeat exactly twice before the language/section changes. Shorter captions
// therefore move more slowly, matching the timing of the longest stop list.
function calibrateStopScrollSpeed() {
  if (infoPhase !== 1) {
    stopLangDurationMs = STOP_SCROLL_BASE_PASS_MS * 2;
    return;
  }
  const scrollers=[...document.querySelectorAll('.info-scroll')];
  if (!scrollers.length) {
    stopLangDurationMs = STOP_SCROLL_BASE_PASS_MS * 2;
    return;
  }

  const metrics=scrollers.map(el=>{
    const win=el.closest('.info-scroll-window');
    const windowWidth=Math.max(1, win?.clientWidth || 1);
    const textWidth=Math.max(1, el.getBoundingClientRect().width);
    return {el, windowWidth, distance:windowWidth + textWidth};
  });

  // Preserve the previous slow baseline: the shortest old 7-second pass defines px/ms.
  const slowestDistance=Math.min(...metrics.map(m=>m.distance));
  const targetPxPerMs=slowestDistance / STOP_SCROLL_BASE_PASS_MS;
  const longestDistance=Math.max(...metrics.map(m=>m.distance));
  const syncedPassMs=Math.max(STOP_SCROLL_BASE_PASS_MS, longestDistance / targetPxPerMs);

  metrics.forEach(({el,windowWidth})=>{
    el.style.setProperty('--scroll-window-width', `${windowWidth}px`);
    el.style.setProperty('--slide-duration', `${Math.ceil(syncedPassMs)}ms`);
  });

  stopLangDurationMs=Math.ceil(syncedPassMs * 2) + 120;
}

function formatRealtimeUpdated(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date(iso));
  } catch { return ''; }
}

function setRealtimeStatus(lang) {
  const t=liveCopy[lang];
  const mode = testInput.value ? 'test' : realtimeData.mode;
  realtimeStateEl.className=`realtime-state ${mode}`;
  sourceModeEl.className=mode;
  if (mode==='live') {
    realtimeLabelEl.textContent=t.live;
    realtimeUpdatedEl.textContent=formatRealtimeUpdated(realtimeData.updated);
    sourceModeEl.textContent=t.live;
  } else if (mode==='test') {
    realtimeLabelEl.textContent=t.test;
    realtimeUpdatedEl.textContent='';
    sourceModeEl.textContent=t.test;
  } else if (mode==='loading') {
    realtimeLabelEl.textContent=t.connecting;
    realtimeUpdatedEl.textContent='';
    sourceModeEl.textContent=t.connecting;
  } else {
    realtimeLabelEl.textContent=t.fallback;
    realtimeUpdatedEl.textContent='';
    sourceModeEl.textContent=t.fallback;
  }
}

function findScheduledMatch(live, date) {
  const today=timetable.filter(t=>operatesOn(t,date));
  return today.find(t=>t.type===live.type && String(t.no)===String(live.no) && (!live.time || t.time===live.time))
    || today.find(t=>t.type===live.type && String(t.no)===String(live.no))
    || timetable.find(t=>t.type===live.type && String(t.no)===String(live.no));
}

function mergeRealtimeTrain(live, date) {
  const base=findScheduledMatch(live,date) || {};
  const trackTbd=!!live.platformTbd;
  return {
    ...base,
    ...live,
    time: live.time || base.time,
    type: live.type || base.type,
    no: live.no ?? base.no,
    dest: live.destKey || base.dest || null,
    destinationRaw: live.destinationRaw || null,
    track: trackTbd ? null : (live.track ?? base.track ?? null),
    trackTbd,
    isLive:true
  };
}

function getDisplayTrains(date, nowMin) {
  const operating=timetable.filter(t=>operatesOn(t,date));
  if (testInput.value || realtimeData.mode!=='live' || !realtimeData.trains.length) {
    return operating.filter(t=>minutes(t.time)>=nowMin).slice(0,7).map(t=>({...t,isLive:false}));
  }
  const live=realtimeData.trains
    .map(t=>mergeRealtimeTrain(t,date))
    .filter(t=>t.time && t.type && t.no!=null && !t.departed);
  if (!live.length) return operating.filter(t=>minutes(t.time)>=nowMin).slice(0,7).map(t=>({...t,isLive:false}));
  return live.slice(0,7);
}

function destinationDisplay(train, lang) {
  if (train.dest && destinations[lang][train.dest]) {
    const main=destinations[lang][train.dest];
    const sub=lang==='en' ? `${destinations.ja[train.dest]} · ${destinations.ko[train.dest]}` : romanDest[train.dest];
    return {main,sub};
  }
  const raw=train.destinationRaw || '—';
  return {main:raw,sub:train.isLive ? 'JR Central LIVE' : ''};
}

function timeLiveSub(train, lang) {
  if (!train.isLive) return '';
  const t=liveCopy[lang];
  if (train.cancelled) return `<span class="time-live-sub">${t.cancelled}</span>`;
  if (train.departureTbd) return `<span class="time-live-sub">${t.depTbd}</span>`;
  if (Number(train.delay)>0) return `<span class="time-live-sub">${t.delay(Number(train.delay))}</span>`;
  return '';
}

function renderStatic(lang, date) {
  document.getElementById('directionLabel').textContent=copy[lang].direction;
  ['headTime','headTrain','headDest','headTrack','headInfo'].forEach((id,i)=>document.getElementById(id).textContent=copy[lang].heads[i]);
  document.getElementById('coverage').textContent=copy[lang].coverage;
  const mode=testInput.value ? 'test' : realtimeData.mode;
  document.getElementById('tickerText').textContent = mode==='live' ? liveCopy[lang].ticker : (mode==='test' ? (lang==='ja'?'TEST時刻では時刻表データを表示します。':lang==='en'?'TEST time uses timetable data instead of realtime data.':'TEST 시각에서는 실시간 대신 시간표 데이터를 표시합니다.') : copy[lang].ticker);
  serviceDateEl.textContent=`· ${date}`;
  setRealtimeStatus(lang);
}

function renderBoard(force=false) {
  const p=jstNow();
  const date=serviceDate(p);
  const lang=currentLang();
  const nowMin=testInput.value ? minutes(testInput.value) : Number(p.hour)*60+Number(p.minute);
  const upcoming=getDisplayTrains(date,nowMin);
  const liveKey = realtimeData.mode==='live' ? `${realtimeData.updated}|${realtimeData.trains.map(t=>`${t.type}${t.no}${t.time}${t.track}${t.delay}${t.cancelled}${t.departureTbd}`).join(',')}` : realtimeData.mode;
  const key=`${date}|${lang}|${infoPhase}|${testInput.value||p.hour+':'+p.minute}|${liveKey}|${upcoming.map(t=>t.time+t.type+t.no).join(',')}`;
  if(!force && key===lastRenderKey) return;
  lastRenderKey=key;
  renderStatic(lang,date);

  if(!upcoming.length) {
    rowsEl.innerHTML=`<div class="empty-state"><strong>${copy[lang].ended}</strong><span>${copy[lang].endedSub}</span></div>`;
    return;
  }

  rowsEl.innerHTML=upcoming.map(train=>{
    const scheduledDiff=minutes(train.time)-nowMin;
    const effectiveDiff=train.isLive && Number(train.delay)>0 ? minutes(train.time)+Number(train.delay)-nowMin : scheduledDiff;
    const info=infoFor(train,lang,date);
    const track=train.track==null ? '—' : train.track;
    const trackSmall=train.trackTbd ? liveCopy[lang].trackTbd : (train.track==null ? copy[lang].unknownTrack : copy[lang].track);
    const trackClass=train.track==null ? 'track-cell unknown' : 'track-cell';
    const dest=destinationDisplay(train,lang);
    const trainSub=lang==='ja' ? `${trainNames.en[train.type]} ${train.no}` : `${trainNames.ja[train.type]} ${train.no}`;
    const kind=infoPhase===0 ? copy[lang].free : copy[lang].stops;
    const l=liveCopy[lang];
    let statusBadge='';
    let liveSub='';
    if (train.cancelled) statusBadge=`<span class="live-status cancelled">${l.cancelled}</span>`;
    else if (train.departureTbd) statusBadge=`<span class="live-status tbd">${l.depTbd}</span>`;
    else if (Number(train.delay)>0) {
      statusBadge=`<span class="live-status">${l.delay(Number(train.delay))}</span>`;
      liveSub=`<span class="delay-text">${l.delay(Number(train.delay))}</span>${info.sub?' · ':''}`;
    }
    if (train.temporary && !train.cancelled) statusBadge+=`<span class="live-status extra">${l.extra}</span>`;

    let infoMarkup;
    if (train.cancelled || train.departureTbd) {
      const statusText=train.cancelled ? l.cancelled : l.depTbd;
      const sub=train.trackTbd ? l.trackTbd : (train.isLive ? l.live : '');
      infoMarkup=`<div class="info-title">${statusText}</div><div class="info-sub">${sub}</div>`;
    } else if (infoPhase===1) {
      infoMarkup=`<div class="info-title stop-mode"><span class="info-kind">${kind}</span><span class="info-scroll-window"><span class="info-scroll">${info.title}</span></span>${statusBadge}</div><div class="info-sub">${liveSub}${info.sub}</div>`;
    } else {
      infoMarkup=`<div class="info-title"><span class="info-kind">${kind}</span>${info.title}${statusBadge}</div><div class="info-sub">${liveSub}${info.sub}</div>`;
    }
    const pulse=!train.cancelled && !train.departureTbd && effectiveDiff>=0 && effectiveDiff<=2 ? 'depart-pulse' : '';
    const cancelledClass=train.cancelled ? 'cancelled-row' : '';
    const extraBadge=train.temporary ? `<span class="train-extra">${l.extra}</span>` : '';
    return `<div class="train-row ${pulse} ${cancelledClass}">
      <div class="time-cell">${train.time}${timeLiveSub(train,lang)}</div>
      <div class="train-cell ${train.type}">${trainNames[lang][train.type]} ${train.no}${extraBadge}<span class="train-sub">${trainSub}</span></div>
      <div class="dest-cell">${dest.main}<span class="dest-sub">${dest.sub}</span></div>
      <div class="${trackClass}">${track}<small>${trackSmall}</small></div>
      <div class="info-cell">${infoMarkup}</div>
    </div>`;
  }).join('');

  calibrateStopScrollSpeed();
}

async function refreshRealtime() {
  // Static/file preview has no serverless API, so the timetable remains fully usable.
  if (location.protocol==='file:') {
    realtimeData={mode:'fallback',trains:[],updated:null,error:'Static preview'};
    lastRenderKey=''; renderBoard(true); return;
  }
  if (realtimeData.mode!=='live') realtimeData={...realtimeData,mode:'loading'};
  lastRenderKey=''; renderBoard(true);
  try {
    const response=await fetch('/api/realtime',{cache:'no-store',headers:{'Accept':'application/json'}});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    if (!data.ok || !Array.isArray(data.trains) || data.trains.length===0) throw new Error(data.error || 'No realtime trains parsed');
    realtimeData={mode:'live',trains:data.trains,updated:data.updated || new Date().toISOString(),error:null};
  } catch (err) {
    realtimeData={mode:'fallback',trains:[],updated:null,error:String(err?.message || err)};
  }
  lastRenderKey=''; renderBoard(true);
}

function updateClock() {
  const p=jstNow();
  clockEl.textContent=`${p.hour}:${p.minute}:${p.second}`;
  renderBoard();
}

function scheduleDisplayCycle() {
  if (cycleTimer) clearTimeout(cycleTimer);
  const duration = infoPhase===0 ? FREE_LANG_MS : stopLangDurationMs;
  cycleTimer = setTimeout(()=>{
    if (selectedLang==='auto') {
      if (displayLangIndex < DISPLAY_LANGS.length-1) {
        displayLangIndex += 1;
      } else {
        displayLangIndex = 0;
        infoPhase = infoPhase===0 ? 1 : 0;
      }
    } else {
      infoPhase = infoPhase===0 ? 1 : 0;
      displayLangIndex = 0;
    }
    lastRenderKey='';
    renderBoard(true);
    scheduleDisplayCycle();
  }, duration);
}

function resetDisplayCycle() {
  infoPhase = 0;
  displayLangIndex = 0;
  lastRenderKey='';
  renderBoard(true);
  scheduleDisplayCycle();
}

document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>{
  selectedLang=btn.dataset.lang;
  document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b===btn));
  resetDisplayCycle();
}));
testInput.addEventListener('input',()=>{lastRenderKey='';renderBoard(true)});
document.getElementById('clearTest').addEventListener('click',()=>{testInput.value='';lastRenderKey='';renderBoard(true);refreshRealtime()});

setInterval(updateClock,1000);
setInterval(refreshRealtime,REALTIME_REFRESH_MS);
updateClock();
renderBoard(true);
scheduleDisplayCycle();
refreshRealtime();
