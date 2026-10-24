// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: DECORACIONES DE LA CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Estacion de expedicion de Pasang, seracs de hielo y monumental Arco Glacial.

module.exports = [
  // 1. Estacion de escalada de altura de Pasang
  { x: 2800, y: 196, subType: 'expedition_stove' },
  { x: 2840, y: 196, subType: 'climbing_gear_rack' },
  { x: 2890, y: 196, subType: 'prayer_flags' },

  // 2. Seracs de hielo milenario
  { x: 2950, y: 196, subType: 'ice_spire' },
  { x: 3320, y: 196, subType: 'ice_spire' },

  // 3. Abeto alpino en la cresta rocosa
  { x: 3740, y: 130, subType: 'alpine_pine', scale: 0.85 },

  // 4. Farol de nieve y senaletica hacia la Fase 2
  { x: 3840, y: 196, subType: 'snow_lantern' },
  { x: 3915, y: 196, subType: 'alpine_sign' },

  // 5. El Gran Arco Glacial limpio y solemne que da paso a la Fase 2
  { x: 3960, y: 196, subType: 'ice_arch' },
  { x: 4020, y: 196, subType: 'prayer_flags' }
];
