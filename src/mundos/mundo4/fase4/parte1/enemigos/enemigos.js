// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 1: ENEMIGOS DEL LAGO CONGELADO (X: 13300 -> 15650)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la orilla inicial
    { x: 13400, y: 196, minX: 13320, maxX: 13480, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando los tempanos flotantes
    { x: 13940, y: 180, minX: 13900, maxX: 13970, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la orilla del Campamento 7
    { x: 14240, y: 196, minX: 14150, maxX: 14350, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo deslizandose por la pista de hielo cristalino
    { x: 14920, y: 196, minX: 14800, maxX: 15050, speed: 52, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en el segundo tramo veloz
    { x: 15320, y: 196, minX: 15280, maxX: 15440, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago gelido sobre la orilla de entrada
    { x: 13500, y: 70, baseY: 70, minX: 13420, maxX: 13580, speed: 42, variant: 'frost_flier' },
    // Murcielago gelido sobrevolando la niebla del lago
    { x: 14200, y: 60, baseY: 60, minX: 14120, maxX: 14280, speed: 38, variant: 'frost_flier' },
    // Murcielago gelido sobre el tempano central
    { x: 14620, y: 55, baseY: 55, minX: 14560, maxX: 14680, speed: 44, variant: 'frost_flier' },
    // Murcielago gelido sobre la pista de patinaje
    { x: 15300, y: 55, baseY: 55, minX: 15240, maxX: 15380, speed: 40, variant: 'frost_flier' }
  ]
};
