/**
 * Navigation Module
 * Handles floating navbar scrolling, active section link highlighting, and mobile drawer
 */

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const allNavLinks = document.querySelectorAll(".nav-link");

  if (!navbar) return;

  // Scroll → sticky glass effect & active link state
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

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

  // Update active navigation link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY + 100;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", scrollY >= top && scrollY < bottom);
      }
    });
  }

  // Trigger once initially
  updateActiveLink();
}
