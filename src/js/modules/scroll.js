/**
 * Scroll Interactions Module
 * Handles scroll progress bar, side dot navigator, back-to-top button, and smooth anchor scrolling
 */

import { getActiveSectionId } from "./navigation.js";

/**
 * Top reading / scroll progress bar
 */
export function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/**
 * Side dot navigation with active indicator and scroll-to-section
 */
export function initSideNav() {
  const nav = document.getElementById("side-nav");
  if (!nav) return;

  const SECTIONS = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  // Clear existing dots to prevent duplication
  nav.innerHTML = "";

  // Build dots
  SECTIONS.forEach(({ id, label }) => {
    const sec = document.getElementById(id);
    if (!sec) return;

    const dot = document.createElement("button");
    dot.className = "side-dot";
    dot.setAttribute("data-target", id);
    dot.setAttribute("data-label", label);
    dot.setAttribute("aria-label", `Go to ${label}`);
    dot.addEventListener("click", () => {
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    nav.appendChild(dot);
  });

  const dots = nav.querySelectorAll(".side-dot");

  // Show nav after hero passes, and update active state
  function updateNav() {
    const scrollY = window.scrollY;
    const heroEl = document.getElementById("hero");
    const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight * 0.4 : 250;

    nav.classList.toggle("visible", scrollY > heroBottom);

    const activeId = getActiveSectionId();

    // Toggle active dot
    dots.forEach((dot) => {
      dot.classList.toggle("active", dot.getAttribute("data-target") === activeId);
    });

    // Check if side-nav is over dark section
    nav.classList.toggle("on-dark", activeId === "projects");
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

/**
 * Floating Back-to-Top button
 */
export function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Smooth scrolling for all internal anchor links
 */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
