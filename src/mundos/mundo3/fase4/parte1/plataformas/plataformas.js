// 🏙️ MUNDO 3 • FASE 4 • PARTE 1: Plataformas de la Avenida y Edificio Objetivo (X: 12000 -> 13200)
module.exports = [
  // 1. Gran avenida urbana de asfalto y cruce peatonal
  { x: 12000, y: 220, w: 420, h: 50, subType: 'city_asphalt' },
  { x: 12140, y: 172, w: 90, h: 8, oneWay: true, subType: 'city_awning' },

  // 2. Explanada de la plaza del Edificio Objetivo
  { x: 12420, y: 220, w: 380, h: 50, subType: 'city_asphalt' },

  // 3. Escalinatas de granito y terraza de entrada al edificio
  { x: 12560, y: 198, w: 90, h: 72, subType: 'city_building' },
  { x: 12650, y: 176, w: 260, h: 94, subType: 'city_building' },

  // 4. Marquesinas de cristal y pasarelas de la escalera de emergencia
  { x: 12520, y: 154, w: 100, h: 8, oneWay: true, subType: 'city_awning' },
  { x: 12720, y: 130, w: 120, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 12880, y: 92, w: 120, h: 8, oneWay: true, subType: 'driftwood_plank' }
];
