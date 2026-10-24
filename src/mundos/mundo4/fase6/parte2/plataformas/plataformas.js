// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 2: PLATAFORMAS DE LAS TORRES CELESTIALES (X: 25250 -> 26700)
// ============================================================================
// El Gran Abismo Oriental, las Agujas Celestiales, Puentes Colgantes de Escarcha,
// Campamento Kangshung 2 y Vórtices Polares Ascendentes.

module.exports = [
  // 1. Mirador del Viento Polar (X: 25250 -> 25390)
  { x: 25250, y: 124, w: 140, h: 28, subType: 'snow_ground' },
  { x: 25330, y: 90, w: 70, h: 14, subType: 'ice_rock', oneWay: true },

  // 2. Torre Celestial Alpha - Aguja occidental sobre el abismo
  { x: 25410, y: 130, w: 130, h: 26, subType: 'snow_ground' },
  { x: 25480, y: 88, w: 80, h: 14, subType: 'ice_rock', oneWay: true },
  { x: 25520, y: 58, w: 65, h: 12, subType: 'slippery_ice', oneWay: true }, // Cima con Queso #74

  // 3. Gran Puente de Escarcha Colgante Occidental sobre el primer vórtice polar (X: 25570 -> 25730)
  { x: 25570, y: 112, w: 160, h: 14, subType: 'slippery_ice' },
  { x: 25680, y: 80, w: 70, h: 14, subType: 'ice_rock', oneWay: true },

  // 4. Terraza del Campamento Kangshung 2 (El Cazador Mingma) (X: 25770 -> 26050)
  { x: 25770, y: 126, w: 280, h: 28, subType: 'snow_ground' },
  { x: 25870, y: 88, w: 75, h: 14, subType: 'ice_rock', oneWay: true },

  // 5. Pilar quebrable y Fisura Secreta de Permafrost (Queso #75)
  { x: 26050, y: 104, w: 42, h: 56, subType: 'ice_pillar', breakable: true },
  { x: 26040, y: 154, w: 160, h: 24, subType: 'snow_ground' },

  // 6. Contrafuerte de la Torre Celestial Gamma y Segundo Gran Puente
  { x: 26210, y: 118, w: 85, h: 20, subType: 'ice_rock' },
  { x: 26280, y: 102, w: 160, h: 14, subType: 'slippery_ice' }, // Puente sobre Updraft 2 (Queso #76)
  { x: 26460, y: 92, w: 42, h: 54, subType: 'ice_pillar', breakable: true },

  // 7. Terraza de Entrada al Umbral Sagrado del Santuario (X: 26510 -> 26700)
  { x: 26510, y: 114, w: 190, h: 28, subType: 'snow_ground' },
  { x: 26600, y: 80, w: 80, h: 14, subType: 'ice_rock', oneWay: true }
];
