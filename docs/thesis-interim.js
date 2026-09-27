/* MRLC thesis bridge + copy sweep: INTERIM deploy mechanism (2026-09-27, v3.6)
   Purpose: ship unified-messaging copy (hero line, 4-pillar strip, em-dash
   purge, founder narrative corrections) and the Investor's Desk revamp
   WITHOUT a bundle rebuild, because the authenticated channels available
   right now cannot transport a 309 KB bundle
   (handover token expired 2026-09-27; MCP OAuth has inline-content limits).

   Blocks:
   1. Hero sub-line swap + logo sizing
   2. Thesis strip injection (self-disabling if React #thesis exists)
   3. COPY SWEEP: targeted text replacements (em-dash purge per principal
      order 2026-09-27; finance narrative removed; emirates stat reframed)
      applied to current text nodes AND future DOM mutations (accordions).
   4. REAL GLOBE: country-outline canvas, self-hosted borders.json.
   5. INVESTOR'S DESK REVAMP (principal approval 2026-09-27): legacy
      #blog / #lead-magnet sections retired; new gated Desk, no PDF ever
      exposed to the browser, manual WhatsApp delivery within 24h,
      free-thesis strip + socials (@mrlivingcapital everywhere).

   Removal: once the proper build is pushed (git credentials restored),
   delete this file and its <script> tag; the bundle then carries all copy. */
