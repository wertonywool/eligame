// MUNDO 3 - FASE 3 - PARTE 4: Decoraciones del Rascacielos y Azotea (X: 9900 -> 12000)
module.exports = [
  // 1. Rascacielos de fondo en la avenida
  { type: 'city_skyscraper', x: 10080, y: 220, w: 90, h: 220 },
  { type: 'city_skyscraper', x: 10300, y: 220, w: 100, h: 250 },
  { type: 'traffic_light', x: 10160, y: 220 },
  { type: 'fire_hydrant', x: 10280, y: 220 },
  { type: 'coastal_palm', x: 10020, y: 220, h: 70 },
  { type: 'coastal_bench', x: 10240, y: 220 },

  // 2. Decoraciones interiores de oficinas (Pisos 1 y 2)
  { type: 'office_cooler', x: 10660, y: 176 },
  { type: 'office_desk', x: 10760, y: 132 },
  { type: 'office_desk', x: 10830, y: 132 },
  { type: 'office_cooler', x: 10920, y: 92 },

  // 3. Gran Azotea: Helipuerto, HVAC industrial y Antenas de Telecomunicaciones
  { type: 'helipad', x: 11120, y: 56, w: 64 },
  { type: 'rooftop_hvac', x: 11240, y: 56, w: 38, h: 26 },
  { type: 'rooftop_antenna', x: 11330, y: 56, h: 56 },
  { type: 'rooftop_hvac', x: 11400, y: 44, w: 32, h: 20 },

  // 4. Azotea del Edificio de Enfrente (Donde está el hijo)
  { type: 'rooftop_antenna', x: 11620, y: 56, h: 50 },
  { type: 'rooftop_hvac', x: 11730, y: 56, w: 36, h: 24 },
  { type: 'city_skyscraper', x: 11780, y: 56, w: 120, h: 200 }
];
