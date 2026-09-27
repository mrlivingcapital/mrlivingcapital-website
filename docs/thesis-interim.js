/* MRLC thesis bridge + copy sweep: INTERIM deploy mechanism (2026-09-27, v3.4)
   Purpose: ship unified-messaging copy (hero line, 4-pillar strip, em-dash
   purge, founder narrative corrections) WITHOUT a bundle rebuild, because
   the authenticated channels available right now cannot transport a 309 KB bundle
   (handover token expired 2026-09-27; MCP OAuth has inline-content limits).

   Blocks:
   1. Hero sub-line swap + logo sizing
   2. Thesis strip injection (self-disabling if React #thesis exists)
   3. COPY SWEEP: targeted text replacements (em-dash purge per principal
      order 2026-09-27; finance narrative removed; emirates stat reframed)
      applied to current text nodes AND future DOM mutations (accordions).
   4. REAL GLOBE: country-outline three.js globe replaces CSS sphere
      (three + topojson-client + world-atlas from CDN, graceful fallback).

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

  /* ============ 4. REAL GLOBE (country outlines, replaces CSS sphere) ============ */
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function upgradeGlobe() {
    if (window.__mrlcGlobeDone) return true;
    var holder = document.querySelector('div[style*="clamp(350px, 50vh, 480px)"]');
    if (!holder || !window.THREE || !window.topojson) return false;
    try {
      var T = window.THREE, R = 110;
      var toVec = function (lng, lat, r) {
        var phi = (90 - lat) * Math.PI / 180, theta = (lng + 180) * Math.PI / 180;
        return new T.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
      };
      var scene = new T.Scene();
      var camera = new T.PerspectiveCamera(38, 1, 1, 1200);
      camera.position.z = 330;
      var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      var world = new T.Group();
      scene.add(world);
      world.add(new T.Mesh(new T.SphereGeometry(R, 72, 72),
        new T.MeshPhongMaterial({ color: 0xF6F1E7, transparent: true, opacity: 0.96, shininess: 6 })));
      scene.add(new T.AmbientLight(0xffffff, 0.85));
      var keyL = new T.DirectionalLight(0xd9cdb8, 0.7); keyL.position.set(-220, 140, 260); scene.add(keyL);
      var fillL = new T.DirectionalLight(0x57a99f, 0.25); fillL.position.set(200, -80, -160); scene.add(fillL);
      scene.add(new T.Mesh(new T.SphereGeometry(R * 1.18, 72, 72), new T.ShaderMaterial({
        vertexShader: 'varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: 'varying vec3 vNormal; void main(){ float i = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2); gl_FragColor = vec4(0.34, 0.66, 0.62, 1.0) * i; }',
        blending: T.AdditiveBlending, side: T.BackSide, transparent: true, depthWrite: false
      })));
      fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
        .then(function (r) { return r.json(); })
        .then(function (topology) {
          var borders = window.topojson.mesh(topology, topology.objects.countries);
          var pos = [];
          borders.coordinates.forEach(function (line) {
            for (var i = 0; i < line.length - 1; i++) {
              var a = toVec(line[i][0], line[i][1], R + 0.6), b = toVec(line[i + 1][0], line[i + 1][1], R + 0.6);
              pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
            }
          });
          var geo = new T.BufferGeometry();
          geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
          world.add(new T.LineSegments(geo, new T.LineBasicMaterial({ color: 0x0F6B62, transparent: true, opacity: 0.42 })));
        })
        .catch(function () {});
      var markers = [{ lng: 55.27, lat: 25.2 }, { lng: -0.12, lat: 51.5 }, { lng: -79.38, lat: 43.65 }];
      var pulses = [];
      markers.forEach(function (m, idx) {
        var p = toVec(m.lng, m.lat, R + 1.5);
        var dot = new T.Mesh(new T.SphereGeometry(1.7, 12, 12), new T.MeshBasicMaterial({ color: 0x0F6B62 }));
        dot.position.copy(p); world.add(dot);
        var ring = new T.Mesh(new T.RingGeometry(2.2, 2.8, 32),
          new T.MeshBasicMaterial({ color: 0x57A99F, transparent: true, opacity: 0.7, side: T.DoubleSide }));
        ring.position.copy(p); ring.lookAt(p.clone().multiplyScalar(2)); world.add(ring);
        pulses.push({ ring: ring, phase: idx * 0.9 });
      });
      var velY = 0.0016, dragging = false, lastX = 0, lastInteract = 0;
      var elx = renderer.domElement;
      elx.style.cursor = 'grab';
      elx.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; });
      window.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var dx = e.clientX - lastX; lastX = e.clientX;
        world.rotation.y += dx * 0.005; velY = dx * 0.0012; lastInteract = Date.now();
      });
      window.addEventListener('pointerup', function () { dragging = false; lastInteract = Date.now(); });
      var fit = function () {
        var w = holder.clientWidth || 300, h = holder.clientHeight || 420;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      fit();
      if (window.ResizeObserver) { var ro = new ResizeObserver(fit); ro.observe(holder); }
      var t = 0;
      var animate = function () {
        requestAnimationFrame(animate);
        t += 0.016;
        if (!dragging) {
          if (Date.now() - lastInteract > 1800) velY += (0.0016 - velY) * 0.02;
          world.rotation.y += velY;
        }
        pulses.forEach(function (p) {
          var c = (t + p.phase) % 1.6;
          p.ring.scale.setScalar(1 + c * 0.9);
          p.ring.material.opacity = Math.max(0, 0.7 - c * 0.44);
        });
        renderer.render(scene, camera);
      };
      holder.innerHTML = '';
      holder.appendChild(elx);
      animate();
      window.__mrlcGlobeDone = true;
      return true;
    } catch (e) { return false; }
  }

  function globeInit() {
    loadScript('https://unpkg.com/three@0.152.2/build/three.min.js')
      .then(function () { return loadScript('https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js'); })
      .then(function () {
        var tries = 0;
        var iv = setInterval(function () { if (upgradeGlobe() || ++tries > 24) clearInterval(iv); }, 500);
      })
      .catch(function () { /* CDN unreachable: CSS globe stays */ });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  globeInit();
})();
