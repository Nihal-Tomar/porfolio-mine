/**
 * Navigation Module
 * Handles floating navbar scrolling, active section link highlighting,
 * navbar dark-mode contrast synchronization, and mobile drawer.
 */

export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "services",
  "contact",
];

/**
 * Returns the currently dominant section ID using a precise focal-band algorithm.
 */
export function getActiveSectionId() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  // Near top of document → hero
  if (scrollY < 120) {
    return "hero";
  }

  // Near bottom of document → contact
  if (scrollY + winHeight >= docHeight - 75) {
    return "contact";
  }

  // Focal line in viewport (38% from viewport top — where the user reads)
  const focalPoint = winHeight * 0.38;

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= focalPoint && rect.bottom > focalPoint) {
      return id;
    }
  }

  // Fallback: section with largest visible area
  let maxVisible = 0;
  let bestId = SECTION_IDS[0];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const visible = Math.max(0, Math.min(winHeight, rect.bottom) - Math.max(0, rect.top));
    if (visible > maxVisible) {
      maxVisible = visible;
      bestId = id;
    }
  }
  return bestId;
}

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const allNavLinks = document.querySelectorAll(".nav-link");

  if (!navbar) return;

  // Update active states on scroll
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    const activeId = getActiveSectionId();

    // Update navbar active link
    allNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${activeId}`);
    });

    // Check if navbar is currently positioned over a dark section (#projects)
    const projectsSec = document.getElementById("projects");
    if (projectsSec) {
      const pRect = projectsSec.getBoundingClientRect();
      const isOverProjects = pRect.top <= 65 && pRect.bottom >= 15;
      navbar.classList.toggle("navbar-on-dark", isOverProjects);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Hamburger menu toggle
  hamburger?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.querySelectorAll("span").forEach((s, i) => {
      s.style.transform = isOpen
        ? (i === 0 ? "rotate(45deg) translate(5px, 5px)" : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "opacity: 0")
        : "";
      if (i === 1) s.style.opacity = isOpen ? "0" : "1";
    });
  });

  // Close mobile drawer on link click
  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        hamburger?.setAttribute("aria-expanded", "false");
        hamburger?.querySelectorAll("span").forEach((s) => {
          s.style.transform = "";
          s.style.opacity = "1";
        });
      }
    });
  });

  // Initial update
  onScroll();
}
