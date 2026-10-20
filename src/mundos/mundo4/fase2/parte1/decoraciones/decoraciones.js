// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: DECORACIONES DE LOS PILARES CELESTE (X: 4050 -> 5350)
// ============================================================================
// Escaleras heladas, cúmulos de cristal, cuerdas colgantes, faroles y banderines.

module.exports = [
  // 1. Entrada y campamento de Tenzing el Guía de Cuerdas
  { x: 4080, y: 196, subType: 'alpine_sign' },
  { x: 4160, y: 196, subType: 'prayer_flags' },

  // 2. Escalera congelada en el primer pilar de hielo
  { x: 4245, y: 220, subType: 'frozen_ladder', h: 56 },

  // 3. Cúmulo de cristales de hielo brillante bajo los bloques flotantes
  { x: 4340, y: 196, subType: 'ice_crystal_cluster' },

  // 4. Cuerda colgante de seguridad que ondea con el viento polar
  { x: 4440, y: 50, subType: 'hanging_rope', h: 32 },

  // 5. Escalera congelada en el segundo pilar de hielo
  { x: 4735, y: 220, subType: 'frozen_ladder', h: 64 },

  // 6. Gran pináculo serac en el fondo de la sima
  { x: 4860, y: 220, subType: 'ice_spire' },

  // 7. Cúmulo de cristales bajo el bloque de cristal suspendido
  { x: 4960, y: 196, subType: 'ice_crystal_cluster' },

  // 8. Farol de nieve y estante de equipo en la terraza de llegada
  { x: 5250, y: 196, subType: 'snow_lantern' },
  { x: 5310, y: 196, subType: 'climbing_gear_rack' }
];
