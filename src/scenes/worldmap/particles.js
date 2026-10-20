// ============================================================================
// PARTÍCULAS AMBIENTALES DEL MAPA DE MUNDOS (ESTRELLAS, LUCIÉRNAGAS, SAKURAS)
// ============================================================================
const bgStars = Array.from({ length: 55 }, (_, i) => ({
  x: (i * 89) % 960,
  y: (i * 41) % 165,
  size: i % 4 === 0 ? 2 : 1,
  speed: i % 2 === 0 ? 0.08 : 0.16,
  phase: i * 0.7
}));

const fireflies = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 115) % 3780,
  y: (i * 67) % 1740,
  phase: i * 1.3
}));

const sakuraPetals = Array.from({ length: 56 }, (_, i) => ({
  x: (i * 33) % 1820,
  y: 15 + (i * 23) % 210,
  speedX: 0.38 + (i % 5) * 0.12,
  speedY: 0.22 + (i % 4) * 0.08,
  swingSpeed: 0.045 + (i % 6) * 0.012,
  phase: i * 0.85,
  size: (i % 4 === 0) ? 3 : 2,
  color: (i % 4 === 0) ? '#ffffff' : ((i % 4 === 1) ? '#ffb3c6' : ((i % 4 === 2) ? '#ff8fab' : '#ffe5ec'))
}));
