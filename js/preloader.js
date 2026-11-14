/* ══════════════════════════════════════════════════════════════════
   PRELOADER CONTROLLER — NIHAL SINGH TOMAR (<NS/>)
   Smooth timing, mathematical clamping (0% to 100%),
   and editorial curtain exit transition.
   ══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Reduced motion check ─────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── DOM Elements ─────────────────────────────────────────── */
  const pl = document.getElementById('preloader') || document.getElementById('pl');
  if (!pl) return;

  const arcEl = pl.querySelector('.pl-ring-arc') || pl.querySelector('.pl-arc');
  const dotEl = pl.querySelector('.pl-ring-dot') || pl.querySelector('.pl-dot');
  const fillEl = pl.querySelector('.pl-bar-fill');
  const pctEl = pl.querySelector('.pl-pct-num') || pl.querySelector('.pl-pct');
  const msgEl = pl.querySelector('.pl-welcome-msg') || pl.querySelector('.pl-msg');

  /* ── Arc Geometry: r=58 in 124x124 SVG, Circumference ≈ 364.42 */
  const R = 58;
  const CIRC = 2 * Math.PI * R;
  if (arcEl) {
    arcEl.style.strokeDasharray = CIRC;
    arcEl.style.strokeDashoffset = CIRC;
  }

  /* ── State variables ──────────────────────────────────────── */
  let currentPct = 0;
  let targetPct = 0;
  let isExiting = false;
  let counterRaf = null;

  /* Helper to clamp numbers strictly between 0 and 100 */
  function clamp(val) {
    if (isNaN(val)) return 0;
    return Math.max(0, Math.min(100, Math.round(val)));
  }

  /* ── Update Visual State ──────────────────────────────────── */
  function updateVisuals(pct) {
    const safePct = clamp(pct);

    /* Text percentage */
    if (pctEl) {
      pctEl.textContent = safePct + '%';
    }

    /* Bar fill */
    if (fillEl) {
      fillEl.style.width = safePct + '%';
    }

    /* SVG Circular Progress Arc */
    if (arcEl) {
      const offset = CIRC * (1 - (safePct / 100));
      arcEl.style.strokeDashoffset = Math.max(0, Math.min(CIRC, offset));
    }

    /* Leading dot position on the arc endpoint */
    if (dotEl) {
      if (safePct <= 0) {
        dotEl.style.opacity = '0';
      } else {
        dotEl.style.opacity = '1';
        const angle = -Math.PI / 2 + (safePct / 100) * 2 * Math.PI;
        const cx = 62 + R * Math.cos(angle);
        const cy = 62 + R * Math.sin(angle);
        dotEl.setAttribute('cx', cx.toFixed(2));
        dotEl.setAttribute('cy', cy.toFixed(2));
      }
    }

    /* Accessibility ARIA update */
    pl.setAttribute('aria-label', 'Loading ' + safePct + '%');
  }

  /* ── Smooth Counter Animation Loop (rAF) ──────────────────── */
  function animateProgress() {
    if (isExiting) return;

    if (currentPct < targetPct) {
      // Smooth incremental step
      const diff = targetPct - currentPct;
      const step = Math.max(0.5, diff * 0.14);
      currentPct = Math.min(targetPct, currentPct + step);
      updateVisuals(currentPct);
    }

    if (currentPct >= 100) {
      triggerExit();
      return;
    }

    counterRaf = requestAnimationFrame(animateProgress);
  }

  /* ── Natural Progress Simulation (~1.1s - 1.4s) ───────────── */
  const startTime = performance.now();
  const DURATION = reducedMotion ? 400 : 1200; // ms to reach ~95% naturally

  function simulate() {
    const elapsed = performance.now() - startTime;
    const progressRatio = Math.min(1, elapsed / DURATION);

    // Ease-out cubic curve up to 96%
    const naturalTarget = 15 + Math.round((1 - Math.pow(1 - progressRatio, 2.5)) * 81);
    targetPct = Math.max(targetPct, clamp(naturalTarget));

    if (progressRatio < 1 && !windowLoaded) {
      setTimeout(simulate, 60);
    }
  }

  let windowLoaded = false;
  simulate();
  animateProgress();

  /* ── Complete when window.onload fires ────────────────────── */
  function onComplete() {
    windowLoaded = true;
    targetPct = 100;
  }

  if (document.readyState === 'complete') {
    onComplete();
  } else {
    window.addEventListener('load', onComplete, { once: true });
    // Safety fallback timeout
    setTimeout(onComplete, 2400);
  }

  /* ── Curtain Exit Animation ───────────────────────────────── */
  function triggerExit() {
    if (isExiting) return;
    isExiting = true;
    if (counterRaf) cancelAnimationFrame(counterRaf);

    // Ensure 100% is displayed
    updateVisuals(100);

    // Pause 150ms at 100% for satisfaction before lifting curtain
    setTimeout(function () {
      pl.classList.add('pl-exit');

      // Unhide and reveal page content
      revealPortfolio();

      function cleanup() {
        if (pl.parentNode) {
          pl.parentNode.removeChild(pl);
        } else {
          pl.style.display = 'none';
        }
        document.body.style.overflow = '';
      }

      pl.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 650); // Fallback
    }, reducedMotion ? 50 : 150);
  }

  /* Reveal portfolio content cleanly */
  function revealPortfolio() {
    const elements = ['.navbar', '.hero', '#particles-js', '#scroll-progress', '#side-nav'];
    elements.forEach(function (sel) {
      const el = document.querySelector(sel);
      if (el) {
        el.classList.remove('pl-hidden-until-ready');
      }
    });
  }

})();
