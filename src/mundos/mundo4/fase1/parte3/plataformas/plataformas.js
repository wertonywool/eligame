// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: PLATAFORMAS DE LA CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Desfiladero de seracs, puente de escalera alpina, banco polar y Arco Glacial.

module.exports = [
  // 1. Terraza intermedia del Campamento de Altura de Pasang (X: 2730 -> 2940)
  { x: 2730, y: 196, w: 210, h: 28, subType: 'snow_ground' },

  // 2. Gran Banco de Nieve del Desfiladero: Tunel bajo los carambanos (X: 2940 -> 3200)
  { x: 2940, y: 196, w: 260, h: 32, subType: 'snow_bank' },

  // 3. Cornisas de hielo escalonadas y hielo quebradizo hacia el mirador
  { x: 3080, y: 150, w: 80, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 3170, y: 114, w: 65, h: 12, subType: 'cracking_ice' },
  { x: 3240, y: 82, w: 75, h: 14, oneWay: true, subType: 'ice_rock' },

  // 4. Saliente rocoso de apoyo antes de la gran sima
  { x: 3220, y: 196, w: 100, h: 28, subType: 'snow_ground' },

  // 5. El Gran Puente de Escalera Alpina del Everest sobre el abismo (X: 3340 -> 3500)
  { x: 3340, y: 175, w: 160, h: 14, subType: 'aluminum_bridge' },

  // 6. Gran Banco de Nieve Polar Superior con queso enterrado (X: 3520 -> 3740)
  { x: 3520, y: 196, w: 220, h: 32, subType: 'snow_bank' },

  // 7. Cornisas de pizarra hacia la cumbre de la Fase 1
  { x: 3710, y: 130, w: 75, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 3790, y: 92, w: 65, h: 14, oneWay: true, subType: 'ice_rock' },

  // 8. Gran Terraza Terminal y Umbral Glacial con el monumental Arco Glacial (X: 3820 -> 4050)
  { x: 3820, y: 196, w: 230, h: 28, subType: 'snow_ground' }
];
