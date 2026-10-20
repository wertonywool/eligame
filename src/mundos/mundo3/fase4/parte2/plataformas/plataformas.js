// ============================================================================
// MUNDO 3 - FASE 4 - PARTE 2: Plataformas del Lobby Interior del Rascacielos
// ============================================================================
module.exports = [
  // 1. Estructura perimetral: Muros y Techo Art-Deco
  { x: 13450, y: 64, w: 20, h: 160, subType: 'city_building' },
  { x: 13450, y: 220, w: 620, h: 50, subType: 'city_building' },
  { x: 13450, y: 64, w: 620, h: 16, subType: 'city_building' },
  { x: 14040, y: 64, w: 30, h: 160, subType: 'city_building' },

  // 2. Balcon Mezanina Oeste (Planta alta izquierda)
  { x: 13500, y: 168, w: 50, h: 8, oneWay: true, subType: 'city_awning' },
  { x: 13555, y: 140, w: 75, h: 10, oneWay: true, subType: 'city_building' },

  // 3. Pasarela suspendida central sobre la recepcion (Puente de laton y marmol)
  { x: 13640, y: 124, w: 90, h: 10, oneWay: true, subType: 'city_building' },

  // 4. Balcon Mezanina Este (Planta alta derecha)
  { x: 13740, y: 140, w: 75, h: 10, oneWay: true, subType: 'city_building' },
  { x: 13825, y: 168, w: 50, h: 8, oneWay: true, subType: 'city_awning' },

  // 5. Cornisa superior de los huecos de ascensor
  { x: 13950, y: 146, w: 85, h: 10, oneWay: true, subType: 'city_building' }
];
