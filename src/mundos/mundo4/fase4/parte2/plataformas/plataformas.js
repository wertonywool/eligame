// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 2: PLATAFORMAS DEL LAGO PROFUNDO (X: 15650 -> 18000)
// ============================================================================
// Islas de hielo profundo, Fosa abisal, Santuario Glacial milenario y farallon del Everest.

module.exports = [
  // 1. Orilla de entrada a la zona profunda del lago con Nyima (X: 15650 -> 16050)
  { x: 15650, y: 196, w: 400, h: 28, subType: 'snow_ground' },
  { x: 15750, y: 156, w: 75, h: 14, subType: 'ice_rock' },
  { x: 15850, y: 124, w: 65, h: 12, subType: 'slippery_ice' },

  // 2. Cadena de tempanos flotantes sobre la fosa abisal
  { x: 16080, y: 176, w: 70, h: 14, subType: 'ice_rock' },
  { x: 16140, y: 140, w: 60, h: 12, subType: 'ice_rock' },
  { x: 16180, y: 168, w: 80, h: 14, subType: 'ice_rock' },
  { x: 16240, y: 130, w: 65, h: 12, subType: 'slippery_ice' },

  // 3. Tempano movil central en la fosa profunda con Queso #62 (X: 16280 -> 16380)
  { x: 16280, y: 140, w: 100, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 16340, y: 100, w: 60, h: 12, subType: 'slippery_ice' },

  // 4. Segundo grupo de tempanos salientes
  { x: 16400, y: 168, w: 70, h: 14, subType: 'ice_rock' },
  { x: 16480, y: 152, w: 70, h: 14, subType: 'ice_rock' },

  // 5. Isla del Santuario Glacial y Checkpoint #32 (X: 16580 -> 16850)
  { x: 16580, y: 196, w: 270, h: 28, subType: 'snow_ground' },
  { x: 16680, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 16780, y: 120, w: 65, h: 12, subType: 'ice_rock' },

  // 6. Terraza del Altar Glacial con Monje Tenzin (X: 16850 -> 17150)
  { x: 16850, y: 196, w: 300, h: 28, subType: 'snow_ground' },
  { x: 16930, y: 120, w: 100, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 17040, y: 88, w: 60, h: 12, subType: 'slippery_ice' },

  // 7. Pista de hielo deslizante hacia el pie del Everest (X: 17150 -> 17500)
  { x: 17150, y: 196, w: 350, h: 28, subType: 'slippery_ice' },
  { x: 17280, y: 156, w: 75, h: 14, subType: 'ice_rock' },
  { x: 17400, y: 124, w: 65, h: 12, subType: 'ice_rock' },

  // 8. Gran banco de permafrost al pie del farallon con Queso #64 enterrado (X: 17500 -> 17700)
  { x: 17500, y: 196, w: 200, h: 32, subType: 'snow_bank' },
  { x: 17580, y: 150, w: 70, h: 14, subType: 'ice_rock' },

  // 9. Rampa de roca y nieve de ascenso a la Cumbre con Checkpoint #33 (X: 17700 -> 18000)
  { x: 17700, y: 196, w: 300, h: 28, subType: 'snow_ground' },
  { x: 17820, y: 154, w: 80, h: 14, subType: 'ice_rock' },
  { x: 17920, y: 120, w: 70, h: 14, subType: 'ice_rock' }
];
