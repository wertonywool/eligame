// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 3: PLATAFORMAS DEL SANCTUM SANCTORUM (X: 39800 -> 41600)
// ============================================================================
// En X >= 33000 la gravedad cósmica es reducida; saltos largos, flotantes y ágiles.

module.exports = [
  // 1. Terraza de Ascenso y Acceso al Sanctum Sanctorum
  { x: 39840, y: 120, w: 160, h: 28, subType: 'snow_ground' },

  // 2. Calzada Prismática de la Estrella Solitaria
  { x: 40040, y: 102, w: 120, h: 16, subType: 'rainbow_ice' },

  // 3. Terraza Flotante de Diamante Glacial de la Estrella Solitaria (Queso #101)
  { x: 40190, y: 72, w: 100, h: 16, subType: 'ice_crystal', launchRamp: true },

  // 4. Balcón de Acceso al Atrio de los Sabios
  { x: 40340, y: 108, w: 120, h: 16, subType: 'rainbow_ice' },

  // 5. Gran Atrio de los Sabios Celestiales (Patriarca Rigden y Checkpoint #48)
  { x: 40500, y: 126, w: 230, h: 30, subType: 'snow_ground' },

  // 6. GRAN ARENA CELESTIAL DE COMBATE DE POLARIS (X: 40730 -> 41380)
  // Suelo sagrado continuo: Elizabeth nunca caerá al vacío durante la batalla contra el Dragón Astral
  { x: 40730, y: 126, w: 650, h: 32, subType: 'snow_ground' },

  // Almenara Izquierda de Combate
  { x: 40800, y: 92, w: 90, h: 14, subType: 'rainbow_ice' },

  // Gran Cristal Cenital de Combate (Queso #102 y plataforma para saltar a golpear al Dragón)
  { x: 40990, y: 72, w: 100, h: 14, subType: 'ice_crystal', launchRamp: true },

  // Almenara Derecha de Combate
  { x: 41180, y: 92, w: 90, h: 14, subType: 'rainbow_ice' },

  // 7. Gran Altar Supremo de Polaris (Trono de Polaris, 4to Hijo Ratón, Queso #103 y Portal)
  { x: 41380, y: 126, w: 220, h: 32, subType: 'snow_ground' }
];
