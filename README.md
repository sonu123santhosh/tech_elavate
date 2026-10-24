# 🧪 AI-Powered Smart Lab Equipment Assistant
## Team UNEMPLOYED 004 • Tech Elevate
### Person 4 Module: Titration Experiments & AI Lab Assistant

---

## 📌 Executive Summary

This repository contains the standalone, isolated modules implemented by **Person 4** of **Team UNEMPLOYED 004** for the Tech Elevate competition.

### Core Responsibilities Delivered:
1. **pH-Metric Titration Experiment**: Interactive educational simulation for titrating acetic acid ($CH_3COOH$) with sodium hydroxide ($NaOH$) using a digital pH meter, featuring step-by-step procedures, live data-entry table with add/edit/delete capabilities, high-resolution canvas chart, and numerical equivalence point estimation using first ($\Delta \text{pH}/\Delta V$) and second ($\Delta^2 \text{pH}/\Delta V^2$) derivatives.
2. **Conductometric Titration Experiment**: Educational conductometry simulation for titrating acetic acid with sodium hydroxide, featuring unit selection ($\mu S/\text{cm}$ or $\text{mS/cm}$), live data table, trendline plotting, and equivalence point determination via the intersection of two linear regression branches ($V_{eq} = (c_2 - c_1) / (m_1 - m_2)$).
3. **AI Lab Assistant**: Production-ready AI chatbox powered by the official Google Gen AI JavaScript SDK (`@google/genai`) and Express backend, equipped with rate limiting, safety guards, beginner-friendly system prompts, and responsive chat UI with suggested prompt chips.

---

## 📂 Repository & Module Structure

```
added features/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── gemini.js            # Official @google/genai SDK initialization
│   │   ├── controllers/
│   │   │   └── chatController.js    # Payload validation, safety checks & error handling
│   │   ├── middleware/
│   │   │   └── rateLimiter.js       # Express rate limiter (20 req/min)
│   │   ├── prompts/
│   │   │   └── systemInstructions.js# Pedagogical & conservative chemical safety prompt
│   │   ├── routes/
│   │   │   └── chatRoutes.js        # GET /api/health and POST /api/chat
│   │   └── server.js                # Express app entry, CORS, and request logging
│   ├── .env.example                 # Safe environment variable template
│   ├── .gitignore                   # Ignores .env and node_modules
│   ├── package.json                 # Backend dependencies & scripts
│   └── README.md                    # Backend documentation
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg              # Laboratory flask vector icon
│   ├── src/
│   │   ├── features/
│   │   │   ├── ph-titration/
│   │   │   │   ├── PhTitrationView.js         # Interactive experiment view & wizard
│   │   │   │   ├── phCalculations.js          # Numerical derivative equivalence math
│   │   │   │   ├── phData.js                  # Theory, instruments, hazards, demo data
│   │   │   │   └── phChartRenderer.js         # High DPI Canvas chart renderer
│   │   │   ├── conductometric-titration/
│   │   │   │   ├── ConductometricView.js      # Interactive conductometry view & wizard
│   │   │   │   ├── conductometricCalculations.js # Piecewise dual regression intersection
│   │   │   │   ├── conductometricData.js      # Theory, instruments, hazards, demo data
│   │   │   │   └── conductometricChartRenderer.js # Canvas chart with trendlines
│   │   │   └── ai-assistant/
│   │   │       ├── ChatAssistantView.js       # Real-time chat bubbles, input, prompt chips
│   │   │       └── chatService.js             # Client API service for /api/chat
│   │   ├── styles/
│   │   │   ├── main.css             # Glassmorphic design tokens & responsive layout
│   │   │   ├── experiments.css      # Steppers, tables, charts, results cards
│   │   │   └── chat.css             # Chat bubbles, markdown formatting, typing bounce
│   │   ├── utils/
│   │   │   └── mathUtils.js         # Linear regression, line intersection, sanitizers
│   │   └── main.js                  # Single Page Application tab orchestrator
│   ├── index.html                   # HTML entry with SEO tags & Inter font
│   ├── package.json                 # Frontend dependencies (Vite)
│   ├── vite.config.js               # Dev server configuration with backend proxy
│   └── README.md
│
├── tests/
│   ├── backendApi.test.js           # Integration tests for /api/health and /api/chat
│   ├── conductometricCalculations.test.js # Tests for regression, slopes, and intersection
│   └── phCalculations.test.js       # Tests for 1st & 2nd derivative equivalence point
│
├── .gitignore                       # Root git protection
├── package.json                     # Root npm script runner
└── README.md                        # Master documentation
```

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20.18.0 installed)
- **npm**: v9.0.0 or higher (v10.8.2 installed)

### 2. Installation
Run npm install in both backend and frontend (or from root):
```bash
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
To enable the AI Lab Assistant:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Copy the template to `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Set your API key in `backend/.env`:
   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=your_actual_gemini_api_key
   ```
> **Security Notice**: `.env` is listed in `.gitignore` and is never committed to Git. If no API key is set, the health check and chat endpoint safely return an informative 503 error with key setup instructions.

### 4. Running Locally
Start both backend and frontend servers:

```bash
# Terminal 1: Start Backend API (Port 5000)
npm run dev:backend

