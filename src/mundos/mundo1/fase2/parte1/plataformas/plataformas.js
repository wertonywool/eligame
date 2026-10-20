// 🦋 FASE 2 • PARTE 1: Muelle de Entrada y Nenúfares del Estanque — Plataformas (X: 1800 -> 2535)
module.exports = [
  // Muelle Botánico de Entrada (Checkpoint #1 + Guardiana Flora)
  { x: 1800, y: 215, w: 140, h: 70, type: 'grass', zone: 2 },

  // Travesía Acuática: Fondo y Hojas de Loto Gigantes Flotantes
  { x: 1940, y: 255, w: 580, h: 30, type: 'grass', subType: 'lotus_pond', zone: 2 },
  { x: 1965, y: 195, w: 80, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true },
  { x: 2080, y: 175, w: 80, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true },
  // Islote intermedio con Flor de Brisa de rescate
  { x: 2195, y: 215, w: 75, h: 70, type: 'grass', zone: 2 },
  { x: 2305, y: 182, w: 80, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true },
  { x: 2420, y: 165, w: 85, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true }
];
