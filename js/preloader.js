
(function () {
  'use strict';

  /* ── Reduced-motion check ─────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── DOM refs ─────────────────────────────────────────────── */
  const pl = document.getElementById('pl');
  const arcEl = pl && pl.querySelector('.pl-arc');
  const dotEl = pl && pl.querySelector('.pl-dot');
  const fillEl = pl && pl.querySelector('.pl-bar-fill');
  const pctEl = pl && pl.querySelector('.pl-pct');
  const msgEl = pl && pl.querySelector('.pl-msg');
  const canvas = pl && pl.querySelector('#pl-canvas');

  if (!pl || !arcEl || !fillEl || !pctEl || !msgEl) return;

  /* ── Arc geometry (r=60 in the 140×140 SVG, track r=60) ───── */
  const R = 60;
  const CIRC = 2 * Math.PI * R;   // ≈ 376.99
  arcEl.style.strokeDasharray = CIRC;
  arcEl.style.strokeDashoffset = CIRC;   // 0% filled initially

  /* ── Progress weights ─────────────────────────────────────── */
  const W_IMG = 0.60;
  const W_FONT = 0.20;
  const W_LOAD = 0.20;

  let imgProg = 0;
  let fontProg = 0;
  let loadProg = 0;
  let finished = false;
  let displayedPct = 0;   // for smooth counter animation

  /* ── Loading messages ─────────────────────────────────────── */
  const MESSAGES = [
    'Initializing Portfolio...',
    'Loading Components...',
    'Optimizing Assets...',
    'Preparing Projects...',
    'Connecting Experience...',
    'Welcome.'
  ];
  let msgIndex = 0;

  function nextMessage() {
    if (msgIndex >= MESSAGES.length - 1) return;
    msgIndex++;
    msgEl.style.opacity = '0';
    setTimeout(function () {
      msgEl.textContent = MESSAGES[msgIndex];
      msgEl.style.opacity = '1';
    }, 160);
  }

  /* Advance messages proportional to progress */
  function syncMessage(pct) {
    // Each message covers roughly 100/MESSAGES.length % of progress
    const step = Math.floor(pct / (100 / MESSAGES.length));
    const target = Math.min(step, MESSAGES.length - 1);
    if (target > msgIndex) {
      msgIndex = target - 1;   // nextMessage will increment
      nextMessage();
    }
  }

  /* ── Render (called on every progress update) ─────────────── */
  function render() {
    const combined = Math.min(
      imgProg * W_IMG +
      fontProg * W_FONT +
      loadProg * W_LOAD,
      1
    );
    const targetPct = Math.round(combined * 100);

    /* Animate the percentage counter smoothly */
    if (targetPct > displayedPct) {
      animateCounter(targetPct);
    }

    /* Arc stroke */
    arcEl.style.strokeDashoffset = CIRC * (1 - combined);

    /* Bar fill */
    fillEl.style.width = (combined * 100).toFixed(1) + '%';

    /* Aria label update */
    pl.setAttribute('aria-label', 'Loading ' + targetPct + '%');

    /* Sync dot position on the arc endpoint */
    if (dotEl) {
      const angle = -Math.PI / 2 + combined * 2 * Math.PI;
      const cx = 70 + R * Math.cos(angle);
      const cy = 70 + R * Math.sin(angle);
      dotEl.setAttribute('cx', cx.toFixed(2));
      dotEl.setAttribute('cy', cy.toFixed(2));
      dotEl.style.display = combined < 0.01 ? 'none' : '';
    }

    syncMessage(targetPct);
  }

  /* ── Counter animation (rAF-based) ────────────────────────── */
  let counterRaf = null;
  function animateCounter(target) {
    if (counterRaf) cancelAnimationFrame(counterRaf);
    const start = displayedPct;
    const duration = reducedMotion ? 0 : 280;   // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const t = duration === 0 ? 1 : Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);   // ease-out-cubic
      displayedPct = Math.round(start + (target - start) * eased);
      pctEl.textContent = displayedPct + '%';
      if (t < 1) {
        counterRaf = requestAnimationFrame(tick);
      } else {
        displayedPct = target;
        pctEl.textContent = target + '%';
      }
    }
    counterRaf = requestAnimationFrame(tick);
  }

  /* ── Dismiss ──────────────────────────────────────────────── */
  function dismiss() {
    if (finished) return;
    finished = true;

    /* Snap to 100 */
    imgProg = fontProg = loadProg = 1;
    render();

    const delay = reducedMotion ? 0 : 280;

    setTimeout(function () {
      requestAnimationFrame(function () {
        pl.classList.add('pl-exit');

        /* Remove from DOM after transition */
        function onEnd(e) {
          if (e.target !== pl) return;
          pl.removeEventListener('transitionend', onEnd);
          removePl();
        }
        pl.addEventListener('transitionend', onEnd);

        /* Fallback */
        setTimeout(removePl, reducedMotion ? 300 : 900);

        /* Reveal portfolio content with staggered animations */
        revealContent();
      });
    }, delay);
  }

  function removePl() {
    if (pl.parentNode) pl.parentNode.removeChild(pl);
    /* Stop particle loop */
    if (particleLoop) cancelAnimationFrame(particleLoop);
  }

  /* ── Staggered portfolio reveal ───────────────────────────── */
  function revealContent() {
    const targets = [
      { sel: '.navbar', cls: 'pl-reveal-navbar' },
      { sel: '.hero', cls: 'pl-reveal-hero' },
      { sel: '#particles-js', cls: 'pl-reveal-particles' },
      { sel: '#scroll-progress', cls: 'pl-reveal-scroll' },
      { sel: '#side-nav', cls: 'pl-reveal-scroll' },
    ];

    targets.forEach(function (t) {
      const el = document.querySelector(t.sel);
      if (!el) return;
      el.classList.remove('pl-hidden-until-ready');
      if (!reducedMotion) {
        el.classList.add(t.cls);
      }
    });
  }

  /* ── Safety cap (4 s) ─────────────────────────────────────── */
  const safetyCap = setTimeout(dismiss, 4000);

  /* ── Signal: window.load ──────────────────────────────────── */
  window.addEventListener('load', function () {
    loadProg = 1;
    render();
    clearTimeout(safetyCap);
    /* Small grace period so bar visibly hits 100 */
    setTimeout(dismiss, reducedMotion ? 50 : 220);
  }, { once: true });

  /* ── Signal: fonts.ready ──────────────────────────────────── */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      fontProg = 1;
      render();
    });
  } else {
    fontProg = 1;
  }

  /* ── Signal: images ───────────────────────────────────────── */
  (function trackImages() {
    function attach(imgs) {
      const list = Array.from(imgs);
      const total = list.length;
      if (total === 0) { imgProg = 1; render(); return; }

      let done = 0;
      function settle() {
        done = Math.min(done + 1, total);
        imgProg = done / total;
        render();
      }

      list.forEach(function (img) {
        if (img.complete) { settle(); }
        else {
          img.addEventListener('load', settle, { once: true });
          img.addEventListener('error', settle, { once: true });
        }
      });
    }

    attach(document.images);

    document.addEventListener('DOMContentLoaded', function () {
      if (!finished) attach(document.images);
    }, { once: true });
  })();

  /* Initial paint */
  render();

  /* ── Message interval (independent of progress) ───────────── */
  if (!reducedMotion) {
    const msgInterval = setInterval(function () {
      if (finished) { clearInterval(msgInterval); return; }
      if (msgIndex < MESSAGES.length - 1) nextMessage();
      else clearInterval(msgInterval);
    }, 480);
  } else {
    /* Reduced motion: jump straight to last message */
    msgEl.textContent = MESSAGES[MESSAGES.length - 1];
  }

  /* ────────────────────────────────────────────────────────────
     LIGHTWEIGHT PARTICLE SYSTEM  (canvas, no library)
     ~30 dots, very low opacity — purely cosmetic, no perf cost
     ──────────────────────────────────────────────────────────── */
  var particleLoop = null;

  (function initParticles() {
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    const COLORS = ['#4f8ef7', '#8b5cf6', '#06d6c7'];
    let W, H, particles;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function rand(a, b) { return a + Math.random() * (b - a); }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor(W * H / 22000), 40);
      for (var i = 0; i < count; i++) {
        particles.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.8, 2.2),
          vx: rand(-0.18, 0.18),
          vy: rand(-0.18, 0.18),
          a: rand(0.04, 0.18),
          c: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
    }
    createParticles();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
        if (p.y < -4) p.y = H + 4;
        if (p.y > H + 4) p.y = -4;
      });
      ctx.globalAlpha = 1;
      particleLoop = requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ── Hide portfolio content until preloader exits ─────────── */
  (function hideUntilReady() {
    const toHide = ['.navbar', '.hero', '#particles-js', '#scroll-progress', '#side-nav'];
    toHide.forEach(function (sel) {
      const el = document.querySelector(sel);
      if (el) el.classList.add('pl-hidden-until-ready');
    });
  })();

})();
