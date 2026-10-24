// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 4: PLATAFORMAS DE LA SALA ARCADE RETRO (CASA 4)
// ============================================================================
// Exterior: Distrito Arcade, marquesinas de neón y tejados escalables (X: 10300 -> 11050)
// Interior: Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO ARCADE Y CALLE ILUMINADA ---
  // 1. Calzada de entrada desde el Paseo Melancólico (X: 10300 -> 10480)
  { x: 10300, y: 196, w: 180, h: 28, subType: 'snow_ground' },
  { x: 10380, y: 165, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Terraza de marquesina de neón

  // 2. Gran Banco de Nieve frente al arcade con queso enterrado #49 (X: 10480 -> 10600)
  { x: 10480, y: 196, w: 120, h: 32, subType: 'snow_bank' },
  { x: 10515, y: 154, w: 75, h: 12, oneWay: true, subType: 'ice_rock' }, // Pasarela elevada con iluminación cian

  // 3. Acera adoquinada frente a la Sala Arcade (X: 10600 -> 10820)
  { x: 10600, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 10615, y: 158, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Toldo de marquesina del Arcade

  // 4. Tejado nevado con letrero de neón para parkour (X: 10640 -> 10740)
  { x: 10640, y: 120, w: 85, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 10685, y: 74, w: 40, h: 10, oneWay: true, subType: 'ice_rock' }, // Letrero luminoso superior con queso #48

  // 5. Cable de suspensión con bombillas de neón hacia la Casa 5
  { x: 10740, y: 84, w: 80, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 10860, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol de neón con repisa

  // 6. Paseo nevado hacia el Checkpoint #26 y Casa 5 (X: 10820 -> 11050)
  { x: 10820, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: SALA ARCADE "ARCADE POLAR" (X: 51200 -> 51500) ---
  // 7. Suelo de baldosas a cuadros retro
  { x: 51200, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros y techo de la sala arcade
  { x: 51180, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 51500, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 51200, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Mobiliario arcade escalable
  { x: 51280, y: 168, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Fila 1 de cabinas arcade
  { x: 51365, y: 168, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Cabina central Yeti-99
  { x: 51330, y: 122, w: 105, h: 12, oneWay: true, subType: 'ice_rock' }, // Altillo con letrero y queso #47
  { x: 51240, y: 84, w: 70, h: 8, oneWay: true, subType: 'ice_rock' } // Cercha metálica de luces de neón
];
