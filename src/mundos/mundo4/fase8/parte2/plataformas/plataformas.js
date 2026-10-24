// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 2: PLATAFORMAS DE AGARTHA (X: 34700 -> 36400)
// ============================================================================
// Palacio de Cristal de Agartha, Columnata de Cuarzo, Salón de la Amatista,
// Gran Patio del Trono de Soberana Arya, Sanctum de la Vía Láctea y Portal Cósmico.
// NOTA: En X >= 33000 la gravedad cósmica es reducida (0.54x); saltos largos y flotantes.

module.exports = [
  // 1. Columnata y Gran Puerta de Cristal de Agartha y Checkpoint #45 (X: 34700 -> 34960)
  { x: 34700, y: 126, w: 260, h: 30, subType: 'snow_ground' },
  { x: 34830, y: 88, w: 65, h: 14, subType: 'ice_crystal', oneWay: true },
  { x: 34910, y: 56, w: 60, h: 12, subType: 'slippery_ice', oneWay: true },

  // 2. Salón de los Pilares de Luz y los Jardines de Cuarzo (X: 34980 -> 35380)
  // Pilar Quebrable de Amatista Astral #3 (Rompe con bola de nieve o stomp desde arriba)
  { x: 35020, y: 80, w: 34, h: 64, subType: 'ice_pillar', breakable: true, hp: 1, crystalType: 'amethyst' },
  // Nicho abovedado de arcoíris donde aguarda Queso #92
  { x: 35056, y: 64, w: 70, h: 14, subType: 'rainbow_ice', oneWay: true },

  // Banco de nieve de polvo estelar subterráneo
  { x: 35100, y: 130, w: 170, h: 26, subType: 'snow_bank' },
  // Puente de arcoíris sobre el jardín
  { x: 35170, y: 88, w: 90, h: 14, subType: 'rainbow_ice', oneWay: true },
  // Lámpara de araña de cristal suspendida
  { x: 35250, y: 52, w: 60, h: 12, subType: 'ice_crystal', oneWay: true },
  // Suelo inferior junto al Géiser Astral #1
  { x: 35260, y: 126, w: 120, h: 30, subType: 'snow_ground' },

  // 3. Gran Patio Celestial del Palacio y Trono de Soberana Arya (X: 35380 -> 35760)
  { x: 35380, y: 126, w: 380, h: 32, subType: 'snow_ground' },
  // Balustradas reales escalonadas sobre el trono de Arya
  { x: 35430, y: 92, w: 65, h: 14, subType: 'ice_crystal', oneWay: true },
  { x: 35500, y: 58, w: 80, h: 14, subType: 'rainbow_ice', oneWay: true },
  { x: 35580, y: 92, w: 65, h: 14, subType: 'ice_crystal', oneWay: true },

  // 4. Salón de Transición y Pilar de Jade Celestial #4 (X: 35760 -> 35880)
  { x: 35760, y: 126, w: 90, h: 30, subType: 'snow_ground' },
  // Pilar Quebrable de Jade Celestial #4
  { x: 35830, y: 80, w: 34, h: 64, subType: 'ice_pillar', breakable: true, hp: 1, crystalType: 'jade' },
  // Fosa de nieve profunda
  { x: 35860, y: 140, w: 120, h: 26, subType: 'snow_bank' },

  // 5. El Sanctum de la Vía Láctea y Peldaños de Constelación (X: 35900 -> 36140)
  // Géiser Astral #2 en x: 35910 impulsa a los peldaños estelares
  { x: 35950, y: 64, w: 75, h: 14, subType: 'rainbow_ice', oneWay: true },
  { x: 36010, y: 44, w: 60, h: 12, subType: 'ice_crystal', oneWay: true },
  { x: 36080, y: 76, w: 70, h: 14, subType: 'rainbow_ice', oneWay: true },

  // 6. Gran Altar Supremo de Agartha y Portal Cósmico al Firmamento (X: 36140 -> 36400)
  { x: 36140, y: 126, w: 260, h: 32, subType: 'snow_ground' },
  { x: 36210, y: 54, w: 60, h: 14, subType: 'ice_crystal', oneWay: true }
];
