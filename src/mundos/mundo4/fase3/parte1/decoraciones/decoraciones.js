// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 1: DECORACIONES DE LA TABERNA ALPINA (CASA 1)
// ============================================================================
// Fachada exterior con letrero y chimenea, y mobiliario rústico interior.

module.exports = [
  // --- EXTERIOR: PLAZA Y CALLE DEL PUEBLO NEVADO ---
  { x: 8060, y: 196, subType: 'ice_arch' }, // Arco ceremonial de bienvenida a Namche
  { x: 8100, y: 196, subType: 'village_street_sign' },
  { x: 8140, y: 196, subType: 'snow_lantern' },
  { x: 8200, y: 196, subType: 'alpine_pine', scale: 0.9 },
  { x: 8270, y: 196, subType: 'prayer_cairn' },
  { x: 8360, y: 196, subType: 'firewood_pile' },
  { x: 8400, y: 196, subType: 'alpine_tavern' },
  { x: 8535, y: 84, subType: 'prayer_flags' },
  { x: 8630, y: 196, subType: 'snow_lantern' },
  { x: 8710, y: 196, subType: 'prayer_flags' },

  // --- INTERIOR: TABERNA ALPINA "EL REFUGIO CÁLIDO" (X: 50000 -> 50300) ---
  { x: 50090, y: 196, subType: 'tavern_table' },
  { x: 50140, y: 196, subType: 'tavern_fireplace' },
  { x: 50210, y: 196, subType: 'tavern_counter' },
  { x: 50260, y: 196, subType: 'firewood_pile' }
];
