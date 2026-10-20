// MUNDO 3 - FASE 3 - PARTE 1: Plataformas de la Heladeria y Paseo (X: 7200 -> 8100)
module.exports = [
  // 1. Paseo exterior previo a la entrada de la Heladeria
  { x: 7200, y: 220, w: 120, h: 50, subType: 'coastal_shore_sand' },

  // 2. Suelo nivelado continuo del interior de la Heladeria de Sami (X: 7300 -> 7750)
  { x: 7300, y: 220, w: 460, h: 50, subType: 'coastal_shore_sand' },

  // 3. Mostrador y mesas elevadas de la Heladeria (plataformas oneWay)
  { x: 7360, y: 196, w: 56, h: 6, oneWay: true, subType: 'driftwood_plank' },
  { x: 7460, y: 205, w: 22, h: 4, oneWay: true, subType: 'driftwood_plank' },
  { x: 7570, y: 205, w: 22, h: 4, oneWay: true, subType: 'driftwood_plank' },
  { x: 7670, y: 196, w: 36, h: 6, oneWay: true, subType: 'driftwood_plank' },

  // 4. Mezanina y pasarela superior con vista panoramica del salon
  { x: 7450, y: 148, w: 100, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 7570, y: 148, w: 110, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 5. Salida hacia el paseo arenoso exterior
  { x: 7740, y: 220, w: 360, h: 50, subType: 'coastal_shore_sand' },

  // 6. Duna exterior de observacion (oneWay para permitir paso fluido)
  { x: 7920, y: 182, w: 120, h: 38, oneWay: true, subType: 'coastal_dune' }
];
