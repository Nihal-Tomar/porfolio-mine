/**
 * Typewriter Effect Module
 * Pure JavaScript typewriter with natural speed variations
 */

export function initTyped() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "Web Developer",
    "Coder",
    "MERN Stack Developer",
    "React Native Developer",
    "Frontend Developer",
  ];

  const TYPE_SPEED_MIN = 80;   // ms per character (minimum)
  const TYPE_SPEED_MAX = 120;  // ms per character (maximum)
  const DELETE_SPEED = 50;     // ms per character while deleting
  const PAUSE_AFTER = 1200;    // ms pause after full word is typed
  const PAUSE_BEFORE = 300;    // ms pause before starting to delete

  let roleIndex = 0;  // which role we are currently showing
  let charIndex = 0;  // how many characters are currently rendered
  let isDeleting = false;
  let timer = null;

  function tick() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      // ── TYPING ──
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause then start deleting
        isDeleting = true;
        timer = setTimeout(tick, PAUSE_AFTER + PAUSE_BEFORE);
        return;
      }
      // Random speed per character for a natural feel
      const speed = Math.floor(
        Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN + 1) + TYPE_SPEED_MIN
      );
      timer = setTimeout(tick, speed);
    } else {
      // ── DELETING ──
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timer = setTimeout(tick, TYPE_SPEED_MIN);
        return;
      }
      timer = setTimeout(tick, DELETE_SPEED);
    }
  }

  // Kick off with a short initial delay so the page feels settled
  timer = setTimeout(tick, 600);
}
