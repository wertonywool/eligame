// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 3: PLATAFORMAS DE LA CABAÑA DE GASTON (CASA 3)
// ============================================================================
// Exterior: Paseo Melancólico, porches desvencijados y tejados escalables (X: 9550 -> 10300)
// Interior: Cabaña de Gaston el Melancólico (X: 50800 -> 51100)

module.exports = [
  // --- SECTOR EXTERIOR: PASEO MELANCÓLICO Y CABAÑA DESVENCIJADA ---
  // 1. Calzada de entrada desde el Distrito Textil (X: 9550 -> 9750)
  { x: 9550, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 9650, y: 166, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Valla rústica de madera

  // 2. Gran Banco de Nieve frente a la cabaña con queso enterrado #46 (X: 9750 -> 9870)
  { x: 9750, y: 196, w: 120, h: 32, subType: 'snow_bank' },
  { x: 9780, y: 154, w: 75, h: 12, oneWay: true, subType: 'ice_rock' }, // Terraza de nieve acumulada

  // 3. Acera frente a la Cabaña de Gaston (X: 9870 -> 10070)
  { x: 9870, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 9875, y: 158, w: 55, h: 10, oneWay: true, subType: 'ice_rock' }, // Porche desvencijado

  // 4. Tejado nevado de la cabaña con estufa de leña para parkour (X: 9890 -> 9970)
  { x: 9890, y: 118, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 9935, y: 76, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Chimenea de chapa con queso #45

  // 5. Rama de pino nevado colgante hacia el Distrito Arcade
  { x: 9980, y: 84, w: 75, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 10110, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol con repisa

  // 6. Paseo nevado hacia el Checkpoint #25 y Casa 4 (X: 10070 -> 10300)
  { x: 10070, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: CABAÑA DE GASTON (X: 50800 -> 51100) ---
  // 7. Suelo de madera desgastada del interior
  { x: 50800, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros y techo de la cabaña
  { x: 50780, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 51100, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 50800, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Mobiliario melancólico escalable en la cabaña
  { x: 50870, y: 172, w: 45, h: 8, oneWay: true, subType: 'ice_rock' }, // Camastro de Gaston
  { x: 50925, y: 150, w: 50, h: 10, oneWay: true, subType: 'ice_rock' }, // Mesa de noche y libros
  { x: 51010, y: 168, w: 40, h: 10, oneWay: true, subType: 'ice_rock' }, // Pedestal del pico de hielo
  { x: 50950, y: 116, w: 95, h: 12, oneWay: true, subType: 'ice_rock' }, // Altillo con queso #44
  { x: 50860, y: 84, w: 60, h: 8, oneWay: true, subType: 'ice_rock' } // Viga de madera suspendida
];
