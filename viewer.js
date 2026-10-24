/**
 * Chemistry Lab Equipment Database Viewer
 * Supports 62 tools, category & PDF group filtering, instant search,
 * AI scanner simulation contract, and comprehensive detail view.
 */

// Global State
let equipmentDatabase = [];
let equipmentIndex = [];
let recognitionContract = null;
let currentFilterCategory = "All";
let currentFilterGroup = "All";
let searchQuery = "";

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  initUI();
  handleRouting();
});

// Load Database
async function loadData() {
  // First check if data is already loaded via equipment-data.js (standalone/offline)
  if (window.LAB_EQUIPMENT_DB && Array.isArray(window.LAB_EQUIPMENT_DB)) {
    equipmentDatabase = window.LAB_EQUIPMENT_DB;
    equipmentIndex = window.LAB_EQUIPMENT_INDEX || [];
  } else {
    try {
      const resp = await fetch("./equipment-db/equipment.json");
      if (resp.ok) {
        equipmentDatabase = await resp.json();
      }
    } catch (e) {
      console.warn("Could not fetch equipment.json directly:", e);
    }
  }

  // Fetch recognition contract if available
  try {
    const resp = await fetch("./equipment-db/recognition-map.json");
    if (resp.ok) {
      recognitionContract = await resp.json();
    }
  } catch (e) {
    console.warn("Recognition contract fetch skipped:", e);
  }
}

/**
 * Public API required by specification
 * Returns equipment object if found, or null
 */
window.getEquipmentById = function(id) {
  if (!id || !equipmentDatabase) return null;
  const canonicalId = String(id).trim().toLowerCase();
  return equipmentDatabase.find(item => item.id === canonicalId) || null;
};

// UI Initialization
function initUI() {
  renderCategoryPills();
  renderGroupPills();
  renderCards();

  // Search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCards();
    });
  }

  // Scanner Simulator
  const btnScan = document.getElementById("btn-simulate-scan");
  const inputScan = document.getElementById("input-scanner-class");
  if (btnScan && inputScan) {
    btnScan.addEventListener("click", () => {
      simulateAiScan(inputScan.value.trim());
    });
    inputScan.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        simulateAiScan(inputScan.value.trim());
      }
    });
  }

  // Close Detail View Modal
  const btnClose = document.getElementById("detail-close");
  const modal = document.getElementById("detail-modal");
  if (btnClose && modal) {
    btnClose.addEventListener("click", closeDetailView);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDetailView();
    });
  }

  window.addEventListener("hashchange", handleRouting);
}

// Category Pills
function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  const categories = [
    "All",
    "Glassware",
    "Basic Tools and Consumables",
    "Heating Equipment",
    "Support Equipment",
    "Separation Equipment",
    "Measuring Instruments",
    "Safety Equipment",
    "Cleaning and Storage",
    "pH and Analytical Instruments",
    "Observation and Optical Instruments"
  ];

  container.innerHTML = categories.map(cat => `
    <button class="filter-pill ${cat === currentFilterCategory ? 'active' : ''}" 
            onclick="setCategoryFilter('${escapeQuotes(cat)}')">
      ${cat}
    </button>
  `).join("");
}

// PDF Group Pills
function renderGroupPills() {
  const container = document.getElementById("group-pills");
  if (!container) return;

  const groups = [
    "All",
    "Essential glassware and basics",
    "Heating, handling and separation",
    "Safety, measurement and accessories",
    "pH measurement instruments",
    "Added beyond PDF"
  ];

  container.innerHTML = groups.map(grp => `
    <button class="filter-pill ${grp === currentFilterGroup ? 'active' : ''}" 
            onclick="setGroupFilter('${escapeQuotes(grp)}')">
      ${grp === "All" ? "All Groups" : grp}
    </button>
  `).join("");
}

function setCategoryFilter(category) {
  currentFilterCategory = category;
  renderCategoryPills();
  renderCards();
}

function setGroupFilter(group) {
  currentFilterGroup = group;
  renderGroupPills();
  renderCards();
}

