// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 1: PLATAFORMAS DE SHAMBHALA (X: 29600 -> 31300)
// ============================================================================
// Valle Sagrado, Pozas Termales de Curación, Jardines de Loto y Santuario de Jinpa.

module.exports = [
  // 1. Terraza de Entrada al Valle Sagrado de Shambhala (X: 29600 -> 29830)
  { x: 29600, y: 126, w: 230, h: 28, subType: 'shambhala_marble_terrace' },

  // Tejado de pagoda de bienvenida (con aleros de oro y campanas de viento)
  { x: 29670, y: 82, w: 85, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // 2. Estanque de Aguas Termales y Loto de Salto (X: 29840 -> 30060)
  // Loto elástico flotante sobre las aguas sagradas
  { x: 29860, y: 128, w: 60, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // Terraza elevada de la Primera Pagoda
  { x: 29940, y: 96, w: 120, h: 16, subType: 'shambhala_marble_terrace', oneWay: true },

  // Balcón y tejado superior donde reposa el Queso #83
  { x: 29970, y: 60, w: 75, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // 3. Puente Ceremonial y Estanque de Aguas Termales del Río Sagrado (X: 30080 -> 30310)
  { x: 30100, y: 126, w: 110, h: 24, subType: 'shambhala_marble_terrace' },

  // Loto de cristal flotante para salvar el desnivel
  { x: 30150, y: 92, w: 60, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // Puente Ceremonial de madera roja y adornos dorados
  { x: 30225, y: 116, w: 90, h: 14, subType: 'shambhala_bridge', oneWay: true },

  // Columna de cuarzo y cristal rompible con el Pico de Hielo
  { x: 30280, y: 96, w: 42, h: 56, subType: 'ice_pillar' },

  // 4. Gran Terraza de los Jardines de Loto y Santuario de Jinpa (X: 30310 -> 30660)
  // Espacio majestuoso sin plataformas que bloqueen la cabeza de Jinpa o del jugador
  { x: 30310, y: 126, w: 350, h: 30, subType: 'shambhala_marble_terrace' },

  // Tejado ornamental alto del pabellón de Jinpa (a gran altura para no estorbar)
  { x: 30370, y: 54, w: 115, h: 14, subType: 'shambhala_pagoda_roof', oneWay: true },

  // Tejado superior de oración sobre el Checkpoint #42
  { x: 30510, y: 72, w: 80, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true },

  // 5. Fosa Inferior de Nieve Sagrada y Cueva de Permafrost con Queso #84 (X: 30670 -> 30900)
  // Banco de nieve excavable con la pala de Elizabeth
  { x: 30670, y: 156, w: 190, h: 26, subType: 'snow_bank' },

  // Repisa de hielo sobre la fosa
  { x: 30730, y: 110, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // Aguja de cuarzo rompible custodiando el túnel
  { x: 30870, y: 112, w: 42, h: 54, subType: 'ice_pillar' },

  // Loto de cristal elástico para salir de la fosa
  { x: 30930, y: 124, w: 55, h: 12, subType: 'crystal_lotus_pad', oneWay: true },

  // 6. Gran Puente Sagrado de Shambhala con Queso #85 (X: 31000 -> 31140)
  { x: 31000, y: 104, w: 140, h: 14, subType: 'shambhala_bridge', oneWay: true },

  // Tejadillo de entrada a la Gran Pagoda (X: 31150 -> 31300)
  { x: 31150, y: 116, w: 150, h: 28, subType: 'shambhala_marble_terrace' },
  { x: 31210, y: 78, w: 75, h: 12, subType: 'shambhala_pagoda_roof', oneWay: true }
];
