// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 5: PLATAFORMAS DE LA PANADERÍA (CASA 5)
// ============================================================================
// Exterior: Distrito Gastronómico, chimeneas de leña y tejados para parkour (X: 11050 -> 11800)
// Interior: Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO GASTRONÓMICO ---
  // 1. Calzada de entrada desde el Distrito Arcade (X: 11050 -> 11230)
  { x: 11050, y: 196, w: 180, h: 28, subType: 'snow_ground' },
  { x: 11130, y: 165, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Carro de reparto de pan y té

  // 2. Gran Banco de Nieve frente a la panadería con queso enterrado #52 (X: 11230 -> 11350)
  { x: 11230, y: 196, w: 120, h: 32, subType: 'snow_bank' },
  { x: 11255, y: 154, w: 75, h: 12, oneWay: true, subType: 'ice_rock' }, // Terraza de nieve elevada

  // 3. Acera adoquinada frente a la panadería (X: 11350 -> 11570)
  { x: 11350, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 11370, y: 162, w: 55, h: 10, oneWay: true, subType: 'ice_rock' }, // Toldo del escaparate de bollos

  // 4. Tejado nevado con gran chimenea de piedra para parkour (X: 11395 -> 11490)
  { x: 11395, y: 122, w: 85, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 11435, y: 78, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Cúpula de la chimenea con queso #51

  // 5. Guirnalda de banderines aromáticos hacia la Casa 6
  { x: 11495, y: 84, w: 75, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 11610, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol con repisa

  // 6. Paseo gastronómico hacia el Checkpoint #27 y Casa 6 (X: 11570 -> 11800)
  { x: 11570, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: PANADERÍA "EL HORNO DEL YETI" (X: 51600 -> 51900) ---
  // 7. Suelo de parquet rústico en tonos ámbar
  { x: 51600, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros y techo de la panadería
  { x: 51580, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 51900, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 51600, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Mobiliario de repostería escalable
  { x: 51680, y: 166, w: 50, h: 10, oneWay: true, subType: 'ice_rock' }, // Mostrador de dulces
  { x: 51740, y: 148, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Pilas de sacos de harina
  { x: 51810, y: 166, w: 50, h: 10, oneWay: true, subType: 'ice_rock' }, // Cúpula del horno de barro
  { x: 51760, y: 118, w: 90, h: 12, oneWay: true, subType: 'ice_rock' }, // Estantería de panes con queso #50
  { x: 51660, y: 84, w: 65, h: 8, oneWay: true, subType: 'ice_rock' } // Viga de madera de secado
];
