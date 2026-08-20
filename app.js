/**
 * ResumePro - Application Logic & Interactive State Management
 * Mohan's Resume Suite
 */

// Initial Resume Data (Sourced from Mohan's Resume and enriched)
const defaultResumeData = {
  personal: {
    fullName: "MOHAN",
    title: "Aspiring Software Engineer & Full-Stack Web Developer",
    phone: "+91 8220671061",
    email: "mohanappaye@gmail.com",
    location: "Salem, Tamil Nadu, India",
    linkedin: "linkedin.com/in/mohan-dev",
    github: "github.com/mohanappaye",
    portfolio: "mohan-portfolio.dev"
  },
  summary: "Aspiring Software Engineer with a solid B.Tech foundation (CGPA 7.5) and proven expertise across JavaScript, ReactJS, NodeJS, ExpressJS, HTML5, CSS3, and MySQL. Experienced in building responsive, scalable full-stack web applications and robust REST APIs through hands-on software development internships and project work.",
  skills: [
    { category: "Languages", items: "JavaScript (ES6+), Java, SQL" },
    { category: "Frontend", items: "ReactJS, Angular, HTML5, CSS3, Responsive Design, State Management" },
    { category: "Backend", items: "NodeJS, ExpressJS, RESTful APIs, JSON Web Tokens (JWT)" },
    { category: "Databases", items: "MySQL, Relational Schema Design, Query Optimization" },
    { category: "Tools & DevOps", items: "Git, GitHub, VS Code, Postman, Webpack, Chrome DevTools" }
  ],
  education: [
    {
      institution: "AKT Memorial College of Engineering and Technology",
      degree: "B.Tech in Computer Science & Engineering",
      score: "CGPA: 7.5 / 10.0",
      period: "2021 – 2025",
      details: "Higher Secondary (HSC): 88.5% | Secondary (SSLC): 88.8%"
    }
  ],
  experience: [
    {
      role: "Full Stack Web Developer Intern",
      company: "SkillUpgrade",
      period: "2024",
      location: "Remote / Hybrid",
      bullets: [
        "Architected and deployed responsive full-stack features using ReactJS, NodeJS, ExpressJS, and MySQL.",
        "Engineered RESTful API endpoints for seamless front-to-back communication and authenticated workflows.",
        "Conducted code reviews, maintained Git version control workflows, and optimized database queries for fast response times."
      ]
    },
    {
      role: "Web Development Intern",
      company: "CodSoft",
      period: "2023",
      location: "Remote",
      bullets: [
        "Developed cross-browser responsive user interfaces with HTML5, CSS3, and modern JavaScript.",
        "Improved website performance and Core Web Vitals, enhancing UI responsiveness across mobile and desktop devices.",
        "Collaborated on agile sprint tasks and delivered clean, maintainable, modular codebase components."
      ]
    }
  ],
  projects: [
    {
      title: "Smart Alert-Based Pacemaker Monitoring System",
      tech: "ReactJS, NodeJS, Express, MySQL, WebSockets, IoT Alerts",
      period: "2024",
      bullets: [
        "Built a real-time patient telemetry monitoring application with automated emergency alerts and live diagnostic reporting.",
        "Integrated threshold-based trigger notifications to instantly dispatch critical medical alerts to healthcare providers.",
        "Engineered a high-performance web dashboard displaying real-time patient biometric feeds and historical logs."
      ]
    },
    {
      title: "Task Management & To-Do Web Application",
      tech: "JavaScript, HTML5, CSS3, LocalStorage API",
      period: "2023",
      bullets: [
        "Developed a responsive, lightweight task management application with persistent browser local storage support.",
        "Created an intuitive, accessible UI featuring drag-and-drop task organization, priority tags, and category filters.",
        "Enhanced usability and interactive responsiveness with clean DOM manipulation and modern CSS transitions."
      ]
    },
    {
      title: "Modern Developer Portfolio Website",
      tech: "HTML5, CSS3, JavaScript, GitHub Pages",
      period: "2023",
      bullets: [
        "Designed and launched an interactive, responsive developer portfolio showcasing web applications and technical skills.",
        "Optimized asset loading and typography rendering to achieve 95+ Google Lighthouse performance scores."
      ]
    }
  ],
  certifications: [
    "MERN Stack Web Development Specialization",
    "Prompt Engineering & Generative AI Best Practices",
    "Online Portfolio Development & CI/CD using GitHub",
    "Best Innovator Award – Science Day Project Expo (2022)",
    "Best Organizer Award – Technical Symposium (2024)"
  ]
};

