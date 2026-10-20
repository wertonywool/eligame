// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 1: ENEMIGOS DEL FIRMAMENTO (X: 36400 -> 38100)
// ============================================================================

module.exports = {
  crawlers: [
    // Guardia astral en el meteorito flotante inicial
    { x: 36480, y: 80, minX: 36472, maxX: 36525, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Guardia de hielo en la Terraza de Meteorito Astral
    { x: 36790, y: 92, minX: 36750, maxX: 36850, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en el puente de nebulosa
    { x: 36850, y: 64, minX: 36842, maxX: 36905, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Guardia astral en el balcon alto del observatorio
    { x: 37050, y: 80, minX: 37042, maxX: 37105, speed: 54, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en la terraza alta de la Via Lactea
    { x: 37250, y: 84, minX: 37242, maxX: 37310, speed: 50, dir: -1, variant: 'frost_crawler' },
    // Guardia de hielo en la Fosa de Polvo Estelar
    { x: 37470, y: 154, minX: 37420, maxX: 37550, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en el pinaculo boreal
    { x: 37750, y: 62, minX: 37742, maxX: 37800, speed: 52, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago astral en el Primer Puente de Aurora Boreal
    { x: 36650, y: 40, baseY: 40, minX: 36600, maxX: 36700, speed: 48, variant: 'frost_flier' },
    // Murcielago astral sobrevolando el observatorio cosmico
    { x: 37130, y: 24, baseY: 24, minX: 37070, maxX: 37190, speed: 56, variant: 'frost_flier' },
    // Murcielago astral sobre la Via Lactea
    { x: 37340, y: 22, baseY: 22, minX: 37280, maxX: 37400, speed: 52, variant: 'frost_flier' },
    // Murcielago astral en el Segundo Puente de Aurora Boreal
    { x: 37730, y: 25, baseY: 25, minX: 37690, maxX: 37790, speed: 50, variant: 'frost_flier' },
    // Murcielago astral custodiando las Pleyades
    { x: 37880, y: 28, baseY: 28, minX: 37820, maxX: 37940, speed: 58, variant: 'frost_flier' }
  ]
};
