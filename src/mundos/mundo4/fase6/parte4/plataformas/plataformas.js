// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 4: PLATAFORMAS DE LA CÁMARA DEL YETI (X: 28150 -> 29600)
// ============================================================================
// Pasaje Sagrado de Entrada, Gran Arena de Combate del Yeti (Suelo plano continuo y balcones tácticos),
// Sala del Trono de Cristal y Portal a Shambhala.

module.exports = [
  // 1. Pasaje sagrado de entrada (X: 28150 -> 28370)
  { x: 28150, y: 118, w: 220, h: 26, subType: 'snow_ground' },
  { x: 28240, y: 84, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 2. Pilar de ofrendas quebrable sellando el balcón (Queso #80)
  { x: 28360, y: 92, w: 42, h: 54, subType: 'ice_pillar', breakable: true },
  { x: 28410, y: 88, w: 90, h: 16, subType: 'ice_rock', oneWay: true }, // Balcón Queso #80
  { x: 28510, y: 126, w: 130, h: 26, subType: 'snow_ground' }, // Entrada compuerta

  // 3. LA GRAN ARENA DE COMBATE DEL YETI (X: 28640 -> 29360)
  // Suelo maestro continuo 100% plano a la altura exacta del Yeti (Y: 126)
  { x: 28640, y: 126, w: 720, h: 32, subType: 'snow_ground' },

  // Balcones aéreos de combate para esquivar ondas de choque y ejecutar pisotones
  { x: 28680, y: 88, w: 85, h: 14, subType: 'ice_rock', oneWay: true }, // Balcón Izquierdo
  { x: 28955, y: 64, w: 90, h: 12, subType: 'slippery_ice', oneWay: true }, // Lámpara Central
  { x: 29230, y: 88, w: 85, h: 14, subType: 'ice_rock', oneWay: true }, // Balcón Derecho

  // 4. Sala del Trono Sagrado del Yeti y Portal a Shambhala (X: 29360 -> 29600)
  { x: 29360, y: 126, w: 240, h: 32, subType: 'snow_ground' },
  { x: 29410, y: 104, w: 90, h: 22, subType: 'ice_rock', oneWay: true }, // Estrado Trono (Queso #81)
  { x: 29470, y: 62, w: 60, h: 12, subType: 'slippery_ice', oneWay: true } // Relicario Celestial (Queso #82)
];