// Current Application State
let currentResumeData = JSON.parse(JSON.stringify(defaultResumeData));
let currentTemplate = "modern-tech";
let currentAccent = "sapphire";
let currentFont = "Inter";
let currentZoom = 100;
let compactMode = false;

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadSavedData();
  populateFormFields();
  bindEventListeners();
  renderResume();
  updateATSScore();
});

// Load from LocalStorage if available
function loadSavedData() {
  try {
    const saved = localStorage.getItem("resumepro_data");
    if (saved) {
      currentResumeData = JSON.parse(saved);
    }
    const savedTemplate = localStorage.getItem("resumepro_template");
    if (savedTemplate) currentTemplate = savedTemplate;
    const savedAccent = localStorage.getItem("resumepro_accent");
    if (savedAccent) currentAccent = savedAccent;
  } catch (e) {
    console.warn("Storage load error:", e);
  }
}

function saveData() {
  try {
    localStorage.setItem("resumepro_data", JSON.stringify(currentResumeData));
    localStorage.setItem("resumepro_template", currentTemplate);
    localStorage.setItem("resumepro_accent", currentAccent);
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

// Populate Editor Form
function populateFormFields() {
  const p = currentResumeData.personal;
  document.getElementById("inputFullName").value = p.fullName || "";
  document.getElementById("inputTitle").value = p.title || "";
  document.getElementById("inputPhone").value = p.phone || "";
  document.getElementById("inputEmail").value = p.email || "";
  document.getElementById("inputLocation").value = p.location || "";
  document.getElementById("inputLinkedIn").value = p.linkedin || "";
  document.getElementById("inputGitHub").value = p.github || "";
  document.getElementById("inputPortfolio").value = p.portfolio || "";

  document.getElementById("inputSummary").value = currentResumeData.summary || "";

  renderSkillsForm();
  renderEducationForm();
  renderExperienceForm();
  renderProjectsForm();
  renderCertificationsForm();

  // Set active UI states
  document.querySelectorAll(".template-card").forEach(c => {
    c.classList.toggle("active", c.dataset.template === currentTemplate);
  });
  document.querySelectorAll(".color-dot").forEach(d => {
    d.classList.toggle("active", d.dataset.color === currentAccent);
  });
  document.documentElement.setAttribute("data-accent", currentAccent);
}

// Dynamic Form Sub-renderers
function renderSkillsForm() {
  const container = document.getElementById("skillsFormContainer");
  container.innerHTML = "";
  currentResumeData.skills.forEach((s, idx) => {
    const item = document.createElement("div");
    item.className = "item-card";
    item.innerHTML = `
      <div class="item-card-header">
        <span class="form-label" style="margin:0;">Category ${idx + 1}</span>
        <button type="button" class="btn-remove" onclick="removeSkill(${idx})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-col" style="flex: 0.4;">
          <input type="text" class="text-input" placeholder="Category" value="${escapeHtml(s.category)}" onchange="updateSkillCategory(${idx}, this.value)">
        </div>
        <div class="form-col" style="flex: 0.6;">
          <input type="text" class="text-input" placeholder="Skills (comma separated)" value="${escapeHtml(s.items)}" onchange="updateSkillItems(${idx}, this.value)">
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderEducationForm() {
  const container = document.getElementById("educationFormContainer");
  container.innerHTML = "";
  currentResumeData.education.forEach((edu, idx) => {
    const item = document.createElement("div");
    item.className = "item-card";
    item.innerHTML = `
      <div class="item-card-header">
        <span class="form-label" style="margin:0;">Education #${idx + 1}</span>
        <button type="button" class="btn-remove" onclick="removeEducation(${idx})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Institution" value="${escapeHtml(edu.institution)}" onchange="updateEduField(${idx}, 'institution', this.value)">
        </div>
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Degree / Program" value="${escapeHtml(edu.degree)}" onchange="updateEduField(${idx}, 'degree', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Score / CGPA" value="${escapeHtml(edu.score)}" onchange="updateEduField(${idx}, 'score', this.value)">
        </div>
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Duration (e.g. 2021-2025)" value="${escapeHtml(edu.period)}" onchange="updateEduField(${idx}, 'period', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Additional Details (e.g. HSC / SSLC)" value="${escapeHtml(edu.details || '')}" onchange="updateEduField(${idx}, 'details', this.value)">
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderExperienceForm() {
  const container = document.getElementById("experienceFormContainer");
  container.innerHTML = "";
  currentResumeData.experience.forEach((exp, idx) => {
    const item = document.createElement("div");
    item.className = "item-card";
    const bulletsText = (exp.bullets || []).join("\n");
    item.innerHTML = `
      <div class="item-card-header">
        <span class="form-label" style="margin:0;">Experience #${idx + 1}</span>
        <button type="button" class="btn-remove" onclick="removeExperience(${idx})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Role / Title" value="${escapeHtml(exp.role)}" onchange="updateExpField(${idx}, 'role', this.value)">
        </div>
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Company / Organization" value="${escapeHtml(exp.company)}" onchange="updateExpField(${idx}, 'company', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Period" value="${escapeHtml(exp.period)}" onchange="updateExpField(${idx}, 'period', this.value)">
        </div>
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Location" value="${escapeHtml(exp.location || '')}" onchange="updateExpField(${idx}, 'location', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <label class="form-label">Key Achievements / Bullets (One per line)</label>
          <textarea class="textarea-input" onchange="updateExpBullets(${idx}, this.value)">${escapeHtml(bulletsText)}</textarea>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderProjectsForm() {
  const container = document.getElementById("projectsFormContainer");
  container.innerHTML = "";
  currentResumeData.projects.forEach((proj, idx) => {
    const item = document.createElement("div");
    item.className = "item-card";
    const bulletsText = (proj.bullets || []).join("\n");
    item.innerHTML = `
      <div class="item-card-header">
        <span class="form-label" style="margin:0;">Project #${idx + 1}</span>
        <button type="button" class="btn-remove" onclick="removeProject(${idx})">✕ Remove</button>
      </div>
      <div class="form-row">
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Project Title" value="${escapeHtml(proj.title)}" onchange="updateProjField(${idx}, 'title', this.value)">
        </div>
        <div class="form-col">
          <input type="text" class="text-input" placeholder="Tech Stack" value="${escapeHtml(proj.tech)}" onchange="updateProjField(${idx}, 'tech', this.value)">
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <label class="form-label">Project Highlights / Bullets (One per line)</label>
          <textarea class="textarea-input" onchange="updateProjBullets(${idx}, this.value)">${escapeHtml(bulletsText)}</textarea>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function renderCertificationsForm() {
  const container = document.getElementById("certificationsFormContainer");
  container.innerHTML = "";
  currentResumeData.certifications.forEach((cert, idx) => {
    const item = document.createElement("div");
    item.className = "item-card";
    item.style.padding = "8px 12px";
    item.innerHTML = `
      <div style="display:flex; gap:8px; align-items:center;">
        <input type="text" class="text-input" style="flex:1;" value="${escapeHtml(cert)}" onchange="updateCertification(${idx}, this.value)">
        <button type="button" class="btn-remove" onclick="removeCertification(${idx})">✕</button>
      </div>
    `;
    container.appendChild(item);
  });
}

// Global update handlers
window.updateSkillCategory = (idx, val) => {
  currentResumeData.skills[idx].category = val;
  onDataChanged();
};
window.updateSkillItems = (idx, val) => {
  currentResumeData.skills[idx].items = val;
  onDataChanged();
};
window.removeSkill = (idx) => {
  currentResumeData.skills.splice(idx, 1);
  renderSkillsForm();
  onDataChanged();
};
window.addSkill = () => {
  currentResumeData.skills.push({ category: "Other", items: "Git, Agile" });
  renderSkillsForm();
  onDataChanged();
};

window.updateEduField = (idx, field, val) => {
  currentResumeData.education[idx][field] = val;
  onDataChanged();
};
window.removeEducation = (idx) => {
  currentResumeData.education.splice(idx, 1);
  renderEducationForm();
  onDataChanged();
};
window.addEducation = () => {
  currentResumeData.education.push({
    institution: "University / Institute Name",
    degree: "Degree Name",
    score: "CGPA / Percentage",
    period: "Year - Year",
    details: ""
  });
  renderEducationForm();
  onDataChanged();
};

window.updateExpField = (idx, field, val) => {
  currentResumeData.experience[idx][field] = val;
  onDataChanged();
};
window.updateExpBullets = (idx, text) => {
  currentResumeData.experience[idx].bullets = text.split("\n").map(s => s.trim()).filter(Boolean);
  onDataChanged();
};
window.removeExperience = (idx) => {
  currentResumeData.experience.splice(idx, 1);
  renderExperienceForm();
  onDataChanged();
};
window.addExperience = () => {
  currentResumeData.experience.push({
    role: "Software Engineering Intern",
    company: "Company Name",
    period: "2024",
    location: "Location",
    bullets: ["Built performant web components and REST APIs."]
  });
  renderExperienceForm();
  onDataChanged();
};

window.updateProjField = (idx, field, val) => {
  currentResumeData.projects[idx][field] = val;
  onDataChanged();
};
window.updateProjBullets = (idx, text) => {
  currentResumeData.projects[idx].bullets = text.split("\n").map(s => s.trim()).filter(Boolean);
  onDataChanged();
};
window.removeProject = (idx) => {
  currentResumeData.projects.splice(idx, 1);
  renderProjectsForm();
  onDataChanged();
};
window.addProject = () => {
  currentResumeData.projects.push({
    title: "New Full-Stack Project",
    tech: "React, Node.js, Express, MySQL",
    period: "2024",
    bullets: ["Developed a responsive web application."]
  });
  renderProjectsForm();
  onDataChanged();
};

window.updateCertification = (idx, val) => {
  currentResumeData.certifications[idx] = val;
  onDataChanged();
};
window.removeCertification = (idx) => {
  currentResumeData.certifications.splice(idx, 1);
  renderCertificationsForm();
  onDataChanged();
};
window.addCertification = () => {
  currentResumeData.certifications.push("New Certification or Award");
  renderCertificationsForm();
  onDataChanged();
};

function onDataChanged() {
  saveData();
  renderResume();
  updateATSScore();
}

// Bind Static Inputs and Actions
function bindEventListeners() {
  // Personal Info Bindings
  const bindInput = (id, prop) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", (e) => {
      currentResumeData.personal[prop] = e.target.value;
      onDataChanged();
    });
  };

  bindInput("inputFullName", "fullName");
  bindInput("inputTitle", "title");
  bindInput("inputPhone", "phone");
  bindInput("inputEmail", "email");
  bindInput("inputLocation", "location");
  bindInput("inputLinkedIn", "linkedin");
  bindInput("inputGitHub", "github");
  bindInput("inputPortfolio", "portfolio");

  // Summary
  const sumEl = document.getElementById("inputSummary");
  if (sumEl) {
    sumEl.addEventListener("input", (e) => {
      currentResumeData.summary = e.target.value;
      onDataChanged();
    });
  }

  // Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add("active");
    });
  });

  // Template Switching
  document.querySelectorAll(".template-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      currentTemplate = card.dataset.template;
      saveData();
      renderResume();
    });
  });

  // Accent Switcher
  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      currentAccent = dot.dataset.color;
      document.documentElement.setAttribute("data-accent", currentAccent);
      saveData();
      renderResume();
    });
  });

  // Font Selector
  const fontSelect = document.getElementById("fontSelector");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      currentFont = e.target.value;
      const sheet = document.getElementById("resumeSheet");
      if (sheet) sheet.style.fontFamily = currentFont;
    });
  }

  // Zoom Controls
  document.getElementById("btnZoomIn")?.addEventListener("click", () => {
    if (currentZoom < 140) {
      currentZoom += 10;
      updateZoom();
    }
  });
  document.getElementById("btnZoomOut")?.addEventListener("click", () => {
    if (currentZoom > 70) {
      currentZoom -= 10;
      updateZoom();
    }
  });
  document.getElementById("btnZoomReset")?.addEventListener("click", () => {
    currentZoom = 100;
    updateZoom();
  });

  // Compact Mode Toggle
  document.getElementById("btnCompactToggle")?.addEventListener("click", () => {
    compactMode = !compactMode;
    const btn = document.getElementById("btnCompactToggle");
    if (btn) {
      btn.classList.toggle("btn-primary", compactMode);
      btn.classList.toggle("btn-secondary", !compactMode);
      btn.innerHTML = compactMode ? '<span>⚡ 1-Page Fit: ON</span>' : '<span>📐 1-Page Fit: OFF</span>';
    }
    const sheet = document.getElementById("resumeSheet");
    if (sheet) {
      if (compactMode) {
        sheet.style.padding = "28px 36px";
        sheet.style.fontSize = "92%";
      } else {
        sheet.style.padding = "44px 48px";
        sheet.style.fontSize = "100%";
      }
    }
  });

  // Action Buttons
  document.getElementById("btnPrintPdf")?.addEventListener("click", () => {
    window.print();
  });

  document.getElementById("btnResetDefaults")?.addEventListener("click", () => {
    if (confirm("Reset all resume data to Mohan's default information?")) {
      currentResumeData = JSON.parse(JSON.stringify(defaultResumeData));
      populateFormFields();
      onDataChanged();
    }
  });

  document.getElementById("btnExportJson")?.addEventListener("click", exportJson);
  document.getElementById("btnImportJson")?.addEventListener("click", () => {
    document.getElementById("fileInputJson").click();
  });
  document.getElementById("fileInputJson")?.addEventListener("change", importJson);
  document.getElementById("btnCopyText")?.addEventListener("click", copyPlainText);
}

