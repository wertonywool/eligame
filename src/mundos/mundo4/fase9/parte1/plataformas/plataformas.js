// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 1: PLATAFORMAS DEL FIRMAMENTO CÓSMICO (X: 36400 -> 38100)
// ============================================================================
// En X >= 33000 la gravedad cósmica es reducida; saltos largos, flotantes y ágiles.

module.exports = [
  // 1. Terraza de Salida del Portal de Agartha hacia el Firmamento
  { x: 36400, y: 126, w: 180, h: 28, subType: 'snow_ground' },
  { x: 36520, y: 88, w: 70, h: 14, subType: 'ice_rock' },

  // 2. Primer Puente Prismático de Aurora Boreal (Cristal cromático celestial)
  { x: 36620, y: 110, w: 110, h: 16, subType: 'rainbow_ice' },

  // 3. Terraza Flotante de Meteorito Astral con Rampa de Impulso Supernova (Queso #95)
  { x: 36740, y: 72, w: 100, h: 16, subType: 'ice_rock', launchRamp: true },

  // 4. Bloques Flotantes de Diamante Glacial (Parkour celeste Celeste-style)
  { x: 36880, y: 96, w: 90, h: 14, subType: 'ice_crystal' },
  { x: 37010, y: 112, w: 100, h: 16, subType: 'rainbow_ice' },

  // 5. Gran Mirador de la Vía Láctea (Vigía Cósmico Kelsang y Checkpoint #46)
  { x: 37140, y: 126, w: 240, h: 30, subType: 'snow_ground' },

  // 6. Risco Flotante en el Abismo de Polvo Estelar (con Vórtice Cósmico hacia Queso #96)
  { x: 37420, y: 118, w: 90, h: 16, subType: 'ice_rock' },

  // 7. Aguja de Diamante Astral Suspendida en el Abismo
  { x: 37540, y: 68, w: 80, h: 14, subType: 'ice_crystal', launchRamp: true },

  // 8. Segundo Puente Flotante de Aurora Boreal
  { x: 37660, y: 96, w: 115, h: 16, subType: 'rainbow_ice' },

  // 9. Aguja Superior de las Pléyades (Queso #97)
  { x: 37810, y: 74, w: 95, h: 16, subType: 'ice_rock' },
  { x: 37880, y: 50, w: 55, h: 12, subType: 'ice_crystal' },

  // 10. Terraza de Transición hacia el Laberinto de Nebulosas (Parte 2)
  { x: 37960, y: 120, w: 160, h: 28, subType: 'snow_ground' }
];
