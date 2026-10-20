// MUNDO 3 - FASE 2 - PARTE 3: Plataformas de las Dunas y Gran Canal de Surf (X: 5400 -> 6300)
module.exports = [
  // 1. Entrada a la zona de dunas con rampa natural de lanzamiento
  { x: 5400, y: 220, w: 220, h: 50, subType: 'coastal_shore_sand' },
  { x: 5490, y: 184, w: 120, h: 36, subType: 'coastal_dune' },

  // 2. EL GRAN CANAL DE SURF (300 px continuos para cruce veloz con tabla)
  { x: 5610, y: 220, w: 300, h: 50, subType: 'water_puddle' },

  // 3. Ruta superior seca acrobatica: Pasarelas de madera escalonadas sobre el canal
  { x: 5610, y: 172, w: 80, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 5710, y: 144, w: 100, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 5830, y: 172, w: 80, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 4. Orilla de arena con destellos dorados tras el canal
  { x: 5910, y: 220, w: 390, h: 50, subType: 'coastal_shore_sand' },

  // 5. Duna rosada elevada con pasto marino
  { x: 6040, y: 178, w: 140, h: 42, subType: 'coastal_dune' }
];
