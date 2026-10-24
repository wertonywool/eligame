// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: PLATAFORMAS DE LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================
// Agujas verticales de hielo, cristales de resorte celestial, cornisas de hielo
// quebradizo y el Gran Puente de Escalera de Aluminio de Khumbu.

module.exports = [
  // 1. Terraza de avanzada del Campamento 5 de Ang Rita (X: 5350 -> 5540)
  { x: 5350, y: 196, w: 190, h: 28, subType: 'snow_ground' },

  // 2. Ascenso Vertical por Seracs: Pilar de hielo y Resorte Celestial (X: 5560 -> 5760)
  { x: 5560, y: 160, w: 45, h: 64, subType: 'ice_pillar' },
  // Cristal Celestial de Impulso (lanza verticalmente a Elizabeth a gran altura)
  { x: 5630, y: 175, w: 26, h: 26, subType: 'bounce_crystal' },
  // Repisa aérea de hielo resbaladizo para aterrizar y deslizarse
  { x: 5600, y: 95, w: 70, h: 12, subType: 'slippery_ice' },
  // Bloque de diamante glacial suspendido
  { x: 5700, y: 65, w: 60, h: 12, oneWay: true, subType: 'ice_crystal' },

  // 3. El Balcón de Hielo Quebradizo sobre la sima (Cracking Ice) (X: 5780 -> 5990)
  { x: 5790, y: 140, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },
  { x: 5865, y: 130, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },
  { x: 5940, y: 140, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },

  // 4. Terraza Intermedia de la Cascada y Banco de Nieve en la pared (X: 6010 -> 6220)
  { x: 6010, y: 170, w: 85, h: 54, subType: 'ice_rock' },
  { x: 6095, y: 170, w: 130, h: 32, subType: 'snow_bank' },

  // 5. El Gran Puente de Escalera de Aluminio de Khumbu (X: 6230 -> 6440)
  // Cruza el abismo más sobrecogedor de la cascada
  { x: 6230, y: 160, w: 210, h: 14, subType: 'aluminum_bridge' },

  // 6. Terraza de Llegada de Campamento 5 y Checkpoint 21 (X: 6450 -> 6650)
  { x: 6450, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 6520, y: 154, w: 80, h: 14, oneWay: true, subType: 'ice_rock' }
];
