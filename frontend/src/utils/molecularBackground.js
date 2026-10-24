/**
 * ChemVision — Molecular Network & Ambient Background Animation
 * 
 * Features:
 * 1. Deep Midnight Navy canvas background (#07111F).
 * 2. Subtle molecular network with cyan (#35D9F2) and teal (#20C9B0) atom nodes and razor-thin bonds.
 * 3. Occasional soft light pulses travelling along molecular bonds.
 * 4. Ambient floating particles at ~5% opacity (barely noticeable scientific depth).
 * 5. Retina / HiDPI crisp rendering, responsive node counts, and prefers-reduced-motion respect.
 * 6. Auto-pauses on document visibility hidden to eliminate idle GPU/CPU usage.
 */

export class MolecularBackground {
  constructor(canvasId = 'molecular-bg-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.className = 'molecular-bg-canvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.ambientParticles = [];
    this.pulses = [];
    this.animationFrameId = null;
    this.isRunning = false;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Color definitions
    this.colors = {
      bgDark: '#07111F',
      bgGradients: ['#09172b', '#07111F'],
      cyan: 'rgba(53, 217, 242, ', // #35D9F2
      teal: 'rgba(32, 201, 176, ', // #20C9B0
      mutedBlue: 'rgba(56, 189, 248, ',
    };

    // Configuration
    this.config = {
      maxConnectDist: 115,
      atomSpeed: 0.18,
      ambientSpeed: 0.08,
      maxPulses: 3,
    };

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.resize();
    this.createElements();
    this.setupListeners();

    if (this.reducedMotion) {
      this.drawFrame(); // Draw static frame once
    } else {
      this.start();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);

    // Recompute connect distance based on screen density
    this.config.maxConnectDist = this.width < 768 ? 95 : 120;
  }

  createElements() {
    // 1. Molecular network nodes
    // Compute node density: ~1 node per 26,000 px^2, bounded between 24 and 65 nodes
    const area = this.width * this.height;
    const targetNodeCount = Math.max(22, Math.min(65, Math.floor(area / 26000)));

    this.nodes = [];
    for (let i = 0; i < targetNodeCount; i++) {
      const isTeal = Math.random() > 0.55;
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.atomSpeed,
        vy: (Math.random() - 0.5) * this.config.atomSpeed,
        radius: 1.2 + Math.random() * 0.9, // 1.2px - 2.1px
        colorBase: isTeal ? this.colors.teal : this.colors.cyan,
        baseOpacity: 0.22 + Math.random() * 0.18, // 0.22 - 0.40
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      });
    }

    // 2. Secondary ambient floating particles (strictly ~5% opacity, tiny & subtle)
    const ambientCount = Math.max(8, Math.min(18, Math.floor(targetNodeCount * 0.3)));
    this.ambientParticles = [];
    for (let i = 0; i < ambientCount; i++) {
      this.ambientParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.ambientSpeed,
        vy: (Math.random() - 0.5) * this.config.ambientSpeed,
        radius: 0.8 + Math.random() * 0.7, // 0.8px - 1.5px
        opacity: 0.04 + Math.random() * 0.02, // strictly ~0.04 to 0.06 (only 5%)
      });
    }

    this.pulses = [];
  }

  setupListeners() {
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.resize();
        this.createElements();
        if (this.reducedMotion) {
          this.drawFrame();
        }
      }, 150);
    });

    // Pause when tab is not active to save battery and GPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (!this.reducedMotion) {
        this.start();
      }
    });

    // Watch for reduced motion preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.stop();
        this.drawFrame();
      } else {
        this.start();
      }
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      this.update();
      this.drawFrame();
      if (this.isRunning) {
        this.animationFrameId = requestAnimationFrame(loop);
      }
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  update() {
    const w = this.width;
    const h = this.height;

    // Update molecular nodes
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      // Soft boundary wrap
      if (node.x < -20) node.x = w + 20;
      else if (node.x > w + 20) node.x = -20;
      if (node.y < -20) node.y = h + 20;
      else if (node.y > h + 20) node.y = -20;

      node.pulsePhase += node.pulseSpeed;
    }

    // Update ambient faint particles (5% opacity)
    for (let i = 0; i < this.ambientParticles.length; i++) {
      const p = this.ambientParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      else if (p.y > h + 10) p.y = -10;
    }

    // Update travelling light pulses along connections
    this.updatePulses();
  }

  updatePulses() {
    // Progress existing pulses
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        this.pulses.splice(i, 1);
      }
    }

    // Occasionally spawn new pulse along an existing close connection
    if (this.pulses.length < this.config.maxPulses && Math.random() < 0.015) {
      const candidates = [];
      const maxD = this.config.maxConnectDist;

      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const dx = this.nodes[i].x - this.nodes[j].x;
          const dy = this.nodes[i].y - this.nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxD * 0.85) {
            candidates.push({ from: this.nodes[i], to: this.nodes[j], dist });
          }
        }
      }

      if (candidates.length > 0) {
        const choice = candidates[Math.floor(Math.random() * candidates.length)];
        this.pulses.push({
          from: choice.from,
          to: choice.to,
          progress: 0,
          speed: 0.006 + Math.random() * 0.004, // smooth gentle travel
        });
      }
    }
  }

  drawFrame() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. Midnight Navy Background (#07111F) with subtle vignette
    const bgGrad = ctx.createRadialGradient(
      w * 0.5,
      h * 0.4,
      Math.min(w, h) * 0.2,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.85
    );
    bgGrad.addColorStop(0, '#0a1728');
    bgGrad.addColorStop(1, '#07111F');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const maxDist = this.config.maxConnectDist;

    // 2. Molecular network bonds (thin connecting lines)
    ctx.lineWidth = 0.85;
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          // Opacity decreases smoothly as distance increases (max 0.16)
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.strokeStyle = `rgba(53, 217, 242, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // 3. Occasional soft light pulses travelling along bonds
    for (let i = 0; i < this.pulses.length; i++) {
      const pulse = this.pulses[i];
      const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
      const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

      // Pulse particle
      ctx.fillStyle = 'rgba(53, 217, 242, 0.45)';
      ctx.beginPath();
      ctx.arc(px, py, 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow aura
      ctx.fillStyle = 'rgba(32, 201, 176, 0.15)';
      ctx.beginPath();
      ctx.arc(px, py, 3.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Molecular network atom dots
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      // Subtle organic breathing oscillation (±0.05 opacity)
      const op = Math.max(0.12, node.baseOpacity + Math.sin(node.pulsePhase) * 0.06);

      ctx.fillStyle = `${node.colorBase}${op.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Ambient floating particles (strictly ~5% opacity, barely noticeable)
    for (let i = 0; i < this.ambientParticles.length; i++) {
      const p = this.ambientParticles[i];
      ctx.fillStyle = `rgba(53, 217, 242, ${p.opacity.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
