// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: DECORACIONES DE LA CIMA DEL EVEREST (X: 20750 -> 23800)
// ============================================================================

module.exports = [
  // 1. El Collado Sur (Campamento 13 - 8000 m - Zona de la Muerte)
  { x: 20770, y: 136, type: 'snow_decoration', subType: 'lantern' },
  { x: 20850, y: 136, type: 'snow_decoration', subType: 'assault_tent' },
  { x: 21020, y: 136, type: 'snow_decoration', subType: 'oxygen_depot' },
  { x: 21180, y: 136, type: 'snow_decoration', subType: 'prayer_cairn' },

  // 2. La Cresta Sureste y Cumbre Sur (Aristas y Vientos Huracanados)
  { x: 21270, y: 124, type: 'snow_decoration', subType: 'ice_spire' },
  { x: 21410, y: 112, type: 'snow_decoration', subType: 'crevasse_marker' },
  { x: 21560, y: 104, h: 46, type: 'snow_decoration', subType: 'fixed_ropes' },
  { x: 21740, y: 116, type: 'snow_decoration', subType: 'ice_spire' },
  { x: 21930, y: 126, type: 'snow_decoration', subType: 'crevasse_marker' },

  // 3. El Mítico Paso de Hillary (Hillary Step)
  { x: 22150, y: 126, h: 54, type: 'snow_decoration', subType: 'hillary_step_ropes' },
  { x: 22280, y: 112, h: 54, type: 'snow_decoration', subType: 'hillary_step_ropes' },
  { x: 22420, y: 96, type: 'snow_decoration', subType: 'ice_spire' },
  { x: 22550, y: 96, type: 'snow_decoration', subType: 'prayer_flags' },

  // 4. La Gran Cima del Monte Everest (8848 m)
  { x: 22710, y: 98, type: 'snow_decoration', subType: 'lantern' },
  { x: 22780, y: 98, type: 'snow_decoration', subType: 'prayer_flags' },
  { x: 22920, y: 98, type: 'snow_decoration', subType: 'assault_tent' },
  // Gran Monumento 8848m con la Bandera de la Victoria
  { x: 23150, y: 98, type: 'snow_decoration', subType: 'summit_monument' },
  { x: 23310, y: 98, type: 'snow_decoration', subType: 'prayer_cairn' },
  // Nido de plumas sagrado donde descansa el Hijo Ratoncito
  { x: 23414, y: 98, type: 'snow_decoration', subType: 'summit_nest' },
  { x: 23550, y: 98, type: 'snow_decoration', subType: 'prayer_flags' }
];
