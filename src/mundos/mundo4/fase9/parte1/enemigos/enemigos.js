// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 1: ENEMIGOS DEL FIRMAMENTO (X: 36400 -> 38100)
// ============================================================================

module.exports = {
  crawlers: [
    // Guardia astral en la entrada del Firmamento
    { x: 36500, y: 126, minX: 36440, maxX: 36560, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia de hielo en la Terraza de Meteorito Astral
    { x: 36780, y: 72, minX: 36745, maxX: 36835, speed: 40, dir: 1, variant: 'frost_crawler' },
    // Guardia astral patrullando el Mirador de la Vía Láctea (lejos del NPC Kelsang)
    { x: 37300, y: 126, minX: 37240, maxX: 37370, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Guardia de hielo en el risco inferior del abismo
    { x: 37450, y: 118, minX: 37425, maxX: 37515, speed: 42, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en la aguja de las Pléyades
    { x: 37850, y: 74, minX: 37825, maxX: 37915, speed: 46, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago astral sobre el Primer Puente de Aurora Boreal
    { x: 36660, y: 65, baseY: 65, minX: 36620, maxX: 36710, speed: 42, variant: 'frost_flier' },
    // Murciélago astral en la zona alta del telescopio celeste
    { x: 37060, y: 60, baseY: 60, minX: 37010, maxX: 37110, speed: 46, variant: 'frost_flier' },
    // Murciélago astral sobrevolando el abismo de polvo estelar
    { x: 37600, y: 35, baseY: 35, minX: 37530, maxX: 37660, speed: 50, variant: 'frost_flier' },
    // Murciélago astral custodiando el ascenso a las Pléyades
    { x: 37740, y: 55, baseY: 55, minX: 37680, maxX: 37790, speed: 48, variant: 'frost_flier' }
  ]
};
