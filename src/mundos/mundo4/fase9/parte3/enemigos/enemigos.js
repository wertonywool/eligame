// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 3: ENEMIGOS DEL SANCTUM SANCTORUM (X: 39800 -> 41600)
// ============================================================================
// NOTA: La Arena de Combate de Polaris (X: 40740 -> 41380) no contiene enemigos comunes
// para permitir un combate limpio, fluido y justo contra el Dragón Astral de Polaris.

module.exports = {
  crawlers: [
    // Guardia de diamante en la rampa inicial del Sanctum
    { x: 39910, y: 120, minX: 39850, maxX: 39980, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia de diamante en la terraza antes del Atrio de los Sabios
    { x: 40380, y: 108, minX: 40350, maxX: 40450, speed: 42, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago celestial custodiando la Calzada de la Estrella Solitaria
    { x: 40080, y: 65, baseY: 65, minX: 40040, maxX: 40150, speed: 46, variant: 'frost_flier' }
  ]
};
