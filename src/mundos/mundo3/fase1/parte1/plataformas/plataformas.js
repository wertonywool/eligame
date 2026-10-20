// 🏙️ MUNDO 3 • FASE 1 • PARTE 1: Distrito Urbano — Plataformas (X: 0 -> 900)
module.exports = [
  // Calzada principal de asfalto y aceras metropolitanas
  { x: 0, y: 220, w: 900, h: 65, type: 'grass', subType: 'city_asphalt', zone: 1 },

  // Escaleras de incendios, marquesinas y toldos elevados de tiendas
  { x: 230, y: 168, w: 90, h: 12, type: 'floating', subType: 'city_awning', zone: 1, oneWay: true },
  { x: 380, y: 148, w: 80, h: 12, type: 'floating', subType: 'city_building', zone: 1, oneWay: true },
  { x: 510, y: 130, w: 100, h: 12, type: 'floating', subType: 'city_building', zone: 1, oneWay: true },
  { x: 670, y: 155, w: 85, h: 12, type: 'floating', subType: 'city_awning', zone: 1, oneWay: true }
];
