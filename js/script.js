/* ============================================================
   CARVÉ AUTOMOTIVE — FAQ Accordion
   Pure Vanilla JS
   ============================================================ */

(function () {
  "use strict";

  const accordion = document.querySelector(".faq-accordion");
  if (!accordion) return;

  const items = accordion.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Close all other items (true accordion behavior)
      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("is-open")) {
          closeItem(otherItem);
        }
      });

      // Toggle current item
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });

  function openItem(item) {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    answer.hidden = false;

    // Force reflow then set max-height for smooth animation
    requestAnimationFrame(() => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  }

  function closeItem(item) {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    item.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    answer.style.maxHeight = "0px";

    // Wait for transition to finish before hiding
    answer.addEventListener(
      "transitionend",
      function handler(e) {
        if (e.propertyName === "max-height") {
          answer.hidden = true;
          answer.removeEventListener("transitionend", handler);
        }
      }
    );
  }

  // Optional: smooth scroll offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector(".navbar")?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    });
  });
})();
