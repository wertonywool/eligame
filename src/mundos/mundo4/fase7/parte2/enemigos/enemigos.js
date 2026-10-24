// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 2: ENEMIGOS DE LA GRAN PAGODA (X: 31300 -> 33000)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en el puente de la pagoda
    { x: 31630, y: 98, minX: 31615, maxX: 31690, speed: 40, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el fondo de la fosa de meditación
    { x: 32320, y: 156, minX: 32260, maxX: 32400, speed: 45, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobrevolando los lotos aéreos
    { x: 31730, y: 42, baseY: 42, minX: 31680, maxX: 31790, speed: 45, variant: 'frost_flier' },
    // Murciélago glacial sobre la fosa de meditación
    { x: 32520, y: 40, baseY: 40, minX: 32460, maxX: 32590, speed: 46, variant: 'frost_flier' },
    // Murciélago glacial custodiando el puente hacia el Altar Supremo
    { x: 32690, y: 48, baseY: 48, minX: 32650, maxX: 32740, speed: 42, variant: 'frost_flier' }
  ]
};
