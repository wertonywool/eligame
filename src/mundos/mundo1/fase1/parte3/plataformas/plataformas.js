// 🌿 FASE 1 • PARTE 3: Terraza del Boticario Dexter y Glorieta en las Copas — Plataformas (X: 920 -> 1400)
// El suelo inferior es 100% continuo y libre para caminar.
// La Glorieta Secreta es una ruta elevada en las copas de los cerezos para jugadores curiosos.
module.exports = [
  // Suelo inferior continuo (Terraza del Boticario Dexter)
  { x: 920, y: 220, w: 260, h: 65, type: 'grass', zone: 1 },
  // Sendero continuo hacia el promontorio sagrado este (X: 1180 -> 1490)
  { x: 1180, y: 225, w: 310, h: 60, type: 'grass', zone: 1 },

  // Ruta Secreta Elevada en las Copas (Accesible con la Flor de Brisa en x: 990)
  { x: 1040, y: 160, w: 85, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true },
  { x: 1080, y: 100, w: 110, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true },
  { x: 1220, y: 85, w: 85, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true }
];
