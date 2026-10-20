// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: DECORACIONES DE LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================
// Escaleras congeladas, cúmulos de cristal, cuerdas colgantes, faroles y estufa.

module.exports = [
  // 1. Campamento de altura de Ang Rita el Escalador
  { x: 5380, y: 196, subType: 'expedition_stove' },
  { x: 5440, y: 196, subType: 'prayer_flags' },

  // 2. Escalera congelada en la primera aguja de hielo
  { x: 5545, y: 220, subType: 'frozen_ladder', h: 60 },

  // 3. Cúmulo de cristales de hielo brillante bajo los bloques flotantes
  { x: 5640, y: 196, subType: 'ice_crystal_cluster' },

  // 4. Cuerda colgante fija oscilando con el viento en la cumbre
  { x: 5740, y: 46, subType: 'hanging_rope', h: 34 },

  // 5. Escalera congelada en la segunda aguja de hielo
  { x: 6035, y: 220, subType: 'frozen_ladder', h: 68 },

  // 6. Gran monolito serac en el fondo de la sima
  { x: 6170, y: 220, subType: 'ice_spire' },

  // 7. Cúmulo de cristales bajo el bloque suspendido
  { x: 6290, y: 196, subType: 'ice_crystal_cluster' },

  // 8. Farol de nieve y estante de equipo en la terraza de llegada
  { x: 6580, y: 196, subType: 'snow_lantern' },
  { x: 6640, y: 196, subType: 'climbing_gear_rack' }
];
