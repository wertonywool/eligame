// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 4: ENEMIGOS DE LA CAMARA DEL YETI (X: 28150 -> 29600)
// ============================================================================
// NOTA: Los enemigos patrullan en el pasaje previo para no interferir en la boss arena (X: 28655 -> 29345).

module.exports = {
  crawlers: [
    // Oruga de escarcha en el pasaje de entrada
    { x: 28230, y: 78, minX: 28220, maxX: 28280, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Cornisa de los Monolitos Sagrados
    { x: 28430, y: 100, minX: 28410, maxX: 28490, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando el pasaje sagrado
    { x: 28280, y: 45, baseY: 45, minX: 28220, maxX: 28340, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial en el puente deslizante previo a la arena
    { x: 28550, y: 55, baseY: 55, minX: 28520, maxX: 28620, speed: 42, variant: 'frost_flier' }
  ]
};
