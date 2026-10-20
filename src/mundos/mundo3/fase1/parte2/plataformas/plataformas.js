// 🏬 MUNDO 3 • FASE 1 • PARTE 2: Gran Cruce Comercial — Plataformas (X: 900 -> 1800)
module.exports = [
  // Calzada de alta velocidad de asfalto continuo
  { x: 900, y: 220, w: 900, h: 65, type: 'grass', subType: 'city_asphalt', zone: 1 },

  // Plataformas aéreas de cruce: marquesinas, balcones y toldos rayados
  { x: 1020, y: 165, w: 85, h: 12, type: 'floating', subType: 'city_awning', zone: 1, oneWay: true },
  { x: 1160, y: 142, w: 95, h: 12, type: 'floating', subType: 'city_building', zone: 1, oneWay: true },
  { x: 1320, y: 155, w: 90, h: 12, type: 'floating', subType: 'city_awning', zone: 1, oneWay: true },
  { x: 1480, y: 138, w: 100, h: 12, type: 'floating', subType: 'city_building', zone: 1, oneWay: true },
  { x: 1640, y: 150, w: 85, h: 12, type: 'floating', subType: 'city_awning', zone: 1, oneWay: true }
];
