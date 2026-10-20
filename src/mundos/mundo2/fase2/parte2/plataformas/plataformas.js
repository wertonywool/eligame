// 💎 MUNDO 2 • FASE 2 • PARTE 2: Galerías de Cristal Centrales — Plataformas (X: 690 -> 1660)
module.exports = [
  // Piso de contención único debajo de toda la Fase 2 (Y: 1215)
  { x: 350, y: 1215, w: 1390, h: 22, type: 'volcano', oneWay: true },

  // 2B. Galería de Cristal #1 (Este)
  { x: 1390, y: 1110, w: 270, h: 20, type: 'floating', oneWay: true },
  // 2C. Galería de Cristal #2 (Puente de la Cascada de Cristal)
  { x: 1050, y: 1080, w: 280, h: 20, type: 'floating', oneWay: true },
  { x: 1155, y: 974, w: 72, h: 16, type: 'volcano', oneWay: false }, // Dintel de cascada
  // 2D. Galería Central — Puesto del Cartógrafo Cornelio
  { x: 690, y: 1050, w: 300, h: 22, type: 'floating', oneWay: true }
];