# Terminal 2: Start Frontend Vite Dev Server (Port 5173)
npm run dev:frontend
```

Open your browser at:
```
http://localhost:5173/
```

### 5. Running Automated Tests
Run the comprehensive 13-test automated test suite:
```bash
npm test
```
All 13 unit and integration tests validate:
- Statistical linear regression formulas ($m, c, R^2, RSS$)
- Line intersection mathematical solver
- First ($\Delta \text{pH}/\Delta V$) and second derivative ($\Delta^2 \text{pH}/\Delta V^2$) calculations
- Equivalence point volume and pH interpolation
- Data validation (strictly ascending volumes, non-negative inputs, pH bounds 0–14)
- Insufficient data rejection (<3 readings for pH, <4 readings for conductometry)
- Backend health check status and JSON schema
- Backend chat payload validation, length limiting, and 503 missing key handling.

---

## 🔬 Feature Details

### 1. pH-Metric Titration ($CH_3COOH + NaOH$)
- **Reaction**: $CH_3COOH + NaOH \rightarrow CH_3COONa + H_2O$
- **Equivalence Point Determination**:
  - Computes $\Delta \text{pH} / \Delta V$ for each consecutive addition.
  - Computes second derivative $\Delta^2 \text{pH} / \Delta V^2$.
  - Solves for the zero-crossing of the second derivative near the maximum first derivative rate to obtain $V_{eq}$.
  - Calculates acetic acid molarity: $M_{acid} = (M_{base} \times V_{eq}) / V_{acid}$.
  - Displays basic equivalence pH (>7, typically ~8.7) caused by the hydrolysis of acetate ions ($CH_3COO^- + H_2O \rightleftharpoons CH_3COOH + OH^-$).
- **Safety**: Includes supervisor reminder banner, reagent hazard badges, and personal protective equipment (PPE) guidance.
- **Demonstration Data**: Clear warning badge stating that demo data is for educational demonstration only and not actual physical measurement.

### 2. Conductometric Titration ($CH_3COOH + NaOH$)
- **Theory**: Weak acid acetic acid has low starting conductivity. Formation of sodium acetate keeps the pre-equivalence curve shallow due to common ion effect suppressing acetic acid dissociation. Post-equivalence addition introduces excess highly mobile $OH^-$ ions (limiting ionic conductivity $\lambda^\circ \approx 198 \ \Omega^{-1}\text{cm}^2\text{eq}^{-1}$), producing a steep linear ascent.
- **Trendline Intersection Method**:
  - Optimizes partition point $k$ using piecewise dual linear regression minimizing total residual sum of squares ($RSS_1 + RSS_2$).
  - Solves intersection: $V_{eq} = (c_2 - c_1) / (m_1 - m_2)$.
  - Calculates $G_{eq} = m_1 V_{eq} + c_1$ with chosen units ($\mu S/\text{cm}$ or $\text{mS/cm}$).
  - Clearly distinguishes the calculated mathematical estimate from raw measured sensor points.

### 3. AI Lab Assistant
- **Framework**: Express.js with `@google/genai` (v2.31.0).
- **Model**: `gemini-2.5-flash` with system prompt tuned for undergraduate lab guidance.
- **Frontend Features**:
  - Live status indicator (Online / Missing Key / Server Offline).
  - Quick suggested question chips.
  - Formatted markdown response rendering (bolding, chemical equations, bulleted procedures, code blocks).
  - Responsive chat bubble UI with auto-scrolling and typing bounce animation.
  - Shift+Enter multi-line support.

---

## 🤝 Person 5 Integration Handoff

Person 5 (responsible for overall system integration, database, and navigation) can integrate Person 4's features without friction:

1. **Self-Contained Views**: Each feature class (`PhTitrationView`, `ConductometricView`, `ChatAssistantView`) exports standard lifecycle methods:
   - `mount()`: Renders into any target DOM container.
   - `destroy()`: Cleans up listeners and DOM elements.
2. **Exportable Data Contract**: Titration sessions can be exported directly for storage in the team's database:
   ```json
   {
     "experimentType": "ph-metric",
     "analyte": "Acetic Acid (CH3COOH)",
     "titrant": "Sodium Hydroxide (NaOH)",
     "analyteVolumeMl": 20.0,
     "titrantMolarity": 0.1,
     "readings": [
       { "volume": 0.0, "value": 2.88, "unit": "pH" },
       { "volume": 20.0, "value": 8.72, "unit": "pH" }
     ],
     "equivalencePoint": {
       "volumeMl": 20.0,
       "estimatedValue": 8.72,
       "method": "Second Derivative Zero-Crossing"
     },
     "isDemonstrationData": false
   }
   ```
3. **Backend Mounting**: To mount under an existing main team Express app:
   ```javascript
   import chatRoutes from './backend/src/routes/chatRoutes.js';
   app.use('/api', chatRoutes);
   ```
