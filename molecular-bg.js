/**
 * ChemVision — Molecular Network & Ambient Background Animation (Vanilla / Standalone)
 * 
 * Main design — Point 1: Midnight Navy Molecular Network (#07111F)
 * - Deep midnight navy background (#07111F).
 * - Molecular network: cyan (#35D9F2) and teal (#20C9B0) atom dots connected by thin bonds.
 * - Slow, smooth movement + soft travelling light pulses along connections.
 * 
 * Secondary hint — Point 4: Ambient floating particles (strictly ~5% opacity)
 * - Faint, tiny particles floating slowly in the background (0.04 - 0.06 opacity).
 * - Minimal count, barely noticeable, non-competing.
 * 
 * Performance & Accessibility:
 * - HTML5 Canvas, 60fps capped, pauses on document.hidden, respects prefers-reduced-motion.
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

    let nodes = [];
    let ambientParticles = [];
    let pulses = [];
    let animationFrameId = null;
    let isRunning = false;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colors = {
      bgDark: '#07111F',
      cyan: 'rgba(53, 217, 242, ', // #35D9F2
      teal: 'rgba(32, 201, 176, ', // #20C9B0
      mutedBlue: 'rgba(56, 189, 248, ',
    };

    const config = {
      maxConnectDist: width < 768 ? 95 : 120,
      atomSpeed: 0.18,
      ambientSpeed: 0.08,
      maxPulses: 3,
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      config.maxConnectDist = width < 768 ? 95 : 120;
    }

    function createElements() {
      const area = width * height;
      const targetNodeCount = Math.max(22, Math.min(65, Math.floor(area / 26000)));

      nodes = [];
      for (let i = 0; i < targetNodeCount; i++) {
        const isTeal = Math.random() > 0.55;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.atomSpeed,
          vy: (Math.random() - 0.5) * config.atomSpeed,
          radius: 1.2 + Math.random() * 0.9,
          colorBase: isTeal ? colors.teal : colors.cyan,
          baseOpacity: 0.22 + Math.random() * 0.18,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.015,
        });
      }

      // Secondary hint — Point 4: Ambient floating particles (only ~5% opacity)
      const ambientCount = Math.max(8, Math.min(18, Math.floor(targetNodeCount * 0.3)));
      ambientParticles = [];
      for (let i = 0; i < ambientCount; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.ambientSpeed,
          vy: (Math.random() - 0.5) * config.ambientSpeed,
          radius: 0.8 + Math.random() * 0.7,
          opacity: 0.04 + Math.random() * 0.02, // strictly ~0.04 to 0.06 (5%)
        });
      }

      pulses = [];
    }

    function maybeSpawnPulse(nodeA, nodeB) {
      if (pulses.length >= config.maxPulses) return;
      if (Math.random() > 0.003) return;

      pulses.push({
        source: nodeA,
        target: nodeB,
        progress: 0,
        speed: 0.007 + Math.random() * 0.006,
        colorBase: Math.random() > 0.5 ? colors.cyan : colors.teal,
      });
    }

    function update() {
      // 1. Update molecular nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < -10) n.x = width + 10;
        else if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        else if (n.y > height + 10) n.y = -10;

        n.pulsePhase += n.pulseSpeed;
      }

      // 2. Update ambient floating particles (5% opacity)
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      // 3. Update travelling pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
        }
      }
    }

    function drawFrame() {
      // Midnight Navy Base
      ctx.fillStyle = colors.bgDark;
      ctx.fillRect(0, 0, width, height);

      // Subtle radial dark gradient for depth
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 20,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, '#0a1728');
      grad.addColorStop(1, '#07111F');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1. Ambient Floating Particles (~5% opacity)
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.mutedBlue + p.opacity + ')';
        ctx.fill();
      }

      // 2. Molecular Connections (Thin Bonds)
      const maxDist = config.maxConnectDist;
      ctx.lineWidth = 0.75;

      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          const dx = na.x - nb.x;
          const dy = na.y - nb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const bondAlpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = colors.cyan + bondAlpha + ')';
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();

            if (!reducedMotion) {
              maybeSpawnPulse(na, nb);
            }
          }
        }
      }

      // 3. Travelling Light Pulses along Bonds
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const px = pulse.source.x + (pulse.target.x - pulse.source.x) * pulse.progress;
        const py = pulse.source.y + (pulse.target.y - pulse.source.y) * pulse.progress;

        const pulseFade = Math.sin(pulse.progress * Math.PI);
        const pulseAlpha = Math.min(0.65, pulseFade * 0.65);

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = pulse.colorBase + pulseAlpha + ')';
        ctx.shadowColor = '#35D9F2';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Molecular Nodes (Cyan & Teal Atoms)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const breathing = Math.sin(n.pulsePhase) * 0.08;
        const nodeAlpha = Math.max(0.12, Math.min(0.6, n.baseOpacity + breathing));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.colorBase + nodeAlpha + ')';
        ctx.fill();
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

    // Event listeners
    let resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createElements();
        if (reducedMotion) drawFrame();
      }, 150);
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stop();
      } else if (!reducedMotion) {
        start();
      }
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
    createElements();
    if (reducedMotion) {
      drawFrame();
    } else {
      start();
    }
  }

  // Auto-init on DOMContentLoaded or immediate if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMolecularBackground();
    });
  } else {
    initMolecularBackground();
  }
})();
