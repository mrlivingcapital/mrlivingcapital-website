/* MRLC thesis bridge — INTERIM deploy mechanism (2026-09-27)
   Purpose: ship the unified-messaging hero line + 4-pillar thesis strip
   WITHOUT a bundle rebuild, because the only authenticated GitHub channel
   available cannot transport a 309 KB minified bundle.

   Self-disabling: if a React-rendered #thesis section exists (the proper
   ThesisSection implementation already committed in src/), this script
   only performs the hero-line swap and skips injection.

   Removal: once the proper build is pushed to GitHub (git credentials
   restored), delete this file and its <script> tag from index.html. */
(function () {
  'use strict';

  /* --- 1. Hero sub-line swap (unified thesis voice) --- */
  var HERO_FIND_1 = 'Two decades of strategy design and implementation';
  var HERO_FIND_2 = "I don't advise. I architect capital.";
  var HERO_NEW_1 = 'We run our own numbers on Dubai real estate. First-party, measured,';
  var HERO_NEW_2 = "published with the misses included. The numbers make sense, or we don't proceed.";

  function swapHero() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var n, done1 = false, done2 = false;
    while ((n = w.nextNode()) && !(done1 && done2)) {
      if (!done1 && n.nodeValue.indexOf(HERO_FIND_1) !== -1) {
        n.nodeValue = HERO_NEW_1;
        done1 = true;
      } else if (!done2 && n.nodeValue.indexOf(HERO_FIND_2) !== -1) {
        n.nodeValue = HERO_NEW_2;
        done2 = true;
      }
    }
    return done1 && done2;
  }

  /* --- 2. Thesis strip (4 pillars) --- */
  var PILLARS = [
    { n: '01', title: 'First-Party Data Over Narrative',
      line: 'Everyone quotes the market. We measure it ourselves, and we publish the scoreboard, including the misses.',
      link: '/blog/', cta: 'Read the briefings' },
    { n: '02', title: 'Timing Is Priced, Not Felt',
      line: 'Waiting is an option. Options need triggers: name the postcode, set the deadline, pre-decide the proof.',
      link: '/deals/', cta: 'See live opportunities' },
    { n: '03', title: 'Delivery Over Announcement',
      line: "Dubai's growth vector is paved and dated. Move before the concrete, not after it.",
      link: '/corridors/', cta: 'Explore the corridors' },
    { n: '04', title: 'The Plan Is the Product',
      line: 'You are not buying a property. You are buying a payment plan. The structure decides the return.',
      link: '/off-plan/', cta: 'Understand off-plan' }
  ];

  function el(tag, style, cls, text) {
    var e = document.createElement(tag);
    if (style) e.setAttribute('style', style);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function buildStrip() {
    var sec = el('section', 'padding:72px 24px;max-width:1120px;margin:0 auto;', null, null);
    sec.id = 'thesis';

    var head = el('div', 'text-align:center;margin-bottom:40px;', null, null);
    head.appendChild(el('p', 'font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#0F6B62;margin-bottom:12px;font-family:"Space Grotesk",sans-serif;', 'font-nav', 'How We Invest'));
    head.appendChild(el('h2', 'font-size:clamp(26px,4vw,40px);color:#38413E;margin-bottom:10px;line-height:1.15;font-family:"Space Grotesk",sans-serif;', 'font-hero', "The numbers make sense, or we don't proceed."));
    head.appendChild(el('p', 'font-size:15px;color:#5A6662;max-width:620px;margin:0 auto;line-height:1.6;font-family:Inter,sans-serif;', 'font-body', 'Four principles, one scoreboard. Everything we publish, from briefings to corridors, runs through them.'));
    sec.appendChild(head);

    var grid = el('div', 'display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;', null, null);
    PILLARS.forEach(function (p) {
      var card = el('a', 'background:#EEE7DA;border:1px solid rgba(15,107,98,0.12);border-radius:6px;padding:24px 20px;text-decoration:none;display:block;transition:border-color 0.3s ease;', null, null);
      card.href = p.link;
      card.addEventListener('mouseenter', function () { card.style.borderColor = 'rgba(15,107,98,0.45)'; });
      card.addEventListener('mouseleave', function () { card.style.borderColor = 'rgba(15,107,98,0.12)'; });
      card.appendChild(el('div', 'font-size:11px;letter-spacing:0.18em;color:#B08D4A;margin-bottom:10px;font-family:"Space Grotesk",sans-serif;', 'font-nav', p.n));
      card.appendChild(el('h3', 'font-size:17px;color:#0F6B62;margin-bottom:10px;line-height:1.3;font-family:"Space Grotesk",sans-serif;', 'font-hero', p.title));
      card.appendChild(el('p', 'font-size:13.5px;color:#5A6662;line-height:1.65;margin-bottom:16px;font-family:Inter,sans-serif;', 'font-body', p.line));
      card.appendChild(el('span', 'font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#0F6B62;font-family:"Space Grotesk",sans-serif;', 'font-nav', p.cta + ' \u2192'));
      grid.appendChild(card);
    });
    sec.appendChild(grid);
    return sec;
  }

  function inject() {
    if (document.getElementById('thesis')) return true; /* proper build already renders it */
    var hero = document.getElementById('hero');
    if (!hero || !hero.parentNode) return false;
    var anchor = hero.nextElementSibling; /* the section divider */
    anchor.parentNode.insertBefore(buildStrip(), anchor ? anchor.nextSibling : null);
    return true;
  }

  function run() {
    if (swapHero() && inject()) return;
    /* React 19 commits asynchronously; retry briefly until both land */
    var tries = 0;
    var iv = setInterval(function () {
      var heroDone = swapHero();
      if (inject() && heroDone || ++tries > 20) clearInterval(iv);
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
