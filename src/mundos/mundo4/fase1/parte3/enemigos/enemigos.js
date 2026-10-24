// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: ENEMIGOS DE LA CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando las cornisas y bancos polares.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco del desfiladero (se elude cavando)
    { x: 3040, y: 196, minX: 2960, maxX: 3180, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el banco polar superior
    { x: 3580, y: 196, minX: 3530, maxX: 3720, speed: 50, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando los seracs del desfiladero
    { x: 3120, y: 65, baseY: 65, minX: 3060, maxX: 3180, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial vigilando el paso sobre el puente de escalera alpina
    { x: 3420, y: 65, baseY: 65, minX: 3360, maxX: 3480, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial en la antesala del Gran Arco Glacial
    { x: 3660, y: 65, baseY: 65, minX: 3600, maxX: 3720, speed: 40, variant: 'frost_flier' }
  ]
};
