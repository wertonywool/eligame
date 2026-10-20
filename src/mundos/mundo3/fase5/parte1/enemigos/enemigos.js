// MUNDO 3 - FASE 5 - PARTE 1: Enemigos Marinos del Megatsunami
module.exports = {
  crawlers: [
    // Tiburones Mako patrullando las aguas torrenciales
    { x: 16150, y: 196, minX: 16050, maxX: 16240, speed: 70, dir: -1, variant: 'shark' },
    { x: 16560, y: 196, minX: 16460, maxX: 16700, speed: 75, dir: -1, variant: 'shark' },
    { x: 17120, y: 196, minX: 16980, maxX: 17260, speed: 80, dir: -1, variant: 'shark' },
    { x: 17660, y: 196, minX: 17540, maxX: 17800, speed: 75, dir: -1, variant: 'shark' },

    // Cangrejos acorazados patrullando las estructuras de desastre
    // 1. Viaducto de autopista sumergida
    { x: 16220, y: 162, minX: 16180, maxX: 16320, speed: 30, dir: 1, variant: 'crab' },
    // 2. Cubierta del carguero encallado
    { x: 16520, y: 164, minX: 16460, maxX: 16640, speed: 32, dir: -1, variant: 'crab' },
    // 3. Contenedor de carga naranja
    { x: 16780, y: 106, minX: 16760, maxX: 16830, speed: 28, dir: 1, variant: 'crab' },
    // 4. Azotea del rascacielos sumergido
    { x: 17150, y: 148, minX: 17080, maxX: 17260, speed: 35, dir: -1, variant: 'crab' }
  ],
  fliers: [
    // Medusas eléctricas flotando en las brechas aéreas
    { x: 16370, y: 115, baseY: 115, minX: 16330, maxX: 16420, speed: 32, variant: 'jellyfish' },
    { x: 16890, y: 100, baseY: 100, minX: 16860, maxX: 16940, speed: 34, variant: 'jellyfish' },
    { x: 17330, y: 105, baseY: 105, minX: 17280, maxX: 17370, speed: 36, variant: 'jellyfish' },
    { x: 17680, y: 130, baseY: 130, minX: 17620, maxX: 17740, speed: 38, variant: 'jellyfish' },

    // Gaviotas de tormenta sorteando los vendavales
    { x: 16450, y: 55, baseY: 55, minX: 16350, maxX: 16600, speed: 45, variant: 'seagull' },
    { x: 17400, y: 55, baseY: 55, minX: 17280, maxX: 17560, speed: 48, variant: 'seagull' }
  ]
};
