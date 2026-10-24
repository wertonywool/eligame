// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 1: PLATAFORMAS DEL KANGSHUNG (X: 23800 -> 25250)
// ============================================================================
// Descenso de la cumbre, Arista de Cristal, Caverna de Hielo Azul con Gruta Secreta,
// Garganta de Estalactitas Glaciales y Balcón Panorámico de Kangshung.

module.exports = [
  // 1. Rampa de descenso desde el mirador de la cumbre del Everest (X: 23800 -> 24020)
  { x: 23800, y: 110, w: 230, h: 28, subType: 'snow_ground' },
  { x: 23880, y: 76, w: 80, h: 14, subType: 'ice_rock', oneWay: true },
  { x: 23960, y: 50, w: 75, h: 12, subType: 'slippery_ice', oneWay: true },

  // 2. Terraza del Campamento Kangshung 1 (Lobsang el Rastreador) (X: 24020 -> 24300)
  { x: 24020, y: 126, w: 280, h: 28, subType: 'snow_ground' },
  { x: 24150, y: 88, w: 80, h: 14, subType: 'ice_rock', oneWay: true },

  // 3. Entrada y bóveda de la Caverna de Hielo Azul
  { x: 24290, y: 114, w: 140, h: 20, subType: 'ice_rock' },
  { x: 24280, y: 38, w: 320, h: 16, subType: 'ice_rock' }, // Techo de la caverna
  { x: 24350, y: 72, w: 80, h: 12, subType: 'slippery_ice', oneWay: true }, // Cornisa Queso #71

  // 4. Pilar de hielo milenario quebrable (Sella la Gruta Secreta de Hielo)
  { x: 24420, y: 94, w: 42, h: 60, subType: 'ice_pillar', breakable: true },

  // 5. Suelo de la Gruta Secreta de Hielo Milenario (Contiene Queso #72)
  { x: 24340, y: 154, w: 260, h: 28, subType: 'snow_ground' },
  { x: 24520, y: 120, w: 70, h: 14, subType: 'ice_rock', oneWay: true },

  // 6. Garganta de Estalactitas Glaciales con suelo de contención seguro
  { x: 24600, y: 162, w: 360, h: 26, subType: 'snow_ground' }, // Base segura de la garganta
  { x: 24620, y: 134, w: 100, h: 18, subType: 'ice_rock' },
  { x: 24690, y: 104, w: 75, h: 14, subType: 'slippery_ice', oneWay: true },
  { x: 24750, y: 110, w: 110, h: 16, subType: 'slippery_ice' },
  { x: 24820, y: 72, w: 70, h: 12, subType: 'ice_rock', oneWay: true }, // Aguja Queso #73
  { x: 24880, y: 94, w: 90, h: 16, subType: 'ice_rock' },

  // 7. Balcón mirador de Kangshung hacia las Torres Celestiales
  { x: 24960, y: 124, w: 300, h: 28, subType: 'snow_ground' },
  { x: 25080, y: 86, w: 80, h: 14, subType: 'ice_rock', oneWay: true },
  { x: 25180, y: 60, w: 70, h: 12, subType: 'slippery_ice', oneWay: true }
];
