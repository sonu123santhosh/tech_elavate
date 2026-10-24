/**
 * High-performance, responsive HTML5 Canvas chart renderer for pH Titration.
 * Features DPI-scaling, gridlines, data points, titration curve, and equivalence point badge.
 */

export class PhChartRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.data = [];
    this.equivalencePoint = null;
    this.showDerivative = false;
    this.derivativeData = [];
  }

  setData(readings, equivalencePoint = null, derivativeData = [], showDerivative = false) {
    this.data = readings || [];
    this.equivalencePoint = equivalencePoint;
    this.derivativeData = derivativeData || [];
    this.showDerivative = showDerivative;
    this.render();
  }

  render() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    if (!canvas || !ctx) return;

    // High DPI scaling
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 600;
    const height = rect.height || 360;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, width, height);

    const padding = { top: 30, right: 35, bottom: 45, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    if (this.data.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No readings to display. Enter data points or load demonstration data.', width / 2, height / 2);
      return;
    }

    // Determine scale bounds
    const maxV = Math.max(30, ...this.data.map((d) => d.volume)) * 1.05;
    const minV = 0;
    const minPh = 0;
    const maxPh = 14;

    const mapX = (v) => padding.left + ((v - minV) / (maxV - minV)) * chartW;
    const mapY = (ph) => padding.top + chartH - ((ph - minPh) / (maxPh - minPh)) * chartH;

    // Draw Grid Lines & Ticks
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // pH grid lines (every 2 pH units)
    for (let ph = 0; ph <= 14; ph += 2) {
      const y = mapY(ph);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();
      ctx.fillText(`${ph}.0`, padding.left - 8, y);
    }

    // Volume grid lines (every 5 mL)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const vStep = maxV > 40 ? 10 : 5;
    for (let v = 0; v <= maxV; v += vStep) {
      const x = mapX(v);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartH);
      ctx.stroke();
      ctx.fillText(`${v}`, x, padding.top + chartH + 8);
    }

    // Axis Labels
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    // X Axis Label
    ctx.fillText('Volume of 0.1 M NaOH Added (mL)', padding.left + chartW / 2, height - 12);
    // Y Axis Label
    ctx.save();
    ctx.translate(16, padding.top + chartH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Measured pH', 0, 0);
    ctx.restore();

    // Neutral pH line guide (pH = 7.00)
    const neutralY = mapY(7.0);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, neutralY);
    ctx.lineTo(padding.left + chartW, neutralY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw pH Titration Curve Line
    ctx.strokeStyle = '#38bdf8'; // sky-400
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < this.data.length; i++) {
      const x = mapX(this.data[i].volume);
      const y = mapY(this.data[i].ph);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw First Derivative Overlay (if enabled)
    if (this.showDerivative && this.derivativeData.length > 0) {
      const maxD1 = Math.max(...this.derivativeData.map((d) => d.d1), 1);
      const mapYDeriv = (d1) => padding.top + chartH - (d1 / maxD1) * chartH;

      ctx.strokeStyle = '#f59e0b'; // amber-500
      ctx.lineWidth = 1.8;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i < this.derivativeData.length; i++) {
        const x = mapX(this.derivativeData[i].midVolume);
        const y = mapYDeriv(this.derivativeData[i].d1);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Raw Reading Scatter Points
    for (const pt of this.data) {
      const x = mapX(pt.volume);
      const y = mapY(pt.ph);
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Draw Equivalence Point Indicator (if present)
    if (this.equivalencePoint && this.equivalencePoint.volumeMl !== null) {
      const eqX = mapX(this.equivalencePoint.volumeMl);
      const eqY = mapY(this.equivalencePoint.ph);

      // Vertical marker line
      ctx.strokeStyle = '#10b981'; // emerald-500
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(eqX, padding.top);
      ctx.lineTo(eqX, padding.top + chartH);
      ctx.stroke();

      // Horizontal marker line
      ctx.beginPath();
      ctx.moveTo(padding.left, eqY);
      ctx.lineTo(padding.left + chartW, eqY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glow circle
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.beginPath();
      ctx.arc(eqX, eqY, 12, 0, Math.PI * 2);
      ctx.fill();

      // Equivalence Point dot
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label callout badge
      const badgeText = `V_eq: ${this.equivalencePoint.volumeMl} mL (pH ${this.equivalencePoint.ph})`;
      ctx.font = '600 11px Inter, sans-serif';
      const textMetrics = ctx.measureText(badgeText);
      const badgeW = textMetrics.width + 16;
      const badgeH = 24;

      let badgeX = eqX + 10;
      let badgeY = eqY - 28;
      if (badgeX + badgeW > width - padding.right) {
        badgeX = eqX - badgeW - 10;
      }
      if (badgeY < padding.top) {
        badgeY = eqY + 12;
      }

      ctx.fillStyle = '#064e3b'; // emerald-900
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#6ee7b7'; // emerald-300
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, badgeX + 8, badgeY + badgeH / 2);
    }
  }
}
