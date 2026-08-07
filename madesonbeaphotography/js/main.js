/* Madeson Bea Photography — behavior
   Small, dependency-free. All motion respects prefers-reduced-motion. */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Reveal on scroll — motion-safe only */
  var motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (motionOK && "IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Mobile sticky booking bar — appears once the hero is scrolled past,
     hides near the footer so it never covers footer links. */
  var sticky = document.querySelector(".sticky-book");
  var hero = document.querySelector(".hero, .page-head");
  var footer = document.querySelector(".site-footer");
  if (sticky && hero) {
    document.body.classList.add("has-sticky");
    var showAfter = function () {
      var heroGone = hero.getBoundingClientRect().bottom < 0;
      var footerNear = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      sticky.classList.toggle("visible", heroGone && !footerNear);
    };
    window.addEventListener("scroll", showAfter, { passive: true });
    showAfter();
  }

  /* Portfolio filters */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var buttons = filterBar.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll(".pf-grid .work-item");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        var f = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var match = f === "all" || item.getAttribute("data-cat") === f;
          item.classList.toggle("hidden", !match);
        });
      });
    });
  }

  /* Inquiry form — client-side handling + confirmation state.
     Replace form action with your form endpoint (Formspree, Netlify, etc.);
     if the action is "#demo" we simulate success locally. */
  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      var action = form.getAttribute("action") || "#demo";
      if (action === "#demo") {
        ev.preventDefault();
        if (!form.reportValidity()) return;
        showConfirmation();
      }
      /* With a real endpoint, let the browser submit normally, or wire
         fetch() here and call showConfirmation() on success. */
    });
  }

  function showConfirmation() {
    var page = document.getElementById("inquire-main");
    var conf = document.getElementById("confirmation");
    if (page && conf) {
      page.style.display = "none";
      conf.classList.add("visible");
      conf.setAttribute("tabindex", "-1");
      conf.focus({ preventScroll: false });
      window.scrollTo({ top: 0, behavior: motionOK ? "smooth" : "auto" });
    }
  }

  /* Footer year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
