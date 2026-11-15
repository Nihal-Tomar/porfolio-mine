/**
 * Animations Module
 * Particles.js canvas, AOS scroll animations, section reveal on viewport entry, and lazy loading
 */

/**
 * Initialize Particles.js background canvas
 */
export function initParticles() {
  if (typeof particlesJS === "undefined") return;
  particlesJS("particles-js", {
    particles: {
      number: { value: 30, density: { enable: true, value_area: 1000 } },
      color: { value: ["#243B80", "#C9B8FF"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.18,
        random: true,
        anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false },
      },
      size: {
        value: 2,
        random: true,
        anim: { enable: true, speed: 1.5, size_min: 0.5, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 140,
        color: "#243B80",
        opacity: 0.04,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 70, duration: 0.4 },
        push: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}

/**
 * Initialize Animate On Scroll (AOS)
 */
export function initAOS() {
  if (typeof AOS === "undefined") return;
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 0,
  });
}

/**
 * Smooth entrance animation for sections entering the viewport
 */
export function initSectionReveal() {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((sec) => {
    // Hero is visible at initial render
    if (sec.id === "hero") return;
    sec.classList.add("section-reveal");
    observer.observe(sec);
  });
}

/**
 * Lazy loading fallback for browsers without native loading="lazy" support
 */
export function initLazyLoading() {
  const lazyImgs = document.querySelectorAll("img[loading='lazy']");
  if ("loading" in HTMLImageElement.prototype) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      observer.unobserve(img);
    });
  });

  lazyImgs.forEach((img) => observer.observe(img));
}
