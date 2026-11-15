/**
 * ══════════════════════════════════════════════════════════════════
 * PORTFOLIO — NIHAL SINGH TOMAR (<NS/>)
 * Main Application Entry Point
 * 
 * Orchestrates modules for animations, navigation, cursor,
 * theme management, contact form, and interactive UI widgets.
 * ══════════════════════════════════════════════════════════════════
 */

import { initParticles, initAOS, initSectionReveal, initLazyLoading } from "./modules/animations.js";
import { initTyped } from "./modules/typewriter.js";
import { initCustomCursor } from "./modules/cursor.js";
import { initNavbar } from "./modules/navigation.js";
import { initThemeToggle } from "./modules/theme.js";
import { initTimeline } from "./modules/timeline.js";
import { initCounters } from "./modules/counters.js";
import { initTerminal } from "./modules/terminal.js";
import { initContactForm, initDownloadCV } from "./modules/contact.js";
import { initTiltEffect } from "./modules/tilt.js";
import { initScrollProgress, initSideNav, initBackToTop, initSmoothScroll } from "./modules/scroll.js";

function initApp() {
  // Core Visuals & Background
  initParticles();
  initTyped();
  initAOS();
  initCustomCursor();

  // Navigation & Chrome
  initNavbar();
  initThemeToggle();
  initScrollProgress();
  initSideNav();
  initBackToTop();
  initSmoothScroll();

  // Content Interactivity
  initTimeline();
  initCounters();
  initTerminal();
  initTiltEffect();
  initLazyLoading();
  initSectionReveal();

  // Forms & Actions
  initContactForm();
  initDownloadCV();

  // Initial trigger for scroll listeners
  window.dispatchEvent(new Event("scroll"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
