/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — Nihal Singh Tomar | script.js
   Handles: Custom cursor, Typewriter, Particles.js, AOS,
            Navbar, Skill animations, Filtering, Timeline,
            Counter, Contact form, Theme toggle, Back-to-top
   ═══════════════════════════════════════════════════════════ */

"use strict";

/* ─── DOM READY ─────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initTyped();
  initAOS();
  initCustomCursor();
  initNavbar();
  initThemeToggle();
  initSkillFilter();
  initSkillBars();
  initTimeline();
  initCounters();
  initContactForm();
  initBackToTop();
  initTiltEffect();
  initLazyLoading();
});

/* ─── 1. PARTICLES.JS ─────────────────────────────────── */
function initParticles() {
  if (typeof particlesJS === "undefined") return;
  particlesJS("particles-js", {
    particles: {
      number: { value: 70, density: { enable: true, value_area: 900 } },
      color: { value: ["#4f8ef7", "#8b5cf6", "#06d6c7"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.35,
        random: true,
        anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false },
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 160,
        color: "#4f8ef7",
        opacity: 0.08,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
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
        repulse: { distance: 80, duration: 0.4 },
        push: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}

/* ─── 2. TYPEWRITER (pure JS — no library) ───────────── */
function initTyped() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "Web Developer",
    "Coder",
    "MERN Stack Developer",
    "React Native Developer",
    "Frontend Developer",
  ];

  const TYPE_SPEED_MIN  = 80;   // ms per character (minimum)
  const TYPE_SPEED_MAX  = 120;  // ms per character (maximum)
  const DELETE_SPEED    = 50;   // ms per character while deleting
  const PAUSE_AFTER     = 1200; // ms pause after full word is typed
  const PAUSE_BEFORE    = 300;  // ms pause before starting to delete

  let roleIndex   = 0;  // which role we are currently showing
  let charIndex   = 0;  // how many characters are currently rendered
  let isDeleting  = false;
  let timer       = null;

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
        isDeleting  = false;
        roleIndex   = (roleIndex + 1) % roles.length;
        timer = setTimeout(tick, TYPE_SPEED_MIN);
        return;
      }
      timer = setTimeout(tick, DELETE_SPEED);
    }
  }

  // Kick off with a short initial delay so the page feels settled
  timer = setTimeout(tick, 600);
}

/* ─── 3. AOS (Scroll Animations) ─────────────────────── */
function initAOS() {
  if (typeof AOS === "undefined") return;
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 0,
  });
}

/* ─── 4. CUSTOM CURSOR ─────────────────────────────────── */
function initCustomCursor() {
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
  const interactives = document.querySelectorAll("a, button, .skill-card, .project-card");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      cursor.style.background = "var(--accent-purple)";
      follower.style.transform = "translate(-50%, -50%) scale(1.5)";
      follower.style.borderColor = "var(--accent-purple)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "var(--accent-blue)";
      follower.style.transform = "translate(-50%, -50%) scale(1)";
      follower.style.borderColor = "rgba(79,142,247,0.5)";
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

/* ─── 5. NAVBAR ─────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const allNavLinks = document.querySelectorAll(".nav-link");

  // Scroll → sticky effect
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    updateActiveLink();
  });

  // Hamburger toggle
  hamburger?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.querySelectorAll("span").forEach((s, i) => {
      s.style.transform = isOpen
        ? (i === 0 ? "rotate(45deg) translate(5px, 5px)" : i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "opacity: 0")
        : "";
      if (i === 1) s.style.opacity = isOpen ? "0" : "1";
    });
  });

  // Close on link click
  allNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Active link on scroll
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
}

/* ─── 6. THEME TOGGLE (Dark / Light) ─────────────────── */
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Restore saved theme
  const saved = localStorage.getItem("portfolio-theme") || "dark";
  html.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  btn?.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (!icon) return;
    icon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
    btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  }
}

