// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 4: ENEMIGOS DEL EXTERIOR DEL DISTRITO ARCADE
// ============================================================================
// El interior del arcade es zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando el banco de nieve frente al arcade
    { x: 10540, y: 196, minX: 10500, maxX: 10580, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando la marquesina del arcade
    { x: 10760, y: 65, baseY: 65, minX: 10700, maxX: 10820, speed: 38, variant: 'frost_flier' }
  ]
};
