// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: ENEMIGOS DEL COL Y ABISMO TERMINAL (X: 6650 -> 8050)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la superficie de la caverna de nieve
    { x: 7310, y: 196, minX: 7230, maxX: 7460, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago polar vigilando el ascenso de los resortes celestiales
    { x: 7020, y: 65, baseY: 65, minX: 6940, maxX: 7100, speed: 40, variant: 'frost_flier' },
    // Murciélago polar custodiando el Gran Abismo Terminal
    { x: 7610, y: 75, baseY: 75, minX: 7520, maxX: 7720, speed: 42, variant: 'frost_flier' }
  ]
};
