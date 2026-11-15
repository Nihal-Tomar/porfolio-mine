/**
 * Stat Counters Module
 * Smooth number count-up animation triggered via IntersectionObserver
 */

export function initCounters() {
  const statNums = document.querySelectorAll(".stat-num");
  if (!statNums.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10) || 0;
        animateCount(el, 0, target, 1500);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((n) => observer.observe(n));

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}
