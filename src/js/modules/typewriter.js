/**
 * Typewriter Effect Module
 * Types tech stack roles with highlighting, matching Reference Image 2
 */

export function initTyped() {
  const highlightEl = document.getElementById("typed-highlight") || document.getElementById("typed-text");
  const roleEl = document.getElementById("typed-role");
  if (!highlightEl) return;

  const items = [
    { highlight: "MERN Stack", role: "Developer" },
    { highlight: "Full Stack", role: "Developer" },
    { highlight: "Frontend", role: "Developer" },
    { highlight: "React", role: "Engineer" },
  ];

  const TYPE_SPEED_MIN = 70;
  const TYPE_SPEED_MAX = 110;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER = 1600;
  const PAUSE_BEFORE = 300;

  let itemIndex = 0;
  let charIndex = items[0].highlight.length; // start with full word typed
  let isDeleting = false;
  let timer = null;

  function tick() {
    const current = items[itemIndex];

    if (!isDeleting) {
      charIndex++;
      highlightEl.textContent = current.highlight.slice(0, charIndex);
      if (roleEl && roleEl.textContent !== current.role) {
        roleEl.textContent = current.role;
      }

      if (charIndex === current.highlight.length) {
        isDeleting = true;
        timer = setTimeout(tick, PAUSE_AFTER + PAUSE_BEFORE);
        return;
      }

      const speed = Math.floor(
        Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN + 1) + TYPE_SPEED_MIN
      );
      timer = setTimeout(tick, speed);
    } else {
      charIndex--;
      highlightEl.textContent = current.highlight.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % items.length;
        if (roleEl) {
          roleEl.textContent = items[itemIndex].role;
        }
        timer = setTimeout(tick, TYPE_SPEED_MIN);
        return;
      }
      timer = setTimeout(tick, DELETE_SPEED);
    }
  }

  // Start with MERN Stack settled for 2 seconds before beginning typing loop
  timer = setTimeout(() => {
    isDeleting = true;
    tick();
  }, 2200);
}
