// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 4: PLATAFORMAS DE LA SALA ARCADE RETRO (CASA 4)
// ============================================================================
// Exterior: Distrito Arcade y calle de neón (X: 10300 -> 11050)
// Interior: Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO ARCADE Y CALLE ILUMINADA ---
  // 1. Calzada de entrada desde el Paseo Melancólico (X: 10300 -> 10480)
  { x: 10300, y: 196, w: 180, h: 28, subType: 'snow_ground' },

  // 2. Gran Banco de Nieve frente al arcade con queso enterrado (X: 10480 -> 10600)
  { x: 10480, y: 196, w: 120, h: 32, subType: 'snow_bank' },

  // 3. Acera adoquinada frente a la Sala Arcade (X: 10600 -> 10820)
  { x: 10600, y: 196, w: 220, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la sala arcade para parkour (X: 10660 -> 10740)
  { x: 10660, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Paseo nevado hacia el Checkpoint #26 y Casa 5 (X: 10820 -> 11050)
  { x: 10820, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: SALA ARCADE "ARCADE POLAR" (X: 51200 -> 51500) ---
  // 6. Suelo de baldosas a cuadros retro
  { x: 51200, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Muros y techo de la sala arcade
  { x: 51180, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 51500, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 51200, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo sobre los gabinetes arcade con queso secreto
  { x: 51330, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
