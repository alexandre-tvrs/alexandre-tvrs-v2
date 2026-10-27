import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(root, 'dist');
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Invalid build directory');
await import('./src/build.mjs');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
for (const name of ['index.html', 'content.js', 'dragon-portrait.js', 'portfolio.js', 'dragon.js', 'village.js', 'fonts.css', 'study.css', 'village.css', 'portfolio.css', 'favicon.svg']) {
  fs.copyFileSync(path.join(root, 'src', name), path.join(out, name));
}
fs.cpSync(path.join(root, 'src/fonts'), path.join(out, 'fonts'), { recursive: true });
fs.copyFileSync(path.join(root, 'public/_headers'), path.join(out, '_headers'));
console.log('Static portfolio ready in dist/');
