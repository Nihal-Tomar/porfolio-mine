/**
 * Custom Cursor Module
 * Smooth follower animation with interactive element hover states
 */

export function initCustomCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Smooth follower via rAF
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale on hover over interactive elements
  const interactives = document.querySelectorAll(
    "a, button, .skill-card, .project-card, .stat-card, .timeline-card, .service-card"
  );
  
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.6)";
      cursor.style.background = "var(--brand-primary)";
      follower.style.transform = "translate(-50%, -50%) scale(1.3)";
      follower.style.borderColor = "var(--brand-primary)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "var(--brand-primary)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.borderColor = "rgba(36, 59, 128, 0.35)";
    });
  });

  // Hide on leave window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    follower.style.opacity = "1";
  });
}
