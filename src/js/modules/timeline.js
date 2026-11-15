/**
 * Timeline Module
 * Tab switching between Experience and Education milestones
 */

export function initTimeline() {
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
        
        // Re-animate education timeline items
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
