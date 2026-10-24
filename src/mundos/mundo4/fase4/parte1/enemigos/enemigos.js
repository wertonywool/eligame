// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 1: ENEMIGOS DEL LAGO CONGELADO (X: 13300 -> 15650)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la orilla inicial
    { x: 13410, y: 196, minX: 13340, maxX: 13470, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la cornisa del campamento de pesca
    { x: 13750, y: 152, minX: 13745, maxX: 13795, speed: 38, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la isla del Campamento 7
    { x: 14190, y: 196, minX: 14120, maxX: 14310, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo veloz patrullando la pista de patinaje
    { x: 14880, y: 196, minX: 14760, maxX: 15060, speed: 54, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la cornisa superior sobre el permafrost
    { x: 15190, y: 142, minX: 15185, maxX: 15245, speed: 40, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en el tramo de llegada a Campamento 8
    { x: 15460, y: 196, minX: 15430, maxX: 15550, speed: 46, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago gélido vigilando la bahía de salida
    { x: 13500, y: 70, baseY: 70, minX: 13440, maxX: 13580, speed: 42, variant: 'frost_flier' },
    // Murciélago gélido sobrevolando el estrecho de témpanos móviles
    { x: 14000, y: 55, baseY: 55, minX: 13940, maxX: 14060, speed: 40, variant: 'frost_flier' },
    // Murciélago gélido sobre el cristal celestial
    { x: 14580, y: 50, baseY: 50, minX: 14530, maxX: 14660, speed: 44, variant: 'frost_flier' },
    // Murciélago gélido sobre la pista de hielo
    { x: 14960, y: 65, baseY: 65, minX: 14900, maxX: 15040, speed: 42, variant: 'frost_flier' },
    // Murciélago gélido sobre el puente quebradizo
    { x: 15350, y: 60, baseY: 60, minX: 15300, maxX: 15410, speed: 40, variant: 'frost_flier' }
  ]
};