// Filter and Render Cards
function renderCards() {
  const container = document.getElementById("equipment-grid");
  const countBadge = document.getElementById("active-count-badge");
  if (!container) return;

  const filtered = equipmentDatabase.filter(tool => {
    // Category match
    if (currentFilterCategory !== "All" && tool.category !== currentFilterCategory) {
      return false;
    }
    // Group match
    if (currentFilterGroup !== "All" && tool.pdfGroup !== currentFilterGroup) {
      return false;
    }
    // Search match
    if (searchQuery) {
      const matchName = tool.name.toLowerCase().includes(searchQuery);
      const matchId = tool.id.toLowerCase().includes(searchQuery);
      const matchPurpose = tool.purpose.toLowerCase().includes(searchQuery);
      const matchNum = String(tool.pdfNumber).includes(searchQuery);
      const matchAlt = tool.alternativeNames && tool.alternativeNames.some(a => a.toLowerCase().includes(searchQuery));
      return matchName || matchId || matchPurpose || matchNum || matchAlt;
    }
    return true;
  });

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${equipmentDatabase.length} Tools`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg style="width: 48px; height: 48px; fill: currentColor; margin-bottom: 1rem; opacity: 0.5;" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <h3>No matching lab tools found</h3>
        <p>Try clearing your search query or selecting "All" categories.</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(tool => {
    const numDisplay = tool.pdfNumber !== null && tool.pdfNumber !== undefined ? `#${tool.pdfNumber}` : '+1';
    const hasImg = tool.image && tool.image.status === "available" && tool.image.src;
    const imgHtml = hasImg
      ? `<div class="card-image-wrap">
           <img src="${escapeHtml(tool.image.src)}" alt="${escapeHtml(tool.image.alt || tool.name)}" class="card-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-image-placeholder\\'></div>'" />
         </div>`
      : `<div class="card-image-wrap card-image-placeholder"></div>`;

    return `
      <div class="equipment-card" onclick="openDetailView('${tool.id}')">
        <div class="card-top">
          <span class="card-number">${numDisplay}</span>
          <span class="card-category">${escapeHtml(tool.category)}</span>
        </div>
        ${imgHtml}
        <h3 class="card-title">${escapeHtml(tool.name)}</h3>
        <p class="card-purpose">${escapeHtml(tool.purpose)}</p>
        <div class="card-footer">
          <span class="card-pdf-group">${escapeHtml(tool.pdfGroup)}</span>
          <span style="color: var(--accent-cyan); font-weight: 500;">Details &rarr;</span>
        </div>
      </div>
    `;
  }).join("");
}

function resetFilters() {
  currentFilterCategory = "All";
  currentFilterGroup = "All";
  searchQuery = "";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  renderCategoryPills();
  renderGroupPills();
  renderCards();
}

// AI Scanner Simulation Handler
function simulateAiScan(inputClass) {
  if (!inputClass) {
    showToast("Please enter a simulated model class name or equipment ID (e.g., 'beaker' or 'test_class').");
    return;
  }

  const normalized = inputClass.trim().toLowerCase().replace(/\s+/g, "-");

  // Check against scanner contract
  // Since model classes are currently 0 / pending user input:
  const recognizedClasses = (recognitionContract && recognitionContract.supportedModelClasses) || [];

  if (recognizedClasses.length === 0) {
    // Check if the user entered a valid database ID for convenience:
    const tool = window.getEquipmentById(normalized);
    if (tool) {
      showToast(`AI Model has 0 trained classes (manual search contract active). Found match for '#${tool.pdfNumber} ${tool.name}' via manual selection.`);
      openDetailView(tool.id);
    } else {
      showToast(`Prediction '${inputClass}' is unsupported. Routing to manual library search.`);
      searchQuery = inputClass;
      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.value = inputClass;
      renderCards();
    }
  } else {
    // If recognition classes were configured
    const mappedId = recognitionContract.classToEquipmentMapping[normalized] || normalized;
    const tool = window.getEquipmentById(mappedId);
    if (tool) {
      showToast(`Recognized tool: ${tool.name}`);
      openDetailView(tool.id);
    } else {
      showToast(`Class '${inputClass}' recognized with low confidence. Please verify manually.`);
    }
  }
}

