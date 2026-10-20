// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: ENEMIGOS DE LOS PILARES CELESTE (X: 4050 -> 5350)
// ============================================================================
// Frost Crawlers en los bancos elevados y Frost Fliers vigilando los bloques flotantes.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la repisa superior de nieve profunda
    { x: 4560, y: 124, minX: 4510, maxX: 4660, speed: 46, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo custodiando el banco de nieve previo al campamento 4
    { x: 5080, y: 184, minX: 5040, maxX: 5190, speed: 50, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando los bloques flotantes de diamante
    { x: 4360, y: 60, baseY: 60, minX: 4300, maxX: 4440, speed: 38, variant: 'frost_flier' },
    // Murciélago de hielo acechando sobre el puente alpino de cuerda
    { x: 4880, y: 75, baseY: 75, minX: 4820, maxX: 4940, speed: 42, variant: 'frost_flier' }
  ]
};
