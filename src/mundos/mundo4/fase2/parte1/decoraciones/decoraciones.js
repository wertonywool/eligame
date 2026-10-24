// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: DECORACIONES DE LA CASCADA DE KHUMBU (X: 4050 -> 5350)
// ============================================================================
// Campamento alpino de Tenzing, estufa, tienda sherpa, pináculos y cuerdas de seguridad.

module.exports = [
  // 1. Campamento de Altura 4 (Tenzing Norgay)
  { x: 4070, y: 196, subType: 'sherpa_tent' },
  { x: 4140, y: 196, subType: 'expedition_stove' },
  { x: 4190, y: 196, subType: 'prayer_flags' },
  { x: 4230, y: 196, subType: 'alpine_sign' },

  // 2. Cuerda guía colgante antes del cruce de la primera grieta
  { x: 4260, y: 60, subType: 'hanging_rope', h: 36 },

  // 3. Pináculo serac milenario en el macizo intermedio
  { x: 4500, y: 196, subType: 'ice_spire' },
  { x: 4530, y: 154, subType: 'ice_crystal_cluster' },

  // 4. Cúmulo de cristales brillantes iluminando el gran banco de nieve
  { x: 4800, y: 196, subType: 'ice_crystal_cluster' },
  { x: 4970, y: 196, subType: 'hanging_rope', h: 32 },

  // 5. Farol de expedición y equipo de escalada en el Campamento 4
  { x: 5210, y: 196, subType: 'snow_lantern' },
  { x: 5260, y: 196, subType: 'climbing_gear_rack' },
  { x: 5310, y: 196, subType: 'prayer_flags' }
];
