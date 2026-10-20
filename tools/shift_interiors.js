const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/entities/player/doors.js',
  'src/render/hazards/snow_village_interiors.js',
  'src/render/hazards/snow_village_interiors_pt2.js',
  // parte1
  'src/mundos/mundo4/fase3/parte1/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte1/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte1/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte1/coleccionables/quesos.js',
  // parte2
  'src/mundos/mundo4/fase3/parte2/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte2/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte2/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte2/coleccionables/quesos.js',
  // parte3
  'src/mundos/mundo4/fase3/parte3/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte3/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte3/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte3/coleccionables/quesos.js',
  // parte4
  'src/mundos/mundo4/fase3/parte4/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte4/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte4/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte4/coleccionables/quesos.js',
  // parte5
  'src/mundos/mundo4/fase3/parte5/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte5/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte5/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte5/coleccionables/quesos.js',
  // parte6
  'src/mundos/mundo4/fase3/parte6/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte6/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte6/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte6/coleccionables/quesos.js',
  // parte7
  'src/mundos/mundo4/fase3/parte7/plataformas/plataformas.js',
  'src/mundos/mundo4/fase3/parte7/decoraciones/decoraciones.js',
  'src/mundos/mundo4/fase3/parte7/npcs/npcs.js',
  'src/mundos/mundo4/fase3/parte7/coleccionables/quesos.js'
];

let totalReplaced = 0;

for (const relPath of filesToUpdate) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn('[MISSING]', relPath);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let count = 0;
  content = content.replace(/\b(39980|4[0-2]\d{3})\b/g, (match, numStr) => {
    const val = parseInt(numStr, 10);
    if (val >= 39980 && val <= 42750) {
      count++;
      return String(val + 10000);
    }
    return match;
  });

  if (count > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`[UPDATED] ${relPath}: ${count} coordinates shifted`);
    totalReplaced += count;
  }
}

console.log(`Total coordinates shifted: ${totalReplaced}`);
