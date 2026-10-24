// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 2: PLATAFORMAS DEL LAGO PROFUNDO (X: 15650 -> 18000)
// ============================================================================
// Fosa Abisal, Témpano Móvil Gigante, Santuario Glacial del Monje Tenzin,
// Cristal Celestial del Altar, Rampa de Patinaje Veloz y Umbral a la Cumbre.

module.exports = [
  // --- SECCIÓN 3: LA FOSA ABISAL Y EL ASENTAMIENTO DE NYIMA (X: 15650 -> 16000) ---
  // Orilla de entrada a la zona profunda del lago
  { x: 15650, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 15750, y: 152, w: 75, h: 14, subType: 'ice_rock' },
  { x: 15840, y: 118, w: 65, h: 12, subType: 'slippery_ice' },

  // Mirador y campamento de la guía Nyima al borde del abismo
  { x: 15870, y: 196, w: 150, h: 28, subType: 'snow_ground' },

  // --- SECCIÓN 4: EL CRUCE DE LA FOSA ABISAL (X: 16000 -> 16480) ---
  // Bloque inicial de hielo quebradizo al borde del abismo
  { x: 16030, y: 176, w: 70, h: 14, subType: 'cracking_ice' },
  // Aguja de roca de hielo saliente
  { x: 16090, y: 136, w: 65, h: 14, subType: 'ice_rock' },

  // Gran témpano móvil que cruza la fosa abisal carrying Queso #62
  {
    x: 16180,
    y: 178,
    w: 95,
    h: 16,
    subType: 'ice_rock',
    moving: true,
    minX: 16160,
    maxX: 16320,
    speed: 46
  },

  // Cristal celestial de salto suspendido sobre el centro del abismo
  { x: 16270, y: 128, w: 24, h: 24, subType: 'bounce_crystal' },
  // Plataforma aérea de hielo cristalino
  { x: 16310, y: 96, w: 65, h: 12, subType: 'ice_crystal' },

  // Peldaño de llegada sobre hielo quebradizo
  { x: 16380, y: 168, w: 75, h: 14, subType: 'cracking_ice' },

  // --- SECCIÓN 5: ISLA DEL SANTUARIO Y CHECKPOINT #32 (X: 16480 -> 16800) ---
  // Isla firme de basalto y permafrost
  { x: 16460, y: 196, w: 320, h: 28, subType: 'snow_ground' },
  { x: 16560, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 16660, y: 120, w: 65, h: 12, subType: 'slippery_ice' },

  // --- SECCIÓN 6: TERRAZA DEL ALTAR GLACIAL DEL MONJE TENZIN (X: 16800 -> 17280) ---
  // Gran explanada sagrada del Altar Glacial (refugio total de ventiscas)
  { x: 16780, y: 196, w: 460, h: 28, subType: 'snow_ground' },

  // Cristal celestial sobre el altar sagrado (lanza al frontón del templo)
  { x: 16920, y: 144, w: 24, h: 24, subType: 'bounce_crystal' },
  // Frontón superior del Altar Glacial con Queso #63
  { x: 16940, y: 92, w: 85, h: 14, subType: 'ice_crystal' },

  // --- SECCIÓN 7: PISTA DE HIELO VELOZ Y LA GRIETA FINAL (X: 17280 -> 17660) ---
  // Pista de despegue sobre hielo resbaladizo hacia la montaña
  { x: 17240, y: 196, w: 250, h: 28, subType: 'slippery_ice' },
  { x: 17350, y: 152, w: 75, h: 14, subType: 'ice_rock' },
  { x: 17450, y: 120, w: 70, h: 12, subType: 'ice_rock' },

  // Témpano móvil sobre la última grieta de hielo
  {
    x: 17520,
    y: 176,
    w: 80,
    h: 16,
    subType: 'ice_rock',
    moving: true,
    minX: 17500,
    maxX: 17620,
    speed: 45
  },
  // Paso de hielo quebradizo que conecta a la base del Everest
  { x: 17610, y: 140, w: 70, h: 14, subType: 'cracking_ice' },

  // --- SECCIÓN 8: BANCO DE PERMAFROST Y ASCENSO A LA CUMBRE (X: 17660 -> 18000) ---
  // Gran banco de nieve profunda donde está enterrado el Queso #64
  { x: 17670, y: 196, w: 180, h: 32, subType: 'snow_bank' },

  // Escalones ceremoniales de roca y hielo que ascienden al Umbral de la Cumbre
  { x: 17780, y: 164, w: 80, h: 16, subType: 'snow_ground' },
  { x: 17850, y: 136, w: 80, h: 16, subType: 'snow_ground' },
  { x: 17920, y: 108, w: 90, h: 16, subType: 'snow_ground' }
];
