// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 3: PLATAFORMAS DE LA CABAÑA DE GASTON (CASA 3)
// ============================================================================
// Exterior: Paseo Melancólico y cabaña de Gaston (X: 9550 -> 10300)
// Interior: Cabaña de Gaston el Melancólico (X: 50800 -> 51100)

module.exports = [
  // --- SECTOR EXTERIOR: PASEO MELANCÓLICO Y CABAÑA DESVENCIIJADA ---
  // 1. Calzada de entrada desde el Distrito Textil (X: 9550 -> 9750)
  { x: 9550, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // 2. Gran Banco de Nieve frente a la cabaña con queso enterrado (X: 9750 -> 9870)
  { x: 9750, y: 196, w: 120, h: 32, subType: 'snow_bank' },

  // 3. Acera frente a la Cabaña de Gaston (X: 9870 -> 10070)
  { x: 9870, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la cabaña accesible para parkour (X: 9890 -> 9970)
  { x: 9890, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Paseo nevado hacia el Checkpoint #25 y Casa 4 (X: 10070 -> 10300)
  { x: 10070, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: CABAÑA DE GASTON (X: 50800 -> 51100) ---
  // 6. Suelo de madera desgastada del interior
  { x: 50800, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Muros y techo de la cabaña
  { x: 50780, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 51100, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 50800, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo rústico con queso secreto
  { x: 50930, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
