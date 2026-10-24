// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: ENEMIGOS DE LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando el banco intermedio de nieve
    { x: 6140, y: 170, minX: 6100, maxX: 6220, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago polar patrullando el balcón de hielo quebradizo
    { x: 5870, y: 70, baseY: 70, minX: 5800, maxX: 5960, speed: 42, variant: 'frost_flier' },
    // Murciélago polar acechando sobre el gran puente de escalera de Khumbu
    { x: 6330, y: 80, baseY: 80, minX: 6250, maxX: 6420, speed: 44, variant: 'frost_flier' }
  ]
};
