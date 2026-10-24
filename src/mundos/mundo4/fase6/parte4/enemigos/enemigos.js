// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 4: ENEMIGOS DE LA CÁMARA DEL YETI (X: 28150 -> 29600)
// ============================================================================
// NOTA: Los enemigos patrullan exclusivamente en el pasaje previo a la arena (X < 28640).

module.exports = {
  crawlers: [
    // Oruga de escarcha en el pasaje de entrada sagrado
    { x: 28220, y: 118, minX: 28160, maxX: 28320, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el balcón previo
    { x: 28430, y: 88, minX: 28410, maxX: 28490, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobre el pasaje previo a las compuertas
    { x: 28280, y: 50, baseY: 50, minX: 28200, maxX: 28350, speed: 42, variant: 'frost_flier' }
  ]
};
