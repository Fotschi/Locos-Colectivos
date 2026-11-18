import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild-wasm';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

let cachedCss = '';
let cachedJs = '';

async function buildAssets() {
  const cssInput = fs.readFileSync(path.join(__dirname, 'src/index.css'), 'utf8');
  const cssResult = await postcss([tailwindcss, autoprefixer]).process(cssInput, {
    from: path.join(__dirname, 'src/index.css')
  });
  cachedCss = cssResult.css;

  const jsResult = await esbuild.build({
    entryPoints: [path.join(__dirname, 'src/main.jsx')],
    bundle: true,
    write: false,
    format: 'esm',
    jsx: 'automatic',
    loader: { '.js': 'jsx', '.jsx': 'jsx', '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"development"' }
  });
  cachedJs = jsResult.outputFiles[0].text;
}

await buildAssets();

// Rebuild on file changes in src/
let rebuildTimer = null;
fs.watch(path.join(__dirname, 'src'), { recursive: true }, () => {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(() => {
    buildAssets().catch((err) => console.error('Build error:', err.message));
  }, 120);
});

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath === '/dev-bundle.js') {
    res.writeHead(200, { 'Content-Type': MIME['.js'] });
    res.end(cachedJs);
    return;
  }

  if (urlPath === '/dev-styles.css') {
    res.writeHead(200, { 'Content-Type': MIME['.css'] });
    res.end(cachedCss);
    return;
  }

  // Serve static files from public/
  const cleanRel = urlPath.replace(/^\/+/, '');
  const publicFile = path.join(__dirname, 'public', cleanRel);
  if (cleanRel && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) {
    const ext = path.extname(publicFile).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(publicFile).pipe(res);
    return;
  }

  // Serve index.html for all routes
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  html = html
    .replace('</head>', '  <link rel="stylesheet" href="/dev-styles.css" />\n  </head>')
    .replace('/src/main.jsx', '/dev-bundle.js');

  res.writeHead(200, { 'Content-Type': MIME['.html'] });
  res.end(html);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Locos Colectivos Dev-Server läuft auf http://localhost:${PORT}`);
});
