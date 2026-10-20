// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: PLATAFORMAS DE LA CIMA DEL EVEREST (X: 20750 -> 23800)
// ============================================================================
// El Collado Sur (8000 m), Cresta Sureste, Paso de Hillary y Gran Cima (8848 m).

module.exports = [
  // 1. Plataforma del Campamento 13 (Collado Sur - 8000 m) con Ang Dorje y Checkpoint #36
  { x: 20750, y: 136, w: 420, h: 28, subType: 'snow_ground' },
  { x: 20880, y: 98, w: 75, h: 14, subType: 'ice_rock' },
  { x: 21010, y: 72, w: 65, h: 12, subType: 'slippery_ice' },

  // 2. Fosa de nieve helada y vientos huracanados de la Cresta Sureste
  { x: 21200, y: 168, w: 200, h: 32, subType: 'snow_bank' },
  { x: 21280, y: 126, w: 70, h: 14, subType: 'ice_rock' },

  // 3. Cornisas Afiladas de Hielo Azul de la Cresta Sureste con Queso #68
  { x: 21420, y: 126, w: 90, h: 18, subType: 'ice_rock' },
  { x: 21540, y: 104, w: 90, h: 18, subType: 'ice_rock' },
  { x: 21620, y: 76, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Tramo de Hielo Resbaladizo hacia la Balconada (The Balcony)
  { x: 21680, y: 116, w: 180, h: 20, subType: 'slippery_ice' },
  { x: 21880, y: 136, w: 140, h: 22, subType: 'snow_ground' },
  { x: 21960, y: 100, w: 65, h: 14, subType: 'ice_rock' },
  { x: 22040, y: 118, w: 80, h: 18, subType: 'ice_rock' },

  // 5. El mitico Paso de Hillary (Hillary Step) - Escalada tecnica vertical
  { x: 22130, y: 126, w: 80, h: 18, subType: 'ice_rock' },
  { x: 22200, y: 118, w: 60, h: 14, subType: 'ice_rock' },
  { x: 22260, y: 112, w: 80, h: 18, subType: 'ice_rock' },
  { x: 22330, y: 104, w: 60, h: 14, subType: 'slippery_ice' },
  { x: 22400, y: 96, w: 90, h: 16, subType: 'ice_rock' },
  { x: 22470, y: 80, w: 60, h: 12, subType: 'slippery_ice' },

  // 6. Cornisa de aproximacion final a la cuspide
  { x: 22530, y: 96, w: 120, h: 22, subType: 'snow_ground' },
  { x: 22610, y: 74, w: 65, h: 12, subType: 'ice_rock' },

  // 7. Gran Meseta de la Cima del Monte Everest (8848 m) con Monumento, Queso #70
  { x: 22680, y: 98, w: 820, h: 32, subType: 'snow_ground' },
  { x: 22800, y: 64, w: 75, h: 14, subType: 'ice_rock' },
  { x: 22920, y: 44, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 23140, y: 62, w: 70, h: 14, subType: 'ice_rock' },
  { x: 23320, y: 50, w: 65, h: 12, subType: 'slippery_ice' },

  // 8. Saliente de la Cuspide y mirador del Himalaya
  { x: 23500, y: 98, w: 300, h: 32, subType: 'snow_ground' }
];
