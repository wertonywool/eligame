// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 2: ENEMIGOS DEL EXTERIOR DEL DISTRITO TEXTIL
// ============================================================================
// El interior de la tienda es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de nieve frente al taller textil
    { x: 9040, y: 196, minX: 8990, maxX: 9120, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de permafrost patrullando la acera comercial
    { x: 9420, y: 196, minX: 9350, maxX: 9500, speed: 42, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de escarcha vigilando los tendederos del tejado
    { x: 9240, y: 72, baseY: 72, minX: 9180, maxX: 9310, speed: 38, variant: 'frost_flier' }
  ]
};
