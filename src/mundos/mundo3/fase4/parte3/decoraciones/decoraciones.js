// 🏢 MUNDO 3 • FASE 4 • PARTE 3: Decoraciones de la Azotea (Piso 100)
module.exports = [
  // 1. Portal del ascensor de salida a la azotea
  { x: 14470, y: 70, subType: 'lobby_elevator', isRooftop: true, w: 38, h: 54 },

  // 2. Unidades de climatización HVAC y turbinas de ventilación
  { type: 'rooftop_hvac', x: 14580, y: 70, w: 38, h: 22 },
  { type: 'rooftop_hvac', x: 14840, y: 70, w: 36, h: 20 },

  // 3. Gran torre de telecomunicaciones con baliza roja de aviación
  { type: 'rooftop_antenna', x: 14940, y: 70, h: 58 },

  // 4. Climatización y mástil de radio en la torre del frente
  { type: 'rooftop_hvac', x: 15160, y: 70, w: 34, h: 20 },
  { type: 'rooftop_antenna', x: 15480, y: 70, h: 62 }
];
