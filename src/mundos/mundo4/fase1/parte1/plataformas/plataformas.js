// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: PLATAFORMAS DE LAS FALDAS DEL MONTE EVEREST
// ============================================================================
// Bioma de alta montana y nieve:
// 1. snow_ground: Suelo firme rocoso cubierto de nieve virgen y escarcha.
// 2. snow_bank: Bancos de nieve profunda donde Elizabeth cava tuneles subterraneos.
// 3. ice_rock: Cornisas escarpadas de pizarra helada con carambanos colgantes.
// 4. alpine_bridge: Puente rustico de troncos alpinos y cuerdas sobre el desfiladero.

module.exports = [
  // 1. Campamento Base y faldas iniciales de la montana (X: 0 -> 400)
  { x: 0, y: 196, w: 400, h: 28, subType: 'snow_ground' },
  { x: 120, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 220, y: 124, w: 65, h: 12, subType: 'slippery_ice' },

  // 2. Primer Banco de Nieve Profunda: Tutorial de cavado con la pala (X: 430 -> 670)
  { x: 430, y: 196, w: 240, h: 32, subType: 'snow_bank' },
  { x: 490, y: 150, w: 70, h: 14, subType: 'ice_rock' },
  { x: 570, y: 120, w: 60, h: 12, subType: 'slippery_ice' },

  // 3. Colina rocosa intermedia de ascenso (X: 700 -> 860)
  { x: 700, y: 196, w: 160, h: 28, subType: 'snow_ground' },

  // 4. Cornisas de pizarra helada para parkour vertical estilo Celeste
  { x: 740, y: 148, w: 90, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 800, y: 128, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 860, y: 114, w: 110, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 920, y: 84, w: 60, h: 12, subType: 'slippery_ice' },

  // 5. Saliente rocoso nevado de descanso
  { x: 1000, y: 162, w: 80, h: 22, subType: 'snow_ground' },
  { x: 1040, y: 128, w: 65, h: 14, subType: 'ice_rock' },

  // 6. Gran Banco de Nieve en la ruta azolada por la ventisca (X: 1100 -> 1320)
  { x: 1100, y: 196, w: 220, h: 32, subType: 'snow_bank' },
  { x: 1180, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 1260, y: 122, w: 65, h: 12, subType: 'slippery_ice' },

  // 7. Puente alpino de madera sobre el abismo helado (X: 1340 -> 1490)
  { x: 1340, y: 196, w: 150, h: 14, subType: 'alpine_bridge' },
  { x: 1410, y: 158, w: 65, h: 12, subType: 'ice_rock' }
];
