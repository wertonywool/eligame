// MUNDO 3 - FASE 2 - PARTE 4: Plataformas del Estuario y Mirador del Sol Poniente (X: 6300 -> 7200)
module.exports = [
  // 1. Orilla arenosa previa al estuario
  { x: 6300, y: 220, w: 240, h: 50, subType: 'coastal_shore_sand' },

  // 2. Laguna del Estuario serena frente al mar abierto
  { x: 6540, y: 220, w: 200, h: 50, subType: 'water_puddle' },

  // 3. Pasarela arqueada de madera nautica sobre el estuario
  { x: 6520, y: 176, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 6595, y: 148, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 6685, y: 176, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 4. Sendero de arena fina y duna intermedia
  { x: 6740, y: 220, w: 460, h: 50, subType: 'coastal_shore_sand' },
  { x: 6820, y: 184, w: 110, h: 36, subType: 'coastal_dune' },

  // 5. Gran Mirador Elevado del Sol Poniente (Cierre de la Fase 2)
  { x: 6980, y: 160, w: 220, h: 10, oneWay: true, subType: 'driftwood_plank' }
];
