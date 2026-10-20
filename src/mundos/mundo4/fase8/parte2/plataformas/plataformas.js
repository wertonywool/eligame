// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 2: PLATAFORMAS DE AGARTHA (X: 34700 -> 36400)
// ============================================================================
// Palacio de Cristal de Agartha, Terraza de la Via Lactea, Trono Celestial y Portal.
// NOTA: En X >= 33000 la gravedad cosmica es reducida; saltos largos y flotantes.

module.exports = [
  // 1. Rampa de Entrada a los Jardines de Cristal de Agartha (X: 34700 -> 34860)
  { x: 34700, y: 118, w: 160, h: 28, subType: 'snow_ground' },
  { x: 34780, y: 78, w: 65, h: 14, subType: 'ice_rock' },
  { x: 34860, y: 50, w: 55, h: 12, subType: 'slippery_ice' },

  // 2. Pilar de Cristal Astral quebrable con el Pico de Hielo
  { x: 34890, y: 126, w: 46, h: 64, subType: 'ice_pillar' },

  // 3. Primera Terraza de Cristal de Agartha con Queso #92
  { x: 34960, y: 96, w: 140, h: 18, subType: 'ice_rock' },
  { x: 35020, y: 64, w: 70, h: 14, subType: 'rainbow_ice' },
  { x: 35110, y: 44, w: 55, h: 12, subType: 'slippery_ice' },

  // 4. Puente de Arcoiris Menor de Agartha
  { x: 35130, y: 114, w: 140, h: 14, subType: 'rainbow_ice' },
  { x: 35210, y: 74, w: 60, h: 14, subType: 'ice_rock' },

  // 5. Gran Patio del Palacio de Cristal y Checkpoint #45 (X: 35300 -> 35600)
  { x: 35300, y: 126, w: 300, h: 30, subType: 'snow_ground' },
  { x: 35390, y: 80, w: 75, h: 14, subType: 'ice_rock' },
  { x: 35480, y: 50, w: 60, h: 12, subType: 'slippery_ice' },

  // 6. Fosa de Diamante Astral y Polvo Estelar con Queso #93 (X: 35620 -> 35790)
  { x: 35620, y: 156, w: 170, h: 26, subType: 'snow_bank' },
  { x: 35690, y: 110, w: 60, h: 14, subType: 'snow_bank' },

  // 7. Aguja de Jade Celestial y Pilar Quebrable
  { x: 35820, y: 110, w: 46, h: 56, subType: 'ice_pillar' },

  // 8. Terraza Elevada de la Via Lactea con Queso #94
  { x: 35900, y: 88, w: 130, h: 18, subType: 'ice_rock' },
  { x: 35960, y: 54, w: 55, h: 12, subType: 'slippery_ice' },

  // 9. Gran Puente del Arcoiris Supremo de la Via Lactea
  { x: 36050, y: 104, w: 110, h: 14, subType: 'rainbow_ice' },
  { x: 36100, y: 70, w: 60, h: 14, subType: 'rainbow_ice' },

  // 10. Gran Altar Supremo de Agartha, Trono Celestial y Portal Cosmico a la Madriguera (X: 36180 -> 36400)
  { x: 36180, y: 126, w: 220, h: 32, subType: 'snow_ground' },
  { x: 36270, y: 90, w: 70, h: 14, subType: 'ice_rock' }
];
