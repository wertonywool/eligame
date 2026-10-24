// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 2: PLATAFORMAS DEL GLACIAR KHUMBU (X: 1490 -> 2720)
// ============================================================================
// Gran grieta glacial, laberinto de seracs, tempanos moviles y Campamento 2.

module.exports = [
  // 1. Terraza de morrena rocosa y puesto del Sherpa Pemba (X: 1490 -> 1720)
  { x: 1490, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // 2. Banco de Nieve Glacial y pilar de hielo quebrable con bolas de nieve (X: 1720 -> 1940)
  { x: 1720, y: 196, w: 220, h: 32, subType: 'snow_bank' },
  { x: 1940, y: 170, w: 24, h: 54, subType: 'ice_pillar', breakable: true, hp: 2 },

  // 3. Cornisas de ascenso por los seracs y hielo quebradizo (cracking_ice)
  { x: 1840, y: 150, w: 80, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 1940, y: 116, w: 70, h: 12, subType: 'cracking_ice' },
  { x: 2030, y: 84, w: 75, h: 14, oneWay: true, subType: 'ice_rock' },

  // 4. Saliente rocoso antes de la Gran Grieta
  { x: 2070, y: 196, w: 70, h: 28, subType: 'snow_ground' },

  // 5. La Gran Grieta: Tempano movil a la deriva y puente suspendido
  { x: 2150, y: 196, w: 75, h: 14, moving: true, minX: 2150, maxX: 2310, speed: 50, subType: 'slippery_ice' },
  { x: 2190, y: 140, w: 110, h: 14, subType: 'alpine_bridge' },

  // 6. Saliente rocoso de aterrizaje y Segundo Banco de Nieve Profunda (X: 2390 -> 2650)
  { x: 2390, y: 196, w: 60, h: 28, subType: 'snow_ground' },
  { x: 2450, y: 196, w: 200, h: 32, subType: 'snow_bank' },
  { x: 2540, y: 128, w: 80, h: 14, oneWay: true, subType: 'ice_rock' },

  // 7. Terraza del Campamento 2 con Checkpoint #18 (X: 2640 -> 2730)
  { x: 2640, y: 196, w: 100, h: 28, subType: 'snow_ground' }
];
