// 🏢 MUNDO 3 • FASE 4 • PARTE 3: Plataformas de la Azotea (Piso 100 / Helipuerto)
module.exports = [
  // 1. Azotea principal del Rascacielos (Helipuerto, Piso 100) (X: 14450 -> 14980)
  { x: 14450, y: 70, w: 530, h: 210, subType: 'skyscraper_rooftop_level' },

  // 2. Marquesina del portal del ascensor en la azotea
  { x: 14460, y: 32, w: 60, h: 8, oneWay: true, subType: 'city_awning' },

  // 3. Viga de acero suspendida entre ambos rascacielos para salto acrobático (X: 15020 -> 15080)
  { x: 15020, y: 74, w: 60, h: 10, oneWay: true, subType: 'construction_girder' },

  // 4. Azotea y Mirador del Segundo Edificio (Donde está nuestro Hijo Ratón en X: 15260) (X: 15110 -> 15560)
  { x: 15110, y: 70, w: 450, h: 210, subType: 'skyscraper_rooftop_level' },

  // 5. Rampa y trampolín de salto extremo hacia el Megatsunami
  { x: 15540, y: 70, w: 120, h: 14, subType: 'submerged_highway' },
  { x: 15640, y: 64, w: 60, h: 8, oneWay: true, subType: 'construction_girder' }
];
