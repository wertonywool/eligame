const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav'
};

const buildLevels = require('./tools/build_levels');
const buildGame = require('./tools/build_game');
const buildSprites = require('./tools/build_sprites');

// Compilar niveles, sprites y modulos del juego al iniciar
try {
  buildLevels();
  buildSprites();
  buildGame();
} catch (e) {
  console.error('Error al compilar en inicio:', e);
}

const server = http.createServer((req, res) => {
  const safeUrl = req.url.split('?')[0];
  const relPath = safeUrl === '/' ? '/index.html' : safeUrl;
  const filePath = path.join(ROOT, relPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`EL GRAN ESCAPE DE ELIZABETH - SERVIDOR ACTIVO`);
  console.log(`======================================================`);
  console.log(`En tu PC abre:         http://localhost:${PORT}`);

  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`En tu Red Local/WiFi:  http://${net.address}:${PORT}`);
      }
    }
  }
  console.log(`======================================================\n`);
});
