// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 2: ENEMIGOS DEL GLACIAR KHUMBU (X: 1490 -> 2720)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando los seracs y grietas heladas.

module.exports = {
  crawlers: [
    // Oruga de escarcha en el primer banco de nieve glacial
    { x: 1790, y: 196, minX: 1730, maxX: 1920, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el segundo banco de nieve profunda
    { x: 2510, y: 196, minX: 2460, maxX: 2630, speed: 46, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando el primer banco de nieve
    { x: 1820, y: 65, baseY: 65, minX: 1760, maxX: 1890, speed: 38, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el abismo de la gran grieta
    { x: 2240, y: 80, baseY: 80, minX: 2180, maxX: 2300, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando la aproximacion al Campamento 2
    { x: 2580, y: 65, baseY: 65, minX: 2520, maxX: 2640, speed: 38, variant: 'frost_flier' }
  ]
};