// Open Detail View
function openDetailView(toolId) {
  const tool = window.getEquipmentById(toolId);
  if (!tool) {
    showToast(`Tool '${toolId}' not found in database.`);
    return;
  }

  // Update hash without page jump
  window.location.hash = `detail/${tool.id}`;

  const modal = document.getElementById("detail-modal");
  const content = document.getElementById("detail-content");
  if (!modal || !content) return;

  content.innerHTML = renderDetailContent(tool);
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // lock scroll
}

function closeDetailView() {
  const modal = document.getElementById("detail-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    // Clear hash
    if (window.location.hash.startsWith("#detail/")) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }
}

// Handle Routing
function handleRouting() {
  const hash = window.location.hash;
  if (hash.startsWith("#detail/")) {
    const id = hash.replace("#detail/", "");
    if (id) {
      openDetailView(id);
    }
  }
}

// Render All 12 Sections in Detail View
function renderDetailContent(t) {
  // 1. Basic Info & Image Display
  const hasDetailImg = t.image && t.image.status === "available" && t.image.src;
  const imageFallbackHtml = hasDetailImg ? `
    <div class="detail-image-card">
      <div class="detail-image-wrap">
        <img src="${escapeHtml(t.image.src)}" alt="${escapeHtml(t.image.alt || t.name)}" class="detail-img" />
      </div>
      <div class="detail-image-meta">
        <div class="detail-image-caption">${escapeHtml(t.image.alt || t.name)}</div>
        <div class="detail-image-credit"> ${escapeHtml(t.image.credit || '')}</div>
      </div>
    </div>
  ` : `
    <div class="detail-image-fallback">
      <div style="font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 0.5rem;"></div>
      <div style="font-weight: 600; color: #fff;">${escapeHtml(t.name)}</div>
      <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.25rem;">
        Asset Status: Neutral Fallback Display
      </div>
    </div>
  `;

  // Alternative names & types
  const altNamesHtml = (t.alternativeNames && t.alternativeNames.length > 0)
    ? `<div style="margin-bottom: 0.75rem;"><span style="color: var(--text-dim); font-size: 0.85rem;">Also known as: </span><strong style="color: #fff; font-size: 0.9rem;">${t.alternativeNames.map(escapeHtml).join(", ")}</strong></div>`
    : "";

  const typesHtml = (t.types && t.types.length > 0)
    ? `<div style="margin-bottom: 1rem;"><span style="color: var(--text-dim); font-size: 0.85rem;">Common Types / Variants: </span><span style="color: var(--text-muted); font-size: 0.85rem;">${t.types.map(escapeHtml).join(" • ")}</span></div>`
    : "";

  const commonUsesHtml = (t.commonUses && t.commonUses.length > 0)
    ? `<div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem;">
        ${t.commonUses.map(u => `<span class="badge badge-cyan">${escapeHtml(u)}</span>`).join("")}
       </div>`
    : "";

  // 3. Specifications
  const specs = t.specifications;
  const specsHtml = `
    <div class="specs-grid">
      <div class="spec-item">
        <div class="spec-label">Material</div>
        <div class="spec-value">${escapeHtml(specs.material.join(", "))}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Capacity / Size</div>
        <div class="spec-value">${escapeHtml(specs.capacity.value || "N/A")} ${escapeHtml(specs.capacity.unit || "")}</div>
        <div class="spec-notes">${escapeHtml(specs.capacity.notes || "")}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Dimensions / Range</div>
        <div class="spec-value">${escapeHtml(specs.dimensions || "Varies by model")}</div>
      </div>
      <div class="spec-item">
        <div class="spec-label">Measurement Accuracy</div>
        <div class="spec-value">${specs.measurementAccuracy.value !== null ? escapeHtml(specs.measurementAccuracy.value + " " + specs.measurementAccuracy.unit) : "Not Applicable"}</div>
        <div class="spec-notes">${escapeHtml(specs.measurementAccuracy.notes || "")}</div>
      </div>
    </div>
    ${specs.limitations && specs.limitations.length > 0 ? `
      <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">
        <strong style="color: var(--accent-amber);">Operating Limitations: </strong>
        ${specs.limitations.map(escapeHtml).join("; ")}
      </div>
    ` : ""}
  `;

  // 4. Parts and Functions
  const partsHtml = (specs.partsAndFunctions && specs.partsAndFunctions.length > 0) ? `
    <div style="display: flex; flex-direction: column; gap: 0.6rem;">
      ${specs.partsAndFunctions.map(p => `
        <div style="background: rgba(255,255,255,0.02); border-left: 3px solid var(--accent-cyan); padding: 0.6rem 0.9rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0;">
          <div style="font-weight: 600; font-size: 0.9rem; color: #fff;">${escapeHtml(p.partName)}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${escapeHtml(p.function)}</div>
          ${p.handlingNotes ? `<div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem;">Handling: ${escapeHtml(p.handlingNotes)}</div>` : ""}
        </div>
      `).join("")}
    </div>
  ` : `<p style="font-size: 0.85rem; color: var(--text-dim);">Single continuous piece or monolithic component.</p>`;

  // 5. Operating Instructions
  const ops = t.operatingInstructions;
  const opStepsHtml = `
    ${ops.preparation && ops.preparation.length > 0 ? `
      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 0.9rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">Preparation & Inspection</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-muted);">
          ${ops.preparation.map(p => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}
    <div class="step-list">
      ${ops.steps.map(s => `
        <div class="step-card">
          <div class="step-num">${s.step}</div>
          <div class="step-content">
            <h4>${escapeHtml(s.title)}</h4>
            <p>${escapeHtml(s.instruction)}</p>
          </div>
        </div>
      `).join("")}
    </div>
    ${ops.handlingTips && ops.handlingTips.length > 0 ? `
      <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: rgba(56, 189, 248, 0.05); border: 1px solid var(--border-accent); border-radius: var(--radius-sm);">
        <strong style="color: var(--accent-cyan); font-size: 0.85rem;">Key Handling Tips: </strong>
        <span style="font-size: 0.85rem; color: var(--text-muted);">${ops.handlingTips.map(escapeHtml).join(" • ")}</span>
      </div>
    ` : ""}
    ${ops.shutdown && ops.shutdown.length > 0 ? `
      <div style="margin-top: 1rem;">
        <h4 style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.4rem;">Post-Use & Shutdown</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-dim);">
          ${ops.shutdown.map(sd => `<li>${escapeHtml(sd)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}
  `;

  // 6. Safety Precautions
  const safety = t.safetyPrecautions;
  const safetyHtml = `
    <div class="alert-box alert-warning">
      <svg style="width: 24px; height: 24px; fill: currentColor; flex-shrink: 0;" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
      <div>
        <strong>Universal Safety Reminder:</strong>
        <p>This is a broad reference list; not every laboratory contains every item. Use equipment only with suitable training, follow institutional procedures, wear required protective equipment, and dispose of chemical waste according to local rules.</p>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
      <div style="background: rgba(244, 63, 94, 0.05); border: 1px solid var(--danger-border); padding: 0.9rem; border-radius: var(--radius-sm);">
        <h5 style="color: var(--accent-rose); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.4rem;">Key Hazards</h5>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
          ${safety.hazards.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
        </ul>
      </div>
      <div style="background: rgba(45, 212, 191, 0.05); border: 1px solid var(--success-border); padding: 0.9rem; border-radius: var(--radius-sm);">
        <h5 style="color: var(--accent-teal); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.4rem;">Required PPE</h5>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
          ${safety.requiredPPE.map(p => `<li>${escapeHtml(p)}</li>`).join("")}
        </ul>
      </div>
    </div>

    ${safety.actionsToAvoid && safety.actionsToAvoid.length > 0 ? `
      <div style="margin-bottom: 0.75rem; font-size: 0.85rem; color: var(--text-muted);">
        <strong style="color: var(--accent-rose);">Never Do This: </strong>
        ${safety.actionsToAvoid.map(escapeHtml).join("; ")}
      </div>
    ` : ""}

    ${safety.emergencyGuidance && safety.emergencyGuidance.length > 0 ? `
      <div style="padding: 0.75rem 1rem; background: rgba(255,255,255,0.02); border-left: 3px solid var(--accent-rose); font-size: 0.85rem; color: var(--text-muted);">
        <strong style="color: #fff;">Emergency Action: </strong>
        ${safety.emergencyGuidance.map(escapeHtml).join(" ")}
      </div>
    ` : ""}
  `;

  // 7. Cleaning & Storage
  const maint = t.maintenanceAndTroubleshooting;
  const cleanStorageHtml = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
        <h5 style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.4rem;">Cleaning Steps</h5>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
          ${maint.cleaningSteps.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
      </div>
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); padding: 1rem; border-radius: var(--radius-sm);">
        <h5 style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.4rem;">Storage Requirements</h5>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
          ${maint.storageInstructions.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  // 8. Maintenance & Troubleshooting
  const troubleHtml = `
    ${maint.maintenanceChecks && maint.maintenanceChecks.length > 0 ? `
      <div style="margin-bottom: 1rem;">
        <h5 style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.4rem;">Routine Inspection & Maintenance Checks</h5>
        <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
          ${maint.maintenanceChecks.map(mc => `<li>${escapeHtml(mc)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${maint.troubleshooting.map(tr => `
        <div class="trouble-card">
          <div class="trouble-header">
            <span class="trouble-problem"> Problem: ${escapeHtml(tr.problem)}</span>
            ${tr.requiresSupervisor ? `<span class="badge badge-rose">Notify Supervisor</span>` : `<span class="badge badge-teal">User Solvable</span>`}
          </div>
          <div class="trouble-body">
            <div class="trouble-col">
              <h5>Possible Causes</h5>
              <ul>${tr.possibleCauses.map(pc => `<li>${escapeHtml(pc)}</li>`).join("")}</ul>
            </div>
            <div class="trouble-col">
              <h5>Solution & Corrective Action</h5>
              <ul>${tr.solution.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>
            </div>
          </div>
          <div style="margin-top: 0.6rem; font-size: 0.75rem; color: var(--text-dim); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 0.4rem;">
            <strong>Prevention: </strong>${tr.prevention.map(escapeHtml).join("; ")}
          </div>
        </div>
      `).join("")}
    </div>
  `;

  // 9. Common Mistakes
  const mistakesHtml = (maint.commonMistakes && maint.commonMistakes.length > 0) ? `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${maint.commonMistakes.map(m => `
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.9rem;">
          <div style="font-weight: 600; font-size: 0.9rem; color: #fff; margin-bottom: 0.3rem;"> Mistake: ${escapeHtml(m.mistake)}</div>
          <div style="font-size: 0.85rem; color: var(--accent-amber); margin-bottom: 0.2rem;"><strong>Why it matters: </strong>${escapeHtml(m.whyItMatters)}</div>
          <div style="font-size: 0.85rem; color: var(--accent-teal);"><strong>How to avoid: </strong>${escapeHtml(m.howToAvoid)}</div>
        </div>
      `).join("")}
    </div>
  ` : `<p style="font-size: 0.85rem; color: var(--text-dim);">No special beginner mistakes recorded.</p>`;

  // 10. Related Equipment with Clickable Links
  const relatedHtml = (t.relatedEquipment && t.relatedEquipment.length > 0) ? `
    <div class="related-grid">
      ${t.relatedEquipment.map(rel => {
        const targetTool = window.getEquipmentById(rel.equipmentId);
        const nameDisplay = targetTool ? targetTool.name : rel.equipmentId;
        const numberDisplay = targetTool ? `#${targetTool.pdfNumber}` : "";
        return `
          <div class="related-card" onclick="openDetailView('${rel.equipmentId}')">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span class="badge ${rel.relationship === 'similar' ? 'badge-cyan' : rel.relationship === 'complementary' ? 'badge-teal' : 'badge-amber'}">${escapeHtml(rel.relationship)}</span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">${numberDisplay}</span>
            </div>
            <div class="related-title">${escapeHtml(nameDisplay)}</div>
            <div class="related-reason">${escapeHtml(rel.reason)}</div>
            <div class="related-diff">Difference: ${escapeHtml(rel.difference)}</div>
          </div>
        `;
      }).join("")}
    </div>
  ` : `<p style="font-size: 0.85rem; color: var(--text-dim);">No related tools linked.</p>`;

  // 11. Review / Evidence Status & References
  const meta = t.metadata;
  const referencesHtml = (meta.references && meta.references.length > 0) ? `
    <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">
      ${meta.references.map(r => `
        <li>
          <strong>${escapeHtml(r.title)}</strong> (${escapeHtml(r.sourceType)})
          ${r.url ? ` - <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener" style="color: var(--accent-cyan); text-decoration: underline;">Source Link</a>` : ""}
          <div style="font-size: 0.75rem; color: var(--text-dim);">Supports: ${r.supports.map(escapeHtml).join(", ")}</div>
        </li>
      `).join("")}
    </ul>
  ` : `<p style="font-size: 0.85rem; color: var(--text-dim);">No external references cited.</p>`;

  const metaHtml = `
    <table class="metadata-table">
      <tr>
        <td>Difficulty Level</td>
        <td><span class="badge badge-cyan">${escapeHtml(meta.difficultyLevel)}</span></td>
      </tr>
      <tr>
        <td>Schema Validation</td>
        <td><span class="badge badge-teal">${escapeHtml(meta.completeness.schema)}</span></td>
      </tr>
      <tr>
        <td>Content Completeness</td>
        <td><span class="badge badge-teal">${escapeHtml(meta.completeness.content)}</span></td>
      </tr>
      <tr>
        <td>Evidence Track</td>
        <td><span class="badge badge-amber">${escapeHtml(meta.completeness.evidence)}</span> (Domain Knowledge - Pending Independent Audit)</td>
      </tr>
      <tr>
        <td>Review Status</td>
        <td><span class="badge badge-amber">${escapeHtml(meta.reviewStatus)}</span></td>
      </tr>
    </table>
    <h5 style="color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; margin-top: 1rem;">Documented References & Standards</h5>
    ${referencesHtml}
  `;

  // 12. 3D / AR View with Graceful Fallback
  const ar = t.ar;
  const arHtml = `
    <div class="ar-preview-box">
      <div class="ar-icon"></div>
      <div class="ar-status">
        ${ar.modelStatus === "available" ? "Interactive 3D / AR Asset Ready" : "3D Model Coming Soon"}
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 500px; margin: 0 auto;">
        Target Asset: <code style="color: var(--accent-cyan);">${escapeHtml(ar.modelFile || t.id + ".glb")}</code>
      </p>
      <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.4rem;">
        Status: <em>${ar.modelStatus === "available" ? "Available" : "Missing / Fallback mode active"}</em>
      </div>
      <div class="ar-interactions">
        ${ar.interactions.map(i => `<span class="badge badge-cyan">${escapeHtml(i)}</span>`).join("")}
      </div>
    </div>
  `;

  return `
    <div class="detail-header">
      <div class="detail-badges">
        <span class="card-number">${t.pdfNumber !== null && t.pdfNumber !== undefined ? '#' + t.pdfNumber : '+1'}</span>
        <span class="badge badge-cyan">${escapeHtml(t.category)}</span>
        <span class="badge">${escapeHtml(t.pdfGroup)}</span>
      </div>
      <h2 class="detail-title">${escapeHtml(t.name)}</h2>
      <div class="detail-purpose">${escapeHtml(t.purpose)}</div>
      <p class="detail-desc">${escapeHtml(t.description)}</p>
      ${altNamesHtml}
      ${typesHtml}
      ${commonUsesHtml}
    </div>

    ${imageFallbackHtml}

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Technical Specifications & Limitations
      </h3>
      ${specsHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Main Components & Functions
      </h3>
      ${partsHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Numbered Operating Instructions
      </h3>
      ${opStepsHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Safety Precautions & Hazards
      </h3>
      ${safetyHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Cleaning & Storage Procedures
      </h3>
      ${cleanStorageHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Maintenance & Troubleshooting
      </h3>
      ${troubleHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Common Beginner Mistakes & Remedies
      </h3>
      ${mistakesHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Related Equipment & Disambiguation
      </h3>
      ${relatedHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Augmented Reality (AR) & 3D Preview
      </h3>
      ${arHtml}
    </div>

    <div class="section-block">
      <h3 class="section-heading">
        <span></span> Verification Metadata & References
      </h3>
      ${metaHtml}
    </div>
  `;
}

// Toast System
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Helpers
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeQuotes(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/'/g, "\\'");
}
