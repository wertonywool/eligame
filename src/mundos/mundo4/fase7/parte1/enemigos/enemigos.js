// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 1: ENEMIGOS DE SHAMBHALA (X: 29600 -> 31300)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en los escalones de la primera pagoda
    { x: 29670, y: 92, minX: 29660, maxX: 29720, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Terraza de las Puertas Doradas
    { x: 29890, y: 104, minX: 29870, maxX: 29950, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el puente medio
    { x: 30070, y: 84, minX: 30060, maxX: 30120, speed: 50, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cornisa de la Pagoda de Loto
    { x: 30450, y: 84, minX: 30440, maxX: 30500, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Fosa de Nieve Sagrada
    { x: 30720, y: 156, minX: 30670, maxX: 30810, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial custodiando las cornisas altas
    { x: 29760, y: 44, baseY: 44, minX: 29710, maxX: 29820, speed: 50, variant: 'frost_flier' },
    // Murcielago glacial en el paso de las aguas termales
    { x: 30040, y: 75, baseY: 75, minX: 29990, maxX: 30090, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el jardin de loto
    { x: 30540, y: 36, baseY: 36, minX: 30480, maxX: 30600, speed: 52, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el Puente de Loto
    { x: 31015, y: 42, baseY: 42, minX: 30960, maxX: 31070, speed: 46, variant: 'frost_flier' }
  ]
};
