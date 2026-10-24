/**
 * Laboratory Apparatus & Setup SVG Diagram Generator
 * Provides scientific vector schematics for each of the 15 virtual experiments.
 */

export function renderExperimentDiagram(diagramType, title = '') {
  switch (diagramType) {
    case 'titration-setup':
    case 'complexometric-titration':
    case 'argentometric-titration':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(56, 189, 248, 0.15)"/>
              <stop offset="50%" stop-color="rgba(255, 255, 255, 0.35)"/>
              <stop offset="100%" stop-color="rgba(56, 189, 248, 0.1)"/>
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="rgba(56, 189, 248, 0.6)"/>
              <stop offset="100%" stop-color="rgba(2, 132, 199, 0.8)"/>
            </linearGradient>
          </defs>

          <!-- Retort Stand Base & Rod -->
          <rect x="70" y="325" width="260" height="14" rx="3" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
          <line x1="120" y1="325" x2="120" y2="40" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>

          <!-- Bosshead & Clamp -->
          <rect x="114" y="115" width="22" height="18" rx="2" fill="#475569" stroke="#64748b"/>
          <rect x="136" y="120" width="54" height="8" rx="2" fill="#64748b"/>
          <path d="M190 110 C 195 110, 205 116, 205 124 C 205 132, 195 138, 190 138" fill="none" stroke="#94a3b8" stroke-width="4"/>

          <!-- Burette Tube -->
          <rect x="195" y="50" width="20" height="190" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
          <!-- Burette Liquid Column -->
          <rect x="197" y="90" width="16" height="148" fill="url(#liquidGrad)" opacity="0.8"/>
          <!-- Burette Graduation Marks -->
          <g stroke="#38bdf8" stroke-width="1" opacity="0.7">
            <line x1="205" y1="70" x2="215" y2="70"/>
            <line x1="208" y1="80" x2="215" y2="80"/>
            <line x1="205" y1="90" x2="215" y2="90"/>
            <line x1="208" y1="100" x2="215" y2="100"/>
            <line x1="205" y1="110" x2="215" y2="110"/>
            <line x1="208" y1="120" x2="215" y2="120"/>
            <line x1="205" y1="130" x2="215" y2="130"/>
            <line x1="208" y1="140" x2="215" y2="140"/>
            <line x1="205" y1="150" x2="215" y2="150"/>
            <line x1="208" y1="160" x2="215" y2="160"/>
            <line x1="205" y1="170" x2="215" y2="170"/>
            <line x1="208" y1="180" x2="215" y2="180"/>
            <line x1="205" y1="190" x2="215" y2="190"/>
          </g>

          <!-- Burette Stopcock & Jet Tip -->
          <polygon points="195,240 215,240 207,250 203,250" fill="#38bdf8" opacity="0.4"/>
          <!-- Stopcock Valve -->
          <rect x="199" y="250" width="12" height="14" fill="#0284c7" rx="2"/>
          <line x1="192" y1="257" x2="218" y2="257" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
          <!-- Jet Nozzle -->
          <polygon points="203,264 207,264 206,275 204,275" fill="#38bdf8"/>
          <!-- Liquid Droplet -->
          <circle cx="205" cy="281" r="2.5" fill="#38bdf8"/>

          <!-- White Tile -->
          <rect x="155" y="318" width="100" height="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" rx="1"/>

          <!-- Conical Flask (Erlenmeyer) -->
          <path d="M197 286 L197 292 L165 318 L245 318 L213 292 L213 286 Z" fill="url(#glassGrad)" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Analyte Liquid in Flask -->
          <path d="M172 318 L180 305 L230 305 L238 318 Z" fill="rgba(244, 63, 94, 0.45)" stroke="rgba(244, 63, 94, 0.7)" stroke-width="1"/>

          <!-- Scientific Labels -->
          <text x="225" y="80" fill="#94a3b8" font-size="11" font-family="sans-serif">Burette with Titrant</text>
          <text x="225" y="258" fill="#94a3b8" font-size="11" font-family="sans-serif">Stopcock Valve</text>
          <text x="255" y="312" fill="#94a3b8" font-size="11" font-family="sans-serif">Conical Flask (Analyte)</text>
          <text x="75" y="310" fill="#94a3b8" font-size="11" font-family="sans-serif">White Tile</text>
        </svg>
      `;

    case 'ph-meter-setup':
    case 'ph-metric-setup':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <!-- Digital pH Console -->
          <rect x="50" y="70" width="150" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <rect x="65" y="85" width="120" height="50" rx="4" fill="#021426" stroke="#00f0ff" stroke-width="1.5"/>
          <!-- Digital Readout -->
          <text x="75" y="122" fill="#00f0ff" font-family="monospace" font-size="28" font-weight="bold">7.00</text>
          <text x="145" y="105" fill="#38bdf8" font-family="sans-serif" font-size="10">pH @ 25°C</text>
          <!-- Buttons -->
          <circle cx="80" cy="155" r="7" fill="#334155" stroke="#64748b"/>
          <text x="74" y="158" fill="#94a3b8" font-size="8">CAL</text>
          <circle cx="110" cy="155" r="7" fill="#334155" stroke="#64748b"/>
          <text x="104" y="158" fill="#94a3b8" font-size="8">MODE</text>
          <circle cx="140" cy="155" r="7" fill="#0284c7" stroke="#38bdf8"/>
          <text x="133" y="158" fill="#fff" font-size="8">READ</text>

          <!-- Flexible Coaxial Cable -->
          <path d="M185 125 C 230 125, 230 180, 265 180" fill="none" stroke="#64748b" stroke-width="4"/>

          <!-- Electrode Stand Clamp -->
          <line x1="330" y1="320" x2="330" y2="80" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <rect x="300" y="320" width="60" height="12" rx="2" fill="#334155"/>
          <rect x="255" y="172" width="80" height="12" rx="2" fill="#475569"/>

          <!-- Combined Glass Electrode Body -->
          <rect x="260" y="140" width="12" height="130" fill="rgba(255, 255, 255, 0.2)" stroke="#38bdf8" stroke-width="1.5" rx="3"/>
          <!-- Internal Reference Element Wire -->
          <line x1="266" y1="145" x2="266" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Glass Sensing Bulb -->
          <circle cx="266" cy="272" r="7" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" stroke-width="1.5"/>

          <!-- Beaker with Sample -->
          <rect x="235" y="240" width="65" height="75" rx="2" fill="rgba(30, 41, 59, 0.3)" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Solution Fill -->
          <rect x="237" y="255" width="61" height="58" fill="rgba(56, 189, 248, 0.35)" rx="1"/>

          <!-- Magnetic Stirrer Base -->
          <rect x="220" y="315" width="95" height="18" rx="3" fill="#1e293b" stroke="#475569"/>
          <!-- Stir Bar inside beaker -->
          <rect x="258" y="307" width="16" height="4" rx="2" fill="#ffffff" stroke="#94a3b8"/>

          <!-- Labels -->
          <text x="50" y="55" fill="#38bdf8" font-size="12" font-family="sans-serif">Digital pH Console</text>
          <text x="210" y="160" fill="#94a3b8" font-size="11" font-family="sans-serif">Glass Electrode</text>
          <text x="140" y="270" fill="#94a3b8" font-size="11" font-family="sans-serif">Analyte Beaker</text>
          <text x="140" y="330" fill="#94a3b8" font-size="11" font-family="sans-serif">Magnetic Stirrer</text>
        </svg>
      `;

    case 'conductometry-setup':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <!-- Digital Conductivity Meter -->
          <rect x="40" y="80" width="160" height="110" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
          <rect x="55" y="95" width="130" height="45" rx="4" fill="#032115" stroke="#10b981" stroke-width="1.5"/>
          <text x="65" y="128" fill="#10b981" font-family="monospace" font-size="24" font-weight="bold">18.40</text>
          <text x="145" y="125" fill="#34d399" font-family="sans-serif" font-size="11">mS</text>

          <!-- Lead Wire -->
          <path d="M190 135 C 230 135, 230 190, 275 190" fill="none" stroke="#64748b" stroke-width="4"/>

          <!-- Dip Cell Body -->
          <rect x="270" y="160" width="18" height="115" rx="3" fill="rgba(255, 255, 255, 0.2)" stroke="#10b981" stroke-width="1.5"/>
          <!-- Platinized Platinum Electrodes -->
          <rect x="268" y="260" width="6" height="12" fill="#0f172a" stroke="#10b981"/>
          <rect x="284" y="260" width="6" height="12" fill="#0f172a" stroke="#10b981"/>

          <!-- Beaker -->
          <rect x="245" y="235" width="70" height="85" rx="3" fill="rgba(30, 41, 59, 0.3)" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="247" y="250" width="66" height="68" fill="rgba(16, 185, 129, 0.25)" rx="1"/>

          <!-- Stirrer Base -->
          <rect x="230" y="320" width="100" height="18" rx="3" fill="#1e293b" stroke="#475569"/>
          <rect x="272" y="312" width="16" height="4" rx="2" fill="#fff"/>

          <!-- Labels -->
          <text x="40" y="65" fill="#10b981" font-size="12" font-family="sans-serif">Conductivity Bridge</text>
          <text x="210" y="150" fill="#94a3b8" font-size="11" font-family="sans-serif">Conductivity Dip Cell</text>
          <text x="150" y="265" fill="#94a3b8" font-size="11" font-family="sans-serif">Pt Electrodes</text>
        </svg>
      `;

    case 'ostwald-viscometer':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <!-- Constant Temp Water Bath Vessel -->
          <rect x="70" y="60" width="260" height="270" rx="8" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.5"/>
          <text x="85" y="85" fill="#38bdf8" font-size="11" font-family="sans-serif">Water Bath (25.0°C)</text>

          <!-- Ostwald U-Tube Glass Viscometer -->
          <!-- Narrow Capillary Arm (Left) -->
          <rect x="150" y="100" width="14" height="40" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Upper Timing Bulb A -->
          <ellipse cx="157" cy="155" rx="14" ry="18" fill="rgba(255,255,255,0.2)" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Upper Mark A -->
          <line x1="148" y1="135" x2="166" y2="135" stroke="#f43f5e" stroke-width="2"/>
          <text x="125" y="138" fill="#f43f5e" font-size="10" font-weight="bold">Mark A</text>
          <!-- Lower Mark B -->
          <line x1="148" y1="175" x2="166" y2="175" stroke="#f43f5e" stroke-width="2"/>
          <text x="125" y="178" fill="#f43f5e" font-size="10" font-weight="bold">Mark B</text>
          <!-- Fine Capillary Bore -->
          <line x1="157" y1="175" x2="157" y2="270" stroke="#38bdf8" stroke-width="3"/>

          <!-- Bottom U-bend -->
          <path d="M157 270 C 157 305, 235 305, 235 270" fill="none" stroke="#38bdf8" stroke-width="6"/>

          <!-- Broad Reservoir Arm (Right) -->
          <rect x="228" y="100" width="16" height="120" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.5"/>
          <!-- Lower Reservoir Bulb C -->
          <ellipse cx="236" cy="240" rx="20" ry="26" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="262" y="245" fill="#38bdf8" font-size="10">Reservoir Bulb C</text>

          <!-- Stopwatch Widget -->
          <circle cx="340" cy="110" r="24" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
          <text x="325" y="115" fill="#f59e0b" font-family="monospace" font-size="11" font-weight="bold">62.3s</text>
          <text x="322" y="145" fill="#94a3b8" font-size="9">Stopwatch</text>
        </svg>
      `;

    case 'spectrophotometer-optics':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <!-- Light Source Lamp -->
          <circle cx="50" cy="180" r="16" fill="#f59e0b" opacity="0.8"/>
          <circle cx="50" cy="180" r="24" fill="none" stroke="#f59e0b" stroke-dasharray="3,3"/>
          <text x="25" y="225" fill="#f59e0b" font-size="10">Tungsten Lamp</text>

          <!-- White Light Beam -->
          <polygon points="66,176 130,165 130,195 66,184" fill="rgba(254, 240, 138, 0.35)"/>

          <!-- Monochromator / Diffraction Grating -->
          <polygon points="130,150 155,180 130,210" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
          <text x="110" y="235" fill="#94a3b8" font-size="10">Monochromator (λ)</text>

          <!-- Monochromatic Light Beam (620 nm Blue) -->
          <rect x="155" y="177" width="60" height="6" fill="#00f0ff" opacity="0.9"/>
          <text x="165" y="170" fill="#00f0ff" font-size="9">λ = 620 nm (I₀)</text>

          <!-- Sample Cuvette (1.00 cm) -->
          <rect x="215" y="140" width="35" height="80" rx="2" fill="rgba(2, 132, 199, 0.45)" stroke="#38bdf8" stroke-width="2"/>
          <line x1="215" y1="225" x2="250" y2="225" stroke="#fff" stroke-width="1.5"/>
          <text x="218" y="238" fill="#fff" font-size="9">l = 1 cm</text>
          <text x="212" y="130" fill="#38bdf8" font-size="10">Cuvette (c)</text>

          <!-- Attenuated Transmitted Beam (I) -->
          <rect x="250" y="178" width="55" height="4" fill="#00f0ff" opacity="0.45"/>
          <text x="260" y="172" fill="#00f0ff" opacity="0.7" font-size="9">Transmitted (I)</text>

          <!-- Photocell Detector -->
          <rect x="305" y="155" width="20" height="50" rx="3" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
          <text x="295" y="225" fill="#a855f7" font-size="10">Photocell</text>

          <!-- Digital Readout Display -->
          <rect x="270" y="55" width="110" height="45" rx="5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="280" y="85" fill="#38bdf8" font-family="monospace" font-size="20">A = 0.270</text>
        </svg>
      `;

    case 'distillation-apparatus':
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <!-- Heating Mantle & Boiling Flask -->
          <rect x="50" y="230" width="80" height="60" rx="8" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
          <text x="60" y="310" fill="#f59e0b" font-size="10">Heating Mantle</text>
          <!-- Round Bottom Flask -->
          <circle cx="90" cy="230" r="30" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5"/>
          <rect x="85" y="160" width="10" height="50" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5"/>

          <!-- Three-way Still Head & Thermometer -->
          <polygon points="85,160 95,160 95,130 85,130" fill="#38bdf8" opacity="0.3"/>
          <line x1="90" y1="90" x2="90" y2="155" stroke="#f43f5e" stroke-width="2.5"/>
          <circle cx="90" cy="155" r="3" fill="#f43f5e"/>
          <text x="35" y="125" fill="#f43f5e" font-size="9">Thermometer (78°C)</text>

          <!-- Slanted Liebig Condenser Tube -->
          <line x1="95" y1="150" x2="280" y2="245" stroke="#38bdf8" stroke-width="4"/>
          <!-- Cooling Jacket -->
          <line x1="120" y1="162" x2="260" y2="235" stroke="rgba(56, 189, 248, 0.35)" stroke-width="18" stroke-linecap="round"/>
          <text x="175" y="175" fill="#38bdf8" font-size="10">Liebig Condenser</text>

          <!-- Water Inlet / Outlet -->
          <text x="255" y="270" fill="#00f0ff" font-size="9">← Water In</text>
          <text x="100" y="195" fill="#00f0ff" font-size="9">Water Out →</text>

          <!-- Receiving Flask -->
          <path d="M290 270 L280 310 L320 310 L310 270 Z" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="275" y="330" fill="#94a3b8" font-size="10">Ethanol Distillate</text>
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 400 360" class="experiment-svg-schematic" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="50" width="300" height="260" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="#38bdf8" stroke-width="1.5"/>
          <circle cx="200" cy="160" r="50" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" stroke-width="2"/>
          <text x="180" y="175" font-size="40">⚗️</text>
          <text x="200" y="245" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">${title || 'Laboratory Experiment Setup'}</text>
          <text x="200" y="265" text-anchor="middle" fill="#94a3b8" font-size="11">Standard Analytical Chemistry Procedure</text>
        </svg>
      `;
  }
}
