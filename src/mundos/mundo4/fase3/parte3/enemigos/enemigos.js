// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 3: ENEMIGOS DEL EXTERIOR DEL PASEO MELANCÓLICO
// ============================================================================
// El interior de la cabaña es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando el banco de nieve frente a la cabaña
    { x: 9780, y: 196, minX: 9750, maxX: 9850, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando el tejado de la cabaña
    { x: 9980, y: 65, baseY: 65, minX: 9920, maxX: 10040, speed: 38, variant: 'frost_flier' }
  ]
};
