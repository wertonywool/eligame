// 🌸 FASE 2 • PARTE 2: El Gran Invernadero de Cristal — Decoraciones (X: 2535 -> 3310)
module.exports = [
  // Mesa de botánica en la entrada oeste
  { type: 'botanist_table', x: 2550, y: 210 },

  // Cúpulas acristaladas que coronan las pasarelas
  { type: 'greenhouse_dome', x: 2680, y: 182, w: 90, h: 62 },
  { type: 'lumafly_swarm', x: 2845, y: 125, color: 'cyan' },
  { type: 'greenhouse_dome', x: 2935, y: 135, w: 96, h: 64 },

  // Mesas de jardinería y cultivos en el atrio inferior
  { type: 'botanist_table', x: 2750, y: 235 },
  { type: 'botanist_table', x: 3050, y: 235 },
  { type: 'lumafly_swarm', x: 2950, y: 200, color: 'cyan' },

  // Arco victoriano de salida hacia el Acueducto
  { type: 'greenhouse_arch', x: 3230, y: 195, w: 62, h: 68 }
];
