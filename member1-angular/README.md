# SmartLab AI — AI-Powered Laboratory Equipment Assistant
**Tech Elevate Hackathon 2026**  
**Team:** UNEMPLOYED 004  
**Frontend:** Angular 22 (Standalone Components, TypeScript, SCSS)  
**Backend:** Node.js, Express, Google Gen AI SDK (`@google/genai`)  
**AI Vision Model:** Google Gemini 2.5 Flash / Gemini 1.5 Flash  

---

## 🔬 Overview
**SmartLab AI** is an intelligent science laboratory assistant designed to empower university students, laboratory demonstrators, and researchers.

It provides:
1. **Gemini-Powered Equipment Scanner**: Live camera capture or image upload sent to a dedicated Express backend running the official `@google/genai` SDK. Gemini analyzes apparatus geometry, scale markings, and optical features into structured JSON.
2. **Verified Source-of-Truth Catalog**: Gemini's suggestions are cross-referenced with verified specifications, hazard protocols, operating guides, and common mistakes in our local laboratory catalog. Specifications and safety warnings are never hallucinated.
3. **Acid-Base Titration Guide**: Complete standardisation protocol ($HCl + NaOH$) featuring an interactive safety checklist, 6-step stepper, real-time **Phenolphthalein Endpoint Visualizer** (dynamic pH color simulator), illustrative trial results, and a live **Molarity Calculator** ($C_1 V_1 = C_2 V_2$).
4. **Safety & Equipment Quiz**: 12 multiple-choice challenges with immediate feedback, detailed scientific rationale explanations, and proficiency tracking.
5. **Lab Assistant**: Curated laboratory guidance for meniscus reading, acid spill first aid, tare protocols, and dilution safety rules.
6. **Client-Side Persistence**: Bookmarked favorites, recent scans, and recently viewed apparatus stored in browser `localStorage`.

---

## 🔒 Security Architecture: API Key Protection
- The Google Gemini API key is **exclusively maintained on the Node.js Express backend**.
- It is read via the environment variable `GEMINI_API_KEY` stored in `.env`.
- The `.gitignore` file strictly excludes `.env` and secret environment files so credentials are **never pushed to GitHub or client bundles**.
- Angular proxies `/api` calls directly to the Express backend (`http://localhost:3000`). The frontend never sees or sends the API key.

---

## 🚀 Beginner Quickstart: How to Run Frontend & Backend

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (Node v24 is installed and verified)
- [npm](https://www.npmjs.com/) v9+

---

### Step 1: Configure Your Gemini API Key (Optional but Recommended)
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Or on Windows PowerShell: `Copy-Item .env.example .env`)*
3. Open `.env` and paste your key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   PORT=3000
   ```

> **Note for Beginners:** If you do not have a Gemini API key yet, the application still works! The scanner interface provides a clear notice and lets you test using the **Manual Equipment Selector** or **Catalog Simulation Mode**.

---

### Step 2: Start Both Frontend & Backend Together

Run this single command in the project folder:
```bash
npm run dev
```
*(This automatically runs the Angular frontend on port 4200 and the Express backend on port 3000 concurrently).*

#### Alternatively, start them in two separate terminal windows:
- **Terminal 1 (Backend):**
  ```bash
  npm run server
  ```
  *(Starts Express backend on [http://localhost:3000](http://localhost:3000))*

- **Terminal 2 (Frontend):**
  ```bash
  npm start
  ```
  *(Starts Angular dev server on [http://localhost:4200](http://localhost:4200))*

---

### Step 3: Open in Your Browser
Navigate to:
```
http://localhost:4200/
```

---

## 🧪 Testing the Gemini Equipment Scanner

1. Go to **AI Scanner** (`http://localhost:4200/scanner`).
2. **Using Camera or Upload:**
   - Click **Start Camera** and capture an apparatus, OR
   - Click **Upload Image** to choose any laboratory photo.
3. **What happens under the hood:**
   - The image is sent to `POST /api/identify-equipment`.
   - The backend validates image MIME type (JPEG/PNG/WebP) and checks size limits (&le;10MB).
   - The backend invokes `@google/genai` (`gemini-2.5-flash`), enforcing structured JSON output (`equipmentName`, `alternativeNames`, `visualDescription`, `uncertaintyNote`).
   - The backend matches the apparatus name against our 12 verified catalog items (`server/catalog-matcher.js`).
   - Angular displays Gemini's visual physical description alongside the verified specifications, instructions, and safety warnings from the catalog.
   - If the image is blurry or ambiguous, an **Uncertainty Alert** is shown.
4. **Using the Manual Selector:**
   - Choose any apparatus from the dropdown or quick chips and click **Simulate Analysis For Selected Item** to inspect its full dossier.

---

## 📁 Project Architecture & Files

```text
smartlab-ai/
├── server/
│   ├── index.js                     # Express server & Gemini Vision API handler (@google/genai)
│   └── catalog-matcher.js           # Source-of-truth equipment matcher & aliases
│
├── .env.example                     # Environment template for GEMINI_API_KEY
├── proxy.conf.json                  # Angular dev-server proxy configuration (/api -> :3000)
├── .gitignore                       # Explicitly ignores .env, *.env, dist, and build outputs
│
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── scanner.model.ts     # GeminiVisionOutput, ScanResult, and CameraState
│   │   ├── data/
│   │   │   └── equipment.data.ts    # Verified catalog for 12 apparatus (specs, precautions, mistakes)
│   │   ├── services/
│   │   │   ├── scanner.service.ts   # Calls /api/identify-equipment and matches catalog dossiers
│   │   │   ├── equipment.service.ts # Equipment search and filtering
│   │   │   └── storage.service.ts   # LocalStorage persistence for favorites and history
│   │   └── pages/
│   │       ├── dashboard/           # Main dashboard with live stats and safety tips
│   │       ├── scanner/             # Live camera, upload, Gemini result, and manual selector
│   │       ├── library/             # Searchable equipment library with multi-tab modal dossiers
│   │       ├── experiment/          # Titration guide, checklist, and pH endpoint simulator
│   │       ├── quiz/                # 12-question lab safety quiz with instant explanations
│   │       └── assistant/           # Conversational assistant with prompt chips
```
