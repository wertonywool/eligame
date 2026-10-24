// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 7: ENEMIGOS DE LA PLAZA CÍVICA
// ============================================================================
// El interior de la Alcaldía es zona segura; en la plaza exterior hay centinelas de hielo.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de nieve de la plaza
    { x: 12780, y: 196, minX: 12750, maxX: 12830, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga centinela custodiando la explanada del Gran Arco Glacial
    { x: 13180, y: 196, minX: 13100, maxX: 13240, speed: 42, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago gélido sobrevolando el campanario de la Alcaldía
    { x: 12930, y: 55, baseY: 55, minX: 12880, maxX: 12980, speed: 38, variant: 'frost_flier' }
  ]
};
