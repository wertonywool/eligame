// MUNDO 3 - FASE 2 - PARTE 1: Plataformas de la Bajada a la Playa Dorada (X: 3600 -> 4500)
module.exports = [
  // 1. Conexión desde el Muelle de la Fase 1 hacia la orilla de arena
  { x: 3600, y: 220, w: 280, h: 50, subType: 'coastal_shore_sand' },

  // 2. Tramo previo con arena suave y pasarelas de madera
  { x: 3880, y: 220, w: 80, h: 50, subType: 'coastal_shore_sand' },

  // 3. CHARCO DE MAREA #1 (Opcional para probar la tabla de surf)
  { x: 3960, y: 220, w: 160, h: 50, subType: 'water_puddle' },

  // 4. Camino alternativo superior seco: Pasarela de madera de deriva sobre el charco
  { x: 3940, y: 174, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 4050, y: 174, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 5. Orilla de arena después del primer charco
  { x: 4120, y: 220, w: 380, h: 50, subType: 'coastal_shore_sand' },

  // 6. Duna de arena elevada con pasto marino
  { x: 4260, y: 182, w: 110, h: 38, subType: 'coastal_dune' }
];
