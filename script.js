const STORAGE_KEY = 'bbh-bp01-v1';
const fields = [...document.querySelectorAll('[data-save]')];
const definition = document.getElementById('definition');
const preview = document.getElementById('definition-preview');

function readState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function load() {
  const state = readState();
  fields.forEach(field => {
    const key = field.dataset.save;
    if (!(key in state)) return;
    if (field.type === 'radio') field.checked = field.value === state[key];
    else field.value = state[key];
  });
  updatePreview();
}

function save(event) {
  const field = event.target;
  const state = readState();
  state[field.dataset.save] = field.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updatePreview();
}

function updatePreview() {
  const value = definition.value.trim();
  preview.textContent = value || 'Your completed sentence will appear here.';
}

fields.forEach(field => field.addEventListener(field.type === 'radio' ? 'change' : 'input', save));

document.getElementById('check-vague').addEventListener('click', () => {
  const output = document.getElementById('vague-result');
  const sentence = definition.value.trim();
  const words = ['quality','high-quality','bespoke','supportive','modern','affordable','tailored','professional','unique','personalised','innovative','passionate','excellent','flexible'];
  if (!sentence) {
    output.innerHTML = '<strong>Add your working sentence first.</strong> Then run the check again.';
    output.hidden = false;
    definition.focus();
    return;
  }
  const found = words.filter(word => new RegExp(`\\b${word.replace('-', '[- ]')}\\b`, 'i').test(sentence));
  output.innerHTML = found.length
    ? `<strong>Words to examine:</strong> ${found.join(', ')}. What measurable or observable fact sits underneath ${found.length === 1 ? 'this word' : 'each word'}?`
    : '<strong>No common vague words found.</strong> Now ask: could any phrase still describe a completely different business? If yes, replace it with a fact.';
  output.hidden = false;
});

document.getElementById('download').addEventListener('click', () => {
  const state = readState();
  const labels = {
    recent:'1. What people paid for or asked about', people:'2. Who those people were', before:'3. What was happening beforehand', after:'4. What changed afterwards',
    sell:'What I sell', for:'Who it is for', problem:'The problem or goal', result:'The practical result', definition:'My definition, version 1', date:'Date', clearer:'My clearer version', decision:'Decision I am weighing up', clarity:'Did the definition make it clearer?', 'next-action':'My next action'
  };
  const text = ['BUILT BY HER — BP-01', 'What is my business, who is it for and what problem does it solve?', ''].concat(Object.entries(labels).map(([key,label]) => `${label}\n${state[key] || '—'}\n`)).join('\n');
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'Built-By-Her-BP-01-My-Answers.txt'; link.click();
  URL.revokeObjectURL(url);
});

document.getElementById('reset').addEventListener('click', () => {
  if (!confirm('Clear all answers saved for this lesson on this device?')) return;
  localStorage.removeItem(STORAGE_KEY);
  fields.forEach(field => { if (field.type === 'radio') field.checked = false; else field.value = ''; });
  document.getElementById('vague-result').hidden = true;
  updatePreview();
  document.getElementById('start').scrollIntoView();
});

load();
