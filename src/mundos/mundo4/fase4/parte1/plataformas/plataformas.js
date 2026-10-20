// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 1: PLATAFORMAS DEL LAGO CONGELADO (X: 13300 -> 15650)
// ============================================================================
// Orillas glaciales, tempanos a la deriva, aguas gelidas y pista de hielo.

module.exports = [
  // 1. Orilla inicial de salida tras cruzar el Gran Arco Glacial (X: 13300 -> 13540)
  { x: 13300, y: 196, w: 240, h: 28, subType: 'snow_ground' },
  { x: 13380, y: 156, w: 70, h: 14, subType: 'ice_rock' },
  { x: 13460, y: 124, w: 60, h: 12, subType: 'slippery_ice' },

  // 2. Asentamiento del pescador Pabu en la ribera del lago (X: 13540 -> 13740)
  { x: 13540, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 13620, y: 154, w: 75, h: 14, subType: 'ice_rock' },

  // 3. Pinaculo de hielo elevado con Queso #59 en la cuspide (X: 13780 -> 13860)
  { x: 13780, y: 124, w: 80, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 13820, y: 88, w: 55, h: 12, subType: 'slippery_ice' },

  // 4. Tempanos flotantes a la deriva sobre la primera brecha de agua gelida
  { x: 13900, y: 180, w: 70, h: 14, subType: 'ice_rock' },
  { x: 13950, y: 144, w: 65, h: 14, subType: 'ice_rock' },
  { x: 14000, y: 168, w: 70, h: 14, subType: 'ice_rock' },
  { x: 14040, y: 128, w: 60, h: 12, subType: 'slippery_ice' },

  // 5. Orilla intermedia con Checkpoint #30 (X: 14100 -> 14450)
  { x: 14100, y: 196, w: 350, h: 28, subType: 'snow_ground' },
  { x: 14220, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 14320, y: 120, w: 65, h: 12, subType: 'ice_rock' },

  // 6. Tempano flotante movil sobre el centro del lago con Queso #60 (X: 14550 -> 14650)
  { x: 14550, y: 148, w: 100, h: 14, oneWay: true, subType: 'ice_rock' },
  { x: 14610, y: 110, w: 60, h: 12, subType: 'slippery_ice' },

  // 7. La Gran Pista de Patinaje sobre Hielo Deslizante (X: 14700 -> 15120)
  { x: 14700, y: 196, w: 420, h: 28, subType: 'slippery_ice' },
  { x: 14840, y: 156, w: 80, h: 14, subType: 'ice_rock' },
  { x: 14980, y: 126, w: 70, h: 12, subType: 'slippery_ice' },

  // 8. Gran banco de permafrost y hielo compacto con Queso #61 enterrado (X: 15120 -> 15260)
  { x: 15120, y: 196, w: 140, h: 32, subType: 'snow_bank' },
  { x: 15190, y: 150, w: 65, h: 14, subType: 'ice_rock' },

  // 9. Segundo tramo veloz de la pista de patinaje (X: 15260 -> 15500)
  { x: 15260, y: 196, w: 240, h: 28, subType: 'slippery_ice' },
  { x: 15360, y: 154, w: 70, h: 14, subType: 'ice_rock' },

  // 10. Orilla final del sector con Checkpoint #31 (X: 15500 -> 15650)
  { x: 15500, y: 196, w: 150, h: 28, subType: 'snow_ground' },
  { x: 15560, y: 156, w: 60, h: 14, subType: 'ice_rock' }
];
