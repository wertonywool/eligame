// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: ENEMIGOS DE LA CUMBRE Y DESCENSO (X: 6650 -> 8050)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando los pilares de cumbre y el gran puente.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la repisa de nieve de la cresta superior
    { x: 7180, y: 118, minX: 7120, maxX: 7280, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo custodiando el banco de nieve previo al portal del pueblo
    { x: 7760, y: 184, minX: 7720, maxX: 7860, speed: 52, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando los bloques flotantes de cumbre
    { x: 6960, y: 55, baseY: 55, minX: 6900, maxX: 7040, speed: 40, variant: 'frost_flier' },
    // Murciélago de hielo acechando sobre el puente alpino terminal
    { x: 7500, y: 70, baseY: 70, minX: 7440, maxX: 7560, speed: 42, variant: 'frost_flier' }
  ]
};
