/**
 * High-performance, responsive HTML5 Canvas chart renderer for Conductometric Titration.
 * Plots scatter data points, dual linear regression trendlines, and intersection point.
 */

export class ConductometricChartRenderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.data = [];
    this.unit = 'µS/cm';
    this.regressionResult = null;
  }

  setData(readings, regressionResult = null, unit = 'µS/cm') {
    this.data = readings || [];
    this.regressionResult = regressionResult;
    this.unit = unit;
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

    const padding = { top: 30, right: 35, bottom: 45, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    if (this.data.length === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No conductivity readings. Enter points or load demonstration data.', width / 2, height / 2);
      return;
    }

    // Determine scale bounds
    const maxV = Math.max(30, ...this.data.map((d) => d.volume)) * 1.05;
    const minV = 0;
    const maxCond = Math.max(100, ...this.data.map((d) => d.conductivity)) * 1.1;
    const minCond = 0;

    const mapX = (v) => padding.left + ((v - minV) / (maxV - minV)) * chartW;
    const mapY = (c) => padding.top + chartH - ((c - minCond) / (maxCond - minCond)) * chartH;

    // Draw Grid Lines & Ticks
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // Conductivity grid lines (6 vertical intervals)
    const condStep = Math.round(maxCond / 5);
    for (let c = 0; c <= maxCond; c += condStep) {
      const y = mapY(c);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();
      ctx.fillText(`${c}`, padding.left - 8, y);
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
    ctx.fillText(`Conductivity (${this.unit})`, 0, 0);
    ctx.restore();

    // Draw Fitted Trendlines if available
    if (this.regressionResult && this.regressionResult.isValid) {
      const { branch1, branch2, equivalencePoint } = this.regressionResult;
      const eqVol = equivalencePoint.volumeMl;

      // Draw Trendline 1 (Line 1: 0 to EqVol + margin)
      ctx.strokeStyle = '#38bdf8'; // sky-400
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      const x1Start = 0;
      const y1Start = branch1.slope * x1Start + branch1.intercept;
      const x1End = Math.min(maxV, eqVol + 2);
      const y1End = branch1.slope * x1End + branch1.intercept;
      ctx.moveTo(mapX(x1Start), mapY(y1Start));
      ctx.lineTo(mapX(x1End), mapY(y1End));
      ctx.stroke();

      // Draw Trendline 2 (Line 2: EqVol - margin to maxV)
      ctx.strokeStyle = '#a855f7'; // purple-500
      ctx.beginPath();
      const x2Start = Math.max(0, eqVol - 2);
      const y2Start = branch2.slope * x2Start + branch2.intercept;
      const x2End = maxV;
      const y2End = branch2.slope * x2End + branch2.intercept;
      ctx.moveTo(mapX(x2Start), mapY(y2Start));
      ctx.lineTo(mapX(x2End), mapY(y2End));
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Intersection Point
      const eqX = mapX(eqVol);
      const eqY = mapY(equivalencePoint.conductivity);

      // Vertical guide line down to x axis
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(eqX, padding.top);
      ctx.lineTo(eqX, padding.top + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glow halo
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.beginPath();
      ctx.arc(eqX, eqY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Intersection center marker
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(eqX, eqY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Badge
      const badgeText = `V_eq: ${eqVol} mL (${equivalencePoint.conductivity} ${this.unit})`;
      ctx.font = '600 11px Inter, sans-serif';
      const textMetrics = ctx.measureText(badgeText);
      const badgeW = textMetrics.width + 16;
      const badgeH = 24;

      let badgeX = eqX + 12;
      let badgeY = eqY - 28;
      if (badgeX + badgeW > width - padding.right) {
        badgeX = eqX - badgeW - 12;
      }
      if (badgeY < padding.top) {
        badgeY = eqY + 12;
      }

      ctx.fillStyle = '#064e3b';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#6ee7b7';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, badgeX + 8, badgeY + badgeH / 2);
    }

    // Draw Raw Reading Data Points
    for (const pt of this.data) {
      const x = mapX(pt.volume);
      const y = mapY(pt.conductivity);
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
}
