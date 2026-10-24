/**
 * ChemVision — Animated Midnight Molecular Lab Background (Standalone / Vanilla)
 */

(function () {
  'use strict';

  function initMolecularBackground(canvasId = 'molecular-bg-canvas') {
    let canvas = document.getElementById(canvasId);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = canvasId;
      canvas.className = 'molecular-bg-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const palette = {
      midnight: '#07111F',
      deepBlue: '#102747',
      electricCyan: '#35D9F2',
      brightTeal: '#20C9B0',
      softIceBlue: '#A5F3FC',
      indigo: '#6366F1',
      cyanRgba: function (a) { return 'rgba(53, 217, 242, ' + a + ')'; },
      tealRgba: function (a) { return 'rgba(32, 201, 176, ' + a + ')'; },
      iceRgba: function (a) { return 'rgba(165, 243, 252, ' + a + ')'; },
      deepBlueRgba: function (a) { return 'rgba(16, 39, 71, ' + a + ')'; },
      indigoRgba: function (a) { return 'rgba(99, 102, 241, ' + a + ')'; },
    };

    let structures = [];
    let networkNodes = [];
    let ambientParticles = [];
    let pulses = [];
    let animationFrameId = null;
    let isRunning = false;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function createScene() {
      const isMobile = width < 768;
      structures = [];

      const hexConfigs = isMobile
        ? [
            { xRatio: 0.15, yRatio: 0.18, radius: 46, rotSpeed: 0.0035, dir: 1, type: 'benzene', functional: 1 },
            { xRatio: 0.82, yRatio: 0.45, radius: 52, rotSpeed: -0.0028, dir: -1, type: 'benzene', functional: 2 },
            { xRatio: 0.20, yRatio: 0.85, radius: 42, rotSpeed: 0.0025, dir: 1, type: 'cluster', branches: 4 },
          ]
        : [
            { xRatio: 0.08, yRatio: 0.16, radius: 68, rotSpeed: 0.0028, dir: 1, type: 'benzene', functional: 2 },
            { xRatio: 0.88, yRatio: 0.20, radius: 64, rotSpeed: -0.0022, dir: -1, type: 'fused', functional: 1 },
            { xRatio: 0.90, yRatio: 0.78, radius: 76, rotSpeed: 0.0020, dir: 1, type: 'benzene', functional: 2 },
            { xRatio: 0.10, yRatio: 0.82, radius: 58, rotSpeed: -0.0030, dir: -1, type: 'fused', functional: 1 },
            { xRatio: 0.94, yRatio: 0.50, radius: 50, rotSpeed: 0.0032, dir: 1, type: 'cluster', branches: 4 },
            { xRatio: 0.05, yRatio: 0.52, radius: 46, rotSpeed: -0.0026, dir: -1, type: 'cluster', branches: 3 },
          ];

      for (let i = 0; i < hexConfigs.length; i++) {
        const cfg = hexConfigs[i];
        structures.push({
          x: cfg.xRatio * width,
          y: cfg.yRatio * height,
          initialX: cfg.xRatio * width,
          initialY: cfg.yRatio * height,
          radius: cfg.radius,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: cfg.rotSpeed,
          driftPhaseX: Math.random() * Math.PI * 2,
          driftPhaseY: Math.random() * Math.PI * 2,
          driftSpeedX: 0.0006 + Math.random() * 0.0004,
          driftSpeedY: 0.0005 + Math.random() * 0.0004,
          driftAmpX: isMobile ? 12 : 24,
          driftAmpY: isMobile ? 10 : 20,
          type: cfg.type,
          functional: cfg.functional || 0,
          branches: cfg.branches || 3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.015,
        });
      }

      const nodeCount = isMobile ? 16 : 32;
      networkNodes = [];
      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          radius: 1.5 + Math.random() * 1.2,
          colorType: Math.random() > 0.4 ? 'cyan' : 'teal',
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        });
      }

      const ambientCount = isMobile ? 10 : 22;
      ambientParticles = [];
      for (let i = 0; i < ambientCount; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.07,
          vy: (Math.random() - 0.5) * 0.07,
          radius: 0.8 + Math.random() * 0.8,
          opacity: 0.04 + Math.random() * 0.02,
        });
      }

      pulses = [];
    }

    function update() {
      for (let i = 0; i < structures.length; i++) {
        const s = structures[i];
        s.angle += s.rotSpeed;
        s.pulsePhase += s.pulseSpeed;
        s.driftPhaseX += s.driftSpeedX;
        s.driftPhaseY += s.driftSpeedY;
        s.x = s.initialX + Math.sin(s.driftPhaseX) * s.driftAmpX;
        s.y = s.initialY + Math.cos(s.driftPhaseY) * s.driftAmpY;
      }

      for (let i = 0; i < networkNodes.length; i++) {
        const n = networkNodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
        n.pulsePhase += n.pulseSpeed;
      }

      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
        }
      }

      if (pulses.length < 4 && Math.random() < 0.015 && structures.length > 0) {
        const parentStruct = structures[Math.floor(Math.random() * structures.length)];
        pulses.push({
          structure: parentStruct,
          edgeIndex: Math.floor(Math.random() * 6),
          progress: 0,
          speed: 0.012 + Math.random() * 0.01,
          color: Math.random() > 0.5 ? palette.electricCyan : palette.brightTeal,
        });
      }
    }

    function drawBenzene(s) {
      const R = s.radius;
      const vertices = [];
      for (let i = 0; i < 6; i++) {
        const angle = s.angle + (i * Math.PI) / 3;
        vertices.push({
          x: s.x + Math.cos(angle) * R,
          y: s.y + Math.sin(angle) * R,
        });
      }

      const haloGrad = ctx.createRadialGradient(s.x, s.y, R * 0.3, s.x, s.y, R * 1.55);
      haloGrad.addColorStop(0, palette.cyanRgba(0.14));
      haloGrad.addColorStop(0.6, palette.tealRgba(0.06));
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, R * 1.55, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = palette.cyanRgba(0.42);
      ctx.lineWidth = 1.6;
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        ctx.moveTo(vertices[i].x, vertices[i].y);
        ctx.lineTo(vertices[next].x, vertices[next].y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = palette.tealRgba(0.28);
      ctx.lineWidth = 1.2;
      ctx.setLineDash([5, 5]);
      ctx.arc(s.x, s.y, R * 0.62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      if (s.functional > 0) {
        for (let f = 0; f < s.functional; f++) {
          const vIdx = f * 3;
          const v = vertices[vIdx];
          const outAngle = s.angle + (vIdx * Math.PI) / 3;
          const armLength = R * 0.45;
          const outerX = v.x + Math.cos(outAngle) * armLength;
          const outerY = v.y + Math.sin(outAngle) * armLength;

          ctx.beginPath();
          ctx.strokeStyle = palette.tealRgba(0.45);
          ctx.lineWidth = 1.5;
          ctx.moveTo(v.x, v.y);
          ctx.lineTo(outerX, outerY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(outerX, outerY, 4.2, 0, Math.PI * 2);
          ctx.fillStyle = palette.softIceBlue;
          ctx.shadowColor = palette.electricCyan;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (let i = 0; i < 6; i++) {
        const v = vertices[i];
        const atomPulse = Math.sin(s.pulsePhase + (i * Math.PI) / 3) * 0.18;
        const alpha = Math.max(0.45, Math.min(0.95, 0.65 + atomPulse));

        ctx.beginPath();
        ctx.arc(v.x, v.y, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? palette.cyanRgba(alpha) : palette.tealRgba(alpha);
        ctx.shadowColor = palette.electricCyan;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawFused(s) {
      const R = s.radius;
      const cos30 = Math.cos(Math.PI / 6);
      const dCenter = R * cos30 * 1.85;

      const c1x = s.x - Math.cos(s.angle) * (dCenter / 2);
      const c1y = s.y - Math.sin(s.angle) * (dCenter / 2);
      const c2x = s.x + Math.cos(s.angle) * (dCenter / 2);
      const c2y = s.y + Math.sin(s.angle) * (dCenter / 2);

      const halo = ctx.createRadialGradient(s.x, s.y, R * 0.4, s.x, s.y, R * 2.1);
      halo.addColorStop(0, palette.indigoRgba(0.12));
      halo.addColorStop(0.5, palette.tealRgba(0.06));
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(s.x, s.y, R * 2.1, 0, Math.PI * 2);
      ctx.fill();

      const getHex = function (cx, cy) {
        const v = [];
        for (let i = 0; i < 6; i++) {
          const a = s.angle + (i * Math.PI) / 3;
          v.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
        }
        return v;
      };

      const v1 = getHex(c1x, c1y);
      const v2 = getHex(c2x, c2y);

      ctx.beginPath();
      ctx.strokeStyle = palette.cyanRgba(0.38);
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        ctx.moveTo(v1[i].x, v1[i].y);
        ctx.lineTo(v1[next].x, v1[next].y);
      }
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        ctx.moveTo(v2[i].x, v2[i].y);
        ctx.lineTo(v2[next].x, v2[next].y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = palette.tealRgba(0.24);
      ctx.lineWidth = 1.0;
      ctx.setLineDash([4, 4]);
      ctx.arc(c1x, c1y, R * 0.58, 0, Math.PI * 2);
      ctx.arc(c2x, c2y, R * 0.58, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const all = v1.concat(v2);
      for (let i = 0; i < all.length; i++) {
        const v = all[i];
        const pulse = Math.sin(s.pulsePhase + i * 0.5) * 0.15;
        const alpha = Math.max(0.40, Math.min(0.90, 0.60 + pulse));

        ctx.beginPath();
        ctx.arc(v.x, v.y, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? palette.cyanRgba(alpha) : palette.iceRgba(alpha);
        ctx.shadowColor = palette.brightTeal;
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawCluster(s) {
      const R = s.radius;
      const branches = s.branches || 4;

      const halo = ctx.createRadialGradient(s.x, s.y, 5, s.x, s.y, R * 1.4);
      halo.addColorStop(0, palette.tealRgba(0.12));
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(s.x, s.y, R * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(s.x, s.y, 6.2, 0, Math.PI * 2);
      ctx.fillStyle = palette.brightTeal;
      ctx.shadowColor = palette.brightTeal;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = 0; i < branches; i++) {
        const branchAngle = s.angle + (i * Math.PI * 2) / branches;
        const armLength = R * (0.85 + (i % 2) * 0.25);
        const bx = s.x + Math.cos(branchAngle) * armLength;
        const by = s.y + Math.sin(branchAngle) * armLength;

        ctx.beginPath();
        ctx.strokeStyle = palette.cyanRgba(0.38);
        ctx.lineWidth = 1.4;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(bx, by);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bx, by, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? palette.electricCyan : palette.softIceBlue;
        ctx.shadowColor = palette.electricCyan;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawPulse(pulse) {
      const s = pulse.structure;
      if (!s) return;
      const R = s.radius;
      const a1 = s.angle + (pulse.edgeIndex * Math.PI) / 3;
      const a2 = s.angle + (((pulse.edgeIndex + 1) % 6) * Math.PI) / 3;
      const x1 = s.x + Math.cos(a1) * R;
      const y1 = s.y + Math.sin(a1) * R;
      const x2 = s.x + Math.cos(a2) * R;
      const y2 = s.y + Math.sin(a2) * R;

      const px = x1 + (x2 - x1) * pulse.progress;
      const py = y1 + (y2 - y1) * pulse.progress;
      const alpha = Math.sin(pulse.progress * Math.PI) * 0.75;

      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(53, 217, 242, ' + alpha + ')';
      ctx.shadowColor = palette.electricCyan;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawFrame() {
      ctx.fillStyle = palette.midnight;
      ctx.fillRect(0, 0, width, height);

      const gradTL = ctx.createRadialGradient(width * 0.12, height * 0.18, 20, width * 0.12, height * 0.18, Math.max(width, height) * 0.55);
      gradTL.addColorStop(0, palette.deepBlueRgba(0.85));
      gradTL.addColorStop(0.5, palette.deepBlueRgba(0.35));
      gradTL.addColorStop(1, 'transparent');
      ctx.fillStyle = gradTL;
      ctx.fillRect(0, 0, width, height);

      const gradBR = ctx.createRadialGradient(width * 0.88, height * 0.80, 40, width * 0.88, height * 0.80, Math.max(width, height) * 0.50);
      gradBR.addColorStop(0, palette.indigoRgba(0.18));
      gradBR.addColorStop(0.4, palette.tealRgba(0.10));
      gradBR.addColorStop(1, 'transparent');
      ctx.fillStyle = gradBR;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165, 243, 252, ' + p.opacity + ')';
        ctx.fill();
      }

      const maxDist = width < 768 ? 95 : 125;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < networkNodes.length; i++) {
        const na = networkNodes[i];
        for (let j = i + 1; j < networkNodes.length; j++) {
          const nb = networkNodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = palette.cyanRgba(alpha);
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < networkNodes.length; i++) {
        const n = networkNodes[i];
        const pulse = Math.sin(n.pulsePhase) * 0.15;
        const alpha = Math.max(0.18, Math.min(0.55, 0.32 + pulse));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.colorType === 'cyan' ? palette.cyanRgba(alpha) : palette.tealRgba(alpha);
        ctx.fill();
      }

      for (let i = 0; i < structures.length; i++) {
        const s = structures[i];
        if (s.type === 'benzene') drawBenzene(s);
        else if (s.type === 'fused') drawFused(s);
        else if (s.type === 'cluster') drawCluster(s);
      }

      for (let i = 0; i < pulses.length; i++) {
        drawPulse(pulses[i]);
      }
    }

    function start() {
      if (isRunning) return;
      isRunning = true;
      function loop() {
        update();
        drawFrame();
        if (isRunning) {
          animationFrameId = requestAnimationFrame(loop);
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    }

    function stop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    let resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createScene();
        if (reducedMotion) drawFrame();
      }, 150);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else if (!reducedMotion) start();
    });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', function (e) {
      reducedMotion = e.matches;
      if (reducedMotion) {
        stop();
        drawFrame();
      } else {
        start();
      }
    });

    resize();
    createScene();
    if (reducedMotion) {
      drawFrame();
    } else {
      start();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMolecularBackground();
    });
  } else {
    initMolecularBackground();
  }
})();
