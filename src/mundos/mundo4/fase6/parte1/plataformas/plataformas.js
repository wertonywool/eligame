// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 1: PLATAFORMAS DEL KANGSHUNG (X: 23800 -> 25250)
// ============================================================================
// Descenso de la cumbre, Arista de Cristal, Caverna de Hielo Azul y Balcon de Kangshung.

module.exports = [
  // 1. Rampa de descenso desde el mirador de la cumbre (X: 23800 -> 24020)
  { x: 23800, y: 110, w: 220, h: 28, subType: 'snow_ground' },
  { x: 23880, y: 78, w: 70, h: 14, subType: 'ice_rock' },
  { x: 23960, y: 52, w: 60, h: 12, subType: 'slippery_ice' },

  // 2. Terraza del Campamento Kangshung 1 y Lobsang el Rastreador (X: 24020 -> 24280)
  { x: 24020, y: 126, w: 260, h: 28, subType: 'snow_ground' },
  { x: 24140, y: 88, w: 75, h: 14, subType: 'ice_rock' },

  // 3. Cornisa superior de entrada a la Caverna de Hielo Azul con Queso #71
  { x: 24280, y: 104, w: 140, h: 18, subType: 'ice_rock' },
  { x: 24350, y: 68, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Pilar de hielo milenario quebrable con el Pico de Hielo
  { x: 24420, y: 104, w: 40, h: 48, subType: 'ice_pillar' },

  // 5. Banco inferior de permafrost de la caverna con Queso #72 enterrado
  { x: 24340, y: 168, w: 280, h: 32, subType: 'snow_bank' },
  { x: 24490, y: 124, w: 65, h: 14, subType: 'ice_rock' },

  // 6. Garganta de Estalactitas Glaciales - Cornisas escalonadas y pista deslizante
  { x: 24620, y: 136, w: 90, h: 16, subType: 'ice_rock' },
  { x: 24680, y: 106, w: 60, h: 12, subType: 'slippery_ice' },
  { x: 24740, y: 112, w: 110, h: 16, subType: 'slippery_ice' },
  { x: 24810, y: 78, w: 65, h: 12, subType: 'ice_rock' },
  { x: 24880, y: 94, w: 90, h: 16, subType: 'ice_rock' },

  // 7. Balcon mirador de Kangshung hacia la Vertiente Prohibida
  { x: 24970, y: 124, w: 280, h: 28, subType: 'snow_ground' },
  { x: 25090, y: 88, w: 75, h: 14, subType: 'ice_rock' },
  { x: 25190, y: 60, w: 60, h: 12, subType: 'slippery_ice' }
];
