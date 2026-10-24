// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 1: ENEMIGOS DEL EXTERIOR DE LA TABERNA
// ============================================================================
// El interior de la taberna es una zona segura; en el exterior hay patrullas ligeras.

module.exports = {
  crawlers: [
    // Oruga de escarcha patrullando el banco de nieve frente a la taberna
    { x: 8300, y: 196, minX: 8250, maxX: 8380, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga montañesa patrullando la acera este
    { x: 8680, y: 196, minX: 8620, maxX: 8740, speed: 40, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de escarcha sobrevolando los tejados nevados de la taberna
    { x: 8520, y: 65, baseY: 65, minX: 8460, maxX: 8580, speed: 38, variant: 'frost_flier' }
  ]
};
