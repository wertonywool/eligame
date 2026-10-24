// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 5: ENEMIGOS DEL DISTRITO GASTRONÓMICO
// ============================================================================
// El interior de la panadería es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de nieve frente a la panadería
    { x: 11290, y: 196, minX: 11250, maxX: 11330, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de canela y escarcha en el paseo gastronómico este
    { x: 11670, y: 196, minX: 11600, maxX: 11750, speed: 42, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de escarcha sobrevolando la chimenea aromática
    { x: 11510, y: 70, baseY: 70, minX: 11450, maxX: 11570, speed: 38, variant: 'frost_flier' }
  ]
};