(function () {
  'use strict';

  /* ============ 1. HERO ============ */
  var HERO_FIND_1 = 'Two decades of strategy design and implementation';
  var HERO_FIND_2 = "I don't advise. I architect capital.";
  var HERO_NEW_1 = 'We run our own numbers on investment opportunities.';
  var HERO_NEW_2 = "First-party, measured, published with the misses included. The numbers make sense, or we don't proceed.";
  var LOGO_HEIGHT = 'clamp(260px, 32vw, 400px)';
  var SLOGAN_SIZE = 'clamp(36px, 6.2vw, 66px)';

  function sizeLogo() {
    var img = document.querySelector('#hero img[alt="MR Living Capital"]') ||
              (document.getElementById('hero') || { querySelector: function () { return null; } }).querySelector('img');
    if (!img) return false;
    img.style.height = LOGO_HEIGHT;
    return true;
  }

  function fixSlogan() {
    var heads = document.querySelectorAll('#hero h1');
    if (!heads.length) return false;
    for (var i = 0; i < heads.length; i++) heads[i].style.fontSize = SLOGAN_SIZE;
    return true;
  }

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

  /* ============ 2. THESIS STRIP ============ */
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
    if (document.getElementById('thesis')) return true;
    var hero = document.getElementById('hero');
    if (!hero || !hero.parentNode) return false;
    var anchor = hero.nextElementSibling;
    anchor.parentNode.insertBefore(buildStrip(), anchor ? anchor.nextSibling : null);
    return true;
  }

  /* ============ 3. COPY SWEEP (em-dash purge + narrative fixes) ============ */
  var R = [
    /* Founder stats */
    ['DECADES INSTITUTIONAL FINANCE', 'YEARS IN DUBAI'],
    ['COUNTRIES \u2014 OWN-MONEY INVESTOR', 'COUNTRIES \u00B7 OWN-MONEY INVESTOR'],
    ['EMIRATES \u2014 ALLOCATION COVERAGE', 'CONTINENTS \u00B7 MARKET CYCLES NAVIGATED'],
    ['LICENSED ADVISOR \u2014 STRADA UAE', 'LICENSED ADVISOR \u00B7 STRADA UAE'],
    /* Founder letter */
    ['Two decades of institutional financial DNA.', 'Entrepreneur. Investor. Steward of capital.'],
    ['INSTITUTIONAL ', 'DISCIPLINE '],
    ['PERSONAL ', 'CONVICTION '],
    ['Why institutional discipline matters in every allocation decision.', 'Why process matters in every allocation decision.'],
    ['I spent two decades designing and implementing strategies within financial institutions and freelance private portfolio management \u2014 navigating market cycles across three continents, and learning how big money actually moves. Not how it talks. How it moves.',
     'Thirty-five years in Dubai. Three continents of market cycles behind me. I have bought, built, and walked away more times than most agents have shown units. One lesson repeats everywhere: how big money actually moves. Not how it talks. How it moves.'],
    ['I started working at fourteen. Not because I had to \u2014 because I understood early that how you steward capital defines the life you live and the legacy you leave. Today, MR Living Capital exists because I believe investors deserve the same institutional-grade discipline that the big institutions use \u2014 but accessible to serious individuals and families building real wealth.',
     'I started working at fourteen. Not because I had to, but because I understood early that how you steward capital defines the life you live and the legacy you leave. Today, MR Living Capital exists because serious investors deserve that same discipline: measured, first-party, published with the misses included.'],
    ['This is not a property shop. This is real estate investment advisory engineered by someone who spent two decades inside the machine \u2014 designing strategies and managing private portfolios.',
     'This is not a property shop. I don\'t sell listings; I filter them. Every opportunity I put in front of you has already passed my own capital test and a 100-point scorecard, because I invest my own money on the same scoreboard I recommend to you. I don\'t chase commissions. I architect capital. If the numbers don\'t make sense, we don\'t proceed. That is the only rule.'],
    /* Market intelligence */
    ['Dubai Land Department \u2014 H1 2026', 'Dubai Land Department \u00B7 H1 2026'],
    ['Dubai Land Department \u2014 Q1 2026 YoY (latest published)', 'Dubai Land Department \u00B7 Q1 2026 YoY (latest published)'],
    ['Ready Sales H1 \u2014 Largest Share', 'Ready Sales H1 \u00B7 Largest Share'],
    ['Dubai Land Department \u2014 Off-Plan Transaction Analysis 2026', 'Dubai Land Department \u00B7 Off-Plan Transaction Analysis 2026'],
    ['H1 2026 transactions \u2014 and for the first time in years', 'H1 2026 transactions. For the first time in years'],
    ['delivers 7-9% yields \u2014 the highest in the UAE', 'delivers 7-9% yields, the highest in the UAE'],
    ['OFF-PLAN H1 2026 \u2014 ', 'OFF-PLAN H1 2026 \u00B7 '],
    ['Record \u2014 more than 2019\u20132025 combined.', 'Record: more than 2019-2025 combined.'],
    ['Cavendish Maxwell \u2014 H1 2026', 'Cavendish Maxwell \u00B7 H1 2026'],
    /* Infrastructure */
    ['nature reserve \u2014 balancing urban growth', 'nature reserve, balancing urban growth'],
    ['opening 2025-2027 \u2014 attracting 5M+', 'opening 2025-2027, attracting 5M+'],
    ['45 million passengers annually \u2014 direct boost', '45 million passengers annually, direct boost'],
    ['entertainment venues \u2014 projected to attract', 'entertainment venues, projected to attract'],
    ['residential towers, and marina \u2014 the premier', 'residential towers, and marina, the premier'],
    ['400K to 600K \u2014 50% increase', '400K to 600K, 50% increase'],
    ['capital appreciation \u2014 not market speculation', 'capital appreciation, not market speculation'],
    /* Corridors */
    ['5x capacity by 2030 \u2014 750,000+ jobs created', '5x capacity by 2030, 750,000+ jobs created'],
    ['GDP target by 2033 \u2014 1M new jobs', 'GDP target by 2033, 1M new jobs'],
    ['gaming resort in the GCC \u2014 opens 2027 and will transform', 'gaming resort in the GCC, opens 2027 and transforms'],
    ['600K by 2030 \u2014 50% increase in housing demand', '600K by 2030, 50% increase in housing demand'],
    /* Distress deals */
    ['country code \u2014 one is enough', 'country code, one is enough'],
    ['not weeks \u2014', 'not weeks.'],
    ['and they go to the people already on the list', 'They go to the people already on the list'],
    ['Something went wrong \u2014 try again', 'Something went wrong, try again'],
    ["I'M SERIOUS \u2014 LET'S TALK", "I'M SERIOUS \u00B7 LET'S TALK"],
    ['Email or phone \u2014 one is enough', 'Email or phone, one is enough'],
    /* FAQ + misc */
    ['processed remotely \u2014 no UAE residency required', 'processed remotely, no UAE residency required'],
    ['All three emirates \u2014 Dubai, Abu Dhabi, and Ras Al Khaimah \u2014 allow 100% freehold ownership',
     'All three emirates (Dubai, Abu Dhabi, and Ras Al Khaimah) allow 100% freehold ownership'],
    ['Verified DLD data. Institutional-grade corridor analysis. Not public research \u2014 partner-only intelligence.',
     'Verified DLD data. Corridor analysis. Not public research, partner-only intelligence.'],
    ['commercial insight \u2014 the same data we brief clients on', 'commercial insight, the same data we brief clients on'],
    ['Something went wrong \u2014 try again or WhatsApp us directly.', 'Something went wrong, try again or WhatsApp us directly.']
  ];

  function fixNode(node) {
    var v = node.nodeValue;
    for (var i = 0; i < R.length; i++) {
      if (v.indexOf(R[i][0]) !== -1) v = v.split(R[i][0]).join(R[i][1]);
    }
    if (v.indexOf('\u2013') !== -1) v = v.split('\u2013').join('-');
    if (v.indexOf('\u2014') !== -1) v = v.split('\u2014').join(', ');
    if (v !== node.nodeValue) node.nodeValue = v;
  }

  function sweep(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    for (var i = 0; i < nodes.length; i++) fixNode(nodes[i]);
  }

  /* Founder stats first counter animates to 2; force the corrected value */
  function fixStatNumber() {
    try {
      var grid = document.querySelector('#founder-stats > div');
      if (!grid) return false;
      var numDiv = grid.querySelector('div[style*="clamp(36px"]');
      if (numDiv && numDiv.textContent.trim() === '2') { numDiv.textContent = '35'; return true; }
      return !!numDiv && numDiv.textContent.trim() === '35';
    } catch (e) { return false; }
  }

  function run() {
    sweep(document.body);
    var logoDone = sizeLogo();
    var sloganDone = fixSlogan();
    if (swapHero() && inject() && logoDone && sloganDone && fixStatNumber()) return;
    var tries = 0;
    var iv = setInterval(function () {
      sweep(document.body);
      var heroDone = swapHero();
      var lg = sizeLogo();
      var sg = fixSlogan();
      var st = fixStatNumber();
      if (inject() && heroDone && lg && sg && st || ++tries > 24) clearInterval(iv);
    }, 500);
    /* catch late-mounted content (FAQ accordion etc.) */
    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') fixNode(m.target);
        for (var j = 0; j < m.addedNodes.length; j++) {
          var nd = m.addedNodes[j];
          if (nd.nodeType === 3) fixNode(nd);
          else if (nd.nodeType === 1 && nd.id !== 'thesis') sweep(nd);
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* ============ 4. REAL GLOBE (country outlines, dependency-free canvas) ============ */
  function upgradeGlobe() {
    if (window.__mrlcGlobeDone) return true;
    var holder = document.querySelector('div[style*="clamp(350px, 50vh, 480px)"]');
    if (!holder) return false;
    try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (!ctx) return false;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rot = 0, vel = 0.16, dragging = false, lastX = 0, lastInteract = 0;
      var borders = null, t = 0;
      var MARKERS = [[55.27, 25.2], [-0.12, 51.5], [-79.38, 43.65]];
      function fit() {
        var w = holder.clientWidth || 300, h = holder.clientHeight || 420;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      }
      function proj(lng, lat, R, cx, cy) {
        var lam = (lng + rot) * Math.PI / 180, phi = lat * Math.PI / 180;
        var x = Math.cos(phi) * Math.sin(lam), y = Math.sin(phi), z = Math.cos(phi) * Math.cos(lam);
        return [cx + R * x, cy - R * y, z];
      }
      function draw() {
        requestAnimationFrame(draw);
        t += 0.016;
        if (!dragging) {
          if (Date.now() - lastInteract > 1800) vel += (0.16 - vel) * 0.02;
          rot += vel;
        }
        var w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        var cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.36;
        ctx.beginPath(); ctx.arc(cx, cy, R * 1.14, 0, 6.2832);
        var g = ctx.createRadialGradient(cx, cy, R * 0.95, cx, cy, R * 1.18);
        g.addColorStop(0, 'rgba(87,169,159,0)');
        g.addColorStop(0.55, 'rgba(87,169,159,0.16)');
        g.addColorStop(1, 'rgba(87,169,159,0)');
        ctx.fillStyle = g; ctx.fill();
        var sg = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
        sg.addColorStop(0, '#FBF8F1');
        sg.addColorStop(0.75, '#F6F1E7');
        sg.addColorStop(1, '#EDE5D6');
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832);
        ctx.fillStyle = sg; ctx.fill();
        ctx.strokeStyle = 'rgba(15,107,98,0.25)'; ctx.lineWidth = dpr; ctx.stroke();
        if (borders) {
          ctx.save();
          ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.clip();
          ctx.strokeStyle = 'rgba(15,107,98,0.42)';
          ctx.lineWidth = 0.7 * dpr;
          ctx.beginPath();
          var drawn = 0;
          for (var i = 0; i < borders.length; i++) {
            var line = borders[i];
            for (var j = 0; j < line.length - 1; j++) {
              var a = proj(line[j][0] / 10, line[j][1] / 10, R, cx, cy);
              var b = proj(line[j + 1][0] / 10, line[j + 1][1] / 10, R, cx, cy);
              if (a[2] > 0 && b[2] > 0) { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); drawn++; }
            }
          }
          ctx.stroke();
          window.__mrlcGlobeStats = { lines: borders.length, segs: drawn };
          ctx.restore();
        }
        for (var m = 0; m < MARKERS.length; m++) {
          var p = proj(MARKERS[m][0], MARKERS[m][1], R, cx, cy);
          if (p[2] <= 0) continue;
          var ph = (t + m * 0.9) % 1.6;
          ctx.beginPath(); ctx.arc(p[0], p[1], (2.2 + ph * 4) * dpr, 0, 6.2832);
          ctx.strokeStyle = 'rgba(87,169,159,' + Math.max(0, 0.7 - ph * 0.44).toFixed(2) + ')';
          ctx.lineWidth = dpr; ctx.stroke();
          ctx.beginPath(); ctx.arc(p[0], p[1], 2 * dpr, 0, 6.2832);
          ctx.fillStyle = '#0F6B62'; ctx.fill();
        }
      }
      canvas.style.cursor = 'grab';
      canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; });
      window.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - lastX; lastX = e.clientX;
        rot += dx * 0.4; vel = dx * 0.12; lastInteract = Date.now();
      });
      window.addEventListener('pointerup', function () { dragging = false; lastInteract = Date.now(); });
      fetch('/assets/globe/borders.json').then(function (r) { return r.json(); }).then(function (d) { borders = d; }).catch(function () {});
      fit();
      if (window.ResizeObserver) { var ro = new ResizeObserver(fit); ro.observe(holder); }
      holder.innerHTML = '';
      holder.appendChild(canvas);
      draw();
      window.__mrlcGlobeDone = true;
      return true;
    } catch (e) { return false; }
  }

  function globeInit() {
    var tries = 0;
    var iv = setInterval(function () { if (upgradeGlobe() || ++tries > 24) clearInterval(iv); }, 500);
  }

  /* ============ 5. INVESTOR'S DESK REVAMP + SOCIALS (2026-09-27, approved) ============ */
  var SOCIALS = [
    { n: 'IG', name: 'Instagram', url: 'https://instagram.com/mrlivingcapital' },
    { n: 'IN', name: 'LinkedIn', url: 'https://www.linkedin.com/in/mrlivingcapital' },
    { n: 'X', name: 'X', url: 'https://x.com/mrlivingcapital' },
    { n: 'FB', name: 'Facebook', url: 'https://facebook.com/mrlivingcapital' },
    { n: 'TH', name: 'Threads', url: 'https://threads.net/@mrlivingcapital' },
    { n: 'TG', name: 'Telegram', url: 'https://t.me/mrlivingcapital' },
    { n: 'WA', name: 'WhatsApp', url: 'https://wa.me/971585899112' }
  ];
  var WA_DISPLAY = '+971 58 589 9112';

  function socialRow(extraStyle) {
    var wrap = el('div', 'display:flex;gap:10px;flex-wrap:wrap;justify-content:center;' + (extraStyle || ''), null, null);
    SOCIALS.forEach(function (s) {
      var a = el('a', 'width:38px;height:38px;border-radius:50%;border:1px solid rgba(15,107,98,0.25);display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;font-size:11px;font-weight:600;color:#0F6B62;text-decoration:none;transition:border-color 0.25s ease,background 0.25s ease;', null, s.n);
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', s.name + ' @mrlivingcapital');
      a.addEventListener('mouseenter', function () { a.style.borderColor = 'rgba(15,107,98,0.6)'; a.style.background = 'rgba(15,107,98,0.08)'; });
      a.addEventListener('mouseleave', function () { a.style.borderColor = 'rgba(15,107,98,0.25)'; a.style.background = 'transparent'; });
      wrap.appendChild(a);
    });
    return wrap;
  }

  var DESK_REPORTS = [
    { tag: 'CORE', title: 'DUBAI H1 2026 MARKET INTELLIGENCE BRIEF', line: 'Verified DLD data. Corridor pricing. Off-plan vs ready, with the misses included.' },
    { tag: 'CORE', title: "CASH BUYER'S GUIDE TO UAE REAL ESTATE 2026", line: 'Negotiating below market value. Price per sqft framework. Built for unleveraged capital.' },
    { tag: 'GEO', title: 'DUBAI CASH BUYERS: THE 2026 WINDOW', line: 'DLD transaction breakdown by corridor. Cash advantage vs mortgage, priced per sqft.' },
    { tag: 'GEO', title: 'LONDON TO DUBAI: THE 2026 CAPITAL SHIFT', line: 'London yields 3 to 4 percent. Dubai yields 6 to 9. The math is moving money south.' },
    { tag: 'GEO', title: 'DUBAI VS TORONTO, PRICED FOR CANADIANS', line: 'Zero income tax, price per sqft Toronto cannot match, Golden Visa pathway.' },
    { tag: 'GEO', title: 'FROM THE BALKANS TO DUBAI', line: 'Serbia, Croatia, Bosnia. Case studies, legal framework, the corridor picks.' },
    { tag: 'GEO', title: 'DUBAI 2026 FOR THE FARSI SPEAKING DIASPORA', line: 'Golden Visa step by step, Farsi speaking corridors, negotiation strategy.' }
  ];

  function deskInput(ph, type) {
    var i = document.createElement('input');
    i.type = type || 'text';
    i.placeholder = ph;
    i.setAttribute('style', 'width:100%;padding:12px 16px;border-radius:6px;background:rgba(246,241,231,0.5);border:1px solid rgba(125,138,134,0.2);color:#5A6662;font-size:13px;outline:none;font-family:Inter,sans-serif;');
    return i;
  }

  function deskSelect(ph, opts) {
    var s = document.createElement('select');
    s.setAttribute('style', 'width:100%;padding:12px 16px;border-radius:6px;background:rgba(246,241,231,0.5);border:1px solid rgba(125,138,134,0.2);color:#5A6662;font-size:13px;outline:none;font-family:Inter,sans-serif;');
    var d = document.createElement('option');
    d.value = ''; d.textContent = ph; d.disabled = true; d.selected = true;
    s.appendChild(d);
    opts.forEach(function (o) { var op = document.createElement('option'); op.value = o; op.textContent = o; s.appendChild(op); });
    return s;
  }

  function buildDesk() {
    var TEAL = '#0F6B62', SLATE = '#5A6662', IVORY = '#F6F1E7';
    var sec = el('section', 'position:relative;z-index:2;background:' + IVORY + ';padding:120px 24px;', null, null);
    var inner = el('div', 'max-width:1100px;margin:0 auto;', null, null);
    sec.appendChild(inner);

    /* header */
    var head = el('div', 'text-align:center;margin-bottom:44px;', null, null);
    head.appendChild(el('p', 'font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:' + TEAL + ';margin-bottom:16px;font-family:"Space Grotesk",sans-serif;', null, "INVESTOR'S DESK"));
    var h2 = el('h2', 'font-size:clamp(28px,4vw,48px);color:' + SLATE + ';margin-bottom:12px;font-family:"Space Grotesk",sans-serif;line-height:1.15;', null, null);
    h2.appendChild(document.createTextNode('THE '));
    var sp = el('span', 'color:' + TEAL + ';', null, "INVESTOR'S DESK");
    h2.appendChild(sp);
    head.appendChild(h2);
    head.appendChild(el('p', 'color:rgba(90,102,98,0.8);font-size:15px;max-width:640px;margin:0 auto;line-height:1.6;font-family:Inter,sans-serif;', null, 'Geo-specific market briefings for Dubai, London, Toronto, the Balkans, and the Farsi speaking diaspora. The thesis is free on Instagram and LinkedIn, updated weekly. The full PDFs, every table and source included, go to people who tell me who they are.'));
    inner.appendChild(head);

    /* free-thesis strip + socials */
    var strip = el('div', 'display:flex;gap:32px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:#EEE7DA;border:1px solid rgba(15,107,98,0.12);border-radius:8px;padding:28px 32px;margin-bottom:40px;', null, null);
    var stxt = el('div', 'flex:1;min-width:260px;', null, null);
    stxt.appendChild(el('p', 'font-size:12px;letter-spacing:0.18em;color:' + TEAL + ';margin-bottom:8px;font-family:"Space Grotesk",sans-serif;font-weight:600;', null, 'THE THESIS IS FREE. READ IT FIRST.'));
    stxt.appendChild(el('p', 'color:rgba(90,102,98,0.85);font-size:13.5px;line-height:1.6;font-family:Inter,sans-serif;', null, 'Weekly market theses live on Instagram and LinkedIn. Same handle everywhere: @mrlivingcapital. When you want the complete instrument behind them, request it below.'));
    strip.appendChild(stxt);
    var socBox = el('div', 'text-align:center;', null, null);
    socBox.appendChild(socialRow(''));
    strip.appendChild(socBox);
    inner.appendChild(strip);

    /* card grid */
    var grid = el('div', 'display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;', null, null);
    inner.appendChild(grid);

    /* form panel */
    var panel = el('div', 'display:none;max-width:620px;margin:36px auto 0;background:#FFFDF8;border:1px solid rgba(15,107,98,0.15);border-radius:8px;padding:36px 32px;', null, null);
    inner.appendChild(panel);

    /* success panel */
    var ok = el('div', 'display:none;max-width:620px;margin:36px auto 0;text-align:center;background:#EEE7DA;border:1px solid rgba(15,107,98,0.15);border-radius:8px;padding:40px 32px;', null, null);
    inner.appendChild(ok);

    var nameI = deskInput('Full name *'), waI = deskInput('WhatsApp with country code * (e.g. +971...)', 'tel'), emI = deskInput('Email (optional)', 'email');
    var capS = deskSelect('Capital range (AED)', ['Prefer not to say', 'Under 250K', '250K to 1M', '1M to 5M', '5M+']);
    var timS = deskSelect('Timeline', ['Researching', '0 to 3 months', '3 to 6 months', '6 to 12 months']);
    var errP = el('p', 'color:#E74C3C;font-size:11px;margin:0;display:none;font-family:Inter,sans-serif;', null, '');
    var activeReport = null;

    function showForm(r, cardEl) {
      activeReport = r;
      ok.style.display = 'none';
      panel.style.display = 'block';
      panel.innerHTML = '';
      var t = el('h3', 'font-size:17px;color:' + SLATE + ';margin-bottom:6px;font-family:"Space Grotesk",sans-serif;', null, 'REQUEST: ' + r.title);
      panel.appendChild(t);
      panel.appendChild(el('p', 'color:rgba(90,102,98,0.75);font-size:12.5px;margin-bottom:20px;line-height:1.55;font-family:Inter,sans-serif;', null, 'One request, one reply. I read every submission myself. The full PDF lands on your WhatsApp within 24 hours. No spam, no listings blast.'));
      [nameI, waI, emI, capS, timS].forEach(function (f) { var w = el('div', 'margin-bottom:12px;', null, null); w.appendChild(f); panel.appendChild(w); });
      errP.style.display = 'none';
      panel.appendChild(errP);
      var btn = el('button', 'width:100%;padding:13px 20px;border-radius:6px;border:none;background:' + TEAL + ';color:#F6F1E7;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-family:"Space Grotesk",sans-serif;font-weight:600;cursor:pointer;', null, 'REQUEST THE PDF');
      btn.addEventListener('click', submitForm);
      panel.appendChild(btn);
      var back = el('a', 'display:inline-block;margin-top:14px;font-size:11px;letter-spacing:0.1em;color:' + TEAL + ';text-decoration:none;cursor:pointer;font-family:"Space Grotesk",sans-serif;', null, '\u2190 All reports');
      back.addEventListener('click', function (e) { e.preventDefault(); panel.style.display = 'none'; });
      panel.appendChild(back);
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function submitForm() {
      var digits = waI.value.replace(/\D/g, '');
      if (!nameI.value.trim()) { errP.textContent = 'Your name is required.'; errP.style.display = 'block'; return; }
      if (digits.length < 10 || digits.length > 15 || digits[0] === '0') { errP.textContent = 'Valid WhatsApp number with country code required.'; errP.style.display = 'block'; return; }
      errP.style.display = 'none';
      var payload = {
        name: nameI.value.trim(),
        whatsapp: waI.value.trim(),
        email: emI.value.trim() || 'Not provided',
        report_requested: activeReport ? activeReport.title : 'Unknown',
        capital_range: capS.value || 'Not said',
        timeline: timS.value || 'Not said',
        source: "Investor's Desk (site)",
        _subject: "Desk request: " + (activeReport ? activeReport.title : 'Unknown')
      };
      try {
        fetch('https://formspree.io/f/xkokazvz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function () {});
      } catch (e) { /* never block the success state */ }
      panel.style.display = 'none';
      ok.innerHTML = '';
      ok.appendChild(el('h3', 'font-size:18px;color:' + TEAL + ';margin-bottom:10px;font-family:"Space Grotesk",sans-serif;', null, 'REQUEST RECEIVED'));
      ok.appendChild(el('p', 'color:rgba(90,102,98,0.85);font-size:14px;line-height:1.65;font-family:Inter,sans-serif;', null, 'I review every submission personally. The full PDF lands on your WhatsApp within 24 hours. If it does not arrive, message me directly:'));
      var wa = el('a', 'display:inline-block;margin-top:12px;font-size:15px;color:' + TEAL + ';text-decoration:none;font-family:"Space Grotesk",sans-serif;font-weight:600;', null, WA_DISPLAY);
      wa.href = 'https://wa.me/971585899112'; wa.target = '_blank'; wa.rel = 'noopener';
      ok.appendChild(wa);
      ok.style.display = 'block';
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    DESK_REPORTS.forEach(function (r) {
      var card = el('div', 'background:#FFFDF8;border:1px solid rgba(15,107,98,0.12);border-top:2px solid ' + TEAL + ';border-radius:6px;padding:24px 22px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.25s ease,border-color 0.25s ease;', null, null);
      var top = el('div', null, null, null);
      top.appendChild(el('span', 'font-size:10px;letter-spacing:0.18em;color:#B08D4A;font-family:"Space Grotesk",sans-serif;font-weight:600;', null, r.tag));
      top.appendChild(el('h3', 'font-size:15px;color:' + SLATE + ';margin:10px 0 8px;line-height:1.35;font-family:"Space Grotesk",sans-serif;', null, r.title));
      top.appendChild(el('p', 'font-size:12.5px;color:rgba(90,102,98,0.8);line-height:1.6;font-family:Inter,sans-serif;', null, r.line));
      card.appendChild(top);
      card.appendChild(el('span', 'font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:' + TEAL + ';margin-top:16px;font-family:"Space Grotesk",sans-serif;font-weight:600;', null, 'Request full PDF \u2192'));
      card.addEventListener('mouseenter', function () { card.style.transform = 'translateY(-3px)'; card.style.borderColor = 'rgba(15,107,98,0.4)'; });
      card.addEventListener('mouseleave', function () { card.style.transform = 'translateY(0)'; card.style.borderColor = 'rgba(15,107,98,0.12)'; });
      card.addEventListener('click', function () { showForm(r, card); });
      grid.appendChild(card);
    });

    return sec;
  }

  function deskInit() {
    if (window.__mrlcDeskDone) return true;
    var blog = document.getElementById('blog');
    if (!blog || !blog.parentNode) return false;
    var magnet = document.getElementById('lead-magnet');
    var desk = buildDesk();
    desk.id = 'blog';
    blog.id = 'blog-legacy';
    blog.style.display = 'none';
    blog.parentNode.insertBefore(desk, blog);
    if (magnet) { magnet.id = 'lead-magnet-legacy'; magnet.style.display = 'none'; }
    /* footer socials */
    var footer = document.querySelector('footer') || document.querySelector('[class*="footer" i]');
    if (footer && !document.getElementById('mrlc-footer-socials')) {
      var box = el('div', 'text-align:center;padding:24px 16px 8px;', null, null);
      box.id = 'mrlc-footer-socials';
      box.appendChild(el('p', 'font-size:10px;letter-spacing:0.2em;color:rgba(125,138,134,0.7);margin-bottom:14px;font-family:"Space Grotesk",sans-serif;', null, '@MRLIVINGCAPITAL, EVERYWHERE'));
      box.appendChild(socialRow(''));
      footer.appendChild(box);
    }
    window.__mrlcDeskDone = true;
    return true;
  }

  function deskStart() {
    var tries = 0;
    var iv = setInterval(function () { if (deskInit() || ++tries > 30) clearInterval(iv); }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  globeInit();
  deskStart();
})();
