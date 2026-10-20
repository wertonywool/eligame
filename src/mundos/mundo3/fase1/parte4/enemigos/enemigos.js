// 🦀🕊️ MUNDO 3 • FASE 1 • PARTE 4: Cangrejos y Gaviotas del Muelle (X: 2700 -> 3600)
const crawlers = [
  { x: 2890, y: 206, minX: 2810, maxX: 2970, speed: 50, dir: 1, variant: 'crab' },
  { x: 3240, y: 206, minX: 3160, maxX: 3320, speed: 54, dir: -1, variant: 'crab' }
];

const fliers = [
  { x: 2980, y: 115, minX: 2900, maxX: 3080, baseY: 115, phase: 0.5, speed: 46, variant: 'seagull' },
  { x: 3340, y: 105, minX: 3260, maxX: 3430, baseY: 105, phase: 2.2, speed: 44, variant: 'seagull' }
];

module.exports = {
  crawlers,
  fliers
};
