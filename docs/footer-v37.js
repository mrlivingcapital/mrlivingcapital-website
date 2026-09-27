/* MRLC footer patch v3.7 (2026-09-27): LinkedIn profile URLs removed site-wide.
   Principal directive: the handle @mrlivingcapital is universal; no profile
   links anywhere on the site. The pack closers carry the icons; visitors
   search the handle. This patch:
   1. converts every anchor to linkedin.com/in/mrlivingcapital into a plain
      span (keeps label, adds title),
   2. empties JSON-LD sameAs arrays that reference the profile URL,
   3. converts the footer/desk socials LinkedIn icon (rendered by
      thesis-interim.js socialRow) into a non-link span.
   Runs on load, then watches for late-rendered content (desk injects the
   footer row asynchronously). */
(function () {
  'use strict';
  function strip() {
    var hits = document.querySelectorAll('a[href*="linkedin.com/in/mrlivingcapital"]');
    for (var i = 0; i < hits.length; i++) {
      var a = hits[i];
      var sp = document.createElement('span');
      sp.textContent = a.textContent;
      sp.setAttribute('title', '@mrlivingcapital on LinkedIn. Search the handle.');
      sp.setAttribute('aria-label', 'LinkedIn @mrlivingcapital');
      if (a.hasAttribute('style')) sp.setAttribute('style', a.getAttribute('style'));
      sp.style.cursor = 'default';
      a.parentNode.replaceChild(sp, a);
    }
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var j = 0; j < scripts.length; j++) {
      if (scripts[j].textContent.indexOf('linkedin.com/in/mrlivingcapital') !== -1) {
        scripts[j].textContent = scripts[j].textContent.replace(/"sameAs":\s*\[[^\]]*\]/, '"sameAs": []');
      }
    }
  }
  strip();
  var tries = 0;
  var iv = setInterval(function () { strip(); if (++tries > 30) clearInterval(iv); }, 1000);
  var queued = false;
  var obs = new MutationObserver(function () {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; strip(); }, 250);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
