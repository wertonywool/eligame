// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: DECORACIONES DE LA CUMBRE Y DESCENSO (X: 6650 -> 8050)
// ============================================================================
// Escaleras congeladas, cúmulos de cristal, cuerdas, faroles y el gran arco al Pueblo Nevado.

module.exports = [
  // 1. Campamento de cumbre de Apa Sherpa
  { x: 6680, y: 196, subType: 'expedition_stove' },
  { x: 6740, y: 196, subType: 'prayer_flags' },

  // 2. Escalera congelada en la primera aguja de cumbre
  { x: 6845, y: 220, subType: 'frozen_ladder', h: 64 },

  // 3. Cúmulo de cristales de hielo brillante bajo los bloques flotantes
  { x: 6940, y: 196, subType: 'ice_crystal_cluster' },

  // 4. Cuerda colgante fija ondeando en la cota más alta de la cordillera
  { x: 7040, y: 44, subType: 'hanging_rope', h: 32 },

  // 5. Escalera congelada en la segunda aguja de cumbre
  { x: 7355, y: 220, subType: 'frozen_ladder', h: 70 },

  // 6. Gran aguja serac en el fondo de la sima
  { x: 7490, y: 220, subType: 'ice_spire' },

  // 7. Cúmulo de cristales bajo el bloque de cristal suspendido
  { x: 7640, y: 196, subType: 'ice_crystal_cluster' },

  // 8. Farol de nieve y estante de equipo en la terraza de llegada
  { x: 7860, y: 196, subType: 'snow_lantern' },
  { x: 7890, y: 196, subType: 'climbing_gear_rack' },

  // 9. Monumental Arco Glacial que da acceso al Pueblo Nevado de la Fase 3
  { x: 7960, y: 196, subType: 'ice_arch' }
];
