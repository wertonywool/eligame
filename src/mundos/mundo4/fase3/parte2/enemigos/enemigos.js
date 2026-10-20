// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 2: ENEMIGOS DEL EXTERIOR DEL DISTRITO TEXTIL
// ============================================================================
// El interior de la tienda es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando el banco de nieve frente al taller textil
    { x: 9040, y: 196, minX: 8990, maxX: 9120, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando la calle de la tienda
    { x: 9240, y: 65, baseY: 65, minX: 9180, maxX: 9300, speed: 38, variant: 'frost_flier' }
  ]
};
