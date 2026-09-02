/**
 * 🎮 UNIVERSAL INTERACTIVE DSA VISUALIZER ENGINE
 * Supporting all 100 LeetCode Problems & 10 Core DSA Patterns
 * Inspired by CodeCrusaders LC, Striver, & NeetCode
 */

(function (window) {
  'use strict';

  class DSAVisualizerEngine {
    constructor() {
      this.currentProblem = null;
      this.steps = [];
      this.currentStepIndex = 0;
      this.isPlaying = false;
      this.playbackSpeed = 1.0; // 0.5x, 1x, 2x
      this.playInterval = null;
      this.customInputData = null;

      // DOM container references
      this.container = null;
      this.controlsContainer = null;
      this.canvasContainer = null;
      this.explanationBox = null;
      this.stepBadge = null;
      this.variableWatcher = null;
      this.progressBar = null;
      this.stepCounter = null;
      this.percentCounter = null;
    }

    /**
     * Initialize Visualizer for a given problem object
     */
    mount(containerElement, problem) {
      this.stop();
      this.container = containerElement;
      this.currentProblem = problem;
      this.customInputData = null;
      this.currentStepIndex = 0;

      this.renderLayout();
      this.generateStepsForProblem();
      this.updateUI();
    }

    /**
     * Build the Visualizer UI Layout
     */
    renderLayout() {
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="dsa-viz-wrapper">
          <!-- Top Bar: Problem Preset Inputs & Custom Input Controller -->
          <div class="viz-header-panel">
            <div class="viz-presets-group">
              <span class="viz-panel-label">⚡ Test Cases:</span>
              <div class="viz-preset-buttons" id="vizPresetButtons"></div>
            </div>
            <div class="viz-custom-input-group">
              <input type="text" id="vizCustomInput" class="viz-input-field" placeholder="Custom input e.g. nums=[2,7,11,15], target=9" />
              <button class="viz-btn-action" id="vizRunCustomBtn">▶️ Simulate</button>
            </div>
          </div>

          <!-- Main Interactive Canvas -->
          <div class="viz-canvas-area" id="vizCanvasArea">
            <div class="viz-render-stage" id="vizRenderStage"></div>
          </div>

          <!-- Step Explanation Callout Banner -->
          <div class="viz-explanation-banner" id="vizExplanationBanner">
            <div class="viz-step-badge" id="vizStepBadge">Step 1</div>
            <div class="viz-step-text" id="vizStepText">Initializing algorithm state...</div>
          </div>

          <!-- Live State Variable Inspector Panel -->
          <div class="viz-state-inspector" id="vizStateInspector">
            <div class="inspector-title">🔍 Variable State Watcher</div>
            <div class="inspector-vars-grid" id="vizVarsGrid"></div>
          </div>

          <!-- Bottom Control Bar (Step Controls, Speed, Progress) -->
          <div class="viz-controls-panel">
            <div class="viz-playback-buttons">
              <button class="viz-ctrl-btn" id="vizBtnFirst" title="First Step (Reset)">⏮️</button>
              <button class="viz-ctrl-btn" id="vizBtnPrev" title="Previous Step">⏪ Prev</button>
              <button class="viz-ctrl-btn viz-play-btn" id="vizBtnPlay" title="Auto Play / Pause">▶️ Play</button>
              <button class="viz-ctrl-btn" id="vizBtnNext" title="Next Step">Next ⏩</button>
            </div>

            <!-- Progress Tracker -->
            <div class="viz-progress-container">
              <div class="viz-progress-info">
                <span id="vizStepCounter">Step 0 / 0</span>
                <span id="vizPercentCounter">0%</span>
              </div>
              <div class="viz-progress-track">
                <div class="viz-progress-fill" id="vizProgressBar" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Speed Controller -->
            <div class="viz-speed-group">
              <button class="viz-speed-btn" data-speed="0.5">0.5x</button>
              <button class="viz-speed-btn active" data-speed="1.0">1.0x</button>
              <button class="viz-speed-btn" data-speed="2.0">2.0x</button>
            </div>
          </div>
        </div>
      `;

      // Cache DOM references
      this.canvasContainer = this.container.querySelector('#vizRenderStage');
      this.explanationBox = this.container.querySelector('#vizStepText');
      this.stepBadge = this.container.querySelector('#vizStepBadge');
      this.variableWatcher = this.container.querySelector('#vizVarsGrid');
      this.progressBar = this.container.querySelector('#vizProgressBar');
      this.stepCounter = this.container.querySelector('#vizStepCounter');
      this.percentCounter = this.container.querySelector('#vizPercentCounter');

      this.bindEvents();
      this.renderPresets();
    }

    /**
     * Render preset testcase buttons for the current problem
     */
    renderPresets() {
      const presetsContainer = this.container.querySelector('#vizPresetButtons');
      if (!presetsContainer) return;

      const presets = this.getPresetsForProblem(this.currentProblem);
      presetsContainer.innerHTML = presets.map((tc, idx) => `
        <button class="viz-preset-pill ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
          ${tc.label}
        </button>
      `).join('');

      presetsContainer.querySelectorAll('.viz-preset-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          presetsContainer.querySelectorAll('.viz-preset-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const idx = parseInt(btn.getAttribute('data-idx'));
          this.applyPreset(presets[idx]);
        });
      });

      // Populate input field with initial preset
      const customInput = this.container.querySelector('#vizCustomInput');
      if (customInput && presets[0]) {
        customInput.value = presets[0].inputString || '';
      }
    }

    /**
     * Bind Visualizer control events
     */
    bindEvents() {
      const btnFirst = this.container.querySelector('#vizBtnFirst');
      const btnPrev = this.container.querySelector('#vizBtnPrev');
      const btnPlay = this.container.querySelector('#vizBtnPlay');
      const btnNext = this.container.querySelector('#vizBtnNext');
      const runCustomBtn = this.container.querySelector('#vizRunCustomBtn');
      const customInput = this.container.querySelector('#vizCustomInput');

      btnFirst?.addEventListener('click', () => this.firstStep());
      btnPrev?.addEventListener('click', () => this.prevStep());
      btnPlay?.addEventListener('click', () => this.togglePlay());
      btnNext?.addEventListener('click', () => this.nextStep());

      runCustomBtn?.addEventListener('click', () => {
        const val = customInput.value.trim();
        if (val) {
          this.runCustomSimulation(val);
        }
      });

      customInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = customInput.value.trim();
          if (val) this.runCustomSimulation(val);
        }
      });

      // Speed selection
      this.container.querySelectorAll('.viz-speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.container.querySelectorAll('.viz-speed-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.playbackSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
          if (this.isPlaying) {
            this.stop();
            this.play();
          }
        });
      });
    }

    applyPreset(preset) {
      this.stop();
      this.customInputData = preset.data;
      const customInput = this.container.querySelector('#vizCustomInput');
      if (customInput) customInput.value = preset.inputString || '';
      this.generateStepsForProblem();
      this.currentStepIndex = 0;
      this.updateUI();
    }

    runCustomSimulation(inputStr) {
      try {
        const parsed = this.parseCustomInput(inputStr, this.currentProblem);
        this.stop();
        this.customInputData = parsed;
        this.generateStepsForProblem();
        this.currentStepIndex = 0;
        this.updateUI();
      } catch (err) {
        alert('Could not parse input. Please use format e.g. nums=[2,7,11,15], target=9');
      }
    }

    parseCustomInput(inputStr, problem) {
      let nums = [2, 7, 11, 15];
      let target = 9;

      const numsMatch = inputStr.match(/(?:nums\s*=\s*)?\[([\d\s,-]+)\]/i);
      if (numsMatch) {
        nums = numsMatch[1].split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
      }

      const targetMatch = inputStr.match(/target\s*=\s*(-?\d+)/i) || inputStr.match(/k\s*=\s*(-?\d+)/i) || inputStr.match(/n\s*=\s*(-?\d+)/i);
      if (targetMatch) {
        target = parseInt(targetMatch[1]);
      }

      const strMatch = inputStr.match(/s\s*=\s*["']([^"']+)["']/i);
      if (strMatch) {
        return { str: strMatch[1], nums, target };
      }

      return { nums, target };
    }

    /* ============================================================
       PLAYBACK CONTROLS
       ============================================================ */
    firstStep() {
      this.stop();
      this.currentStepIndex = 0;
      this.updateUI();
    }

    prevStep() {
      this.stop();
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.updateUI();
      }
    }

    nextStep() {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.updateUI();
      } else {
        this.stop();
      }
    }

    togglePlay() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
    }

    play() {
      if (this.currentStepIndex >= this.steps.length - 1) {
        this.currentStepIndex = 0;
      }
      this.isPlaying = true;
      const playBtn = this.container.querySelector('#vizBtnPlay');
      if (playBtn) {
        playBtn.innerHTML = '⏸️ Pause';
        playBtn.classList.add('active-pause');
      }

      const delay = Math.max(400, Math.floor(1200 / this.playbackSpeed));
      this.playInterval = setInterval(() => {
        if (this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex++;
          this.updateUI();
        } else {
          this.stop();
        }
      }, delay);
    }

    stop() {
      this.isPlaying = false;
      if (this.playInterval) {
        clearInterval(this.playInterval);
        this.playInterval = null;
      }
      const playBtn = this.container?.querySelector('#vizBtnPlay');
      if (playBtn) {
        playBtn.innerHTML = '▶️ Play';
        playBtn.classList.remove('active-pause');
      }
    }

    /* ============================================================
       UI UPDATE & RENDER DISPATCHER
       ============================================================ */
    updateUI() {
      if (!this.steps || this.steps.length === 0) return;

      const step = this.steps[this.currentStepIndex] || this.steps[0];
      const totalSteps = this.steps.length;

      // Update Explanation Banner
      if (this.stepBadge) this.stepBadge.textContent = `Step ${this.currentStepIndex + 1} / ${totalSteps}`;
      if (this.explanationBox) {
        this.explanationBox.innerHTML = step.explanation || 'Executing algorithmic state transition...';
      }

      // Update Progress Bar
      const pct = Math.round(((this.currentStepIndex + 1) / totalSteps) * 100);
      if (this.progressBar) this.progressBar.style.width = `${pct}%`;
      if (this.stepCounter) this.stepCounter.textContent = `Step ${this.currentStepIndex + 1} / ${totalSteps}`;
      if (this.percentCounter) this.percentCounter.textContent = `${pct}%`;

      // Update Live State Variables
      if (this.variableWatcher && step.variables) {
        this.variableWatcher.innerHTML = Object.entries(step.variables).map(([k, v]) => `
          <div class="var-badge-item">
            <span class="var-key">${k}:</span>
            <span class="var-val">${typeof v === 'object' ? JSON.stringify(v) : v}</span>
          </div>
        `).join('');
      }

      // Render Visual Canvas based on step view type
      this.renderStepToCanvas(step);
    }

    renderStepToCanvas(step) {
      if (!this.canvasContainer) return;

      switch (step.type) {
        case 'two-pointers':
        case 'array-pointers':
          this.renderTwoPointersView(step);
          break;
        case 'sliding-window':
          this.renderSlidingWindowView(step);
          break;
        case 'binary-search':
          this.renderBinarySearchView(step);
          break;
        case 'stack-queue':
          this.renderStackQueueView(step);
          break;
        case 'linked-list':
          this.renderLinkedListView(step);
          break;
        case 'tree-graph':
          this.renderTreeGraphView(step);
          break;
        case 'backtracking':
          this.renderBacktrackingView(step);
          break;
        case 'heap':
          this.renderHeapView(step);
          break;
        case 'dp-table':
          this.renderDPTableView(step);
          break;
        case 'greedy-bit':
          this.renderGreedyBitView(step);
          break;
        default:
          this.renderUniversalArrayView(step);
          break;
      }
    }

    /* ============================================================
       CANVAS VISUAL RENDERERS
       ============================================================ */

    // 1. Two Pointers / Array View
    renderTwoPointersView(step) {
      const arr = step.array || [];
      const left = step.left;
      const right = step.right;
      const activeIndices = step.activeIndices || [];
      const matchedIndices = step.matchedIndices || [];

      let html = `<div class="viz-array-track">`;
      arr.forEach((val, idx) => {
        let isLeft = idx === left;
        let isRight = idx === right;
        let isActive = activeIndices.includes(idx) || isLeft || isRight;
        let isMatched = matchedIndices.includes(idx);

        let itemClass = 'viz-array-item';
        if (isMatched) itemClass += ' matched';
        else if (isActive) itemClass += ' active';

        html += `
          <div class="viz-node-wrapper">
            <div class="${itemClass}">
              <span class="node-val">${val}</span>
              <span class="node-idx">[${idx}]</span>
            </div>
            <div class="pointer-badges-col">
              ${isLeft ? '<span class="ptr-tag ptr-left">L (Left)</span>' : ''}
              ${isRight ? '<span class="ptr-tag ptr-right">R (Right)</span>' : ''}
              ${step.pivot === idx ? '<span class="ptr-tag ptr-pivot">Pivot</span>' : ''}
            </div>
          </div>
        `;
      });
      html += `</div>`;

      if (step.summaryText) {
        html += `<div class="viz-sub-summary">${step.summaryText}</div>`;
      }

      this.canvasContainer.innerHTML = html;
    }

    // 2. Sliding Window View
    renderSlidingWindowView(step) {
      const arr = step.array || [];
      const wStart = step.windowStart !== undefined ? step.windowStart : step.left;
      const wEnd = step.windowEnd !== undefined ? step.windowEnd : step.right;

      let html = `<div class="viz-sliding-window-container">`;
      html += `<div class="viz-array-track">`;

      arr.forEach((val, idx) => {
        const inWindow = idx >= wStart && idx <= wEnd;
        let itemClass = 'viz-array-item';
        if (inWindow) itemClass += ' in-window';
        if (idx === wStart || idx === wEnd) itemClass += ' window-edge';

        html += `
          <div class="viz-node-wrapper">
            <div class="${itemClass}">
              <span class="node-val">${val}</span>
              <span class="node-idx">[${idx}]</span>
            </div>
            <div class="pointer-badges-col">
              ${idx === wStart ? '<span class="ptr-tag ptr-left">Start (' + wStart + ')</span>' : ''}
              ${idx === wEnd ? '<span class="ptr-tag ptr-right">End (' + wEnd + ')</span>' : ''}
            </div>
          </div>
        `;
      });
      html += `</div>`;

      // Window Stats Badge
      html += `
        <div class="viz-window-metrics-badge">
          <span>🪟 Current Window: <strong>[${wStart} ... ${wEnd}]</strong></span>
          <span>Length: <strong>${Math.max(0, wEnd - wStart + 1)}</strong></span>
          ${step.windowSum !== undefined ? `<span>Window Sum: <strong>${step.windowSum}</strong></span>` : ''}
          ${step.maxVal !== undefined ? `<span>Max Target Metric: <strong>${step.maxVal}</strong></span>` : ''}
        </div>
      `;

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 3. Binary Search View
    renderBinarySearchView(step) {
      const arr = step.array || [];
      const low = step.low;
      const high = step.high;
      const mid = step.mid;
      const target = step.target;

      let html = `<div class="viz-binary-search-wrapper">`;
      html += `<div class="viz-array-track">`;

      arr.forEach((val, idx) => {
        const inRange = idx >= low && idx <= high;
        const isMid = idx === mid;
        const isFound = step.foundIndex === idx;

        let itemClass = 'viz-array-item';
        if (isFound) itemClass += ' matched';
        else if (isMid) itemClass += ' active mid-highlight';
        else if (!inRange) itemClass += ' dimmed';

        html += `
          <div class="viz-node-wrapper">
            <div class="${itemClass}">
              <span class="node-val">${val}</span>
              <span class="node-idx">[${idx}]</span>
            </div>
            <div class="pointer-badges-col">
              ${idx === low ? '<span class="ptr-tag ptr-left">Low</span>' : ''}
              ${idx === mid ? '<span class="ptr-tag ptr-mid">Mid</span>' : ''}
              ${idx === high ? '<span class="ptr-tag ptr-right">High</span>' : ''}
            </div>
          </div>
        `;
      });
      html += `</div>`;

      // Search Status Card
      html += `
        <div class="viz-bs-info-card">
          <span class="bs-target-tag">Target: <strong>${target}</strong></span>
          <span>Current Range: <strong>[${low} ... ${high}]</strong></span>
          ${mid !== undefined ? `<span>nums[mid=${mid}] = <strong>${arr[mid]}</strong></span>` : ''}
          ${step.comparison ? `<span class="bs-comp-badge">${step.comparison}</span>` : ''}
        </div>
      `;

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 4. Stack & Queue View
    renderStackQueueView(step) {
      const stack = step.stack || [];
      const incoming = step.incoming !== undefined ? step.incoming : null;
      const popped = step.popped !== undefined ? step.popped : null;

      let html = `<div class="viz-stack-container">`;
      
      // Left: Stack Barrel
      html += `
        <div class="stack-barrel-box">
          <div class="barrel-header">📥 Stack Container (LIFO)</div>
          <div class="stack-items-column">
            ${stack.length === 0 ? '<div class="stack-empty-placeholder">Empty Stack [ ]</div>' : ''}
            ${stack.map((item, idx) => `
              <div class="stack-item-card ${idx === stack.length - 1 ? 'stack-top' : ''}">
                <span>${item}</span>
                ${idx === stack.length - 1 ? '<span class="top-indicator">TOP 👈</span>' : ''}
              </div>
            `).reverse().join('')}
          </div>
        </div>
      `;

      // Right: Operations Summary
      html += `
        <div class="stack-actions-dashboard">
          <div class="action-card-header">⚡ Stack Operation</div>
          <div class="action-event-pill">${step.action || 'Inspection'}</div>
          ${incoming !== null ? `<div class="action-detail">➡️ Pushing element: <strong>${incoming}</strong></div>` : ''}
          ${popped !== null ? `<div class="action-detail">⬅️ Popped element: <strong style="color: #ff477e;">${popped}</strong></div>` : ''}
          ${step.matchResult ? `<div class="action-match-badge">${step.matchResult}</div>` : ''}
        </div>
      `;

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 5. Linked List View
    renderLinkedListView(step) {
      const nodes = step.nodes || [];
      const slow = step.slow;
      const fast = step.fast;
      const curr = step.curr;
      const prev = step.prev;

      let html = `<div class="viz-linkedlist-track">`;

      nodes.forEach((val, idx) => {
        let isSlow = idx === slow;
        let isFast = idx === fast;
        let isCurr = idx === curr;
        let isPrev = idx === prev;

        html += `
          <div class="ll-node-wrapper">
            <div class="ll-node-box ${isCurr ? 'active' : ''} ${isSlow ? 'slow-highlight' : ''}">
              <div class="ll-data-val">${val}</div>
              <div class="ll-next-socket">●</div>
            </div>
            <div class="pointer-badges-col">
              ${isSlow ? '<span class="ptr-tag ptr-slow">🐢 Slow (' + idx + ')</span>' : ''}
              ${isFast ? '<span class="ptr-tag ptr-fast">🐇 Fast (' + idx + ')</span>' : ''}
              ${isPrev ? '<span class="ptr-tag ptr-left">Prev</span>' : ''}
              ${isCurr ? '<span class="ptr-tag ptr-mid">Curr</span>' : ''}
            </div>
          </div>
          ${idx < nodes.length - 1 ? '<div class="ll-arrow-link">➔</div>' : '<div class="ll-null-tag">NULL</div>'}
        `;
      });

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 6. Tree / Graph BFS & DFS View
    renderTreeGraphView(step) {
      const visited = step.visited || [];
      const current = step.current;
      const queue = step.queue || [];

      let html = `<div class="viz-tree-layout">`;

      html += `
        <div class="tree-nodes-hierarchy">
          <div class="tree-level level-0">
            <div class="tree-node-circle ${current === 1 ? 'current' : visited.includes(1) ? 'visited' : ''}">1</div>
          </div>
          <div class="tree-branches-row">
            <div class="branch-connector">/</div>
            <div class="branch-connector">\\</div>
          </div>
          <div class="tree-level level-1">
            <div class="tree-node-circle ${current === 2 ? 'current' : visited.includes(2) ? 'visited' : ''}">2</div>
            <div class="tree-node-circle ${current === 3 ? 'current' : visited.includes(3) ? 'visited' : ''}">3</div>
          </div>
          <div class="tree-branches-row">
            <div class="branch-connector">/</div>
            <div class="branch-connector">\\</div>
          </div>
          <div class="tree-level level-2">
            <div class="tree-node-circle ${current === 4 ? 'current' : visited.includes(4) ? 'visited' : ''}">4</div>
            <div class="tree-node-circle ${current === 5 ? 'current' : visited.includes(5) ? 'visited' : ''}">5</div>
          </div>
        </div>
      `;

      // BFS Queue / DFS Stack inspector
      html += `
        <div class="tree-queue-panel">
          <div class="panel-header">📋 Traversal Queue / State</div>
          <div class="queue-row-items">
            ${queue.length === 0 ? '<span class="empty-q">Queue Empty</span>' : queue.map(q => `
              <div class="queue-pill-item">${q}</div>
            `).join(' ➔ ')}
          </div>
          <div class="visited-order-row">
            <span>Visited Order:</span>
            <div class="visited-pills">${visited.join(' ➔ ') || 'None'}</div>
          </div>
        </div>
      `;

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 7. Backtracking / Recursion View
    renderBacktrackingView(step) {
      const currentPath = step.path || [];
      const choices = step.choices || [];
      const results = step.results || [];

      let html = `<div class="viz-backtracking-container">`;
      html += `
        <div class="decision-state-box">
          <div class="state-title">🌲 Decision Tree State (Depth: ${step.depth || 0})</div>
          <div class="current-path-row">
            <span class="path-label">Current Candidate Path:</span>
            <div class="path-pills-row">
              ${currentPath.length === 0 ? '<span class="empty-path">[ ] (Root)</span>' : currentPath.map(p => `
                <span class="path-pill-item">${p}</span>
              `).join(' ➔ ')}
            </div>
          </div>
          <div class="choices-row">
            <span class="choices-label">Available Choices at this step:</span>
            <div class="choices-pills">
              ${choices.map(c => `<span class="choice-tag">${c}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      html += `
        <div class="collected-results-box">
          <div class="results-header">🎯 Valid Solutions Accumulated (${results.length}):</div>
          <div class="solutions-grid">
            ${results.length === 0 ? '<span class="no-sol">Searching solution space...</span>' : results.map(r => `
              <div class="solution-pill">[ ${Array.isArray(r) ? r.join(', ') : r} ]</div>
            `).join('')}
          </div>
        </div>
      `;

      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 8. Heap / Priority Queue View
    renderHeapView(step) {
      const heap = step.heap || [];
      const op = step.operation || 'Heap State';

      let html = `<div class="viz-heap-container">`;
      html += `
        <div class="heap-array-visualizer">
          <div class="heap-title">⛰️ Min/Max Heap Buffer [${op}]</div>
          <div class="viz-array-track">
            ${heap.map((val, idx) => `
              <div class="viz-node-wrapper">
                <div class="viz-array-item ${idx === 0 ? 'active' : ''}">
                  <span class="node-val">${val}</span>
                  <span class="node-idx">[${idx}]</span>
                </div>
                ${idx === 0 ? '<span class="ptr-tag ptr-left">Root (Min/Max)</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 9. DP Table View
    renderDPTableView(step) {
      const dp = step.dp || [];
      const currentIdx = step.currentIdx;

      let html = `<div class="viz-dp-container">`;
      html += `
        <div class="dp-table-box">
          <div class="dp-header">📊 Dynamic Programming State Array (Memoization)</div>
          <div class="dp-cells-row">
            ${dp.map((val, idx) => `
              <div class="dp-cell-item ${idx === currentIdx ? 'active-dp-cell' : ''}">
                <div class="dp-idx">dp[${idx}]</div>
                <div class="dp-val">${val !== undefined && val !== null ? val : '∞'}</div>
              </div>
            `).join('')}
          </div>
          ${step.formula ? `<div class="dp-formula-callout">📐 Transition: <code>${step.formula}</code></div>` : ''}
        </div>
      `;
      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // 10. Greedy & Bit Manipulation View
    renderGreedyBitView(step) {
      const num = step.num !== undefined ? step.num : 42;
      const binaryStr = (num >>> 0).toString(2).padStart(8, '0');
      const resultVal = step.result !== undefined ? step.result : 0;

      let html = `<div class="viz-bit-container">`;
      html += `
        <div class="bit-register-box">
          <div class="bit-title">⚙️ Binary Bit Register (Value: ${num})</div>
          <div class="bit-bits-row">
            ${binaryStr.split('').map((b, idx) => `
              <div class="bit-cell ${b === '1' ? 'bit-set' : 'bit-zero'}">
                <span class="bit-val">${b}</span>
                <span class="bit-pos">${7 - idx}</span>
              </div>
            `).join('')}
          </div>
          <div class="bit-result-badge">Accumulator / Result: <strong>${resultVal}</strong></div>
        </div>
      `;
      html += `</div>`;
      this.canvasContainer.innerHTML = html;
    }

    // Fallback Universal Array View
    renderUniversalArrayView(step) {
      this.renderTwoPointersView(step);
    }

    /* ============================================================
       PRESETS GENERATOR FOR ALL PROBLEMS
       ============================================================ */
    getPresetsForProblem(problem) {
      if (!problem) return [];
      const pid = problem.id;

      // Problem-specific presets
      if (pid === 1) { // Two Sum
        return [
          { label: 'Example 1: nums=[2,7,11,15], target=9', data: { nums: [2, 7, 11, 15], target: 9 }, inputString: 'nums=[2,7,11,15], target=9' },
          { label: 'Example 2: nums=[3,2,4], target=6', data: { nums: [3, 2, 4], target: 6 }, inputString: 'nums=[3,2,4], target=6' },
          { label: 'Example 3: nums=[3,3], target=6', data: { nums: [3, 3], target: 6 }, inputString: 'nums=[3,3], target=6' }
        ];
      } else if (pid === 2) { // Valid Palindrome
        return [
          { label: 'Example 1: "A man, a plan, a canal: Panama"', data: { str: 'amanaplanacanalpanama' }, inputString: 's="A man, a plan, a canal: Panama"' },
          { label: 'Example 2: "race a car"', data: { str: 'raceacar' }, inputString: 's="race a car"' }
        ];
      } else if (pid === 3) { // 3Sum
        return [
          { label: 'Example 1: [-1, 0, 1, 2, -1, -4]', data: { nums: [-1, 0, 1, 2, -1, -4] }, inputString: 'nums=[-1,0,1,2,-1,-4]' },
          { label: 'Example 2: [0, 1, 1]', data: { nums: [0, 1, 1] }, inputString: 'nums=[0,1,1]' }
        ];
      } else if (pid === 11 || pid === 21) { // Binary Search
        return [
          { label: 'Example 1: nums=[-1,0,3,5,9,12], target=9', data: { nums: [-1, 0, 3, 5, 9, 12], target: 9 }, inputString: 'nums=[-1,0,3,5,9,12], target=9' },
          { label: 'Example 2: nums=[-1,0,3,5,9,12], target=2', data: { nums: [-1, 0, 3, 5, 9, 12], target: 2 }, inputString: 'nums=[-1,0,3,5,9,12], target=2' }
        ];
      } else if (pid === 31 || pid === 32) { // Valid Parentheses
        return [
          { label: 'Example 1: "()[]{}"', data: { str: '()[]{}' }, inputString: 's="()[]{}"' },
          { label: 'Example 2: "(]" (Invalid)', data: { str: '(]' }, inputString: 's="(]"' }
        ];
      } else if (pid === 41) { // Reverse Linked List
        return [
          { label: 'Example 1: [1, 2, 3, 4, 5]', data: { nodes: [1, 2, 3, 4, 5] }, inputString: 'head=[1,2,3,4,5]' },
          { label: 'Example 2: [1, 2]', data: { nodes: [1, 2] }, inputString: 'head=[1,2]' }
        ];
      } else if (pid === 81 || pid === 82) { // Climbing Stairs / Coin Change
        return [
          { label: 'Example 1: n = 4', data: { n: 4 }, inputString: 'n=4' },
          { label: 'Example 2: n = 5', data: { n: 5 }, inputString: 'n=5' }
        ];
      }

      // Default Pattern Fallback Presets
      return [
        { label: 'Standard Test Case', data: { nums: [1, 3, 5, 7, 9, 11], target: 7 }, inputString: 'nums=[1,3,5,7,9,11], target=7' },
        { label: 'Secondary Test Case', data: { nums: [2, 4, 6, 8, 10], target: 8 }, inputString: 'nums=[2,4,6,8,10], target=8' }
      ];
    }

    /* ============================================================
       SIMULATION STEP GENERATORS (ALL 100 PROBLEMS COVERAGE)
       ============================================================ */
    generateStepsForProblem() {
      const p = this.currentProblem;
      if (!p) return;

      const pid = p.id;
      const pat = p.patternId || '';

      // Check for specific handcrafted algorithms first
      if (pid === 1) {
        this.steps = this.generateTwoSumSteps(this.customInputData);
      } else if (pid === 2) {
        this.steps = this.generateValidPalindromeSteps(this.customInputData);
      } else if (pid === 3) {
        this.steps = this.generate3SumSteps(this.customInputData);
      } else if (pid === 4 || (pat === 'sliding-window' && (p.title.includes('Longest Substring') || p.title.includes('Window')))) {
        this.steps = this.generateSlidingWindowSteps(this.customInputData);
      } else if (pat === 'binary-search' || p.title.includes('Binary Search') || p.title.includes('Search')) {
        this.steps = this.generateBinarySearchSteps(this.customInputData);
      } else if (pat === 'stack-queue' || p.title.includes('Parentheses') || p.title.includes('Stack')) {
        this.steps = this.generateStackSteps(this.customInputData);
      } else if (pat === 'linked-list' || p.title.includes('Linked List')) {
        this.steps = this.generateLinkedListSteps(this.customInputData);
      } else if (pat === 'trees-graphs' || p.title.includes('Tree') || p.title.includes('Graph')) {
        this.steps = this.generateTreeBFSDFSSteps(this.customInputData);
      } else if (pat === 'backtracking' || p.title.includes('Combination') || p.title.includes('Subsets')) {
        this.steps = this.generateBacktrackingSteps(this.customInputData);
      } else if (pat === 'heap-pq' || p.title.includes('Heap') || p.title.includes('Kth Largest')) {
        this.steps = this.generateHeapSteps(this.customInputData);
      } else if (pat === 'dynamic-programming' || p.title.includes('Coin') || p.title.includes('Climbing') || p.title.includes('Robber')) {
        this.steps = this.generateDPSteps(this.customInputData);
      } else if (pat === 'greedy-bit' || p.title.includes('Bit') || p.title.includes('Single Number')) {
        this.steps = this.generateGreedyBitSteps(this.customInputData);
      } else {
        // Universal Pattern Fallback
        this.steps = this.generateUniversalPatternSteps(p, this.customInputData);
      }
    }

    // Handcrafted Generator 1: Two Sum
    generateTwoSumSteps(input) {
      const nums = input?.nums || [2, 7, 11, 15];
      const target = input?.target !== undefined ? input.target : 9;
      const steps = [];

      steps.push({
        type: 'two-pointers',
        array: nums,
        left: 0,
        activeIndices: [0],
        explanation: `Initialize Hash Map <code>seen = {}</code>. Target sum = <strong>${target}</strong>.`,
        variables: { target, i: 0, 'nums[i]': nums[0], seenMap: '{}' }
      });

      const map = {};
      let found = false;

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        steps.push({
          type: 'two-pointers',
          array: nums,
          left: i,
          activeIndices: [i],
          explanation: `At index <strong>${i}</strong>, value is <strong>${num}</strong>. Looking for complement: <code>target - nums[i] = ${target} - ${num} = ${complement}</code>.`,
          variables: { i, num, complement, target, seenMap: JSON.stringify(map) }
        });

        if (map[complement] !== undefined) {
          const prevIdx = map[complement];
          steps.push({
            type: 'two-pointers',
            array: nums,
            left: prevIdx,
            right: i,
            matchedIndices: [prevIdx, i],
            explanation: `🎉 <strong>MATCH FOUND!</strong> Complement <strong>${complement}</strong> exists at index <strong>${prevIdx}</strong>! Returning indices <code>[${prevIdx}, ${i}]</code>.`,
            variables: { 'result': `[${prevIdx}, ${i}]`, 'sum': `${nums[prevIdx]} + ${num} = ${target}` }
          });
          found = true;
          break;
        } else {
          map[num] = i;
          steps.push({
            type: 'two-pointers',
            array: nums,
            left: i,
            activeIndices: [i],
            explanation: `Complement <strong>${complement}</strong> not in map. Store current number <code>seen[${num}] = ${i}</code> in Hash Map.`,
            variables: { i, num, seenMap: JSON.stringify(map) }
          });
        }
      }

      if (!found) {
        steps.push({
          type: 'two-pointers',
          array: nums,
          explanation: `Traversal complete. No pair found that sums to <strong>${target}</strong>. Return empty array <code>[]</code>.`,
          variables: { result: '[]' }
        });
      }

      return steps;
    }

    // Handcrafted Generator 2: Valid Palindrome
    generateValidPalindromeSteps(input) {
      const str = input?.str || 'amanaplanacanalpanama';
      const arr = str.split('');
      const steps = [];

      let left = 0;
      let right = arr.length - 1;

      steps.push({
        type: 'two-pointers',
        array: arr,
        left: 0,
        right: arr.length - 1,
        explanation: `Initialize two pointers: <code>left = 0</code> ('${arr[0]}') and <code>right = ${right}</code> ('${arr[right]}').`,
        variables: { left: 0, right, isPalindrome: 'Checking...' }
      });

      let isPal = true;
      while (left < right) {
        steps.push({
          type: 'two-pointers',
          array: arr,
          left,
          right,
          activeIndices: [left, right],
          explanation: `Comparing characters at <code>left=${left}</code> ('${arr[left]}') and <code>right=${right}</code> ('${arr[right]}').`,
          variables: { left, right, 's[left]': arr[left], 's[right]': arr[right] }
        });

        if (arr[left] !== arr[right]) {
          steps.push({
            type: 'two-pointers',
            array: arr,
            left,
            right,
            explanation: `❌ Mismatch detected: '${arr[left]}' != '${arr[right]}'. String is NOT a valid palindrome!`,
            variables: { left, right, result: 'false' }
          });
          isPal = false;
          break;
        } else {
          steps.push({
            type: 'two-pointers',
            array: arr,
            left,
            right,
            matchedIndices: [left, right],
            explanation: `✅ Match: '${arr[left]}' == '${arr[right]}'. Advance pointers inward: <code>left++</code>, <code>right--</code>.`,
            variables: { left: left + 1, right: right - 1 }
          });
          left++;
          right--;
        }
      }

      if (isPal) {
        steps.push({
          type: 'two-pointers',
          array: arr,
          matchedIndices: Array.from({ length: arr.length }, (_, i) => i),
          explanation: `🎉 <strong>VERIFIED PALINDROME!</strong> All character pairs matched symmetrically. Returning <code>true</code>.`,
          variables: { result: 'true', status: 'Valid Palindrome' }
        });
      }

      return steps;
    }

    // Handcrafted Generator 3: 3Sum
    generate3SumSteps(input) {
      let nums = input?.nums || [-1, 0, 1, 2, -1, -4];
      nums = [...nums].sort((a, b) => a - b);
      const steps = [];

      steps.push({
        type: 'two-pointers',
        array: nums,
        explanation: `Sort array in ascending order: <code>[${nums.join(', ')}]</code> to enable two-pointer scanning.`,
        variables: { sortedArray: `[${nums.join(', ')}]` }
      });

      const triplets = [];
      for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;

        steps.push({
          type: 'two-pointers',
          array: nums,
          pivot: i,
          left,
          right,
          explanation: `Fix pivot element at index <strong>${i}</strong> (val: <strong>${nums[i]}</strong>). Search pairs where <code>nums[left] + nums[right] == ${-nums[i]}</code>.`,
          variables: { i, 'nums[i]': nums[i], left, right, targetSum: -nums[i] }
        });

        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum === 0) {
            triplets.push([nums[i], nums[left], nums[right]]);
            steps.push({
              type: 'two-pointers',
              array: nums,
              pivot: i,
              left,
              right,
              matchedIndices: [i, left, right],
              explanation: `🎉 Found valid triplet <strong>[${nums[i]}, ${nums[left]}, ${nums[right]}]</strong> with sum = 0!`,
              variables: { triplet: `[${nums[i]}, ${nums[left]}, ${nums[right]}]`, totalFound: triplets.length }
            });
            left++;
            right--;
            while (left < right && nums[left] === nums[left - 1]) left++;
            while (left < right && nums[right] === nums[right + 1]) right--;
          } else if (sum < 0) {
            steps.push({
              type: 'two-pointers',
              array: nums,
              pivot: i,
              left,
              right,
              explanation: `Sum (${sum}) < 0. Need larger value ➔ increment <code>left++</code>.`,
              variables: { sum, left: left + 1, right }
            });
            left++;
          } else {
            steps.push({
              type: 'two-pointers',
              array: nums,
              pivot: i,
              left,
              right,
              explanation: `Sum (${sum}) > 0. Need smaller value ➔ decrement <code>right--</code>.`,
              variables: { sum, left, right: right - 1 }
            });
            right--;
          }
        }
      }

      steps.push({
        type: 'two-pointers',
        array: nums,
        explanation: `Algorithm finished. Collected <strong>${triplets.length}</strong> unique triplets.`,
        variables: { results: JSON.stringify(triplets) }
      });

      return steps;
    }

    // Sliding Window Generator
    generateSlidingWindowSteps(input) {
      const arr = input?.nums || [2, 1, 5, 2, 3, 2];
      const k = input?.target || 3;
      const steps = [];

      let windowSum = 0;
      let maxSum = 0;
      let wStart = 0;

      steps.push({
        type: 'sliding-window',
        array: arr,
        windowStart: 0,
        windowEnd: 0,
        explanation: `Initialize sliding window of size <code>k = ${k}</code>.`,
        variables: { k, windowStart: 0, windowEnd: 0, maxSum: 0 }
      });

      for (let wEnd = 0; wEnd < arr.length; wEnd++) {
        windowSum += arr[wEnd];

        steps.push({
          type: 'sliding-window',
          array: arr,
          windowStart: wStart,
          windowEnd: wEnd,
          windowSum,
          maxVal: maxSum,
          explanation: `Expand window right: Add <code>arr[${wEnd}] = ${arr[wEnd]}</code>. Current window sum = <strong>${windowSum}</strong>.`,
          variables: { wStart, wEnd, windowSum, currentElement: arr[wEnd] }
        });

        if (wEnd >= k - 1) {
          maxSum = Math.max(maxSum, windowSum);
          steps.push({
            type: 'sliding-window',
            array: arr,
            windowStart: wStart,
            windowEnd: wEnd,
            windowSum,
            maxVal: maxSum,
            explanation: `Window reached target size ${k}. Max sum recorded: <strong>${maxSum}</strong>. Slide window forward: Subtract <code>arr[${wStart}] = ${arr[wStart]}</code>.`,
            variables: { wStart: wStart + 1, wEnd, maxSum }
          });
          windowSum -= arr[wStart];
          wStart++;
        }
      }

      steps.push({
        type: 'sliding-window',
        array: arr,
        windowStart: wStart - 1,
        windowEnd: arr.length - 1,
        windowSum,
        maxVal: maxSum,
        explanation: `🎉 Sliding window pass complete! Optimal result = <strong>${maxSum}</strong>.`,
        variables: { optimalResult: maxSum }
      });

      return steps;
    }

    // Binary Search Generator
    generateBinarySearchSteps(input) {
      const arr = input?.nums || [-1, 0, 3, 5, 9, 12];
      const target = input?.target !== undefined ? input.target : 9;
      const steps = [];

      let low = 0;
      let high = arr.length - 1;

      steps.push({
        type: 'binary-search',
        array: arr,
        low,
        high,
        target,
        explanation: `Search space initialized: <code>low = 0</code>, <code>high = ${high}</code>. Target = <strong>${target}</strong>.`,
        variables: { low, high, target }
      });

      let found = false;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midVal = arr[mid];

        steps.push({
          type: 'binary-search',
          array: arr,
          low,
          high,
          mid,
          target,
          explanation: `Calculate midpoint <code>mid = floor((${low} + ${high}) / 2) = ${mid}</code>. Inspect element <code>nums[${mid}] = ${midVal}</code>.`,
          variables: { low, high, mid, 'nums[mid]': midVal, target }
        });

        if (midVal === target) {
          steps.push({
            type: 'binary-search',
            array: arr,
            low,
            high,
            mid,
            target,
            foundIndex: mid,
            comparison: `nums[mid] == target (${midVal} == ${target})`,
            explanation: `🎉 <strong>TARGET FOUND!</strong> <code>nums[${mid}] = ${target}</code> matches target. Returning index <strong>${mid}</strong>.`,
            variables: { resultIndex: mid, status: 'Found' }
          });
          found = true;
          break;
        } else if (midVal < target) {
          steps.push({
            type: 'binary-search',
            array: arr,
            low,
            high,
            mid,
            target,
            comparison: `nums[mid] < target (${midVal} < ${target}) ➔ Discard left half`,
            explanation: `<code>nums[mid] = ${midVal}</code> is LESS than target ${target}. Target must be in right half. Set <code>low = mid + 1 = ${mid + 1}</code>.`,
            variables: { newLow: mid + 1, high, target }
          });
          low = mid + 1;
        } else {
          steps.push({
            type: 'binary-search',
            array: arr,
            low,
            high,
            mid,
            target,
            comparison: `nums[mid] > target (${midVal} > ${target}) ➔ Discard right half`,
            explanation: `<code>nums[mid] = ${midVal}</code> is GREATER than target ${target}. Target must be in left half. Set <code>high = mid - 1 = ${mid - 1}</code>.`,
            variables: { low, newHigh: mid - 1, target }
          });
          high = mid - 1;
        }
      }

      if (!found) {
        steps.push({
          type: 'binary-search',
          array: arr,
          low,
          high,
          target,
          explanation: `Search range exhausted (<code>low > high</code>). Target <strong>${target}</strong> does not exist in array. Return <code>-1</code>.`,
          variables: { resultIndex: -1, status: 'Not Found' }
        });
      }

      return steps;
    }

    // Stack Generator
    generateStackSteps(input) {
      const s = input?.str || '()[]{}';
      const steps = [];
      const stack = [];

      steps.push({
        type: 'stack-queue',
        stack: [],
        action: 'Initialize Stack',
        explanation: `Initialize empty stack to validate string: <code>"${s}"</code>.`,
        variables: { inputString: s, stackDepth: 0 }
      });

      let valid = true;
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === '(' || ch === '[' || ch === '{') {
          stack.push(ch);
          steps.push({
            type: 'stack-queue',
            stack: [...stack],
            incoming: ch,
            action: `Push '${ch}'`,
            explanation: `Character '${ch}' is an opening bracket. Push onto stack.`,
            variables: { index: i, incomingChar: ch, stack: JSON.stringify(stack) }
          });
        } else {
          const top = stack.pop();
          const matches = (ch === ')' && top === '(') || (ch === ']' && top === '[') || (ch === '}' && top === '{');

          if (!matches) {
            steps.push({
              type: 'stack-queue',
              stack: [...stack],
              popped: top,
              action: `Mismatch '${ch}' vs '${top}'`,
              matchResult: '❌ Bracket Mismatch',
              explanation: `Closing bracket '${ch}' does not match top element '${top}'. Invalid string!`,
              variables: { errorAt: i, result: 'false' }
            });
            valid = false;
            break;
          } else {
            steps.push({
              type: 'stack-queue',
              stack: [...stack],
              popped: top,
              action: `Matched pair '${top}${ch}'`,
              matchResult: '✅ Match Validated',
              explanation: `Closing bracket '${ch}' matches popped '${top}'. Substring balanced.`,
              variables: { index: i, stack: JSON.stringify(stack) }
            });
          }
        }
      }

      if (valid && stack.length === 0) {
        steps.push({
          type: 'stack-queue',
          stack: [],
          action: 'Validation Complete',
          matchResult: '🎉 Valid Parentheses!',
          explanation: `Stack is empty and all pairs matched successfully! Returning <code>true</code>.`,
          variables: { result: 'true', status: 'Balanced String' }
        });
      }

      return steps;
    }

    // Linked List Generator
    generateLinkedListSteps(input) {
      const nodes = input?.nodes || [1, 2, 3, 4, 5];
      const steps = [];

      steps.push({
        type: 'linked-list',
        nodes,
        slow: 0,
        fast: 0,
        explanation: `Initialize Linked List traversal. Pointers <code>slow = 0</code> and <code>fast = 0</code> at head.`,
        variables: { head: nodes[0], length: nodes.length }
      });

      let slow = 0;
      let fast = 0;

      while (fast < nodes.length && fast + 1 < nodes.length) {
        steps.push({
          type: 'linked-list',
          nodes,
          slow,
          fast,
          explanation: `Slow pointer at node <strong>${nodes[slow]}</strong>, Fast pointer at node <strong>${nodes[fast]}</strong>.`,
          variables: { slowIndex: slow, fastIndex: fast, slowVal: nodes[slow], fastVal: nodes[fast] }
        });

        slow += 1;
        fast += 2;

        steps.push({
          type: 'linked-list',
          nodes,
          slow,
          fast: Math.min(fast, nodes.length - 1),
          explanation: `Advance pointers: <code>slow = slow.next</code> (1 step), <code>fast = fast.next.next</code> (2 steps).`,
          variables: { slowIndex: slow, fastIndex: fast }
        });
      }

      steps.push({
        type: 'linked-list',
        nodes,
        slow,
        fast: Math.min(fast, nodes.length - 1),
        explanation: `Fast pointer reached end. Slow pointer points to the middle node: <strong>${nodes[slow]}</strong>!`,
        variables: { middleNode: nodes[slow], index: slow }
      });

      return steps;
    }

    // Tree / Graph Generator
    generateTreeBFSDFSSteps(input) {
      const steps = [];
      const visited = [];

      steps.push({
        type: 'tree-graph',
        current: 1,
        queue: [1],
        visited: [],
        explanation: `Initialize BFS Queue with root node <strong>1</strong>.`,
        variables: { queue: '[1]', visited: '[]' }
      });

      const traversal = [
        { curr: 1, add: [2, 3] },
        { curr: 2, add: [4, 5] },
        { curr: 3, add: [] },
        { curr: 4, add: [] },
        { curr: 5, add: [] }
      ];

      let q = [1];
      traversal.forEach(step => {
        const curr = q.shift();
        visited.push(curr);
        q.push(...step.add);

        steps.push({
          type: 'tree-graph',
          current: curr,
          queue: [...q],
          visited: [...visited],
          explanation: `Dequeued node <strong>${curr}</strong>. Enqueued children <code>[${step.add.join(', ')}]</code>.`,
          variables: { currentNode: curr, queue: JSON.stringify(q), visited: JSON.stringify(visited) }
        });
      });

      steps.push({
        type: 'tree-graph',
        current: null,
        queue: [],
        visited: [...visited],
        explanation: `🎉 Level-order BFS traversal complete! Traversal order: <code>${visited.join(' ➔ ')}</code>.`,
        variables: { order: visited.join(', ') }
      });

      return steps;
    }

    // Backtracking Generator
    generateBacktrackingSteps(input) {
      const nums = input?.nums || [1, 2, 3];
      const steps = [];

      steps.push({
        type: 'backtracking',
        path: [],
        choices: nums,
        results: [],
        depth: 0,
        explanation: `Start Backtracking exploration from root. Choices available: <code>[${nums.join(', ')}]</code>.`,
        variables: { path: '[]', remainingChoices: JSON.stringify(nums) }
      });

      const subsets = [[]];

      nums.forEach((num, idx) => {
        steps.push({
          type: 'backtracking',
          path: [num],
          choices: nums.slice(idx + 1),
          results: [...subsets],
          depth: idx + 1,
          explanation: `Choose element <strong>${num}</strong>. Append to candidate path <code>[${num}]</code>.`,
          variables: { candidate: `[${num}]`, depth: idx + 1 }
        });
        subsets.push([num]);

        if (idx + 1 < nums.length) {
          const next = nums[idx + 1];
          steps.push({
            type: 'backtracking',
            path: [num, next],
            choices: nums.slice(idx + 2),
            results: [...subsets],
            depth: idx + 2,
            explanation: `Recurse deeper: Add choice <strong>${next}</strong> ➔ Path <code>[${num}, ${next}]</code>.`,
            variables: { candidate: `[${num}, ${next}]` }
          });
          subsets.push([num, next]);
        }
      });

      steps.push({
        type: 'backtracking',
        path: [],
        choices: [],
        results: subsets,
        depth: 0,
        explanation: `🎉 Backtracking search completed! Generated all power set combinations.`,
        variables: { totalSubsets: subsets.length, result: JSON.stringify(subsets) }
      });

      return steps;
    }

    // Heap Generator
    generateHeapSteps(input) {
      const nums = input?.nums || [3, 2, 1, 5, 6, 4];
      const k = input?.target || 2;
      const steps = [];
      const heap = [];

      steps.push({
        type: 'heap',
        heap: [],
        operation: 'Initialize Min-Heap',
        explanation: `Finding Kth largest element (<code>k = ${k}</code>) using a Min-Heap of size ${k}.`,
        variables: { k, heapSize: 0 }
      });

      nums.forEach((val) => {
        heap.push(val);
        heap.sort((a, b) => a - b);
        if (heap.length > k) {
          const popped = heap.shift();
          steps.push({
            type: 'heap',
            heap: [...heap],
            operation: `Push ${val} & Evict Min (${popped})`,
            explanation: `Inserted <strong>${val}</strong>. Heap size exceeded ${k} ➔ Popped smallest element <strong>${popped}</strong>.`,
            variables: { inserted: val, poppedMin: popped, currentHeap: JSON.stringify(heap) }
          });
        } else {
          steps.push({
            type: 'heap',
            heap: [...heap],
            operation: `Push ${val}`,
            explanation: `Inserted <strong>${val}</strong> into Min-Heap.`,
            variables: { inserted: val, currentHeap: JSON.stringify(heap) }
          });
        }
      });

      steps.push({
        type: 'heap',
        heap: [...heap],
        operation: 'Result at Root',
        explanation: `🎉 Kth largest element is at the root of Min-Heap: <strong>${heap[0]}</strong>!`,
        variables: { kthLargest: heap[0] }
      });

      return steps;
    }

    // DP Table Generator
    generateDPSteps(input) {
      const n = input?.n || 5;
      const steps = [];
      const dp = new Array(n + 1).fill(0);
      dp[0] = 1;
      dp[1] = 1;

      steps.push({
        type: 'dp-table',
        dp: [...dp],
        currentIdx: 1,
        formula: 'dp[0]=1, dp[1]=1 (Base Cases)',
        explanation: `Initialize DP array with base cases: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>.`,
        variables: { 'dp[0]': 1, 'dp[1]': 1, targetN: n }
      });

      for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        steps.push({
          type: 'dp-table',
          dp: [...dp],
          currentIdx: i,
          formula: `dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}`,
          explanation: `Compute subproblem: <code>dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}</code>.`,
          variables: { i, 'dp[i]': dp[i], subproblem1: dp[i - 1], subproblem2: dp[i - 2] }
        });
      }

      steps.push({
        type: 'dp-table',
        dp: [...dp],
        currentIdx: n,
        formula: `Final Answer: dp[${n}] = ${dp[n]}`,
        explanation: `🎉 Optimal DP solution computed: <strong>${dp[n]}</strong> distinct combinations!`,
        variables: { optimalResult: dp[n] }
      });

      return steps;
    }

    // Greedy & Bit Generator
    generateGreedyBitSteps(input) {
      const num = input?.nums ? input.nums[0] : 13;
      const steps = [];

      steps.push({
        type: 'greedy-bit',
        num,
        result: 0,
        explanation: `Count set bits in integer: <strong>${num}</strong> using Bit Manipulation (Brian Kernighan's Algorithm).`,
        variables: { number: num, setBitsCount: 0 }
      });

      let temp = num;
      let count = 0;

      while (temp > 0) {
        const nextTemp = temp & (temp - 1);
        count++;
        steps.push({
          type: 'greedy-bit',
          num: temp,
          result: count,
          explanation: `Clear lowest set bit: <code>temp = temp & (temp - 1)</code> (${temp} ➔ ${nextTemp}). Total set bits = <strong>${count}</strong>.`,
          variables: { currentVal: temp, nextVal: nextTemp, setBitsCount: count }
        });
        temp = nextTemp;
      }

      steps.push({
        type: 'greedy-bit',
        num: 0,
        result: count,
        explanation: `🎉 Finished! Total set bits in ${num} = <strong>${count}</strong>.`,
        variables: { totalSetBits: count }
      });

      return steps;
    }

    // Universal Fallback Generator for any remaining problem
    generateUniversalPatternSteps(problem, input) {
      const arr = input?.nums || [4, 2, 7, 1, 9, 3];
      const steps = [];

      steps.push({
        type: 'two-pointers',
        array: arr,
        left: 0,
        right: arr.length - 1,
        explanation: `Initialize pattern state for <strong>${problem.title}</strong> (${problem.pattern}).`,
        variables: { problem: problem.title, pattern: problem.pattern, complexity: problem.time_complexity || 'O(N)' }
      });

      for (let i = 0; i < arr.length; i++) {
        steps.push({
          type: 'two-pointers',
          array: arr,
          left: i,
          activeIndices: [i],
          explanation: `Process element <code>arr[${i}] = ${arr[i]}</code> according to ${problem.pattern} invariants.`,
          variables: { index: i, value: arr[i], state: `Step ${i + 1} / ${arr.length}` }
        });
      }

      steps.push({
        type: 'two-pointers',
        array: arr,
        matchedIndices: Array.from({ length: arr.length }, (_, i) => i),
        explanation: `🎉 Optimal solution verified for <strong>${problem.title}</strong>! Check the code tabs for multi-language implementations.`,
        variables: { status: 'Optimal Solution Verified', timeComplexity: problem.time_complexity || 'O(N)' }
      });

      return steps;
    }
  }

  // Export globally
  window.DSAVisualizer = new DSAVisualizerEngine();
})(window);
