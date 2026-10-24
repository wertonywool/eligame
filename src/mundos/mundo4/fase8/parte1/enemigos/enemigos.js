// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 1: ENEMIGOS DE KAILASH (X: 33000 -> 34700)
// ============================================================================
// Escarabajos sagrados de lapislázuli con orlas doradas y fénix astrales celestiales.

module.exports = {
  crawlers: [
    // 1. Escarabajo de lapislázuli patrullando la rampa de entrada
    { x: 33140, y: 126, minX: 33060, maxX: 33200, speed: 45, dir: 1, variant: 'kailash_scarab' },
    // 2. Escarabajo de lapislázuli en la terraza superior de cuarzo
    { x: 33440, y: 80, minX: 33430, maxX: 33500, speed: 42, dir: 1, variant: 'kailash_scarab' },
    // 3. Escarabajo de lapislázuli custodiando las aguas termales sagradas
    { x: 34010, y: 126, minX: 33970, maxX: 34160, speed: 48, dir: 1, variant: 'kailash_scarab' },
    // 4. Escarabajo de lapislázuli sobre el banco de nieve junto al pilar de jade
    { x: 34240, y: 126, minX: 34220, maxX: 34330, speed: 46, dir: -1, variant: 'kailash_scarab' }
  ],
  fliers: [
    // 1. Fénix astral de alas boreales sobrevolando las terrazas de cristal
    { x: 33360, y: 30, baseY: 30, minX: 33280, maxX: 33460, speed: 50, variant: 'astral_flier' },
    // 2. Fénix astral planeando en el centro del gran abismo celestial
    { x: 33790, y: 22, baseY: 22, minX: 33730, maxX: 33890, speed: 55, variant: 'astral_flier' },
    // 3. Fénix astral coronando el Gran Puente del Arcoíris Supremo
    { x: 34490, y: 25, baseY: 25, minX: 34400, maxX: 34580, speed: 48, variant: 'astral_flier' }
  ]
};
