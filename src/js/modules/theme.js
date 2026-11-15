/**
 * Theme Toggle Module
 * Light / Dark mode toggle with session persistence
 */

export function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Always start in light mode by default
  localStorage.removeItem("portfolio-theme");
  html.setAttribute("data-theme", "light");
  updateThemeIcon("light");

  btn?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (!icon) return;
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    btn?.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  }
}
