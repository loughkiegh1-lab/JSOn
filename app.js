/* ============================================================
   JSONformat.tools — app.js
   ============================================================ */

// ── Helpers ────────────────────────────────────────────────

function getIndent() {
  const v = document.getElementById('indentSelect').value;
  return v === 'tab' ? '\t' : parseInt(v);
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  return (bytes / 1024).toFixed(1) + ' KB';
}

function countInfo(obj, depth = 0) {
  let keys = 0;
  let maxDepth = depth;
  if (obj !== null && typeof obj === 'object') {
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        keys++;
        const child = countInfo(obj[k], depth + 1);
        keys += child.keys;
        if (child.depth > maxDepth) maxDepth = child.depth;
      }
    }
  }
  return { keys, depth: maxDepth };
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function setOutputStatus(type, text) {
  const el = document.getElementById('outputStatus');
  el.className = 'status-badge ' + type;
  el.textContent = text;
}

function setInputStatus(type, text) {
  const el = document.getElementById('inputStatus');
  el.className = 'status-badge ' + type;
  el.textContent = text;
}

function updateStats(formatted, parsed) {
  const info = countInfo(parsed);
  document.getElementById('statChars').textContent = formatted.length.toLocaleString();
  document.getElementById('statLines').textContent = formatted.split('\n').length.toLocaleString();
  document.getElementById('statKeys').textContent = info.keys.toLocaleString();
  document.getElementById('statDepth').textContent = info.depth;
  document.getElementById('statSize').textContent = formatBytes(new Blob([formatted]).size);
  document.getElementById('outputCharCount').textContent = formatted.length.toLocaleString() + ' chars';
}

function clearStats() {
  ['statChars', 'statLines', 'statKeys', 'statDepth', 'statSize'].forEach(id => {
    document.getElementById(id).textContent = '—';
  });
  document.getElementById('outputCharCount').textContent = '';
}

// ── Core Actions ────────────────────────────────────────────

function onInput() {
  const val = document.getElementById('inputArea').value;
  const trimmed = val.trim();

  document.getElementById('inputCharCount').textContent = val.length.toLocaleString() + ' chars';

  if (!trimmed) {
    setInputStatus('empty', 'empty');
    return;
  }

  try {
    JSON.parse(trimmed);
    setInputStatus('valid', 'valid JSON');
    // Auto-format as user types (debounced)
    clearTimeout(window._autoFormat);
    window._autoFormat = setTimeout(formatJSON, 400);
  } catch (e) {
    setInputStatus('invalid', 'invalid');
  }
}

function formatJSON() {
  const raw = document.getElementById('inputArea').value.trim();
  const out = document.getElementById('outputBox');

  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, getIndent());
    out.textContent = formatted;
    out.className = 'code-area output-area has-content';
    setOutputStatus('valid', 'formatted');
    updateStats(formatted, parsed);
  } catch (e) {
    out.textContent = 'Error: ' + e.message + '\n\nCheck your JSON for:\n  • Missing commas between values\n  • Unclosed brackets or braces\n  • Keys not wrapped in double quotes\n  • Trailing commas';
    out.className = 'code-area output-area error';
    setOutputStatus('invalid', 'error');
    clearStats();
  }
}

function minifyJSON() {
  const raw = document.getElementById('inputArea').value.trim();
  const out = document.getElementById('outputBox');

  if (!raw) { showToast('Paste some JSON first'); return; }

  try {
    const parsed = JSON.parse(raw);
    const minified = JSON.stringify(parsed);
    out.textContent = minified;
    out.className = 'code-area output-area has-content';
    setOutputStatus('valid', 'minified');
    updateStats(minified, parsed);
    showToast('Minified!');
  } catch (e) {
    out.textContent = 'Error: ' + e.message;
    out.className = 'code-area output-area error';
    setOutputStatus('invalid', 'error');
  }
}

function sortKeys() {
  const raw = document.getElementById('inputArea').value.trim();
  if (!raw) { showToast('Paste some JSON first'); return; }

  try {
    const parsed = JSON.parse(raw);
    const sorted = sortObjectKeys(parsed);
    const formatted = JSON.stringify(sorted, null, getIndent());
    document.getElementById('outputBox').textContent = formatted;
    document.getElementById('outputBox').className = 'code-area output-area has-content';
    setOutputStatus('valid', 'sorted');
    updateStats(formatted, sorted);
    showToast('Keys sorted alphabetically!');
  } catch (e) {
    showToast('Invalid JSON — fix errors first');
  }
}

function sortObjectKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortObjectKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

function copyOutput() {
  const text = document.getElementById('outputBox').textContent;
  if (!text || text.startsWith('Formatted') || text.startsWith('Error')) {
    showToast('Nothing to copy yet');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!');
  });
}

function downloadOutput() {
  const text = document.getElementById('outputBox').textContent;
  if (!text || text.startsWith('Formatted') || text.startsWith('Error')) {
    showToast('Format your JSON first');
    return;
  }
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'formatted.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded!');
}

function clearAll() {
  document.getElementById('inputArea').value = '';
  const out = document.getElementById('outputBox');
  out.textContent = 'Formatted JSON will appear here...';
  out.className = 'code-area output-area';
  setInputStatus('empty', 'empty');
  setOutputStatus('empty', '—');
  document.getElementById('inputCharCount').textContent = '0 chars';
  clearStats();
}

function loadSample() {
  const sample = {
    "user": {
      "id": 1042,
      "name": "Alice Chen",
      "email": "alice@example.com",
      "role": "admin",
      "createdAt": "2024-01-15T09:22:00Z",
      "preferences": {
        "theme": "dark",
        "language": "en",
        "notifications": true
      },
      "tags": ["developer", "designer", "power-user"],
      "stats": {
        "projects": 14,
        "commits": 892,
        "reviews": 203
      }
    }
  };
  document.getElementById('inputArea').value = JSON.stringify(sample);
  onInput();
  formatJSON();
  showToast('Sample loaded!');
}

// ── Keyboard Shortcuts ──────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    formatJSON();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    copyOutput();
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
    e.preventDefault();
    minifyJSON();
  }
});

// ── Drag & Drop support ─────────────────────────────────────

const inputArea = document.getElementById('inputArea');
if (inputArea) {
  inputArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    inputArea.style.borderColor = 'var(--accent)';
  });
  inputArea.addEventListener('dragleave', () => {
    inputArea.style.borderColor = '';
  });
  inputArea.addEventListener('drop', (e) => {
    e.preventDefault();
    inputArea.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        inputArea.value = ev.target.result;
        onInput();
        formatJSON();
      };
      reader.readAsText(file);
    } else {
      showToast('Please drop a .json file');
    }
  });
}
