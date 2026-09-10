import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const js = await readFile(resolve(dist, 'app.js'), 'utf8');

const required = [
  'index.html', 'styles.css', 'app.js', 'robots.txt', '.nojekyll',
  'assets/built-by-her-logo.png'
];
await Promise.all(required.map(path => access(resolve(dist, path))));

const localRefs = [...html.matchAll(/(?:src|href)="(?!https?:|#)([^"]+)"/g)].map(match => match[1]);
await Promise.all(localRefs.map(path => access(resolve(dist, path))));

const expectedSections = ['core', 'activity-1', 'activity-2', 'activity-3', 'finish'];
for (const id of expectedSections) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing section: ${id}`);
}

const fieldNames = [...html.matchAll(/data-field="([^"]+)"/g)].map(match => match[1]);
for (const name of ['lastThings','people','before','after','sell','who','problem','result','definition','refinedDefinition','decision','decisionReflection']) {
  if (!fieldNames.includes(name)) throw new Error(`Missing learner field: ${name}`);
}

if (!js.includes('localStorage.setItem')) throw new Error('Progress persistence is missing');
if (!js.includes("link.download='Built-By-Her-BP-01-my-work.txt'")) throw new Error('Answer download is missing');

console.log(`Validated ${required.length} required files, ${localRefs.length} local references and ${fieldNames.length} learner fields.`);
