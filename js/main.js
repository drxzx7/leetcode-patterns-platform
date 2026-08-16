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

  let activeView = 'grid'; // 'grid' | 'canvas'
  let activePatternFilter = 'all';
  let activeProblem = null;
  let activeLanguage = 'cpp';

  // DOM Elements
  const heroSection = document.getElementById('heroSection');
  const patternsOverviewSection = document.getElementById('patternsOverviewSection');
  const filterSection = document.getElementById('filterSection');
  const gridSection = document.getElementById('gridSection');
  const canvasSection = document.getElementById('canvasSection');

  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewCanvasBtn = document.getElementById('viewCanvasBtn');
  const viewProfileBtn = document.getElementById('viewProfileBtn');
  const profilePillBtn = document.getElementById('profilePillBtn');
  const brandBtn = document.getElementById('brandBtn');

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const fontScaleBtn = document.getElementById('fontScaleBtn');

  const searchInput = document.getElementById('searchInput');
  const filterPillsRow = document.getElementById('filterPillsRow');
  const patternsGridContainer = document.getElementById('patternsGridContainer');
  const problemsCardsGrid = document.getElementById('problemsCardsGrid');

  const problemModalBackdrop = document.getElementById('problemModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  const profileModalBackdrop = document.getElementById('profileModalBackdrop');
  const profileModalCloseBtn = document.getElementById('profileModalCloseBtn');

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
    renderPatternsOverview();
    renderFilterPills();
    renderProblemsGrid();
    renderCanvasNodes();
    setupEventListeners();
  }

  /* ============================================================
     👤 PROFILE DATA POPULATION
     ============================================================ */
  function renderProfileData() {
    const p = appData.profile;
    if (!p) return;

    // Header & Pill
    if (p.avatar) {
      document.getElementById('userAvatarSm').src = p.avatar;
      document.getElementById('userAvatarLg').src = p.avatar;
    }
    document.getElementById('userNameSm').textContent = p.username || 'Ahmad';
    document.getElementById('userFullName').textContent = p.username || 'Ahmad';
    document.getElementById('userHandle').textContent = `@${p.handle || 'x_drxzx_x'}`;
    document.getElementById('userRank').textContent = `#${p.rank || '403,799'}`;

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
    document.getElementById('statTotalSolved').textContent = p.total_solved || 342;
    document.getElementById('statStreak').textContent = `🔥 ${p.streak || 54}`;
    document.getElementById('statAcceptance').textContent = p.acceptance_rate || '47.1%';
    document.getElementById('statRating').textContent = p.contest_rating || 1785;

    // Solved Bars
    document.getElementById('easySolvedCount').textContent = p.easy_solved || 99;
    document.getElementById('medSolvedCount').textContent = p.medium_solved || 180;
    document.getElementById('hardSolvedCount').textContent = p.hard_solved || 63;

    // Heatmap Grid
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
     📋 10 DSA PATTERNS OVERVIEW CARDS
     ============================================================ */
  function renderPatternsOverview() {
    if (!patternsGridContainer || !appData.patterns) return;

    const numerals = ['(i)', '(ii)', '(iii)', '(iv)', '(v)', '(vi)', '(vii)', '(viii)', '(ix)', '(x)'];

    patternsGridContainer.innerHTML = appData.patterns.map((pat, idx) => `
      <div class="pattern-card" data-pattern="${pat.id}">
        <div class="icon">${pat.icon}</div>
        <h3 class="subheading-pink-ui">${numerals[idx] || ''} ${pat.name}</h3>
        <p>${pat.description}</p>
        <span class="count">${pat.total_problems} Problems</span>
      </div>
    `).join('');

    patternsGridContainer.querySelectorAll('.pattern-card').forEach(card => {
      card.addEventListener('click', () => {
        const patId = card.getAttribute('data-pattern');
        activePatternFilter = patId;
        
        // Active pill update
        filterPillsRow.querySelectorAll('.filter-pill-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-pattern') === patId);
        });

        renderProblemsGrid();
        
        // Scroll smoothly to problem matrix
        filterSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ============================================================
     🧩 FILTER PILLS & PROBLEMS GRID MATRIX
     ============================================================ */
  function renderFilterPills() {
    if (!appData.patterns || !filterPillsRow) return;

    let html = `<button class="filter-pill-btn active" data-pattern="all">All Patterns (100)</button>`;
    appData.patterns.forEach(pat => {
      html += `
        <button class="filter-pill-btn" data-pattern="${pat.id}">
          ${pat.icon} ${pat.name} (${pat.total_problems})
        </button>
      `;
    });
    filterPillsRow.innerHTML = html;

    filterPillsRow.querySelectorAll('.filter-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
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
              <a href="problems/${slug}/index.html" class="standalone-page-btn" style="font-size: 0.75rem; color: var(--text-muted); text-decoration: none; padding: 2px 8px; border-radius: 12px; background: rgba(255,255,255,0.06);" title="Open standalone file page">📄 Page</a>
              <div class="view-sol-link">View Solution ➔</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to problem cards
    problemsCardsGrid.querySelectorAll('.problem-card-item').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('standalone-page-btn')) return;
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

    document.getElementById('modalProblemId').textContent = `#${prob.id}`;
    document.getElementById('modalTitleText').textContent = prob.title;

    document.getElementById('modalIntuitionContent').innerHTML = prob.intuition;
    document.getElementById('modalApproachContent').innerHTML = prob.approach;

    const stepsList = document.getElementById('modalAlgorithmSteps');
    if (prob.algorithm && Array.isArray(prob.algorithm)) {
      stepsList.innerHTML = prob.algorithm.map(step => `<li>${step}</li>`).join('');
    } else {
      stepsList.innerHTML = `<li>Iterate over elements and apply ${prob.pattern} logic.</li>`;
    }

    document.getElementById('modalTimeCompVal').textContent = prob.time_complexity || prob.complexity?.time?.split(' - ')[0] || 'O(N)';
    document.getElementById('modalTimeCompDesc').textContent = prob.complexity?.time || 'Single pass algorithm traversal.';
    document.getElementById('modalSpaceCompVal').textContent = prob.space_complexity || prob.complexity?.space?.split(' - ')[0] || 'O(1)';
    document.getElementById('modalSpaceCompDesc').textContent = prob.complexity?.space || 'Auxiliary memory usage for state tracking.';

    updateModalCodeView();

    document.getElementById('modalSummaryContent').innerHTML = prob.summary || `Core key takeaway for ${prob.title}.`;

    problemModalBackdrop.classList.add('open');
  }

  function highlightSyntax(rawCode) {
    if (!rawCode) return '';

    // Escape HTML special chars
    let escaped = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 1. Comments (Line starting with // or #)
    escaped = escaped.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="token-comment">$1</span>');

    // 2. Double-quoted and single-quoted Strings
    escaped = escaped.replace(/(&quot;.*?&quot;|".*?"|'.*? me')/g, '<span class="token-string">$1</span>');

    // 3. Keywords (Electric Blue)
    const keywords = [
      'class', 'public', 'private', 'protected', 'virtual', 'override', 'struct',
      'return', 'for', 'while', 'if', 'else', 'switch', 'case', 'break', 'continue',
      'def', 'function', 'const', 'let', 'var', 'import', 'from', 'package', 'using',
      'namespace', 'include', 'new', 'delete', 'throw', 'try', 'catch', 'in', 'of', 'and', 'or', 'not'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(kwRegex, '<span class="token-keyword">$1</span>');

    // 4. Data Types & Collections (Neon Pink)
    const types = [
      'int', 'void', 'double', 'float', 'char', 'bool', 'boolean', 'long', 'short',
      'vector', 'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet', 'unordered_map',
      'string', 'String', 'auto', 'self', 'Optional', 'Dict', 'Array'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    escaped = escaped.replace(typeRegex, '<span class="token-type">$1</span>');

    // 5. Operators (Magenta Pink)
    escaped = escaped.replace(/(\+|-|\*|\/|%|=|\band\b|\bor\b|\bnot\b)/g, '<span class="token-operator">$1</span>');

    return escaped;
  }

  function updateModalCodeView() {
    if (!activeProblem || !activeProblem.solutions) return;

    const solObj = activeProblem.solutions[activeLanguage] || activeProblem.solutions['cpp'];
    const rawCode = solObj.code || '// Code solution';
    
    document.getElementById('modalCodeContainer').innerHTML = highlightSyntax(rawCode);
    document.getElementById('modalLangExplanation').textContent = solObj.explanation || '';

    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === activeLanguage);
    });
  }

  function closeProblemModal() {
    problemModalBackdrop.classList.remove('open');
  }

  /* ============================================================
     👤 PROFILE MODAL (TOUCH PROFILE ICON TO OPEN)
     ============================================================ */
  function openProfileModal() {
    profileModalBackdrop.classList.add('open');
  }

  function closeProfileModal() {
    profileModalBackdrop.classList.remove('open');
  }

  /* ============================================================
     🎛️ EVENT LISTENERS & NAVIGATION
     ============================================================ */
  function switchView(viewName) {
    activeView = viewName;
    
    heroSection.style.display = viewName === 'grid' ? 'block' : 'none';
    patternsOverviewSection.style.display = viewName === 'grid' ? 'block' : 'none';
    gridSection.style.display = viewName === 'grid' ? 'block' : 'none';
    filterSection.style.display = viewName === 'grid' ? 'block' : 'none';
    canvasSection.style.display = viewName === 'canvas' ? 'block' : 'none';

    viewGridBtn.classList.toggle('active', viewName === 'grid');
    viewCanvasBtn.classList.toggle('active', viewName === 'canvas');
    viewProfileBtn.classList.toggle('active', viewName === 'profile');
  }

  function setupEventListeners() {
    // Navigation Toggles
    viewGridBtn.addEventListener('click', () => switchView('grid'));
    viewCanvasBtn.addEventListener('click', () => switchView('canvas'));
    viewProfileBtn.addEventListener('click', () => openProfileModal());
    profilePillBtn.addEventListener('click', () => openProfileModal());
    brandBtn.addEventListener('click', () => switchView('grid'));

    // Search Input
    searchInput.addEventListener('input', () => {
      renderProblemsGrid();
    });

    // Theme Toggle
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

    // Problem Modal Close
    modalCloseBtn.addEventListener('click', closeProblemModal);
    problemModalBackdrop.addEventListener('click', (e) => {
      if (e.target === problemModalBackdrop) closeProblemModal();
    });

    // Profile Modal Close
    profileModalCloseBtn.addEventListener('click', closeProfileModal);
    profileModalBackdrop.addEventListener('click', (e) => {
      if (e.target === profileModalBackdrop) closeProfileModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProblemModal();
        closeProfileModal();
      }
    });

    // Solution Modal Tabs Switcher
    document.querySelectorAll('.section-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.section-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
      });
    });

    // Code Language Switcher
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