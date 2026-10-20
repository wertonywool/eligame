// 🌸 FASE 2 • PARTE 1: Muelle de Entrada y Estanque — Decoraciones (X: 1800 -> 2535)
module.exports = [
  // Pórtico de hierro forjado y cristal que enmarca el Muelle de Entrada
  { type: 'greenhouse_arch', x: 1810, y: 215, w: 64, h: 70 },

  // Superficies de agua tranquila con reflejos celestes y ondas
  { type: 'lotus_water', x: 1945, y: 255, w: 260 },
  { type: 'lotus_water', x: 2225, y: 255, w: 290 },

  // Juncos y totoras en las orillas
  { type: 'cattails', x: 1955, y: 255 },
  { type: 'giant_lotus', x: 2045, y: 195 },
  { type: 'lumafly_swarm', x: 2120, y: 130, color: 'cyan' },

  // Islote botánico intermedio con mesa de descanso y flores
  { type: 'botanist_table', x: 2200, y: 215 },
  { type: 'cattails', x: 2210, y: 215 },
  { type: 'giant_lotus', x: 2390, y: 182 }
];
