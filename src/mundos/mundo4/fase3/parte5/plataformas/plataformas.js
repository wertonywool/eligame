// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 5: PLATAFORMAS DE LA PANADERÍA (CASA 5)
// ============================================================================
// Exterior: Distrito Gastronómico y calle de la panadería (X: 11050 -> 11800)
// Interior: Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO GASTRONÓMICO ---
  // 1. Calzada de entrada desde el Distrito Arcade (X: 11050 -> 11230)
  { x: 11050, y: 196, w: 180, h: 28, subType: 'snow_ground' },

  // 2. Gran Banco de Nieve frente a la panadería con queso enterrado (X: 11230 -> 11350)
  { x: 11230, y: 196, w: 120, h: 32, subType: 'snow_bank' },

  // 3. Acera adoquinada frente a la panadería (X: 11350 -> 11570)
  { x: 11350, y: 196, w: 220, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la panadería para parkour (X: 11410 -> 11490)
  { x: 11410, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Paseo gastronómico hacia el Checkpoint #27 y Casa 6 (X: 11570 -> 11800)
  { x: 11570, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: PANADERÍA "EL HORNO DEL YETI" (X: 51600 -> 51900) ---
  // 6. Suelo de parquet rústico en tonos ámbar
  { x: 51600, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Muros y techo de la panadería
  { x: 51580, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 51900, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 51600, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo de madera sobre las estanterías de té con queso secreto
  { x: 51730, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