/* ─── 7. SKILL FILTER ─────────────────────────────────── */
function initSkillFilter() {
  const catBtns = document.querySelectorAll(".skill-cat-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.getAttribute("data-cat");
      skillCards.forEach((card) => {
        const cardCat = card.getAttribute("data-cat");
        const show = cat === "all" || cardCat === cat;
        card.style.display = show ? "" : "none";
        // Re-trigger animation
        if (show) {
          card.style.animation = "none";
          card.offsetHeight; // reflow
          card.style.animation = "";
        }
      });
    });
  });
}

/* ─── 8. SKILL BAR ANIMATIONS ─────────────────────────── */
function initSkillBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill) => {
          const width = fill.getAttribute("data-width") + "%";
          setTimeout(() => {
            fill.style.width = width;
          }, 200);
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) observer.observe(skillsGrid);
}

/* ─── 9. TIMELINE TABS ─────────────────────────────────── */
function initTimeline() {
  const tabs = document.querySelectorAll(".timeline-tab");
  const expTimeline = document.getElementById("experienceTimeline");
  const eduTimeline = document.getElementById("educationTimeline");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      if (target === "experience") {
        expTimeline?.classList.remove("hidden");
        eduTimeline?.classList.add("hidden");
      } else {
        eduTimeline?.classList.remove("hidden");
        expTimeline?.classList.add("hidden");
        // Re-animate edu items
        const items = eduTimeline?.querySelectorAll(".timeline-item") || [];
        items.forEach((item, i) => {
          item.style.opacity = "0";
          item.style.transform = "translateX(-20px)";
          setTimeout(() => {
            item.style.transition = "all 0.5s ease";
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, i * 150);
        });
      }
    });
  });
}

/* ─── 10. STAT COUNTERS ─────────────────────────────────── */
function initCounters() {
  const statNums = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
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

/* ─── 11. CONTACT FORM ─────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn?.querySelector(".btn-text");
  const btnLoading = submitBtn?.querySelector(".btn-loading");
  const formStatus = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("userMessage").value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Loading state
    btnText.classList.add("hidden");
    btnLoading.classList.remove("hidden");
    submitBtn.disabled = true;

    // --- EmailJS integration ---
    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY'
    // with your actual EmailJS credentials to enable real mail delivery.
    try {
      if (typeof emailjs !== "undefined") {
        await emailjs.sendForm(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          form,
          "YOUR_PUBLIC_KEY"
        );
        showStatus("🎉 Message sent! I'll get back to you shortly.", "success");
        form.reset();
      } else {
        // Fallback demo simulation
        await delay(1800);
        showStatus("🎉 Message sent successfully! I'll get back to you soon.", "success");
        form.reset();
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      showStatus("❌ Something went wrong. Please try again or contact me directly.", "error");
    } finally {
      btnText.classList.remove("hidden");
      btnLoading.classList.add("hidden");
      submitBtn.disabled = false;
    }
  });

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status show ${type}`;
    setTimeout(() => formStatus.classList.remove("show"), 6000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

/* ─── 12. BACK TO TOP ─────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─── 13. TILT EFFECT on Project Cards ───────────────── */
function initTiltEffect() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ─── 14. LAZY LOADING for images ─────────────────────── */
function initLazyLoading() {
  const lazyImgs = document.querySelectorAll("img[loading='lazy']");
  if ("loading" in HTMLImageElement.prototype) return; // native support

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

/* ─── 15. SMOOTH SCROLL for all anchor links ──────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href === "#") { e.preventDefault(); return; }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ─── 16. DOWNLOAD CV (placeholder) ─────────────────── */
document.getElementById("downloadCV")?.addEventListener("click", (e) => {
  e.preventDefault();
  // Replace with your actual CV link/path when ready
  alert("CV download will be available soon! Contact me via the form for a copy.");
});

/* ─── 17. Navbar active highlight on page load ───────── */
window.dispatchEvent(new Event("scroll"));
