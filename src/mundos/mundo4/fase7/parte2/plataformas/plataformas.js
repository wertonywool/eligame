// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 2: PLATAFORMAS DE LA GRAN PAGODA (X: 31300 -> 33000)
// ============================================================================
// Patios sagrados de la Gran Pagoda, Fosa de Meditacion, Altar del Loto y Portal.

module.exports = [
  // 1. Terraza de Entrada a los Patios de la Gran Pagoda (X: 31300 -> 31460)
  { x: 31300, y: 110, w: 160, h: 28, subType: 'snow_ground' },
  { x: 31380, y: 80, w: 60, h: 14, subType: 'ice_rock' },

  // 2. Pilar de Cuarzo y Oro quebrable con el Pico de Hielo
  { x: 31490, y: 126, w: 46, h: 64, subType: 'ice_pillar' },

  // 3. Primera Terraza de la Pagoda Dorada con Queso #86
  { x: 31560, y: 96, w: 140, h: 18, subType: 'ice_rock' },
  { x: 31610, y: 64, w: 65, h: 12, subType: 'slippery_ice' },

  // 4. Puente de Cristal de Escarcha Celestial resbaladizo
  { x: 31730, y: 114, w: 140, h: 14, subType: 'slippery_ice' },
  { x: 31760, y: 84, w: 60, h: 14, subType: 'ice_rock' },
  { x: 31840, y: 64, w: 55, h: 12, subType: 'ice_rock' },

  // 5. Gran Patio Central de la Pagoda y Checkpoint #43 (X: 31900 -> 32200)
  { x: 31900, y: 126, w: 300, h: 30, subType: 'snow_ground' },
  { x: 32000, y: 84, w: 75, h: 14, subType: 'ice_rock' },
  { x: 32090, y: 60, w: 60, h: 12, subType: 'slippery_ice' },

  // 6. Fosa de Meditacion y Escarcha Sagrada con Queso #87 (X: 32220 -> 32390)
  { x: 32220, y: 156, w: 170, h: 26, subType: 'snow_bank' },
  { x: 32290, y: 112, w: 60, h: 14, subType: 'snow_bank' },

  // 7. Aguja de Jade y Columna Quebrable
  { x: 32420, y: 110, w: 46, h: 56, subType: 'ice_pillar' },

  // 8. Terraza Elevada del Vortice de Shambhala con Queso #88
  { x: 32500, y: 88, w: 130, h: 18, subType: 'ice_rock' },
  { x: 32550, y: 56, w: 55, h: 12, subType: 'slippery_ice' },

  // 9. Puente Ceremonial de la Coronacion del Loto
  { x: 32650, y: 104, w: 100, h: 14, subType: 'slippery_ice' },
  { x: 32690, y: 74, w: 60, h: 14, subType: 'ice_rock' },

  // 10. Gran Altar Supremo de Shambhala, Altar del Loto y Portal a la Madriguera (X: 32770 -> 33000)
  { x: 32770, y: 126, w: 230, h: 32, subType: 'snow_ground' },
  { x: 32860, y: 92, w: 70, h: 14, subType: 'ice_rock' }
];
