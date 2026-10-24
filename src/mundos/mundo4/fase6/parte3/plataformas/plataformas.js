// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 3: PLATAFORMAS DEL UMBRAL DEL SANTUARIO (X: 26700 -> 28150)
// ============================================================================
// Desfiladero de Entrada Sagrada, Terraza de los Guardianes, Puente Ceremonial del Cañón,
// Gran Atrio de Lama Kalsang, Bóveda Cripta de Cristal y Antesala de la Batalla.

module.exports = [
  // 1. Desfiladero de acceso y aproximación al santuario (X: 26700 -> 26870)
  { x: 26700, y: 110, w: 170, h: 28, subType: 'snow_ground' },
  { x: 26790, y: 78, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 2. Terraza de los Guardianes de Escarcha (Queso #77)
  { x: 26880, y: 116, w: 150, h: 24, subType: 'snow_ground' },
  { x: 26970, y: 76, w: 80, h: 16, subType: 'ice_rock', oneWay: true }, // Altar Queso #77
  { x: 27030, y: 52, w: 65, h: 12, subType: 'slippery_ice', oneWay: true },

  // 3. Puente Ceremonial del Cañón Sagrado sobre el Vórtice Polar 3
  { x: 27110, y: 112, w: 150, h: 14, subType: 'slippery_ice' },
  { x: 27210, y: 78, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 4. Gran Atrio del Templo Ancestral con Lama Kalsang y Checkpoint #40 (X: 27290 -> 27630)
  { x: 27290, y: 126, w: 340, h: 30, subType: 'snow_ground' },
  { x: 27320, y: 44, w: 280, h: 16, subType: 'ice_rock' }, // Techo monumental del atrio
  { x: 27390, y: 84, w: 75, h: 14, subType: 'ice_rock', oneWay: true },
  { x: 27490, y: 64, w: 65, h: 12, subType: 'slippery_ice', oneWay: true },

  // 5. Bóveda Cripta de Jade y Cristal Sellada (Queso #78)
  { x: 27640, y: 148, w: 220, h: 26, subType: 'snow_ground' },
  { x: 27680, y: 102, w: 46, h: 64, subType: 'ice_pillar', breakable: true }, // Gran pilar quebrable
  { x: 27780, y: 112, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 6. Terraza Elevada de la Antesala de la Batalla (Queso #79)
  { x: 27860, y: 110, w: 150, h: 24, subType: 'snow_ground' },
  { x: 27940, y: 68, w: 75, h: 14, subType: 'ice_rock', oneWay: true }, // Cornisa Queso #79
  { x: 28030, y: 110, w: 120, h: 16, subType: 'slippery_ice' }
];
