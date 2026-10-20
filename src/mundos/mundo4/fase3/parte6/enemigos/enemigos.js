// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: ENEMIGOS DEL DISTRITO DE LA FORJA
// ============================================================================
// El interior del taller es zona segura; en el exterior patrullan criaturas de escarcha.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando el banco de permafrost exterior
    { x: 12040, y: 196, minX: 12000, maxX: 12080, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago gélido sobrevolando el conducto de extracción del taller
    { x: 12260, y: 65, baseY: 65, minX: 12200, maxX: 12320, speed: 38, variant: 'frost_flier' }
  ]
};
