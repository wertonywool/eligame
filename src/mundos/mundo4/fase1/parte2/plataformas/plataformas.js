// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 2: PLATAFORMAS DEL GLACIAR KHUMBU (X: 1490 -> 2720)
// ============================================================================
// Gran grieta helada, seracs y bancos de nieve para tuneles y parkour vertical.

module.exports = [
  // 1. Terraza de morrena rocosa al inicio del glaciar (X: 1490 -> 1660)
  { x: 1490, y: 196, w: 170, h: 28, subType: 'snow_ground' },
  { x: 1560, y: 156, w: 75, h: 14, subType: 'ice_rock' },
  { x: 1630, y: 124, w: 60, h: 12, subType: 'slippery_ice' },

  // 2. Gran Banco de Nieve Glacial: Cruce subterraneo bajo la ventisca (X: 1690 -> 1930)
  { x: 1690, y: 196, w: 240, h: 34, subType: 'snow_bank' },
  { x: 1740, y: 152, w: 70, h: 14, subType: 'ice_rock' },

  // 3. Cornisas de pizarra helada con estalagmitas y carambanos
  { x: 1800, y: 144, w: 110, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 1870, y: 120, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 1930, y: 110, w: 120, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 2000, y: 80, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Repisa rocosa intermedia entre grietas
  { x: 2060, y: 164, w: 120, h: 24, subType: 'snow_ground' },
  { x: 2110, y: 124, w: 65, h: 14, subType: 'ice_rock' },

  // 5. Puente colgante alpino sobre el abismo de la grieta helada (X: 2170 -> 2300)
  { x: 2170, y: 144, w: 130, h: 14, subType: 'alpine_bridge' },
  { x: 2240, y: 108, w: 65, h: 12, subType: 'slippery_ice' },

  // 6. Banco de nieve elevado y terraplen de seracs (X: 2300 -> 2530)
  { x: 2300, y: 186, w: 230, h: 34, subType: 'snow_bank' },
  { x: 2380, y: 146, w: 75, h: 14, subType: 'ice_rock' },
  { x: 2470, y: 114, w: 65, h: 12, subType: 'slippery_ice' },

  // 7. Saliente rocoso de aproximacion al Campamento 2 con Checkpoint #18 (X: 2540 -> 2720)
  { x: 2540, y: 196, w: 180, h: 28, subType: 'snow_ground' },
  { x: 2620, y: 154, w: 70, h: 14, subType: 'ice_rock' }
];
