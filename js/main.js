/**
 * 💖 LEETCODE 100 SOLUTIONS PLATFORM
 * Make.com + Canva Aesthetic Interactive Frontend Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let appData = {
    profile: {},
    patterns: [],
    all_problems: []
  };

  let activeView = 'grid'; // 'grid' | 'canvas' | 'profile'
  let activePatternFilter = 'all';
  let activeProblem = null;
  let activeLanguage = 'cpp';

  // DOM Elements
  const gridSection = document.getElementById('gridSection');
  const filterSection = document.getElementById('filterSection');
  const canvasSection = document.getElementById('canvasSection');
  const profileSection = document.getElementById('profileSection');

  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewCanvasBtn = document.getElementById('viewCanvasBtn');
  const viewProfileBtn = document.getElementById('viewProfileBtn');
  const profilePillBtn = document.getElementById('profilePillBtn');
  const brandBtn = document.getElementById('brandBtn');

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const fontScaleBtn = document.getElementById('fontScaleBtn');

  const searchInput = document.getElementById('searchInput');
  const filterPillsRow = document.getElementById('filterPillsRow');
  const problemsCardsGrid = document.getElementById('problemsCardsGrid');

  const problemModalBackdrop = document.getElementById('problemModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  // Load Database (Static window object or fetch fallback)
  if (window.LEETCODE_DATA) {
    appData = window.LEETCODE_DATA;
    initApp();
  } else {
    fetch('data/problems.json')
      .then(res => res.json())
      .then(data => {
        appData = data;
        initApp();
      })
      .catch(err => {
        console.error('Error loading problems.json database:', err);
      });
  }

  function initApp() {
    renderProfileData();
    renderFilterPills();
    renderProblemsGrid();
    renderCanvasNodes();
    setupEventListeners();
  }

  /* ============================================================
     👤 PROFILE DASHBOARD RENDERER
     ============================================================ */
  function renderProfileData() {
    const p = appData.profile;
    if (!p) return;

    // Header & Pill
    document.getElementById('userAvatarSm').src = p.avatar;
    document.getElementById('userNameSm').textContent = p.username;

    document.getElementById('userAvatarLg').src = p.avatar;
    document.getElementById('userFullName').textContent = p.username;
    document.getElementById('userHandle').textContent = `@${p.handle}`;
    document.getElementById('userRank').textContent = `#${p.rank}`;
    document.getElementById('userPercent').textContent = p.global_top_percent;

    // Badges
    const badgesRow = document.getElementById('userBadgesRow');
    if (badgesRow && p.badges) {
      badgesRow.innerHTML = p.badges.map(b => `
        <div class="badge-item">
          <span>${b.icon}</span>
          <span>${b.name}</span>
        </div>
      `).join('');
    }

    // Counters
    document.getElementById('statTotalSolved').textContent = `${p.total_solved}/${p.total_problems}`;
    document.getElementById('statStreak').textContent = `🔥 ${p.streak}`;
    document.getElementById('statAcceptance').textContent = p.acceptance_rate;
    document.getElementById('statRating').textContent = p.contest_rating;

    // Solved Bars
    document.getElementById('easySolvedCount').textContent = `${p.easy_solved} / ${p.easy_total}`;
    document.getElementById('medSolvedCount').textContent = `${p.medium_solved} / ${p.medium_total}`;
    document.getElementById('hardSolvedCount').textContent = `${p.hard_solved} / ${p.hard_total}`;

    // Heatmap Grid (112 cells = 4 weeks x 28 days)
    const heatmapGrid = document.getElementById('heatmapGrid');
    if (heatmapGrid) {
      let cellsHTML = '';
      for (let i = 0; i < 112; i++) {
        const lvlClass = (i % 7 === 0 || i % 11 === 0) ? 'cell-lvl-4' :
                         (i % 5 === 0) ? 'cell-lvl-3' :
                         (i % 3 === 0) ? 'cell-lvl-2' :
                         (i % 2 === 0) ? 'cell-lvl-1' : '';
        cellsHTML += `<div class="heatmap-cell ${lvlClass}" title="Day ${i + 1}: Submissions logged"></div>`;
      }
      heatmapGrid.innerHTML = cellsHTML;
    }
  }

  /* ============================================================
     🧩 FILTER PILLS & PROBLEMS GRID MATRIX
     ============================================================ */
  function renderFilterPills() {
    if (!appData.patterns) return;

    let html = `<button class="filter-pill-btn active" data-pattern="all">All Patterns (100)</button>`;
    appData.patterns.forEach(pat => {
      html += `
        <button class="filter-pill-btn" data-pattern="${pat.id}">
          ${pat.icon} ${pat.name} (${pat.total_problems})
        </button>
      `;
    });
    filterPillsRow.innerHTML = html;

    // Attach click events to pills
    filterPillsRow.querySelectorAll('.filter-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterPillsRow.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePatternFilter = btn.getAttribute('data-pattern');
        renderProblemsGrid();
      });
    });
  }

  function renderProblemsGrid() {
    const query = searchInput.value.toLowerCase().trim();
    let filtered = appData.all_problems || [];

    // Filter by pattern
    if (activePatternFilter !== 'all') {
      filtered = filtered.filter(p => p.patternId === activePatternFilter);
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.pattern.toLowerCase().includes(query) ||
        p.difficulty.toLowerCase().includes(query) ||
        (p.companies && p.companies.some(c => c.toLowerCase().includes(query)))
      );
    }

    if (filtered.length === 0) {
      problemsCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3>No matching LeetCode problems found</h3>
          <p>Try searching for another pattern or title like 'Two Sum' or 'Sliding Window'</p>
        </div>
      `;
      return;
    }

    problemsCardsGrid.innerHTML = filtered.map(p => {
      const diffClass = p.difficulty === 'Easy' ? 'card-difficulty-easy' :
                        p.difficulty === 'Medium' ? 'card-difficulty-medium' : 'card-difficulty-hard';

      const companyBadges = (p.companies || []).slice(0, 3).map(c => `
        <span class="company-pill">${c}</span>
      `).join('');

      const slug = p.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      return `
        <div class="problem-card-item" data-id="${p.id}" data-slug="${slug}">
          <div class="card-top-header">
            <span class="card-problem-id">#${p.id}</span>
            <span class="card-difficulty-badge ${diffClass}">${p.difficulty}</span>
          </div>
          <h3 class="card-problem-title">${p.title}</h3>
          <div class="card-pattern-tag">🧩 ${p.pattern}</div>
          <div class="card-companies-row">
            ${companyBadges}
          </div>
          <div class="card-bottom-footer">
            <div class="card-langs-tags">
              <span class="lang-icon-tag">C++</span>
              <span class="lang-icon-tag">Java</span>
              <span class="lang-icon-tag">Python</span>
              <span class="lang-icon-tag">JS</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <a href="problems/${slug}/index.html" class="standalone-page-btn" style="font-size: 0.75rem; color: var(--text-muted); text-decoration: none; padding: 2px 8px; border-radius: 12px; background: rgba(255,255,255,0.06);" title="Open standalone page">📄 Page</a>
              <div class="view-sol-link">View Solution ➔</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to problem cards
    problemsCardsGrid.querySelectorAll('.problem-card-item').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('standalone-page-btn')) return; // Allow direct link navigate
        const id = parseInt(card.getAttribute('data-id'));
        const prob = appData.all_problems.find(x => x.id === id);
        if (prob) openProblemModal(prob);
      });
    });
  }

  /* ============================================================
     ⚡ MAKE.COM VISUAL WORKFLOW CANVAS RENDERER
     ============================================================ */
  function renderCanvasNodes() {
    const container = document.getElementById('canvasNodesContainer');
    const svgLayer = document.getElementById('canvasSvgLayer');
    if (!container || !appData.patterns) return;

    container.innerHTML = '';
    svgLayer.innerHTML = '';

    // Render Pattern nodes in a grid layout across canvas
    let leftOffset = 60;
    let topOffset = 40;

    appData.patterns.forEach((pat, pIdx) => {
      const nodeX = (pIdx % 3) * 380 + leftOffset;
      const nodeY = Math.floor(pIdx / 3) * 260 + topOffset;

      const nodeDiv = document.createElement('div');
      nodeDiv.className = 'make-node-card';
      nodeDiv.style.left = `${nodeX}px`;
      nodeDiv.style.top = `${nodeY}px`;
      nodeDiv.setAttribute('data-pattern-id', pat.id);

      nodeDiv.innerHTML = `
        <div class="socket-input node-socket"></div>
        <div class="node-header-row">
          <div class="node-icon-badge">${pat.icon}</div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-pink); background: rgba(255,117,140,0.1); padding: 2px 8px; border-radius: 10px;">
            ${pat.total_problems} Problems
          </span>
        </div>
        <h4 class="node-title">${pat.name}</h4>
        <p class="node-subtitle">${pat.description}</p>
        <div class="socket-output node-socket"></div>
      `;

      nodeDiv.addEventListener('click', () => {
        // Switch to grid view filtered by this pattern
        activePatternFilter = pat.id;
        switchView('grid');
        renderFilterPills();
        renderProblemsGrid();
      });

      container.appendChild(nodeDiv);
    });
  }

  /* ============================================================
     💖 PROBLEM SOLUTION MODAL (ALL 6 REQUIRED SECTIONS)
     ============================================================ */
  function openProblemModal(prob) {
    activeProblem = prob;
    activeLanguage = 'cpp';

    // Populate Title & ID
    document.getElementById('modalProblemId').textContent = `#${prob.id}`;
    document.getElementById('modalTitleText').textContent = prob.title;

    // (i) Intuition
    document.getElementById('modalIntuitionContent').innerHTML = prob.intuition;

    // (ii) Approach
    document.getElementById('modalApproachContent').innerHTML = prob.approach;

    // (iii) Algorithm
    const stepsList = document.getElementById('modalAlgorithmSteps');
    if (prob.algorithm && Array.isArray(prob.algorithm)) {
      stepsList.innerHTML = prob.algorithm.map(step => `<li>${step}</li>`).join('');
    } else {
      stepsList.innerHTML = `<li>Iterate over elements and apply ${prob.pattern} logic.</li>`;
    }

    // (iv) Complexity
    document.getElementById('modalTimeCompVal').textContent = prob.time_complexity || prob.complexity?.time?.split(' - ')[0] || 'O(N)';
    document.getElementById('modalTimeCompDesc').textContent = prob.complexity?.time || 'Single pass algorithm traversal.';
    document.getElementById('modalSpaceCompVal').textContent = prob.space_complexity || prob.complexity?.space?.split(' - ')[0] || 'O(1)';
    document.getElementById('modalSpaceCompDesc').textContent = prob.complexity?.space || 'Auxiliary memory usage for state tracking.';

    // (v) Optimal Solution Code
    updateModalCodeView();

    // (vi) Summary
    document.getElementById('modalSummaryContent').innerHTML = prob.summary || `Core key takeaway for ${prob.title}.`;

    // Open Modal
    problemModalBackdrop.classList.add('open');
  }

  function updateModalCodeView() {
    if (!activeProblem || !activeProblem.solutions) return;

    const solObj = activeProblem.solutions[activeLanguage] || activeProblem.solutions['cpp'];
    document.getElementById('modalCodeContainer').textContent = solObj.code || '// Code solution';
    document.getElementById('modalLangExplanation').textContent = solObj.explanation || '';

    // Active lang tab styling
    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === activeLanguage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function closeProblemModal() {
    problemModalBackdrop.classList.remove('open');
  }

  /* ============================================================
     🎛️ EVENT LISTENERS & NAVIGATION
     ============================================================ */
  function switchView(viewName) {
    activeView = viewName;
    gridSection.style.display = viewName === 'grid' || viewName === 'profile' ? 'block' : 'none';
    filterSection.style.display = viewName === 'grid' || viewName === 'profile' ? 'block' : 'none';
    canvasSection.style.display = viewName === 'canvas' ? 'block' : 'none';
    profileSection.style.display = viewName === 'canvas' ? 'none' : 'block';

    viewGridBtn.classList.toggle('active', viewName === 'grid');
    viewCanvasBtn.classList.toggle('active', viewName === 'canvas');
    viewProfileBtn.classList.toggle('active', viewName === 'profile');
  }

  function setupEventListeners() {
    // Navigation Toggles
    viewGridBtn.addEventListener('click', () => switchView('grid'));
    viewCanvasBtn.addEventListener('click', () => switchView('canvas'));
    viewProfileBtn.addEventListener('click', () => switchView('profile'));
    profilePillBtn.addEventListener('click', () => switchView('profile'));
    brandBtn.addEventListener('click', () => switchView('grid'));

    // Search Input
    searchInput.addEventListener('input', () => {
      renderProblemsGrid();
    });

    // Theme Toggle (Pink Dark / Pink Light)
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      themeToggleBtn.textContent = document.body.classList.contains('theme-light') ? '☀️' : '🌙';
    });

    // Font Scaling
    fontScaleBtn.addEventListener('click', () => {
      const currentScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-base')) || 1;
      const nextScale = currentScale >= 1.15 ? 0.95 : currentScale + 0.05;
      document.documentElement.style.setProperty('--font-base', `${nextScale}rem`);
    });

    // Modal Close
    modalCloseBtn.addEventListener('click', closeProblemModal);
    problemModalBackdrop.addEventListener('click', (e) => {
      if (e.target === problemModalBackdrop) closeProblemModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProblemModal();
    });

    // Modal 6-Section Tab Switcher
    document.querySelectorAll('.section-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.section-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
      });
    });

    // Language Tab Switcher in Code Section
    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeLanguage = btn.getAttribute('data-lang');
        updateModalCodeView();
      });
    });

    // Copy Code Button
    copyCodeBtn.addEventListener('click', () => {
      const codeText = document.getElementById('modalCodeContainer').textContent;
      navigator.clipboard.writeText(codeText).then(() => {
        const origText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '✨ Copied!';
        setTimeout(() => {
          copyCodeBtn.innerHTML = origText;
        }, 2000);
      });
    });
  }

});