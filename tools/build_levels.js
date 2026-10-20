// ============================================================================
// COMPILADOR AUTOMÁTICO DE NIVELES: src/mundos -> src/level1.js & src/level2.js
// ============================================================================
// Compila la arquitectura modular ultra-dividida (Mundo / Fase / Parte / Elemento)
// en los archivos de ejecución del navegador de forma instantánea y segura.

const fs = require('fs');
const path = require('path');

function clearRequireCache(folderPath) {
  Object.keys(require.cache).forEach(key => {
    if (key.includes(path.normalize(folderPath))) {
      delete require.cache[key];
    }
  });
}

function buildLevels() {
  const rootDir = path.resolve(__dirname, '..');
  const mundosDir = path.join(rootDir, 'src', 'mundos');

  // Limpiar caché de require para recargar cambios en caliente
  clearRequireCache(mundosDir);

  // 1. Compilar Mundo 1
  const mundo1 = require(path.join(mundosDir, 'mundo1', 'mundo1.js'));
  const level1Content = `// ============================================================================
// MUNDO 1: "EL JARDÍN DE LOS LIRIOS"
// ============================================================================
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/mundos/mundo1/
// Para editar el nivel, modifica los archivos pequeños en su fase/parte correspondiente:
// - Fase 1: src/mundos/mundo1/fase1/ (partes 1, 2, 3, 4)
// - Fase 2: src/mundos/mundo1/fase2/ (partes 1, 2, 3)
// - Fase 3: src/mundos/mundo1/fase3/ (partes 1, 2, 3)

window.LEVELS = [
${JSON.stringify(mundo1, null, 2)}
];
`;
  fs.writeFileSync(path.join(rootDir, 'src', 'level1.js'), level1Content, 'utf8');

  // 2. Compilar Mundo 2
  const mundo2 = require(path.join(mundosDir, 'mundo2', 'mundo2.js'));
  const level2Content = `// ============================================================================
// MUNDO 2: "LA CALDERA DEL VOLCÁN"
// ============================================================================
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/mundos/mundo2/
// Para editar el nivel, modifica los archivos pequeños en su fase/parte correspondiente:
// - Fase 1: src/mundos/mundo2/fase1/ (partes 1, 2, 3)
// - Fase 2: src/mundos/mundo2/fase2/ (partes 1, 2, 3)
// - Fase 3: src/mundos/mundo2/fase3/ (partes 1, 2, 3)
// - Fase 4: src/mundos/mundo2/fase4/ (partes 1, 2)

if (!window.LEVELS) window.LEVELS = [];
window.LEVELS[1] = ${JSON.stringify(mundo2, null, 2)};
`;
  fs.writeFileSync(path.join(rootDir, 'src', 'level2.js'), level2Content, 'utf8');

  // 3. Compilar Mundo 3
  const mundo3Path = path.join(mundosDir, 'mundo3', 'mundo3.js');
  if (fs.existsSync(mundo3Path)) {
    const mundo3 = require(mundo3Path);
    const level3Content = `// ============================================================================
// MUNDO 3: "CIUDAD COSTERA & TSUNAMI"
// ============================================================================
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/mundos/mundo3/

if (!window.LEVELS) window.LEVELS = [];
window.LEVELS[2] = ${JSON.stringify(mundo3, null, 2)};
`;
    fs.writeFileSync(path.join(rootDir, 'src', 'level3.js'), level3Content, 'utf8');
  }

  // 4. Compilar Mundo 4
  const mundo4Path = path.join(mundosDir, 'mundo4', 'mundo4.js');
  if (fs.existsSync(mundo4Path)) {
    const mundo4 = require(mundo4Path);
    const level4Content = `// ============================================================================
// MUNDO 4: "EL MONTE EVEREST Y LA GRAN CUMBRE"
// ============================================================================
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/mundos/mundo4/

if (!window.LEVELS) window.LEVELS = [];
window.LEVELS[3] = ${JSON.stringify(mundo4, null, 2)};
`;
    fs.writeFileSync(path.join(rootDir, 'src', 'level4.js'), level4Content, 'utf8');
  }

  console.log('Niveles compilados con exito desde src/mundos/ hacia src/level1.js, level2.js, level3.js y level4.js');
}

if (require.main === module) {
  buildLevels();
}

module.exports = buildLevels;
