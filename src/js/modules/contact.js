/**
 * Contact & Action Module
 * Contact form handling with EmailJS support and CV download handler
 */

import { isValidEmail, delay } from "../utils/helpers.js";

export function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn?.querySelector(".btn-text");
  const btnLoading = submitBtn?.querySelector(".btn-loading");
  const formStatus = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validation
    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");
    const messageInput = document.getElementById("userMessage");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Loading state
    btnText?.classList.add("hidden");
    btnLoading?.classList.remove("hidden");
    if (submitBtn) submitBtn.disabled = true;

    // EmailJS integration with fallback simulation
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
        await delay(1800);
        showStatus("🎉 Message sent successfully! I'll get back to you soon.", "success");
        form.reset();
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      showStatus("❌ Something went wrong. Please try again or contact me directly.", "error");
    } finally {
      btnText?.classList.remove("hidden");
      btnLoading?.classList.add("hidden");
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status show ${type}`;
    setTimeout(() => formStatus.classList.remove("show"), 6000);
  }
}

export function initDownloadCV() {
  const cvBtn = document.getElementById("downloadCV");
  cvBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("CV download will be available soon! Contact me via the form for a copy.");
  });
}
