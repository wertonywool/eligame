// ============================================================================
// SPRITE MANAGER BASE: CACHÉ Y RASTERIZACIÓN PIXEL-ART 16-BIT
// ============================================================================
class SpriteManager {
  constructor() {
    this.cache = {};
    this.palettes = {
      mama: {
        '.': null,
        'K': '#14101c', // Contorno oscuro pixel-art
        'W': '#ffffff', // Pelaje blanco brillante
        'S': '#dce2f0', // Sombra suave del pelaje blanco
        'D': '#b0bad0', // Sombra profunda del pelaje
        'P': '#f4a398', // Rosa interior oreja / manos / pies / nariz
        'p': '#d0766c', // Sombra rosa (cola, pies, oreja)
        'C': '#7a1f42', // Capa borgoña / vino principal
        'c': '#54122c', // Sombra capa borgoña
        'L': '#9b2d57', // Luz capa borgoña
        'G': '#f7c948', // Broche dorado brillante
        'g': '#c89216', // Sombra broche dorado
        'E': '#2b6e2e', // Hoja verde del Lirio
        'e': '#52b74a', // Luz verde hoja del Lirio
        'F': '#f8f9fa', // Campanita blanca del Lirio
        'R': '#d90429'  // Detalle rojo carmesí del Lirio
      },
      baby: {
        '.': null,
        'K': '#14101c',
        'W': '#ffffff',
        'S': '#dce2f0',
        'D': '#b0bad0',
        'P': '#f4a398',
        'p': '#d0766c',
        'B': '#4ea8de',
        'G': '#f7c948'
      },
      homelander: {
        '.': null,
        'K': '#120e1a',
        'Y': '#ffd166',
        'y': '#e09f3e',
        'F': '#f4b393',
        'f': '#d98a6c',
        'B': '#1d3557',
        'b': '#11223a',
        'u': '#2b5082',
        'R': '#d62828',
        'r': '#9b1515',
        'W': '#f1faee',
        'L': '#ff0033',
        'l': '#ff758f'
      }
    };

    this.initSprites();
  }

  bakeGrid(key, grid, palette) {
    const h = grid.length;
    const w = grid[0].length;
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const octx = off.getContext('2d');

    for (let y = 0; y < h; y++) {
      const row = grid[y];
      for (let x = 0; x < w; x++) {
        const ch = row[x];
        const color = palette[ch];
        if (color) {
          octx.fillStyle = color;
          octx.fillRect(x, y, 1, 1);
        }
      }
    }
    this.cache[key] = off;
  }
}
