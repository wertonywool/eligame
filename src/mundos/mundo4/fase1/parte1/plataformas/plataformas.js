// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: PLATAFORMAS DE LAS FALDAS DEL MONTE EVEREST
// ============================================================================
// Topografia organica de montana:
// 1. Campamento Base despejado y acogedor (refugio y tutorial).
// 2. Banco de nieve profunda para cavar tuneles y recoger quesos enterrados.
// 3. Cornisas de roca y pizarra para escalada alpina natural hacia miradores.
// 4. Gran banco de nieve azolado por ventiscas.
// 5. Puente alpino de madera sobre la grieta hacia el Campamento 1.

module.exports = [
  // 1. Campamento Base despejado y seguro de Don Mateo (X: 0 -> 420)
  { x: 0, y: 196, w: 420, h: 28, subType: 'snow_ground' },

  // 2. Primer Banco de Nieve Profunda: Tutorial de excavacion y tuneles (X: 420 -> 710)
  { x: 420, y: 196, w: 290, h: 32, subType: 'snow_bank' },

  // 3. Colina de pizarra y ascenso escarpado hacia el mirador (X: 710 -> 1070)
  { x: 710, y: 196, w: 160, h: 28, subType: 'snow_ground' },
  { x: 800, y: 154, w: 85, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 890, y: 118, w: 75, h: 12, subType: 'slippery_ice' },
  { x: 975, y: 92, w: 90, h: 14, oneWay: true, subType: 'ice_rock' },

  // 4. Saliente rocoso de descanso y Gran Banco de Nieve de la Ventisca (X: 1070 -> 1350)
  { x: 1070, y: 196, w: 60, h: 28, subType: 'snow_ground' },
  { x: 1130, y: 196, w: 220, h: 32, subType: 'snow_bank' },

  // 5. Puente alpino de troncos sobre la primera grieta glaciar (X: 1350 -> 1490)
  { x: 1350, y: 196, w: 140, h: 14, subType: 'alpine_bridge' }
];
