// ============================================================================
// HABILIDAD MUNDO 4: EL PICO DE HIELO (GOLPE GLACIAL Y QUIEBRE DE TÉMPANOS)
// ============================================================================
// Obtenido de Gaston el Melancólico en la Casa 3 del Pueblo Nevado.
// Permite que Elizabeth golpee con un pico de hielo profesional para romper
// muros de hielo, desviar proyectiles y atacar enemigos helados.

let icePickState = {
  swingTimer: 0,
  swingCooldown: 0,
  swingDuration: 0.18,
  particles: []
};

function initIcePickAbility() {
  icePickState = {
    swingTimer: 0,
    swingCooldown: 0,
    swingDuration: 0.18,
    particles: []
  };
  if (typeof player !== 'undefined' && player) {
    player.isSwingingPick = false;
  }
}

function updateIcePickAbility(dt) {
  if (gameState !== 'PLAYING' || !player || player.ability !== 'ice_pick') {
    return;
  }

  if (icePickState.swingCooldown > 0) icePickState.swingCooldown -= dt;
  if (icePickState.swingTimer > 0) {
    icePickState.swingTimer -= dt;
    if (icePickState.swingTimer <= 0) {
      player.isSwingingPick = false;
    }
  }

  // Ejecución de golpe con el pico al pulsar DASH o TECLA DE ACCIÓN
  if (keys.dashJustPressed && icePickState.swingCooldown <= 0) {
    keys.dashJustPressed = false;
    icePickState.swingTimer = icePickState.swingDuration;
    icePickState.swingCooldown = 0.28;
    player.isSwingingPick = true;

    if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    triggerShake(0.06, 1.2);

    const hitX = player.x + (player.facingRight ? 24 : -6);
    const hitY = player.y + 12;

    spawnParticles(hitX, hitY, 10, '#38bdf8', 80, -20);
    spawnParticles(hitX, hitY, 6, '#e0f2fe', 60, -10);
    spawnStarSparkles(hitX, hitY, 6, '#ffffff');

    // Comprobar colisión con enemigos cercanos
    if (typeof enemies !== 'undefined' && enemies) {
      for (const e of enemies) {
        if (!e.dead && Math.abs((player.x + 11) - (e.x + (e.w || 16) / 2)) < 38 && Math.abs((player.y + 12) - (e.y + (e.h || 16) / 2)) < 24) {
          e.dead = true;
          score += 150;
          triggerShake(0.12, 1.8);
          spawnFloatingText(e.x, e.y - 10, '¡PICADO!', '#38bdf8');
          spawnParticles(e.x + 8, e.y + 8, 14, '#00b4d8', 100, -40);
        }
      }
    }
  }
}

function drawIcePickWorld(ctx) {
  if (!player || player.ability !== 'ice_pick' || !player.isSwingingPick) return;

  const swingProgress = 1 - (icePickState.swingTimer / icePickState.swingDuration);
  const dir = player.facingRight ? 1 : -1;
  const hx = player.x + (player.facingRight ? 18 : 4);
  const hy = player.y + 12;

  // Arco glacial del golpe
  ctx.save();
  ctx.translate(hx, hy);
  ctx.scale(dir, 1);
  ctx.rotate((swingProgress - 0.5) * Math.PI * 0.8);

  // Mango
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-2, -14, 4, 18);
  // Empuñadura azul
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-2, 0, 4, 5);
  // Cabeza del pico de hielo
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-10, -14);
  ctx.lineTo(12, -14);
  ctx.lineTo(8, -10);
  ctx.lineTo(-8, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(8, -14, 4, 2);

  ctx.restore();

  // Estela de hielo cortante
  ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - swingProgress) + ')';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(hx, hy, 16, (player.facingRight ? -Math.PI * 0.4 : Math.PI * 0.6), (player.facingRight ? Math.PI * 0.4 : Math.PI * 1.4));
  ctx.stroke();
}

function drawIcePickHUD(ctx, x, y) {
  if (!player || player.ability !== 'ice_pick') return;

  // Icono del Pico de Hielo en el HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(x - 3, y, 54, 16);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 3, y, 54, 16);

  // Mini pico
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(x + 2, y + 2, 7, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 7, y + 2, 2, 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 4, y + 4, 2, 8);

  // Etiqueta
  ctx.fillStyle = '#e0f2fe';
  ctx.font = 'bold 6px sans-serif';
  ctx.fillText('PICO DE HIELO', x + 13, y + 10);
}

if (typeof module !== 'undefined') {
  module.exports = {
    initIcePickAbility,
    updateIcePickAbility,
    drawIcePickWorld,
    drawIcePickHUD
  };
}
