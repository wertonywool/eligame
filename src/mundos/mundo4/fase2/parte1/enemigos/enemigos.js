// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: ENEMIGOS DE LA CASCADA DE KHUMBU (X: 4050 -> 5350)
// ============================================================================
// Orugas árticas de hielo y murciélagos de ventisca vigilando el desfiladero.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la terraza intermedia de ascenso
    { x: 4470, y: 196, minX: 4430, maxX: 4530, speed: 42, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo custodiando la superficie del gran banco de nieve
    { x: 4800, y: 196, minX: 4750, maxX: 4970, speed: 46, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago polar sobrevolando la primera gran grieta de Khumbu
    { x: 4330, y: 75, baseY: 75, minX: 4270, maxX: 4410, speed: 38, variant: 'frost_flier' },
    // Murciélago polar acechando sobre las cornisas de hielo quebradizo
    { x: 4860, y: 65, baseY: 65, minX: 4800, maxX: 4940, speed: 40, variant: 'frost_flier' }
  ]
};
