// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 2: PLATAFORMAS DE LA TIENDA DE ROPA (CASA 2)
// ============================================================================
// Exterior: Distrito Textil y calle comercial (X: 8800 -> 9550)
// Interior: Tienda de Ropa y Gorros "El Gorro Nevado" (X: 50400 -> 50700)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO TEXTIL Y CALLE COMERCIAL ---
  // 1. Calzada de entrada desde la plaza de la taberna (X: 8800 -> 8980)
  { x: 8800, y: 196, w: 180, h: 28, subType: 'snow_ground' },

  // 2. Gran Banco de Nieve frente al taller textil con queso enterrado (X: 8980 -> 9140)
  { x: 8980, y: 196, w: 160, h: 32, subType: 'snow_bank' },

  // 3. Acera comercial frente a la tienda "El Gorro Nevado" (X: 9140 -> 9340)
  { x: 9140, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la tienda accesible para parkour (X: 9160 -> 9240)
  { x: 9160, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Paseo nevado hacia el Checkpoint #24 y Casa 3 (X: 9340 -> 9550)
  { x: 9340, y: 196, w: 210, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: TIENDA "EL GORRO NEVADO" (X: 50400 -> 50700) ---
  // 6. Suelo de madera lustrosa de la boutique
  { x: 50400, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Muros aislantes y techo de la sastrería
  { x: 50380, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 50700, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 50400, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo de exhibición de telas y gorros con queso secreto
  { x: 50530, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
