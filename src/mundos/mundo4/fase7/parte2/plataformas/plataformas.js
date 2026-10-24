// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 2: PLATAFORMAS DE LA GRAN PAGODA (X: 31300 -> 33000)
// ============================================================================
// Patios sagrados, Altar Central de Tenzin, Fosa de Meditación, Altar del Nirvana y Stargate.

module.exports = [
  // 1. Terraza de Entrada a la Gran Pagoda Dorada (X: 31300 -> 31460)
  { x: 31300, y: 116, w: 160, h: 28, subType: 'shambhala_marble_terrace' },

  // Tejadillo Nivel 1 de la Torre Pagoda
  { x: 31350, y: 82, w: 90, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // Cúspide de la Pagoda con el Queso #86
  { x: 31390, y: 50, w: 50, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // Columna de cuarzo rompible con el Pico de Hielo
  { x: 31480, y: 116, w: 40, h: 54, subType: 'ice_pillar' },

  // 2. Navegación Aérea de Lotos y Puente Ceremonial (X: 31540 -> 31860)
  // Loto elástico flotante
  { x: 31540, y: 126, w: 55, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // Puente Ceremonial de madera roja y dorada
  { x: 31610, y: 98, w: 110, h: 14, subType: 'shambhala_bridge', oneWay: true },

  // Loto de cristal elevado para salto acrobático
  { x: 31740, y: 84, w: 60, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // Balcón y tejadillo oriental de entrada al Patio Central
  { x: 31815, y: 64, w: 65, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // 3. Gran Patio Central de la Pagoda, Santuario y Checkpoint #43 (X: 31880 -> 32220)
  // Amplio patio de mármol blanco sin techos bajos que molesten a Tenzin o al jugador
  { x: 31880, y: 126, w: 340, h: 30, subType: 'shambhala_marble_terrace' },

  // Gran dosel ornamental del templo a gran altura
  { x: 31940, y: 54, w: 120, h: 14, subType: 'shambhala_pagoda_roof', oneWay: true },

  // Tejadillo sobre el Checkpoint #43
  { x: 32080, y: 72, w: 80, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // 4. Fosa de Meditación y Escarcha Sagrada con Queso #87 (X: 32240 -> 32420)
  // Banco de nieve profunda excavable
  { x: 32240, y: 156, w: 180, h: 26, subType: 'snow_bank' },

  // Columna de cristal rompible
  { x: 32435, y: 112, w: 42, h: 54, subType: 'ice_pillar' },

  // Ruta aérea superior de lotos y tejados
  { x: 32300, y: 96, w: 55, h: 12, subType: 'crystal_lotus_pad', oneWay: true },
  { x: 32380, y: 68, w: 75, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },
  { x: 32470, y: 92, w: 90, h: 14, subType: 'shambhala_bridge', oneWay: true },

  // Loto celestial elevado con Queso #88
  { x: 32570, y: 52, w: 55, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // 5. Gran Altar Supremo de Shambhala, Altar del Nirvana y Stargate a Kailash (X: 32660 -> 33000)
  // Puente de aproximación ceremonial
  { x: 32660, y: 112, w: 90, h: 14, subType: 'shambhala_bridge', oneWay: true },

  // Gran Estrado del Templo y Portal Dimensional (despejado y sin obstáculos delante)
  { x: 32760, y: 126, w: 240, h: 32, subType: 'shambhala_marble_terrace' },

  // Dosel sagrado sobre el Altar del Loto (dejando el portal libre)
  { x: 32800, y: 52, w: 80, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true }
];
