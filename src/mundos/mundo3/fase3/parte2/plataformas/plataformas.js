// MUNDO 3 - FASE 3 - PARTE 2: Plataformas de la Rompiente y Tienda Kai (X: 8100 -> 9000)
module.exports = [
  // 1. Terraza de arena y malecon de la Tienda de Surf
  { x: 8100, y: 220, w: 280, h: 50, subType: 'coastal_shore_sand' },

  // 2. Muelle de madera de Kai sobre la orilla
  { x: 8320, y: 216, w: 60, h: 8, oneWay: false, subType: 'driftwood_plank' },

  // 3. Gran Laguna de Rompiente de Surf (Desafio de las 67 Olas de Kai)
  { x: 8380, y: 220, w: 400, h: 50, subType: 'water_puddle' },

  // 4. Pasarela escalonada de observacion sobre la rompiente
  { x: 8420, y: 180, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 8515, y: 152, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 8625, y: 180, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 5. Orilla este despejada para los banistas (Castillos de arena y tumbonas)
  { x: 8780, y: 220, w: 220, h: 50, subType: 'coastal_shore_sand' },

  // 6. Duna de arena panoramica (oneWay para no bloquear a ningun personaje)
  { x: 8970, y: 184, w: 80, h: 36, oneWay: true, subType: 'coastal_dune' }
];
