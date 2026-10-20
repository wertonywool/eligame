// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 2: DECORACIONES DEL GLACIAR KHUMBU (X: 1490 -> 2720)
// ============================================================================
// Carpa de expedición sherpa, banderines tibetanos de plegaria, pináculos de hielo.

module.exports = [
  // 1. Puesto de avanzada del Guía Sherpa Pemba
  { x: 1500, y: 196, subType: 'alpine_sign' },
  { x: 1530, y: 196, subType: 'sherpa_tent' },
  { x: 1580, y: 196, subType: 'prayer_flags' },

  // 2. Pináculos y seracs de hielo glacial escarpado
  { x: 1720, y: 196, subType: 'ice_spire' },
  { x: 2320, y: 186, subType: 'ice_spire' },

  // 3. Abetos alpinos de altura
  { x: 1650, y: 196, subType: 'alpine_pine', scale: 0.95 },
  { x: 2070, y: 164, subType: 'alpine_pine', scale: 0.8 },
  { x: 2690, y: 196, subType: 'alpine_pine', scale: 1.1 },

  // 4. Faroles de nieve guiando el camino sobre el puente y campamento
  { x: 1640, y: 196, subType: 'snow_lantern' },
  { x: 2160, y: 144, subType: 'snow_lantern' },
  { x: 2680, y: 196, subType: 'snow_lantern' },

  // 5. Reserva de leña del Campamento 2
  { x: 2580, y: 196, subType: 'firewood_pile' }
];
