/**
 * 💖 LEETCODE 100 SOLUTIONS PLATFORM
 * Make.com + Canva Aesthetic Interactive Frontend Application Logic
 * Featuring Universal DSA Visualizer Engine for all 100 Problems
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

  const heroExploreVisualizerBtn = document.getElementById('heroExploreVisualizerBtn');
  const heroExploreGridBtn = document.getElementById('heroExploreGridBtn');
  const heroProfileBtn = document.getElementById('heroProfileBtn');

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
    // Ensure all_problems is populated
    if (!appData.all_problems || appData.all_problems.length === 0) {
      appData.all_problems = [];
      if (appData.patterns) {
        appData.patterns.forEach(pat => {
          if (pat.problems) {
            appData.all_problems.push(...pat.problems);
          }
        });
      }
    }

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
      const avSm = document.getElementById('userAvatarSm');
      const avLg = document.getElementById('userAvatarLg');
      if (avSm) avSm.src = p.avatar;
      if (avLg) avLg.src = p.avatar;
    }
    const nameSm = document.getElementById('userNameSm');
    const nameFull = document.getElementById('userFullName');
    const handle = document.getElementById('userHandle');
    const rank = document.getElementById('userRank');

    if (nameSm) nameSm.textContent = 'Ahmad';
    if (nameFull) nameFull.textContent = p.username || 'Ahmad Shuaib';
    if (handle) handle.textContent = `@${p.handle || 'x_drxzx_x'}`;
    if (rank) rank.textContent = `#${p.rank || '403,799'}`;

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
    const statTotal = document.getElementById('statTotalSolved');
    const statStreak = document.getElementById('statStreak');
    const statAcc = document.getElementById('statAcceptance');
    const statRating = document.getElementById('statRating');

    if (statTotal) statTotal.textContent = p.total_solved || 342;
    if (statStreak) statStreak.textContent = `🔥 ${p.streak || 54}`;
    if (statAcc) statAcc.textContent = p.acceptance_rate || '47.1%';
    if (statRating) statRating.textContent = p.contest_rating || 1785;

    // Solved Bars
    const easyCount = document.getElementById('easySolvedCount');
    const medCount = document.getElementById('medSolvedCount');
    const hardCount = document.getElementById('hardSolvedCount');

    if (easyCount) easyCount.textContent = p.easy_solved || 99;
    if (medCount) medCount.textContent = p.medium_solved || 180;
    if (hardCount) hardCount.textContent = p.hard_solved || 63;

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
        <span class="count">${pat.total_problems || (pat.problems ? pat.problems.length : 10)} Problems</span>
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
      const count = pat.total_problems || (pat.problems ? pat.problems.length : 10);
      html += `
        <button class="filter-pill-btn" data-pattern="${pat.id}">
          ${pat.icon} ${pat.name} (${count})
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
        (p.pattern && p.pattern.toLowerCase().includes(query)) ||
        (p.difficulty && p.difficulty.toLowerCase().includes(query)) ||
        (p.companies && p.companies.some(c => c.toLowerCase().includes(query)))
      );
    }

    if (filtered.length === 0) {
      problemsCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3>No matching LeetCode problems found</h3>
          <p>Try searching for another pattern or title like 'Two Sum', 'Sliding Window', or 'Binary Search'</p>
        </div>
      `;
      return;
    }

    problemsCardsGrid.innerHTML = filtered.map(p => {
      const diffClass = p.difficulty === 'Easy' ? 'card-difficulty-easy' :
                        p.difficulty === 'Medium' ? 'card-difficulty-medium' : 'card-difficulty-hard';

      const companyBadges = (p.companies || ['Google', 'Amazon']).slice(0, 3).map(c => `
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
          <div class="card-pattern-tag">🧩 ${p.pattern || 'DSA Pattern'}</div>
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
            <div class="card-actions-right">
              <button class="card-viz-btn" data-id="${p.id}" title="Launch Interactive Visualizer">▶️ Visualizer</button>
              <div class="view-sol-link">Solution ➔</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to problem cards
    problemsCardsGrid.querySelectorAll('.problem-card-item').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt(card.getAttribute('data-id'));
        const prob = appData.all_problems.find(x => x.id === id);
        if (prob) {
          openProblemModal(prob, 'tab-visualizer');
        }
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
            ${pat.total_problems || 10} Problems
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
     💖 PROBLEM SOLUTION MODAL & INTERACTIVE VISUALIZER LAUNCHER
     ============================================================ */
  function openProblemModal(prob, targetTabId = 'tab-visualizer') {
    activeProblem = prob;
    activeLanguage = 'cpp';

    document.getElementById('modalProblemId').textContent = `#${prob.id}`;
    document.getElementById('modalTitleText').textContent = prob.title;
    
    const patChip = document.getElementById('modalPatternChip');
    if (patChip) patChip.textContent = `🧩 ${prob.pattern || 'DSA'}`;

    const lcLink = document.getElementById('modalLcDirectLink');
    if (lcLink) lcLink.href = prob.link || `https://leetcode.com/problemset/all/?search=${encodeURIComponent(prob.title)}`;

    document.getElementById('modalIntuitionContent').innerHTML = prob.intuition || 'Core intuitive breakdown for optimal pattern application.';
    document.getElementById('modalApproachContent').innerHTML = prob.approach || 'Systematic invariant scanning and optimal computational state traversal.';

    const stepsList = document.getElementById('modalAlgorithmSteps');
    if (prob.algorithm && Array.isArray(prob.algorithm)) {
      stepsList.innerHTML = prob.algorithm.map(step => `<li>${step}</li>`).join('');
    } else {
      stepsList.innerHTML = `<li>Initialize state pointers or data structures for ${prob.pattern}.</li><li>Iterate through input while maintaining invariants.</li><li>Return calculated optimum result.</li>`;
    }

    document.getElementById('modalTimeCompVal').textContent = prob.time_complexity || prob.complexity?.time?.split(' - ')[0] || 'O(N)';
    document.getElementById('modalTimeCompDesc').textContent = prob.complexity?.time || 'Single pass algorithm traversal.';
    document.getElementById('modalSpaceCompVal').textContent = prob.space_complexity || prob.complexity?.space?.split(' - ')[0] || 'O(1)';
    document.getElementById('modalSpaceCompDesc').textContent = prob.complexity?.space || 'Auxiliary memory usage for state tracking.';

    updateModalCodeView();

    document.getElementById('modalSummaryContent').innerHTML = prob.summary || `**Key Takeaway for ${prob.title}**: Remember to utilize **${prob.pattern}** whenever given sorted data, contiguous sub-arrays, or optimal decision choices.`;

    // Activate the requested tab
    document.querySelectorAll('.section-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === targetTabId);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === targetTabId);
    });

    // Mount Interactive Visualizer for this problem
    const mountPoint = document.getElementById('problemVisualizerMount');
    if (mountPoint && window.DSAVisualizer) {
      window.DSAVisualizer.mount(mountPoint, prob);
    }

    problemModalBackdrop.classList.add('open');
  }

  function highlightSyntax(rawCode, lang = 'cpp') {
    if (!rawCode) return '<div class="code-line"><span class="line-num">1</span><span class="line-content">// No solution code available</span></div>';

    // Escape basic HTML entities first
    let code = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Common Keywords across C++, Java, Python, JS
    const commonKeywords = [
      'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
      'class', 'public', 'private', 'protected', 'virtual', 'override', 'static', 'const',
      'new', 'delete', 'throw', 'try', 'catch', 'finally', 'import', 'from', 'package',
      'using', 'namespace', 'typedef', 'struct', 'enum', 'interface', 'extends', 'implements',
      'def', 'function', 'let', 'var', 'async', 'await', 'yield', 'lambda', 'self', 'this',
      'in', 'of', 'and', 'or', 'not', 'is', 'None', 'True', 'False', 'true', 'false', 'null',
      'undefined', 'auto', 'decltype', 'template', 'typename', 'sizeof'
    ];

    // Common Types & Data Structures
    const commonTypes = [
      'int', 'long', 'float', 'double', 'char', 'bool', 'boolean', 'void', 'short', 'byte',
      'vector', 'string', 'String', 'pair', 'unordered_map', 'unordered_set', 'map', 'set',
      'queue', 'deque', 'stack', 'priority_queue', 'List', 'ArrayList', 'LinkedList',
      'HashMap', 'HashSet', 'TreeMap', 'TreeSet', 'Map', 'Set', 'Array', 'Object',
      'Optional', 'Dict', 'Tuple', 'ListNode', 'TreeNode', 'Node'
    ];

    const lines = code.split('\n');
    const highlightedLines = lines.map((line, lineIdx) => {
      let comment = '';
      let codePart = line;

      // 1. Line comments
      const commentMatch = line.match(/(\/\/.*$|#.*$)/);
      if (commentMatch) {
        const idx = commentMatch.index;
        comment = `<span class="token-comment">${commentMatch[0]}</span>`;
        codePart = line.substring(0, idx);
      }

      // 2. Strings & Character literals
      const strings = [];
      codePart = codePart.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
        const ph = `___STR_PH_${strings.length}___`;
        strings.push(`<span class="token-string">${match}</span>`);
        return ph;
      });

      // 3. Numbers
      codePart = codePart.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token-number">$1</span>');

      // 4. Keywords
      const kwRegex = new RegExp(`\\b(${commonKeywords.join('|')})\\b`, 'g');
      codePart = codePart.replace(kwRegex, '<span class="token-keyword">$1</span>');

      // 5. Types
      const typeRegex = new RegExp(`\\b(${commonTypes.join('|')})\\b`, 'g');
      codePart = codePart.replace(typeRegex, '<span class="token-type">$1</span>');

      // 6. Function calls (e.g., twoSum, push, pop, solve)
      codePart = codePart.replace(/\b([a-zA-Z_]\w*)(?=\s*\()/g, '<span class="token-fn">$1</span>');

      // Restore strings
      strings.forEach((strHtml, i) => {
        codePart = codePart.replace(`___STR_PH_${i}___`, strHtml);
      });

      const fullLineContent = codePart + comment;
      const lineNum = lineIdx + 1;
      return `<div class="code-line"><span class="line-num">${lineNum}</span><span class="line-content">${fullLineContent || ' '}</span></div>`;
    });

    return highlightedLines.join('');
  }

  function updateModalCodeView() {
    if (!activeProblem || !activeProblem.solutions) return;

    const solObj = activeProblem.solutions[activeLanguage] || activeProblem.solutions['cpp'] || {};
    const rawCode = solObj.code || '// Code solution';
    
    const langNames = {
      cpp: '⚡ C++ (Optimal Solution)',
      java: '☕ Java (Collections Framework)',
      python: '🐍 Python 3 (Pythonic Optimal)',
      javascript: '🟨 JavaScript (Modern ES6+)'
    };

    const langBadge = document.getElementById('activeLangBadge');
    if (langBadge) {
      langBadge.textContent = langNames[activeLanguage] || activeLanguage.toUpperCase();
    }

    const codeContainer = document.getElementById('modalCodeContainer');
    if (codeContainer) {
      codeContainer.innerHTML = highlightSyntax(rawCode, activeLanguage);
    }

    const explanationBox = document.getElementById('modalLangExplanation');
    if (explanationBox) {
      explanationBox.innerHTML = `
        <div class="lang-tip-pill">
          <strong>💡 ${langNames[activeLanguage] || 'Language Insights'}:</strong> ${solObj.explanation || 'Clean, efficient implementation adhering to LeetCode pattern standards.'}
        </div>
      `;
    }

    document.querySelectorAll('.lang-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === activeLanguage);
    });
  }

  function closeProblemModal() {
    if (window.DSAVisualizer) {
      window.DSAVisualizer.stop();
    }
    problemModalBackdrop.classList.remove('open');
  }

  /* ============================================================
     👤 PROFILE MODAL
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
    
    heroSection.style.display = viewName === 'grid' ? 'flex' : 'none';
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

    // Hero Action Buttons
    if (heroExploreVisualizerBtn) {
      heroExploreVisualizerBtn.addEventListener('click', () => {
        const firstProb = appData.all_problems[0] || { id: 1, title: 'Two Sum', patternId: 'two-pointers' };
        openProblemModal(firstProb, 'tab-visualizer');
      });
    }

    if (heroExploreGridBtn) {
      heroExploreGridBtn.addEventListener('click', () => {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (heroProfileBtn) {
      heroProfileBtn.addEventListener('click', () => {
        openProfileModal();
      });
    }

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
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');

        // If switched away from visualizer, pause play interval
        if (targetId !== 'tab-visualizer' && window.DSAVisualizer) {
          window.DSAVisualizer.stop();
        }
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
      let codeToCopy = '';
      if (activeProblem && activeProblem.solutions && activeProblem.solutions[activeLanguage]) {
        codeToCopy = activeProblem.solutions[activeLanguage].code || '';
      } else {
        codeToCopy = document.getElementById('modalCodeContainer').innerText || '';
      }

      navigator.clipboard.writeText(codeToCopy).then(() => {
        const origText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '✨ Copied!';
        setTimeout(() => {
          copyCodeBtn.innerHTML = origText;
        }, 2000);
      });
    });
  }

});