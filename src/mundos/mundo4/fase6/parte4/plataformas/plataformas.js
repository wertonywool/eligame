// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 4: PLATAFORMAS DE LA CAMARA DEL YETI (X: 28150 -> 29600)
// ============================================================================
// Pasaje sagrado, Terraza de Ofrendas, Puente Ceremonial y Gran Estrado del Trono de Cristal.
// NOTA: La arena de combate del Gran Yeti esta entre X: 28655 y 29345.

module.exports = [
  // 1. Pasaje de entrada a la Camara Sagrada (X: 28150 -> 28330)
  { x: 28150, y: 110, w: 180, h: 28, subType: 'snow_ground' },
  { x: 28220, y: 78, w: 65, h: 14, subType: 'ice_rock' },

  // 2. Aguja runica de hielo diamantino quebrable con el Pico de Hielo
  { x: 28350, y: 94, w: 42, h: 54, subType: 'ice_pillar' },

  // 3. Cornisa de los Monolitos Sagrados con Queso #80
  { x: 28410, y: 100, w: 90, h: 18, subType: 'ice_rock' },
  { x: 28460, y: 68, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Puente deslizante de cristal glacial
  { x: 28520, y: 116, w: 110, h: 14, subType: 'slippery_ice' },
  { x: 28580, y: 82, w: 65, h: 12, subType: 'ice_rock' },

  // 5. Terraza Central de las Ofrendas y Checkpoint #41 (X: 28650 -> 28850) [BOSS ARENA]
  { x: 28650, y: 126, w: 200, h: 30, subType: 'snow_ground' },

  // 6. Fosa de permafrost sagrado con Queso #81 (X: 28860 -> 29010) [BOSS ARENA]
  { x: 28860, y: 156, w: 150, h: 26, subType: 'snow_bank' },

  // 7. Aguja escalon hacia el Trono de Cristal [BOSS ARENA]
  { x: 29030, y: 118, w: 75, h: 20, subType: 'ice_rock' },

  // 8. Gran Puente Colgante Ceremonial del Santuario con Queso #82 [BOSS ARENA]
  { x: 29125, y: 104, w: 130, h: 14, subType: 'slippery_ice' },

  // 9. Gran Estrado del Trono Sagrado del Yeti (X: 29270 -> 29550) [POST BOSS]
  { x: 29270, y: 126, w: 280, h: 32, subType: 'snow_ground' },
  { x: 29380, y: 88, w: 75, h: 14, subType: 'ice_rock' },
  { x: 29480, y: 60, w: 60, h: 12, subType: 'slippery_ice' },

  // 10. Balcon del Infinito y Portal a Shambhala (X: 29550 -> 29600)
  { x: 29550, y: 126, w: 50, h: 32, subType: 'snow_ground' }
];
