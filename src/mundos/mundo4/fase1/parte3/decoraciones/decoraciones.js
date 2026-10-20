// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: DECORACIONES DE LA CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Estufa de expedición, estante de piolets, pináculos de hielo y el monumental Arco Glacial.

module.exports = [
  // 1. Estación de escalada de altura de Pasang
  { x: 2750, y: 196, subType: 'climbing_gear_rack' },
  { x: 2780, y: 196, subType: 'expedition_stove' },
  { x: 2840, y: 196, subType: 'prayer_flags' },

  // 2. Agujas y monolitos de hielo milenario (seracs)
  { x: 2980, y: 196, subType: 'ice_spire' },
  { x: 3380, y: 140, subType: 'ice_spire' },

  // 3. Abeto alpino que resiste en la cresta rocosa
  { x: 3740, y: 96, subType: 'alpine_pine', scale: 0.85 },

  // 4. Farol de nieve guiando al campamento final de la fase
  { x: 3860, y: 196, subType: 'snow_lantern' },

  // 5. El Gran Arco Glacial que da paso al ascenso de la Fase 2
  { x: 3950, y: 196, subType: 'ice_arch' }
];
