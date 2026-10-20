// ⛓️ MUNDO 2 • FASE 3 • PARTE 2: Puentes de Fundición — Plataformas (X: 585 -> 1565)
module.exports = [
  // Piso de contención único debajo de toda la Fase 3 (Y: 755)
  { x: 550, y: 755, w: 1280, h: 22, type: 'volcano', oneWay: true },

  // 3B. Puente de Fundición #1 (Rueda Hidráulica + Gólem #1)
  { x: 585, y: 645, w: 290, h: 20, type: 'floating', oneWay: true },
  // 3C. Puente de Fundición #2 (Calderos + Cascada de la Forja)
  { x: 930, y: 610, w: 280, h: 20, type: 'floating', oneWay: true },
  { x: 1035, y: 504, w: 72, h: 16, type: 'volcano', oneWay: false }, // Dintel de cascada
  // 3D. Puente de Fundición #3 (Alto Horno #2 + Gólem #2)
  { x: 1265, y: 575, w: 300, h: 20, type: 'floating', oneWay: true }
];
