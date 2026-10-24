// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 1: PLATAFORMAS DEL LAGO CONGELADO (X: 13300 -> 15650)
// ============================================================================
// Bahía de Pescadores de Hielo, Témpanos a la Deriva, Hielo Quebradizo,
// Cristales Celestiales de Impulso y la Gran Pista de Patinaje Veloz.

module.exports = [
  // --- SECCIÓN 1: RIBERA DE SALIDA Y BAHÍA DE LOS PESCADORES (X: 13300 -> 13800) ---
  // Orilla inicial de roca pizarra y nieve fresca
  { x: 13300, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 13380, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 13460, y: 120, w: 80, h: 12, subType: 'alpine_bridge' },

  // Pista de patinaje de la bahía (primer contacto con física de hielo resbaladizo)
  { x: 13480, y: 196, w: 180, h: 28, subType: 'slippery_ice' },

  // Ribera del campamento de pesca de Pabu
  { x: 13640, y: 196, w: 170, h: 28, subType: 'snow_ground' },
  // Banco de nieve profunda para cavar con la pala y esquivar ventiscas
  { x: 13730, y: 196, w: 90, h: 32, subType: 'snow_bank' },

  // Pináculo de hielo que asciende hacia el Queso #59
  { x: 13740, y: 152, w: 65, h: 14, subType: 'ice_rock' },
  { x: 13790, y: 114, w: 55, h: 12, subType: 'slippery_ice' },
  { x: 13825, y: 82, w: 45, h: 12, subType: 'ice_crystal' },

  // --- SECCIÓN 2: BRECHA DE AGUAS GÉLIDAS Y TÉMPANOS MÓVILES (X: 13800 -> 14100) ---
  // Témpano móvil 1 flotando sobre las aguas gélidas
  {
    x: 13880,
    y: 182,
    w: 80,
    h: 16,
    subType: 'ice_rock',
    moving: true,
    minX: 13860,
    maxX: 13970,
    speed: 42
  },
  // Ruta aérea de témpanos salientes
  { x: 13940, y: 140, w: 65, h: 14, subType: 'ice_rock' },
  { x: 14010, y: 116, w: 60, h: 12, subType: 'slippery_ice' },

  // Capa de hielo quebradizo sobre la brecha (se rompe si te quedas parado)
  { x: 13990, y: 182, w: 80, h: 14, subType: 'cracking_ice' },

  // --- SECCIÓN 3: CAMPAMENTO 7 Y CHECKPOINT #30 (X: 14100 -> 14420) ---
  // Isla firme de permafrost y refugio sherpa
  { x: 14080, y: 196, w: 340, h: 28, subType: 'snow_ground' },
  { x: 14200, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 14300, y: 118, w: 70, h: 12, subType: 'slippery_ice' },

  // --- SECCIÓN 4: ESTRECHO DE TÉMPANOS Y CRISTAL CELESTIAL (X: 14420 -> 14720) ---
  // Témpano móvil 2 en el centro del estrecho
  {
    x: 14440,
    y: 180,
    w: 80,
    h: 16,
    subType: 'ice_rock',
    moving: true,
    minX: 14430,
    maxX: 14550,
    speed: 44
  },
  // Peldaño de hielo quebradizo
  { x: 14540, y: 144, w: 65, h: 14, subType: 'cracking_ice' },

  // Cristal celestial de impulso que lanza hacia el Queso #60 en lo alto
  { x: 14610, y: 154, w: 24, h: 24, subType: 'bounce_crystal' },
  // Plataforma de aterrizaje aéreo
  { x: 14650, y: 116, w: 65, h: 12, subType: 'ice_crystal' },

  // --- SECCIÓN 5: LA GRAN PISTA DE PATINAJE VELOZ (X: 14720 -> 15140) ---
  // Pista continua de hielo resbaladizo para deslizarse a toda velocidad
  { x: 14720, y: 196, w: 420, h: 28, subType: 'slippery_ice' },
  // Obstáculos y pasarelas elevadas para saltar mientras se patina
  { x: 14840, y: 154, w: 75, h: 14, subType: 'ice_rock' },
  { x: 14940, y: 118, w: 80, h: 12, subType: 'slippery_ice' },
  { x: 15040, y: 152, w: 70, h: 14, subType: 'ice_rock' },

  // --- SECCIÓN 6: BANCO DE PERMAFROST Y GRUTA OCULTA (X: 15140 -> 15420) ---
  // Gran banco de nieve profunda donde yace enterrado el Queso #61
  { x: 15140, y: 196, w: 180, h: 32, subType: 'snow_bank' },
  // Cornisa superior que protege del viento
  { x: 15180, y: 142, w: 75, h: 14, subType: 'ice_rock' },
  // Puente de hielo quebradizo hacia el tramo final
  { x: 15330, y: 172, w: 80, h: 14, subType: 'cracking_ice' },

  // --- SECCIÓN 7: TRAMO FINAL DE PARTE 1 Y CHECKPOINT #31 (X: 15420 -> 15650) ---
  // Pista de llegada sobre hielo cristalino
  { x: 15410, y: 196, w: 240, h: 28, subType: 'slippery_ice' },
  { x: 15490, y: 150, w: 70, h: 14, subType: 'ice_rock' },
  { x: 15560, y: 118, w: 60, h: 12, subType: 'ice_rock' }
];
