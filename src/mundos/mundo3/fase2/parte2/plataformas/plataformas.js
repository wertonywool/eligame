// MUNDO 3 - FASE 2 - PARTE 2: Plataformas de la Orilla Serena (X: 4500 -> 5400)
module.exports = [
  // 1. Orilla de arena con brisa suave
  { x: 4500, y: 220, w: 260, h: 50, subType: 'coastal_shore_sand' },

  // 2. Laguna de Marea #2 espaciosa para maniobras de surf
  { x: 4760, y: 220, w: 200, h: 50, subType: 'water_puddle' },

  // 3. Pasarelas superiores escalonadas de madera nautica sobre la laguna
  { x: 4720, y: 182, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 4805, y: 154, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 4905, y: 182, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 4. Continuacion de la orilla arenosa
  { x: 4960, y: 220, w: 440, h: 50, subType: 'coastal_shore_sand' },

  // 5. Dunas de arena suave con pasto marino escalonadas
  { x: 5060, y: 180, w: 120, h: 40, subType: 'coastal_dune' },
  { x: 5200, y: 184, w: 110, h: 36, subType: 'coastal_dune' }
];
