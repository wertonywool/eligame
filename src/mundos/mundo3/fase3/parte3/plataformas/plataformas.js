// MUNDO 3 - FASE 3 - PARTE 3: Plataformas de la Cancha de Voleibol (X: 9000 -> 9900)
module.exports = [
  // 1. Orilla arenosa de la cancha
  { x: 9000, y: 220, w: 280, h: 50, subType: 'coastal_shore_sand' },

  // 2. Cancha nivelada de arena fina para voleibol
  { x: 9280, y: 220, w: 320, h: 50, subType: 'coastal_shore_sand' },

  // 3. Graderio escalonado de madera para espectadores
  { x: 9230, y: 156, w: 70, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 9250, y: 182, w: 80, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 9510, y: 154, w: 85, h: 8, oneWay: true, subType: 'driftwood_plank' },
  { x: 9580, y: 182, w: 75, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 4. Continuacion hacia las palapas
  { x: 9600, y: 220, w: 300, h: 50, subType: 'coastal_shore_sand' },

  // 5. Duna con mirador de palmeras (oneWay para no atrapar ni bloquear a nadie)
  { x: 9740, y: 180, w: 120, h: 40, oneWay: true, subType: 'coastal_dune' }
];
