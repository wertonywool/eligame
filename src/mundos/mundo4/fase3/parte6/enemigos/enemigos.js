// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: ENEMIGOS DEL DISTRITO DE LA FORJA
// ============================================================================
// El interior del taller es zona segura; en el exterior patrullan criaturas de escarcha.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de permafrost exterior
    { x: 12040, y: 196, minX: 12000, maxX: 12080, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escoria gélida en la avenida hacia la Alcaldía
    { x: 12420, y: 196, minX: 12350, maxX: 12500, speed: 42, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago gélido sobrevolando el conducto de extracción del taller
    { x: 12260, y: 70, baseY: 70, minX: 12200, maxX: 12330, speed: 38, variant: 'frost_flier' }
  ]
};
