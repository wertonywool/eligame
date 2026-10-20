// 🏕️ MUNDO 2 • FASE 1 • PARTE 2: Sendero de 4 Terrazas de Basalto — Plataformas (X: 940 -> 1810)
module.exports = [
  // Las 4 Terrazas Escalonadas del Sendero de Basalto (Suben de 40 en 40 px)
  { x: 980, y: 1640, w: 230, h: 160, type: 'volcano', oneWay: false },
  { x: 1250, y: 1600, w: 230, h: 200, type: 'volcano', oneWay: false },
  { x: 1520, y: 1560, w: 250, h: 240, type: 'volcano', oneWay: false },
  // Dintel superior compacto de la 2da Cascada de Lava en Terraza 3
  { x: 1605, y: 1455, w: 62, h: 16, type: 'volcano', oneWay: false },

  // Basamentos de lava en los 4 fosos entre terrazas (evitan caídas al vacío)
  { x: 940, y: 1710, w: 40, h: 90, type: 'volcano', oneWay: false },
  { x: 1210, y: 1710, w: 40, h: 90, type: 'volcano', oneWay: false },
  { x: 1480, y: 1710, w: 40, h: 90, type: 'volcano', oneWay: false },
  { x: 1770, y: 1710, w: 40, h: 90, type: 'volcano', oneWay: false }
];
