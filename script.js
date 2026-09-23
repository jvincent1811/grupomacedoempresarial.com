/* ============================================================
   GRUPO MACEDO EMPRESARIAL — Próximamente
   1) Preloader coreografiado  2) Campo de partículas ambiente
   3) Parallax sutil del lockup con el puntero
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1) Preloader ---------- */

  var preloader = document.getElementById("preloader");
  var PRELOADER_MS = 2600; // palabras (0.25–1.65s) + línea (hasta 2.5s)

  function entrar() {
    if (preloader) preloader.classList.add("is-done");
    document.body.classList.add("is-ready");
  }

  if (reduceMotion) {
    document.body.classList.add("is-ready");
  } else {
    window.setTimeout(entrar, PRELOADER_MS);
  }

  /* ---------- 2) Campo de partículas ---------- */

  var canvas = document.getElementById("campo");
  if (!canvas || reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var puntos = [];
  var W = 0, H = 0, dpr = 1;
  var DENSIDAD = 14000;        // un punto por cada ~14k px²
  var ENLACE = 120;            // distancia máxima de línea (px)
  var raton = { x: -9999, y: -9999 };

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sembrar() {
    puntos = [];
    var n = Math.max(36, Math.min(110, Math.floor((W * H) / DENSIDAD)));
    for (var i = 0; i < n; i++) {
      puntos.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.4,
        o: 0.1 + Math.random() * 0.4,   // opacidad base 0.1–0.5
        f: 0.4 + Math.random() * 0.8,   // frecuencia de pulso
        t: Math.random() * Math.PI * 2  // fase
      });
    }
  }

  function paso(ts) {
    ctx.clearRect(0, 0, W, H);
    var seg = ts / 1000;

    // Enlaces
    for (var i = 0; i < puntos.length; i++) {
      var a = puntos[i];
      for (var j = i + 1; j < puntos.length; j++) {
        var b = puntos[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < ENLACE * ENLACE) {
          var alfa = (1 - Math.sqrt(d2) / ENLACE) * 0.16;
          ctx.strokeStyle = "rgba(175,145,95," + alfa.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Puntos con pulso suave + deriva
    for (var k = 0; k < puntos.length; k++) {
      var p = puntos[k];
      p.x += p.vx;
      p.y += p.vy;

      // leve atracción/repulsión del puntero
      var mdx = p.x - raton.x, mdy = p.y - raton.y;
      var md2 = mdx * mdx + mdy * mdy;
      if (md2 < 160 * 160 && md2 > 0.01) {
        var md = Math.sqrt(md2);
        var f = (1 - md / 160) * 0.35;
        p.x += (mdx / md) * f;
        p.y += (mdy / md) * f;
      }

      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

      var pulso = p.o * (0.72 + 0.28 * Math.sin(seg * p.f + p.t));
      ctx.fillStyle = "rgba(22,38,56," + pulso.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(paso);
  }

  function iniciar() {
    medir();
    sembrar();
    requestAnimationFrame(paso);
  }

  var temporizador;
  window.addEventListener("resize", function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { medir(); sembrar(); }, 180);
  });

  window.addEventListener("pointermove", function (e) {
    raton.x = e.clientX;
    raton.y = e.clientY;
    objetivo.x = (e.clientX / W - 0.5);
    objetivo.y = (e.clientY / H - 0.5);
  });
  window.addEventListener("pointerleave", function () {
    raton.x = -9999; raton.y = -9999;
    objetivo.x = 0; objetivo.y = 0;
  });

  /* ---------- 3) Parallax sutil del lockup ---------- */

  var lockup = document.getElementById("lockup");
  var objetivo = { x: 0, y: 0 };
  var actual = { x: 0, y: 0 };

  function parallax() {
    actual.x += (objetivo.x - actual.x) * 0.045;
    actual.y += (objetivo.y - actual.y) * 0.045;
    if (lockup) {
      lockup.style.transform =
        "translate3d(" + (actual.x * 14).toFixed(2) + "px," + (actual.y * 10).toFixed(2) + "px,0)";
    }
    requestAnimationFrame(parallax);
  }

  if (window.matchMedia("(pointer: fine)").matches) {
    requestAnimationFrame(parallax);
  }

  iniciar();
})();
