// 🦋 FASE 2 • PARTE 2: El Gran Invernadero de Cristal y Cúpula Secreta — Plataformas (X: 2535 -> 3310)
// Diseño multinivel: Atrio Botánico Inferior + Pasarelas Aéreas de Hierro Forjado y Cristal
module.exports = [
  // 1. Muelle Oeste de entrada al Gran Invernadero (Encuentro con Botánico Cornelio)
  { x: 2535, y: 210, w: 100, h: 75, type: 'grass', zone: 2 },

  // 2. Atrio y Jardín Botánico de Planta Baja (Suelo continuo, seguro y explorable)
  { x: 2635, y: 235, w: 580, h: 50, type: 'grass', zone: 2 },

  // 3. Pasarelas Elevadas de Vidrio y Hierro Forjado Verde (Ruta aérea acrobática)
  { x: 2660, y: 182, w: 120, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },
  { x: 2810, y: 158, w: 75, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },
  { x: 2915, y: 135, w: 135, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },

  // 4. Cúpula Secreta Superior del Invernadero (Ápice arquitectónico con queso de recompensa)
  { x: 2975, y: 78, w: 90, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },

  // 5. Descenso este y Terraza de salida hacia el Acueducto
  { x: 3080, y: 162, w: 105, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },
  { x: 3215, y: 195, w: 95, h: 90, type: 'grass', zone: 2 }
];
