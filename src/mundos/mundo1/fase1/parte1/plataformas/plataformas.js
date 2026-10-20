// 🌿 FASE 1 • PARTE 1: La Aldea del Trébol — Plataformas (X: 0 -> 460)
// Terreno 100% transitable, sólido y espacioso para caminar libremente
module.exports = [
  // Explanada principal de la Aldea del Trébol (Plaza de bienvenida de Abuela Camelia)
  { x: 0, y: 230, w: 460, h: 55, type: 'grass', zone: 1 },
  // Pérgola baja tradicional de té para contemplar los cerezos y saltar hacia el tejado
  { x: 140, y: 180, w: 80, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true }
];
