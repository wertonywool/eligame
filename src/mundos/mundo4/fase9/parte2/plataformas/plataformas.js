// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 2: PLATAFORMAS DE LAS NEBULOSAS (X: 38100 -> 39800)
// ============================================================================
// En X >= 33000 la gravedad cósmica es reducida; saltos largos, flotantes y ágiles.

module.exports = [
  // 1. Terraza de Entrada a los Jardines de Nebulosa
  { x: 38100, y: 120, w: 160, h: 28, subType: 'snow_ground' },

  // 2. Puente Prismático de Aurora Boreal Verde y Violeta
  { x: 38290, y: 104, w: 120, h: 16, subType: 'rainbow_ice' },

  // 3. Laberinto Cromático: Ruta Superior de Diamante Celeste (Queso #98)
  { x: 38450, y: 64, w: 100, h: 16, subType: 'ice_crystal', launchRamp: true },

  // 4. Laberinto Cromático: Ruta Inferior por los Lotos Cósmicos
  { x: 38480, y: 126, w: 140, h: 20, subType: 'ice_rock' },
  { x: 38650, y: 100, w: 120, h: 16, subType: 'rainbow_ice' },

  // 5. Gran Oasis de la Aurora Boreal (Sacerdotisa Tara y Checkpoint #47)
  { x: 38820, y: 126, w: 260, h: 30, subType: 'snow_ground' },

  // 6. Fosa Profunda de Meteoritos (Banco de Nieve para excavar con pala - Queso #99)
  { x: 39120, y: 148, w: 180, h: 32, subType: 'snow_bank' },

  // 7. Rampa Estelar de Salida de la Fosa (con Vórtice Cósmico al Cometa Dorado)
  { x: 39340, y: 112, w: 110, h: 18, subType: 'ice_rock' },

  // 8. Aguja Elevada del Cometa Dorado (Parkour de Diamante hacia el Hito #100)
  { x: 39490, y: 78, w: 100, h: 16, subType: 'ice_crystal', launchRamp: true },
  { x: 39600, y: 56, w: 90, h: 14, subType: 'rainbow_ice' },

  // 9. Terraza de Transición hacia el Sanctum Sanctorum (Parte 3)
  { x: 39700, y: 120, w: 160, h: 28, subType: 'snow_ground' }
];