function updateZoom() {
  const sheet = document.getElementById("resumeSheet");
  const badge = document.getElementById("zoomBadge");
  if (sheet) sheet.style.transform = `scale(${currentZoom / 100})`;
  if (sheet) sheet.style.transformOrigin = "top center";
  if (badge) badge.innerText = `${currentZoom}%`;
}

// Render Resume Document onto Canvas
function renderResume() {
  const sheet = document.getElementById("resumeSheet");
  if (!sheet) return;

  // Clear previous template classes
  sheet.className = `resume-sheet template-${currentTemplate}`;
  sheet.style.fontFamily = currentFont;

  const { personal, summary, skills, education, experience, projects, certifications } = currentResumeData;

  // Contact list rendering with SVG icons
  const contactParts = [];
  if (personal.phone) {
    contactParts.push(`<a href="tel:${personal.phone.replace(/[^0-9+]/g, '')}" class="contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span>${escapeHtml(personal.phone)}</span>
    </a>`);
  }
  if (personal.email) {
    contactParts.push(`<a href="mailto:${personal.email}" class="contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <span>${escapeHtml(personal.email)}</span>
    </a>`);
  }
  if (personal.location) {
    contactParts.push(`<span class="contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      <span>${escapeHtml(personal.location)}</span>
    </span>`);
  }
  if (personal.linkedin) {
    contactParts.push(`<a href="https://${personal.linkedin}" target="_blank" class="contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      <span>${escapeHtml(personal.linkedin)}</span>
    </a>`);
  }
  if (personal.github) {
    contactParts.push(`<a href="https://${personal.github}" target="_blank" class="contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      <span>${escapeHtml(personal.github)}</span>
    </a>`);
  }

  // Skills HTML
  const skillsHtml = (skills || []).map(s => {
    const tags = s.items.split(",").map(t => `<span class="skill-tag">${escapeHtml(t.trim())}</span>`).join("");
    return `
      <div class="skill-category">
        <span class="skill-category-name">${escapeHtml(s.category)}:</span>
        <div class="skill-tags">${tags}</div>
      </div>
    `;
  }).join("");

  // Experience HTML
  const expHtml = (experience || []).map(exp => {
    const bullets = (exp.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");
    return `
      <div class="entry-card">
        <div class="entry-header">
          <div>
            <span class="entry-title">${escapeHtml(exp.role)}</span> &nbsp;•&nbsp; <span class="entry-subtitle">${escapeHtml(exp.company)}</span>
          </div>
          <span class="entry-date">${escapeHtml(exp.period)}</span>
        </div>
        ${exp.location ? `<div class="entry-meta">${escapeHtml(exp.location)}</div>` : ''}
        ${bullets ? `<ul class="entry-bullet-list">${bullets}</ul>` : ''}
      </div>
    `;
  }).join("");

  // Projects HTML
  const projHtml = (projects || []).map(proj => {
    const bullets = (proj.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join("");
    return `
      <div class="entry-card">
        <div class="entry-header">
          <span class="entry-title">${escapeHtml(proj.title)}</span>
          <span class="entry-date">${escapeHtml(proj.period || '')}</span>
        </div>
        ${proj.tech ? `<div class="entry-meta"><strong>Tech Stack:</strong> ${escapeHtml(proj.tech)}</div>` : ''}
        ${bullets ? `<ul class="entry-bullet-list">${bullets}</ul>` : ''}
      </div>
    `;
  }).join("");

  // Education HTML
  const eduHtml = (education || []).map(edu => {
    return `
      <div class="entry-card">
        <div class="entry-header">
          <span class="entry-title">${escapeHtml(edu.institution)}</span>
          <span class="entry-date">${escapeHtml(edu.period)}</span>
        </div>
        <div class="entry-subtitle" style="margin-top:2px;">${escapeHtml(edu.degree)} &nbsp;•&nbsp; <strong>${escapeHtml(edu.score)}</strong></div>
        ${edu.details ? `<div class="entry-meta" style="margin-top:2px;">${escapeHtml(edu.details)}</div>` : ''}
      </div>
    `;
  }).join("");

  // Certifications & Achievements HTML
  const certsHtml = (certifications || []).map(c => `<li>${escapeHtml(c)}</li>`).join("");

  // Assemble full HTML
  sheet.innerHTML = `
    <!-- Header -->
    <header class="resume-header">
      <h1 class="resume-name">${escapeHtml(personal.fullName)}</h1>
      <div class="resume-role">${escapeHtml(personal.title)}</div>
      <div class="resume-contact">
        ${contactParts.join("")}
      </div>
    </header>

    <!-- Professional Summary -->
    <section class="resume-section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="resume-summary-text">${escapeHtml(summary)}</p>
    </section>

    <!-- Technical Skills -->
    <section class="resume-section">
      <h2 class="section-title">Technical Skills</h2>
      <div class="skills-container">
        ${skillsHtml}
      </div>
    </section>

    <!-- Work Experience / Internships -->
    <section class="resume-section">
      <h2 class="section-title">Work & Internship Experience</h2>
      ${expHtml}
    </section>

    <!-- Projects -->
    <section class="resume-section">
      <h2 class="section-title">Key Projects</h2>
      ${projHtml}
    </section>

    <!-- Education -->
    <section class="resume-section">
      <h2 class="section-title">Education</h2>
      ${eduHtml}
    </section>

    <!-- Certifications & Awards -->
    ${certifications && certifications.length ? `
      <section class="resume-section">
        <h2 class="section-title">Certifications & Achievements</h2>
        <ul class="entry-bullet-list">
          ${certsHtml}
        </ul>
      </section>
    ` : ''}
  `;
}

// Calculate ATS Score & Keyword Presence
function updateATSScore() {
  let score = 50;
  const passedItems = [];

  const textToScan = JSON.stringify(currentResumeData).toLowerCase();

  // Keyword tests
  const keywords = ["javascript", "react", "node", "express", "sql", "git", "api", "html", "css"];
  const presentKeywords = keywords.filter(k => textToScan.includes(k));
  if (presentKeywords.length >= 6) {
    score += 15;
    passedItems.push("High technical keyword match (React, Node, SQL, Git, API)");
  }

  // Contact checks
  const p = currentResumeData.personal;
  if (p.email && p.phone && p.location) {
    score += 10;
    passedItems.push("Complete professional contact credentials");
  }

  // Summary length check
  if (currentResumeData.summary && currentResumeData.summary.length > 80) {
    score += 10;
    passedItems.push("Impactful summary with target job title & skills");
  }

  // Projects & Experience
  if (currentResumeData.experience.length >= 2 && currentResumeData.projects.length >= 2) {
    score += 10;
    passedItems.push("Balanced work experience & technical projects");
  }

  // Education & Metrics
  if (textToScan.includes("cgpa") || textToScan.includes("%")) {
    score += 5;
    passedItems.push("Academic performance metrics included");
  }

  score = Math.min(100, score);

  const scoreEl = document.getElementById("atsScoreNumber");
  const circleEl = document.getElementById("atsScoreCircle");
  const listEl = document.getElementById("atsChecklist");

  if (scoreEl) scoreEl.innerText = `${score}%`;
  if (circleEl) circleEl.style.setProperty("--score-pct", `${score}%`);
  if (listEl) {
    listEl.innerHTML = passedItems.map(item => `<li class="ats-item passed">${item}</li>`).join("");
  }
}

// Plain Text & Markdown Exporter
function copyPlainText() {
  const { personal, summary, skills, experience, projects, education, certifications } = currentResumeData;
  let text = `${personal.fullName.toUpperCase()}\n`;
  text += `${personal.title}\n`;
  text += `Phone: ${personal.phone} | Email: ${personal.email} | Location: ${personal.location}\n`;
  if (personal.linkedin) text += `LinkedIn: ${personal.linkedin} | GitHub: ${personal.github}\n`;
  text += `\n========================================\nPROFESSIONAL SUMMARY\n========================================\n`;
  text += `${summary}\n\n`;

  text += `========================================\nTECHNICAL SKILLS\n========================================\n`;
  skills.forEach(s => {
    text += `${s.category}: ${s.items}\n`;
  });
  text += `\n`;

  text += `========================================\nINTERNSHIP & WORK EXPERIENCE\n========================================\n`;
  experience.forEach(e => {
    text += `${e.role} | ${e.company} (${e.period})\n`;
    (e.bullets || []).forEach(b => text += `• ${b}\n`);
    text += `\n`;
  });

  text += `========================================\nPROJECTS\n========================================\n`;
  projects.forEach(p => {
    text += `${p.title} (${p.tech})\n`;
    (p.bullets || []).forEach(b => text += `• ${b}\n`);
    text += `\n`;
  });

  text += `========================================\nEDUCATION\n========================================\n`;
  education.forEach(ed => {
    text += `${ed.institution} - ${ed.degree}\nScore: ${ed.score} | Period: ${ed.period}\n${ed.details || ''}\n\n`;
  });

  text += `========================================\nCERTIFICATIONS & ACHIEVEMENTS\n========================================\n`;
  certifications.forEach(c => text += `• ${c}\n`);

  navigator.clipboard.writeText(text).then(() => {
    alert("Resume copied as formatted plain text to your clipboard!");
  }).catch(err => {
    console.error("Clipboard error:", err);
  });
}

// JSON Data Export
function exportJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentResumeData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `resume_${currentResumeData.personal.fullName.toLowerCase().replace(/\s+/g, '_')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// JSON Data Import
function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.personal && data.skills) {
        currentResumeData = data;
        populateFormFields();
        onDataChanged();
        alert("Resume data successfully imported!");
      } else {
        alert("Invalid resume JSON format.");
      }
    } catch (err) {
      alert("Error parsing JSON file: " + err.message);
    }
  };
  reader.readAsText(file);
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
