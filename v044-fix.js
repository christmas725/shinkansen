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

// Re-render once after this override is installed, and reschedule the current
// display cycle so the newly calculated stop-caption duration is respected.
try {
  lastRenderKey = '';
  renderBoard(true);
  scheduleDisplayCycle();
} catch (err) {
  console.warn('v0.4.4 stop-caption override initialization failed:', err);
}
