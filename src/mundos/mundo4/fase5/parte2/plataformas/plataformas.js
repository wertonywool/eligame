// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: PLATAFORMAS DE LA CIMA DEL EVEREST (X: 20750 -> 23800)
// ============================================================================
// El Collado Sur (8000 m), Cresta Sureste, Paso de Hillary y Gran Cima (8848 m).

module.exports = [
  // 1. Plataforma del Campamento 13 (Collado Sur - 8000 m) con Ang Dorje y Checkpoint #36
  { x: 20750, y: 136, w: 420, h: 28, subType: 'snow_ground' },

  // 2. La Afilada Cresta Sureste y la Balconada (X: 21180 -> 21700)
  { x: 21200, y: 140, w: 75, h: 16, subType: 'ice_rock' },
  // Peldaño de hielo quebradizo sobre el abismo de la Zona de la Muerte
  { x: 21285, y: 122, w: 65, h: 14, subType: 'cracking_ice' },
  { x: 21360, y: 106, w: 85, h: 16, subType: 'ice_rock' },

  // Cámara secreta en la cornisa inferior con Queso #68 y pilar de hielo quebrable
  { x: 21460, y: 156, w: 90, h: 16, subType: 'ice_rock' },
  { x: 21480, y: 124, w: 30, h: 32, subType: 'ice_pillar', breakable: true },
  // Cristal de rebote para salir catapultado de la cornisa inferior
  { x: 21565, y: 148, w: 24, h: 20, subType: 'bounce_crystal' },

  // Cornisa superior de la Balconada
  { x: 21460, y: 88, w: 80, h: 16, subType: 'slippery_ice' },
  { x: 21550, y: 76, w: 85, h: 16, subType: 'ice_rock' },
  { x: 21645, y: 92, w: 75, h: 16, subType: 'cracking_ice' },

  // 3. Cumbre Sur y aproximación al Paso de Hillary
  { x: 21730, y: 110, w: 120, h: 20, subType: 'snow_ground' },
  { x: 21860, y: 130, w: 75, h: 16, subType: 'slippery_ice' },
  { x: 21945, y: 116, w: 70, h: 14, subType: 'cracking_ice' },
  { x: 22025, y: 104, w: 80, h: 18, subType: 'ice_rock' },

  // 4. El Mítico Paso de Hillary (Hillary Step - 8790m) - Escalada técnica vertical
  { x: 22110, y: 134, w: 75, h: 20, subType: 'ice_rock' },
  { x: 22190, y: 112, w: 60, h: 14, subType: 'ice_rock' },
  // Cristal de impulso celestial del Paso de Hillary (¡impulso épico hacia la cima del resalte!)
  { x: 22255, y: 120, w: 26, h: 22, subType: 'bounce_crystal' },
  { x: 22285, y: 78, w: 75, h: 16, subType: 'ice_rock' },
  { x: 22370, y: 64, w: 65, h: 14, subType: 'cracking_ice' },

  // Cúspide del Paso de Hillary con Queso #69 y pilar quebrable
  { x: 22445, y: 52, w: 85, h: 16, subType: 'ice_rock' },
  { x: 22475, y: 22, w: 28, h: 30, subType: 'ice_pillar', breakable: true },
  { x: 22540, y: 80, w: 85, h: 18, subType: 'slippery_ice' },

  // 5. Cornisa de aproximación a la Cúspide
  { x: 22650, y: 92, w: 100, h: 22, subType: 'snow_ground' },

  // 6. La Gran Cima del Monte Everest (8848 m) con Monumento de la Victoria y Queso #70
  { x: 22760, y: 98, w: 680, h: 32, subType: 'snow_ground' },

  // 7. Saliente Este del Everest y descenso al Kangshung (Fase 6)
  { x: 23440, y: 104, w: 180, h: 26, subType: 'snow_ground' },
  { x: 23620, y: 108, w: 180, h: 28, subType: 'snow_ground' }
];
