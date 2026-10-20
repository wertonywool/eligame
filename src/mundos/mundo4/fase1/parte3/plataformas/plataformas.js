// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: PLATAFORMAS DE LA GRAN CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Desfiladero de seracs, bancos de nieve profunda, puentes de escalera y arco final.

module.exports = [
  // 1. Terraza intermedia de suministros y campamento de altura (X: 2730 -> 2900)
  { x: 2730, y: 196, w: 170, h: 28, subType: 'snow_ground' },
  { x: 2810, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 2880, y: 124, w: 60, h: 12, subType: 'slippery_ice' },

  // 2. Gran Banco de Nieve del Desfiladero: Cruce subterraneo bajo la ventisca (X: 2920 -> 3160)
  { x: 2920, y: 196, w: 240, h: 36, subType: 'snow_bank' },
  { x: 2980, y: 150, w: 70, h: 14, subType: 'ice_rock' },

  // 3. Cornisas de hielo escalonadas sobre la grieta para parkour vertical (Celeste style)
  { x: 3040, y: 150, w: 120, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 3110, y: 128, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 3180, y: 114, w: 120, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 3250, y: 86, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Puente de escalera alpino tendido sobre la gran sima de la cascada (X: 3320 -> 3440)
  { x: 3320, y: 140, w: 120, h: 14, subType: 'alpine_bridge' },
  { x: 3380, y: 104, w: 65, h: 12, subType: 'ice_rock' },

  // 5. Banco de Nieve Superior con queso oculto bajo la nieve polar (X: 3440 -> 3680)
  { x: 3440, y: 184, w: 240, h: 36, subType: 'snow_bank' },
  { x: 3500, y: 144, w: 75, h: 14, subType: 'ice_rock' },

  // 6. Cornisas de pizarra y hielo hacia la cumbre de la Fase 1
  { x: 3560, y: 124, w: 140, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 3630, y: 100, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 3700, y: 96, w: 120, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 3760, y: 68, w: 60, h: 12, subType: 'slippery_ice' },

  // 7. Gran Terraza Terminal y Umbral Glacial hacia la Fase 2 (X: 3820 -> 4050)
  { x: 3820, y: 196, w: 230, h: 28, subType: 'snow_ground' },
  { x: 3910, y: 154, w: 80, h: 14, subType: 'ice_rock' }
];
