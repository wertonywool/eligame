// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 1: PLATAFORMAS DE KAILASH (X: 33000 -> 34700)
// ============================================================================
// Ascenso al Sagrado Monte Kailash, Terrazas de Lapislázuli, Túneles de Nieve Profunda,
// Monolitos de Cuarzo y Jade Quebrables, y Puentes de Arcoíris Celestiales.
// NOTA: En X >= 33000 la gravedad cósmica es reducida (0.54x); saltos largos y flotantes.

module.exports = [
  // 1. Rampa de Entrada Sagrada a los Pies del Monte Kailash (X: 33000 -> 33220)
  { x: 33000, y: 126, w: 220, h: 30, subType: 'snow_ground' },
  { x: 33160, y: 92, w: 60, h: 14, subType: 'ice_rock', oneWay: true },

  // 2. Terrazas de Lapislázuli & Banco de Nieve Profunda con Túnel Subterráneo (X: 33230 -> 33580)
  // Banco de nieve profunda donde Elizabeth cava túneles con la pala (isDigging)
  { x: 33230, y: 126, w: 180, h: 28, subType: 'snow_bank' },

  // Plataformas flotantes escalonadas de cristal sobre el banco de nieve
  { x: 33270, y: 84, w: 65, h: 14, subType: 'ice_crystal', oneWay: true },
  { x: 33350, y: 56, w: 60, h: 12, subType: 'slippery_ice', oneWay: true },
  { x: 33430, y: 80, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 3. Pilar Quebrable de Cuarzo Sagrado de Kailash #1 (Se quiebra con bola de nieve o stomp)
  { x: 33510, y: 80, w: 34, h: 64, subType: 'ice_pillar', breakable: true, hp: 1, crystalType: 'quartz' },
  // Rampa de velocidad oculta tras el pilar
  { x: 33544, y: 92, w: 70, h: 14, subType: 'ice_rock', launchRamp: true, oneWay: true },

  // 4. Borde del Gran Abismo Celestial (X: 33620 -> 33740)
  { x: 33620, y: 126, w: 120, h: 30, subType: 'snow_ground' },
  // Géiser Astral #1 en x: 33660 impulsa al jugador hacia los Puentes de Arcoíris superiores

  // 5. Puentes de Arcoíris Flotantes de Kailash cruzando el Abismo Estelar
  { x: 33720, y: 52, w: 90, h: 14, subType: 'rainbow_ice', oneWay: true },
  { x: 33830, y: 44, w: 90, h: 14, subType: 'rainbow_ice', oneWay: true },
  // Plataforma de rescate intermedia en el fondo del abismo
  { x: 33760, y: 110, w: 65, h: 14, subType: 'ice_rock', oneWay: true },

  // 6. Terraza Sagrada de las Aguas Termales y Estupas (X: 33960 -> 34180)
  { x: 33960, y: 126, w: 220, h: 30, subType: 'snow_ground' },
  { x: 34040, y: 88, w: 65, h: 14, subType: 'ice_crystal', oneWay: true },
  { x: 34120, y: 60, w: 60, h: 12, subType: 'slippery_ice', oneWay: true },

  // 7. Pilar Quebrable de Jade Cósmico #2 (Rompe con bola de nieve o stomp desde arriba)
  { x: 34180, y: 84, w: 34, h: 64, subType: 'ice_pillar', breakable: true, hp: 1, crystalType: 'jade' },
  // Segundo banco de nieve subterráneo con gemas estelares
  { x: 34214, y: 126, w: 130, h: 28, subType: 'snow_bank' },
  { x: 34280, y: 76, w: 60, h: 14, subType: 'ice_crystal', oneWay: true },

  // 8. Gran Puente del Arcoíris Supremo de Kailash sobre el Vórtice Polar (X: 34380 -> 34600)
  // Géiser Astral #2 en x: 34320 impulsa hacia el puente
  { x: 34380, y: 104, w: 220, h: 16, subType: 'rainbow_ice' },
  // Aguja cumbrera celestial sobre el puente
  { x: 34470, y: 48, w: 60, h: 12, subType: 'ice_crystal', oneWay: true },

  // 9. Terraza de Transición y Portal a la Gran Entrada de Agartha (X: 34600 -> 34700)
  { x: 34600, y: 118, w: 100, h: 28, subType: 'snow_ground' }
];
