// 🌿 FASE 1 • PARTE 2: Sendero de los Cerezos y Mirador Lunar — Plataformas (X: 460 -> 920)
// Suelo 100% continuo, sin fosas ni pinchos: ¡se puede correr y caminar sin interrupción!
module.exports = [
  // Sendero principal a nivel de suelo (Continuo desde la aldea)
  { x: 460, y: 230, w: 220, h: 55, type: 'grass', zone: 1 },
  // Terraza ajardinada elevada suavemente (+10px estilo jardín zen japonés)
  { x: 680, y: 220, w: 240, h: 65, type: 'grass', zone: 1 },

  // Pasarelas elevadas tradicionales (Miradores de madera sobre los cerezos con acceso opcional)
  { x: 530, y: 175, w: 100, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true },
  { x: 740, y: 165, w: 90, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true }
];
