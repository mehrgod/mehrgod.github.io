/**
 * Mehrdad Mirzaei — portfolio interactivity
 * - Sticky nav mobile menu (ARIA)
 * - Optional scroll fade-in (IntersectionObserver)
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Mobile navigation
  // ---------------------------------------------------------------------------
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (nav && toggle && menu) {
    function setMenuOpen(open) {
      nav.classList.toggle("nav--open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    function closeMenu() {
      setMenuOpen(false);
    }

    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("nav--open");
      setMenuOpen(open);
    });

    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("nav--open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Scroll fade-in: only affects below-the-fold elements to avoid layout flash
  // ---------------------------------------------------------------------------
  if (!("IntersectionObserver" in window)) {
    return;
  }

  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return;
  }

  var animated = document.querySelectorAll(".section-animate");
  if (!animated.length) {
    return;
  }

  var viewportH = window.innerHeight || document.documentElement.clientHeight;

  animated.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    var inView = rect.top < viewportH - 40 && rect.bottom > 80;
    if (inView) {
      el.classList.add("is-visible");
    } else {
      el.classList.add("js-will-reveal");
    }
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  animated.forEach(function (el) {
    if (!el.classList.contains("is-visible")) {
      io.observe(el);
    }
  });
})();
