// 🏙️ MUNDO 3 • FASE 4 • PARTE 1: Decoraciones de la Avenida y Edificio Objetivo (X: 12000 -> 13200)
module.exports = [
  // 1. Rascacielos de fondo en la avenida
  { type: 'city_skyscraper', x: 12060, y: 220, w: 95, h: 220 },
  { type: 'city_skyscraper', x: 12280, y: 220, w: 105, h: 240 },

  // 2. Fachada monumental del Edificio Objetivo donde tienen al hijo
  { type: 'city_skyscraper', x: 12640, y: 176, w: 130, h: 260 },

  // 3. Mobiliario urbano y señales de tránsito
  { type: 'traffic_light', x: 12180, y: 220 },
  { type: 'fire_hydrant', x: 12380, y: 220 },
  { type: 'coastal_bench', x: 12220, y: 220 },
  { type: 'coastal_bench', x: 12480, y: 220 },
  { type: 'coastal_palm', x: 12100, y: 220, h: 72 },
  { type: 'coastal_palm', x: 12440, y: 220, h: 68 },

  // 4. Portal monumental de entrada al rascacielos
  { subType: 'skyscraper_doors', x: 12640, y: 176 }
];
