(function () {
  "use strict";
  var BP = 900;
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.querySelector("[data-mob-overlay]");
  var openBtn = document.querySelector("[data-mob-open]");
  var closeBtn = document.querySelector("[data-mob-close]");
  function setMenu(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    overlay.classList.toggle("is-open", open);
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) { closeBtn.focus(); } else { openBtn.focus(); }
  }
  if (openBtn) openBtn.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  if (overlay) overlay.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BP && drawer && drawer.classList.contains("is-open")) {
      drawer.classList.remove("is-open"); overlay.classList.remove("is-open");
      document.documentElement.style.overflow = "";
    }
  });
  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var panel = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });
})();
