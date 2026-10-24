// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 3: ENEMIGOS DEL EXTERIOR DEL PASEO MELANCÓLICO
// ============================================================================
// El interior de la cabaña es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de nieve frente a la cabaña
    { x: 9780, y: 196, minX: 9750, maxX: 9850, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de permafrost en el paseo este
    { x: 10160, y: 196, minX: 10090, maxX: 10240, speed: 42, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de escarcha sobrevolando el tejado de la cabaña
    { x: 9980, y: 68, baseY: 68, minX: 9920, maxX: 10040, speed: 38, variant: 'frost_flier' }
  ]
};
