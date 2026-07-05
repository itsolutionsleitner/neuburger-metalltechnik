/* ===================================================================
   NEUBURGER METALLTECHNIK — script.js
   1. Mobiles Menü
   2. Sticky Header beim Scrollen
   3. Scroll-Reveal-Animationen
   4. FAQ-Akkordeon
   5. Kontaktformular (Frontend-Bestätigung)
   6. Cookie-Banner
=================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Mobiles Menü ---------- */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  /* ---------- 2. Sticky Header beim Scrollen ---------- */
  const header = document.getElementById("header");

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader);
  }

  /* ---------- 3. Scroll-Reveal-Animationen ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* ---------- 4. FAQ-Akkordeon ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });

  /* ---------- 5. Kontaktformular ---------- */
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Hinweis: Aktuell zeigt das Formular nur eine Bestätigung im Frontend an.
      // Für echten E-Mail-Versand kann hier z. B. Formspree oder EmailJS angebunden werden.
      // Beispiel mit Formspree: form.action = "https://formspree.io/f/DEINE_ID";
      // und form.submit() statt der Anzeige unten verwenden.

      if (successMessage) {
        successMessage.classList.add("visible");
      }

      form.reset();
    });
  }

  /* ---------- 6. Cookie-Banner ---------- */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAcceptBtn = document.getElementById("cookieAccept");
  const cookieDeclineBtn = document.getElementById("cookieDecline");

  if (cookieBanner) {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      cookieBanner.classList.add("visible");
      requestAnimationFrame(() => {
        cookieBanner.classList.add("show");
      });
    }

    const hideBanner = (value) => {
      localStorage.setItem("cookieConsent", value);
      cookieBanner.classList.remove("show");
      setTimeout(() => {
        cookieBanner.classList.remove("visible");
      }, 400);
    };

    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener("click", () => hideBanner("accepted"));
    }

    if (cookieDeclineBtn) {
      cookieDeclineBtn.addEventListener("click", () => hideBanner("declined"));
    }
  }

});
