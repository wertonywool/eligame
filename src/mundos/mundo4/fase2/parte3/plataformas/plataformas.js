// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: PLATAFORMAS DEL COL Y UMBRAL AL PUEBLO (X: 6650 -> 8050)
// ============================================================================
// La gran cresta del Col, caverna subterránea de nieve, escaleras de aluminio
// escalonadas sobre el gran abismo y la llegada triunfal al Arco de Namche Bazaar.

module.exports = [
  // 1. Terraza de cumbre del Col de Khumbu (X: 6650 -> 6870)
  { x: 6650, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 6770, y: 148, w: 85, h: 14, oneWay: true, subType: 'ice_rock' },

  // 2. Escalada de Alta Montaña: Doble Resorte Celestial y Diamante de Cumbre (X: 6890 -> 7190)
  { x: 6890, y: 140, w: 45, h: 84, subType: 'ice_pillar' },
  // Primer resorte celestial
  { x: 6960, y: 180, w: 26, h: 26, subType: 'bounce_crystal' },
  // Escalón de hielo resbaladizo para deslizarse
  { x: 6940, y: 85, w: 65, h: 12, subType: 'slippery_ice' },
  // Segundo resorte celestial hacia el cielo
  { x: 7040, y: 110, w: 26, h: 26, subType: 'bounce_crystal' },
  // Plataforma de diamante glacial en el punto más alto de Khumbu
  { x: 7110, y: 55, w: 75, h: 12, oneWay: true, subType: 'ice_crystal' },

  // 3. La Gran Caverna Glacial Subterránea (Ruta Secreta de Cavado con la Pala) (X: 7210 -> 7480)
  // Enorme masa de nieve profunda con quesos ocultos en el interior
  { x: 7210, y: 196, w: 270, h: 36, subType: 'snow_bank' },
  // Ruta aérea sobre la caverna con hielo quebradizo
  { x: 7250, y: 135, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },
  { x: 7340, y: 115, w: 60, h: 12, oneWay: true, subType: 'ice_crystal' },
  { x: 7420, y: 135, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },

  // 4. El Gran Abismo Terminal de Khumbu (Escaleras de Aluminio Escalonadas) (X: 7490 -> 7750)
  // Primer tramo de escalera
  { x: 7490, y: 175, w: 90, h: 14, subType: 'aluminum_bridge' },
  // Escalón intermedio de hielo quebradizo en el abismo
  { x: 7595, y: 155, w: 55, h: 12, oneWay: true, subType: 'cracking_ice' },
  // Segundo tramo de escalera en ascenso hacia el umbral
  { x: 7660, y: 140, w: 95, h: 14, subType: 'aluminum_bridge' },

  // 5. La Gran Explanada del Umbral al Pueblo Nevado y Checkpoint 22 (X: 7765 -> 8050)
  // Terreno plano y majestuoso donde se alza el Monumental Arco Glacial
  { x: 7765, y: 196, w: 290, h: 28, subType: 'snow_ground' }
];
