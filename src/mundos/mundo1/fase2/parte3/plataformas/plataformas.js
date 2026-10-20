// 🦋 FASE 2 • PARTE 3: Gran Acueducto Imperial y Cascadas de Loto — Plataformas (X: 3310 -> 3670)
module.exports = [
  // 1. Canal acuático de desagüe y lecho del acueducto
  { x: 3310, y: 255, w: 265, h: 30, type: 'grass', subType: 'lotus_pond', zone: 2 },

  // 2. Primer nenúfar flotante de salto
  { x: 3335, y: 195, w: 75, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true },

  // 3. Pasarela Aérea Superior del Acueducto (Arco triunfal de cristal y piedra con queso)
  { x: 3400, y: 138, w: 85, h: 14, type: 'floating', subType: 'greenhouse', zone: 2, oneWay: true },

  // 4. Segundo nenúfar flotante de descenso
  { x: 3485, y: 180, w: 75, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true },

  // 5. Terraza de Mármol y Loto (Umbral de entrada a la Fase 3 del Jardín Real)
  { x: 3575, y: 215, w: 95, h: 70, type: 'grass', zone: 2 }
];
