/**
 * ChemVision — Animated Midnight Molecular Lab Background
 * 
 * Features:
 * 1. Deep Midnight Navy (#07111F) with visible deep-blue (#102747) and indigo (#6366F1) atmospheric gradients.
 * 2. Large, prominent chemistry molecular structures:
 *    - Hexagonal Carbon-Ring Systems (Benzene with inner delocalized aromatic ring and attached functional groups).
 *    - Fused Polycyclic Aromatic Rings (Bicyclic/Naphthalene structures).
 *    - Branched Tetrahedral Atom Clusters with glowing coordination bonds.
 *    - Dipolar/Bent Molecules (Water/Methane geometry).
 * 3. Smooth continuous animation:
 *    - Rotation around individual centers with varying speeds and directions (20s–60s cycles).
 *    - Micro-drift across the canvas margins and empty spaces.
 *    - Soft breathing atom glows and traveling light pulses along bonds.
 * 4. Ambient depth particles with strictly ~5% opacity.
 * 5. Retina / HiDPI support, responsive scaling, visibility pause, and prefers-reduced-motion support.
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
    this.animationFrameId = null;
    this.isRunning = false;
    this.lastTime = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Color definitions
    this.palette = {
      midnight: '#07111F',
      deepBlue: '#102747',
      electricCyan: '#35D9F2',
      brightTeal: '#20C9B0',
      softIceBlue: '#A5F3FC',
      indigo: '#6366F1',
      cyanRgba: (a) => `rgba(53, 217, 242, ${a})`,
      tealRgba: (a) => `rgba(32, 201, 176, ${a})`,
      iceRgba: (a) => `rgba(165, 243, 252, ${a})`,
      deepBlueRgba: (a) => `rgba(16, 39, 71, ${a})`,
      indigoRgba: (a) => `rgba(99, 102, 241, ${a})`,
    };

    this.structures = [];
    this.networkNodes = [];
    this.ambientParticles = [];
    this.pulses = [];

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.resize();
    this.createScene();
    this.setupListeners();

    if (this.reducedMotion) {
      this.drawFrame(0);
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

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  createScene() {
    const isMobile = this.width < 768;
    this.structures = [];

    // --- 1. Large Hexagonal Carbon-Ring Structures ---
    // Strategic positioning: corners, margins, and side spaces so they frame the UI prominently
    const hexConfigs = isMobile
      ? [
          { xRatio: 0.15, yRatio: 0.18, radius: 46, rotSpeed: 0.0035, dir: 1, type: 'benzene', functional: 1 },
          { xRatio: 0.82, yRatio: 0.45, radius: 52, rotSpeed: -0.0028, dir: -1, type: 'benzene', functional: 2 },
          { xRatio: 0.20, yRatio: 0.85, radius: 42, rotSpeed: 0.0025, dir: 1, type: 'cluster', branches: 4 },
        ]
      : [
          // Top-Left Large Benzene with attached functional group
          { xRatio: 0.08, yRatio: 0.16, radius: 68, rotSpeed: 0.0028, dir: 1, type: 'benzene', functional: 2 },
          // Top-Right Fused Polycyclic (Naphthalene bicyclic system)
          { xRatio: 0.88, yRatio: 0.20, radius: 64, rotSpeed: -0.0022, dir: -1, type: 'fused', functional: 1 },
          // Bottom-Right Large Hexagonal Ring with delocalized aromatic center
          { xRatio: 0.90, yRatio: 0.78, radius: 76, rotSpeed: 0.0020, dir: 1, type: 'benzene', functional: 2 },
          // Bottom-Left Fused Bicyclic Structure
          { xRatio: 0.10, yRatio: 0.82, radius: 58, rotSpeed: -0.0030, dir: -1, type: 'fused', functional: 1 },
          // Mid-Right Branched Tetrahedral Cluster
          { xRatio: 0.94, yRatio: 0.50, radius: 50, rotSpeed: 0.0032, dir: 1, type: 'cluster', branches: 4 },
          // Mid-Left Coordination Center
          { xRatio: 0.05, yRatio: 0.52, radius: 46, rotSpeed: -0.0026, dir: -1, type: 'cluster', branches: 3 },
        ];

    for (const cfg of hexConfigs) {
      this.structures.push({
        x: cfg.xRatio * this.width,
        y: cfg.yRatio * this.height,
        initialX: cfg.xRatio * this.width,
        initialY: cfg.yRatio * this.height,
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

    // --- 2. Floating Molecular Network (Connecting Nodes) ---
    const nodeCount = isMobile ? 16 : 32;
    this.networkNodes = [];
    for (let i = 0; i < nodeCount; i++) {
      this.networkNodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: 1.5 + Math.random() * 1.2,
        colorType: Math.random() > 0.4 ? 'cyan' : 'teal',
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });
    }

    // --- 3. Ambient Floating Particles (Strictly 5% Opacity Depth) ---
    const ambientCount = isMobile ? 10 : 22;
    this.ambientParticles = [];
    for (let i = 0; i < ambientCount; i++) {
      this.ambientParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.07,
        radius: 0.8 + Math.random() * 0.8,
        opacity: 0.04 + Math.random() * 0.02, // strictly ~0.04–0.06
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
        this.createScene();
        if (this.reducedMotion) {
          this.drawFrame(0);
        }
      }, 150);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (!this.reducedMotion) {
        this.start();
      }
    });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.stop();
        this.drawFrame(0);
      } else {
        this.start();
      }
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();

    const loop = (timestamp) => {
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
      this.lastTime = timestamp;

      this.update(dt);
      this.drawFrame(dt);

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

  update(dt) {
    // 1. Update large molecular structures
    for (const s of this.structures) {
      // Slow rotation around centroid
      s.angle += s.rotSpeed;
      s.pulsePhase += s.pulseSpeed;

      // Extremely smooth harmonic floating drift
      s.driftPhaseX += s.driftSpeedX;
      s.driftPhaseY += s.driftSpeedY;
      s.x = s.initialX + Math.sin(s.driftPhaseX) * s.driftAmpX;
      s.y = s.initialY + Math.cos(s.driftPhaseY) * s.driftAmpY;
    }

    // 2. Update network nodes
    for (const n of this.networkNodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < -20) n.x = this.width + 20;
      else if (n.x > this.width + 20) n.x = -20;
      if (n.y < -20) n.y = this.height + 20;
      else if (n.y > this.height + 20) n.y = -20;

      n.pulsePhase += n.pulseSpeed;
    }

    // 3. Update ambient 5% particles
    for (const p of this.ambientParticles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      else if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      else if (p.y > this.height) p.y = 0;
    }

    // 4. Update travelling light pulses along bonds
    for (let i = this.pulses.length - 1; i >= 0; i--) {
      const pulse = this.pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        this.pulses.splice(i, 1);
      }
    }

    // Occasionally spawn light pulses on molecular bonds
    if (this.pulses.length < 4 && Math.random() < 0.015 && this.structures.length > 0) {
      const parentStruct = this.structures[Math.floor(Math.random() * this.structures.length)];
      this.pulses.push({
        structure: parentStruct,
        edgeIndex: Math.floor(Math.random() * 6),
        progress: 0,
        speed: 0.012 + Math.random() * 0.01,
        color: Math.random() > 0.5 ? this.palette.electricCyan : this.palette.brightTeal,
      });
    }
  }

  drawFrame() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // --- Base Layer: Midnight Navy #07111F ---
    ctx.fillStyle = this.palette.midnight;
    ctx.fillRect(0, 0, w, h);

    // --- Atmospheric Depth Gradients (Visible Deep-Blue & Indigo) ---
    // Top-Left deep blue atmospheric glow
    const gradTL = ctx.createRadialGradient(w * 0.12, h * 0.18, 20, w * 0.12, h * 0.18, Math.max(w, h) * 0.55);
    gradTL.addColorStop(0, this.palette.deepBlueRgba(0.85));
    gradTL.addColorStop(0.5, this.palette.deepBlueRgba(0.35));
    gradTL.addColorStop(1, 'transparent');
    ctx.fillStyle = gradTL;
    ctx.fillRect(0, 0, w, h);

    // Bottom-Right indigo/teal atmospheric laboratory aura
    const gradBR = ctx.createRadialGradient(w * 0.88, h * 0.80, 40, w * 0.88, h * 0.80, Math.max(w, h) * 0.50);
    gradBR.addColorStop(0, this.palette.indigoRgba(0.18));
    gradBR.addColorStop(0.4, this.palette.tealRgba(0.10));
    gradBR.addColorStop(1, 'transparent');
    ctx.fillStyle = gradBR;
    ctx.fillRect(0, 0, w, h);

    // Center subtle vignette
    const gradCenter = ctx.createRadialGradient(w * 0.5, h * 0.5, 50, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
    gradCenter.addColorStop(0, 'rgba(16, 39, 71, 0.20)');
    gradCenter.addColorStop(1, 'transparent');
    ctx.fillStyle = gradCenter;
    ctx.fillRect(0, 0, w, h);

    // --- Layer 1: Ambient Floating Particles (Strictly 5% Opacity Depth) ---
    for (const p of this.ambientParticles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 243, 252, ${p.opacity})`;
      ctx.fill();
    }

    // --- Layer 2: Delicate Background Molecular Network ---
    const maxDist = w < 768 ? 95 : 125;
    ctx.lineWidth = 0.8;
    for (let i = 0; i < this.networkNodes.length; i++) {
      const na = this.networkNodes[i];
      for (let j = i + 1; j < this.networkNodes.length; j++) {
        const nb = this.networkNodes[j];
        const dx = na.x - nb.x;
        const dy = na.y - nb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = this.palette.cyanRgba(alpha);
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.stroke();
        }
      }
    }

    for (const n of this.networkNodes) {
      const pulse = Math.sin(n.pulsePhase) * 0.15;
      const alpha = Math.max(0.18, Math.min(0.55, 0.32 + pulse));
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.colorType === 'cyan' ? this.palette.cyanRgba(alpha) : this.palette.tealRgba(alpha);
      ctx.fill();
    }

    // --- Layer 3: Prominent Large Chemistry Molecular Structures ---
    for (const s of this.structures) {
      if (s.type === 'benzene') {
        this.drawBenzeneStructure(s);
      } else if (s.type === 'fused') {
        this.drawFusedBicyclicStructure(s);
      } else if (s.type === 'cluster') {
        this.drawTetrahedralCluster(s);
      }
    }

    // --- Layer 4: Travelling Light Pulses along Bonds ---
    for (const pulse of this.pulses) {
      this.drawTravelingPulse(pulse);
    }
  }

  /**
   * Draws a large hexagonal aromatic carbon ring (Benzene structure)
   * with inner delocalized aromatic circle/alternating double bonds
   * and attached functional groups.
   */
  drawBenzeneStructure(s) {
    const ctx = this.ctx;
    const R = s.radius;
    const vertices = [];

    // Compute 6 vertices
    for (let i = 0; i < 6; i++) {
      const angle = s.angle + (i * Math.PI) / 3;
      vertices.push({
        x: s.x + Math.cos(angle) * R,
        y: s.y + Math.sin(angle) * R,
      });
    }

    // 1. Ambient soft cyan/teal halo behind molecule
    const haloGrad = ctx.createRadialGradient(s.x, s.y, R * 0.3, s.x, s.y, R * 1.55);
    haloGrad.addColorStop(0, this.palette.cyanRgba(0.14));
    haloGrad.addColorStop(0.6, this.palette.tealRgba(0.06));
    haloGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(s.x, s.y, R * 1.55, 0, Math.PI * 2);
    ctx.fill();

    // 2. Outer Hexagonal Carbon Bonds
    ctx.beginPath();
    ctx.strokeStyle = this.palette.cyanRgba(0.42);
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      ctx.moveTo(vertices[i].x, vertices[i].y);
      ctx.lineTo(vertices[next].x, vertices[next].y);
    }
    ctx.stroke();

    // 3. Inner Delocalized Aromatic Circle (Chemistry Resonance representation)
    ctx.beginPath();
    ctx.strokeStyle = this.palette.tealRgba(0.28);
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 5]);
    ctx.arc(s.x, s.y, R * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // 4. Functional Groups (e.g. -CH3, -OH attached outer atoms)
    if (s.functional > 0) {
      for (let f = 0; f < s.functional; f++) {
        const vIdx = f * 3; // vertices 0 and 3
        const v = vertices[vIdx];
        const outAngle = s.angle + (vIdx * Math.PI) / 3;
        const armLength = R * 0.45;
        const outerX = v.x + Math.cos(outAngle) * armLength;
        const outerY = v.y + Math.sin(outAngle) * armLength;

        // Functional bond
        ctx.beginPath();
        ctx.strokeStyle = this.palette.tealRgba(0.45);
        ctx.lineWidth = 1.5;
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();

        // Terminal functional atom
        ctx.beginPath();
        ctx.arc(outerX, outerY, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = this.palette.softIceBlue;
        ctx.shadowColor = this.palette.electricCyan;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // 5. Vertices: Glowing Carbon Atoms
    for (let i = 0; i < 6; i++) {
      const v = vertices[i];
      const atomPulse = Math.sin(s.pulsePhase + (i * Math.PI) / 3) * 0.18;
      const alpha = Math.max(0.45, Math.min(0.95, 0.65 + atomPulse));

      ctx.beginPath();
      ctx.arc(v.x, v.y, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? this.palette.cyanRgba(alpha) : this.palette.tealRgba(alpha);
      ctx.shadowColor = this.palette.electricCyan;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draws a large Fused Bicyclic Polycyclic Aromatic Ring System (Naphthalene)
   * with shared carbon-carbon bond and outer atoms.
   */
  drawFusedBicyclicStructure(s) {
    const ctx = this.ctx;
    const R = s.radius;
    const cos30 = Math.cos(Math.PI / 6);
    const dCenter = R * cos30 * 1.85;

    // Centroids of Ring 1 and Ring 2
    const c1x = s.x - Math.cos(s.angle) * (dCenter / 2);
    const c1y = s.y - Math.sin(s.angle) * (dCenter / 2);
    const c2x = s.x + Math.cos(s.angle) * (dCenter / 2);
    const c2y = s.y + Math.sin(s.angle) * (dCenter / 2);

    // Halo around fused system
    const halo = ctx.createRadialGradient(s.x, s.y, R * 0.4, s.x, s.y, R * 2.1);
    halo.addColorStop(0, this.palette.indigoRgba(0.12));
    halo.addColorStop(0.5, this.palette.tealRgba(0.06));
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(s.x, s.y, R * 2.1, 0, Math.PI * 2);
    ctx.fill();

    // Helper to compute vertices of a hexagon
    const getHexVertices = (cx, cy) => {
      const v = [];
      for (let i = 0; i < 6; i++) {
        const a = s.angle + (i * Math.PI) / 3;
        v.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
      }
      return v;
    };

    const v1 = getHexVertices(c1x, c1y);
    const v2 = getHexVertices(c2x, c2y);

    // Draw Ring 1 bonds
    ctx.beginPath();
    ctx.strokeStyle = this.palette.cyanRgba(0.38);
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      ctx.moveTo(v1[i].x, v1[i].y);
      ctx.lineTo(v1[next].x, v1[next].y);
    }
    // Draw Ring 2 bonds
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      ctx.moveTo(v2[i].x, v2[i].y);
      ctx.lineTo(v2[next].x, v2[next].y);
    }
    ctx.stroke();

    // Internal delocalized resonance rings for both fused hexagons
    ctx.beginPath();
    ctx.strokeStyle = this.palette.tealRgba(0.24);
    ctx.lineWidth = 1.0;
    ctx.setLineDash([4, 4]);
    ctx.arc(c1x, c1y, R * 0.58, 0, Math.PI * 2);
    ctx.arc(c2x, c2y, R * 0.58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw atoms on all ring vertices
    const allVertices = [...v1, ...v2];
    for (let i = 0; i < allVertices.length; i++) {
      const v = allVertices[i];
      const pulse = Math.sin(s.pulsePhase + i * 0.5) * 0.15;
      const alpha = Math.max(0.40, Math.min(0.90, 0.60 + pulse));

      ctx.beginPath();
      ctx.arc(v.x, v.y, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? this.palette.cyanRgba(alpha) : this.palette.iceRgba(alpha);
      ctx.shadowColor = this.palette.brightTeal;
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draws a Branched Tetrahedral Molecular Cluster (Coordination geometry)
   */
  drawTetrahedralCluster(s) {
    const ctx = this.ctx;
    const R = s.radius;
    const branches = s.branches || 4;

    // Ambient halo
    const halo = ctx.createRadialGradient(s.x, s.y, 5, s.x, s.y, R * 1.4);
    halo.addColorStop(0, this.palette.tealRgba(0.12));
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(s.x, s.y, R * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Central Coordination Atom (Large, prominent)
    ctx.beginPath();
    ctx.arc(s.x, s.y, 6.2, 0, Math.PI * 2);
    ctx.fillStyle = this.palette.brightTeal;
    ctx.shadowColor = this.palette.brightTeal;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Outer ligand atoms
    for (let i = 0; i < branches; i++) {
      const branchAngle = s.angle + (i * Math.PI * 2) / branches;
      const armLength = R * (0.85 + (i % 2) * 0.25);
      const bx = s.x + Math.cos(branchAngle) * armLength;
      const by = s.y + Math.sin(branchAngle) * armLength;

      // Coordinate Bond
      ctx.beginPath();
      ctx.strokeStyle = this.palette.cyanRgba(0.38);
      ctx.lineWidth = 1.4;
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(bx, by);
      ctx.stroke();

      // Peripheral Ligand Atom
      ctx.beginPath();
      ctx.arc(bx, by, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? this.palette.electricCyan : this.palette.softIceBlue;
      ctx.shadowColor = this.palette.electricCyan;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draws soft light pulses travelling along molecular bonds
   */
  drawTravelingPulse(pulse) {
    const s = pulse.structure;
    if (!s) return;
    const ctx = this.ctx;
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
    ctx.fillStyle = `rgba(53, 217, 242, ${alpha})`;
    ctx.shadowColor = this.palette.electricCyan;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}
