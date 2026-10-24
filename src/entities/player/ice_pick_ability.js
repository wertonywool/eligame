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

    const hitX = player.x + (player.facingRight ? (player.hasForgedPick ? 30 : 24) : (player.hasForgedPick ? -12 : -6));
    const hitY = player.y + 12;
    const reach = player.hasForgedPick ? 48 : 34;

    spawnParticles(hitX, hitY, 10, player.hasForgedPick ? '#facc15' : '#38bdf8', 80, -20);
    spawnParticles(hitX, hitY, 6, '#e0f2fe', 60, -10);
    spawnStarSparkles(hitX, hitY, 6, player.hasForgedPick ? '#fde047' : '#ffffff');

    // 1. Comprobar colisión con enemigos terrestres (Frost Crawlers / Magma Crawlers)
    if (typeof magmaCrawlers !== 'undefined' && magmaCrawlers) {
      for (let i = magmaCrawlers.length - 1; i >= 0; i--) {
        const mc = magmaCrawlers[i];
        const ex = mc.x + 9;
        const ey = mc.y + 7;
        if (Math.abs(hitX - ex) < reach && Math.abs(hitY - ey) < 28) {
          score += 150;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          triggerShake(0.12, 2.0);
          spawnFloatingText(mc.x, mc.y - 10, player.hasForgedPick ? '¡CORTE FORJADO! +150' : '¡PICADO! +150', '#38bdf8');
          spawnParticles(mc.x + 9, mc.y + 7, 16, player.hasForgedPick ? '#fde047' : '#38bdf8', 110, -30);
          spawnParticles(mc.x + 9, mc.y + 7, 10, '#e0f2fe', 80, -15);
          if (typeof spawnDroppedLilies === 'function') spawnDroppedLilies(mc.x + 9, mc.y + 4, 2);
          magmaCrawlers.splice(i, 1);
        }
      }
    }

    // 2. Comprobar colisión con enemigos voladores (Frost Fliers / Fire Bats)
    if (typeof fireBats !== 'undefined' && fireBats) {
      for (let i = fireBats.length - 1; i >= 0; i--) {
        const fb = fireBats[i];
        const ex = fb.x + 6;
        const ey = fb.y + 5;
        if (Math.abs(hitX - ex) < reach && Math.abs(hitY - ey) < 28) {
          score += 150;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          triggerShake(0.12, 2.0);
          spawnFloatingText(fb.x, fb.y - 10, player.hasForgedPick ? '¡CORTE FORJADO! +150' : '¡PICADO! +150', '#38bdf8');
          spawnParticles(fb.x + 6, fb.y + 5, 16, player.hasForgedPick ? '#fde047' : '#38bdf8', 110, -30);
          spawnParticles(fb.x + 6, fb.y + 5, 10, '#e0f2fe', 80, -15);
          if (typeof spawnDroppedLilies === 'function') spawnDroppedLilies(fb.x + 6, fb.y + 4, 2);
          fireBats.splice(i, 1);
        }
      }
    }

    // 3. Romper pilares de hielo milenario (ice_pillar o breakable)
    if (level && level.platforms) {
      for (const p of level.platforms) {
        if (p.broken) continue;
        if (p.subType === 'ice_pillar' || p.breakable) {
          const inReachX = hitX >= p.x - 18 && hitX <= p.x + p.w + 18;
          const inReachY = hitY >= p.y - 16 && hitY <= p.y + p.h + 16;
          if (inReachX && inReachY) {
            p.broken = true;
            score += 250;
            if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
            if (window.sfx && window.sfx.playHit) window.sfx.playHit();
            triggerShake(0.22, 3.2);
            if (typeof rumbleGamepad === 'function') rumbleGamepad(140, 0.5, 0.3);
            spawnFloatingText(p.x, p.y - 14, '¡HIELO QUEBRADO! +250', '#7dd3fc');
            const pCenterX = p.x + p.w / 2;
            const pCenterY = p.y + p.h / 2;
            spawnParticles(pCenterX, pCenterY, 30, '#38bdf8', 130, -50);
            spawnParticles(pCenterX, pCenterY, 20, '#e0f2fe', 100, -30);
            spawnParticles(pCenterX, pCenterY, 15, '#ffffff', 80, -20);
            if (typeof spawnStarSparkles === 'function') {
              spawnStarSparkles(pCenterX, pCenterY, 12, '#38bdf8');
            }
          }
        }
      }
    }

    // 4. Desviar y destruir proyectiles del Gran Yeti (Estalactitas y Bolas de Nieve)
    if (window.yetiBossState && window.yetiBossState.active) {
      const s = window.yetiBossState;
      // Estalactitas
      for (let i = s.icicles.length - 1; i >= 0; i--) {
        const ic = s.icicles[i];
        if (Math.abs(hitX - ic.x) < 28 && Math.abs(hitY - ic.y) < 28) {
          s.icicles.splice(i, 1);
          score += 50;
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(ic.x, ic.y, 12, '#38bdf8', 90, -40);
          spawnFloatingText(ic.x - 8, ic.y - 10, '¡DESVIADO!', '#7dd3fc');
        }
      }
      // Bolas de nieve
      for (let i = s.snowballs.length - 1; i >= 0; i--) {
        const sb = s.snowballs[i];
        if (Math.abs(hitX - sb.x) < 30 && Math.abs(hitY - sb.y) < 30) {
          s.snowballs.splice(i, 1);
          score += 100;
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(sb.x, sb.y, 16, '#ffffff', 110, -50);
          spawnFloatingText(sb.x - 10, sb.y - 10, '¡DESTRUIDA!', '#e0f2fe');
        }
      }
    }

    // 5. Destruir Seracs Glaciales que caen
    if (window.kangshungState && window.kangshungState.seracs) {
      const s = window.kangshungState;
      for (let i = s.seracs.length - 1; i >= 0; i--) {
        const sc = s.seracs[i];
        if (Math.abs(hitX - sc.x) < 30 && Math.abs(hitY - sc.y) < 30) {
          score += 100;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          spawnFloatingText(sc.x - 10, sc.y - 10, '¡SERAC DESTRUIDO! +100', '#38bdf8');
          spawnParticles(sc.x, sc.y, 16, '#38bdf8', 110, -40);
          spawnParticles(sc.x, sc.y, 10, '#ffffff', 80, -20);
          s.seracs.splice(i, 1);
        }
      }
    }

    // Comprobar colisión con monolitos y pilares de cristal quebrables
    if (typeof level !== 'undefined' && level && level.platforms) {
      for (let pIdx = level.platforms.length - 1; pIdx >= 0; pIdx--) {
        const p = level.platforms[pIdx];
        if (p.breakable && rectOverlap(hitX - 16, hitY - 16, 32, 32, p.x, p.y, p.w, p.h)) {
          level.platforms.splice(pIdx, 1);
          score += 200;
          triggerShake(0.18, 2.5);
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 22, '#38bdf8', 110, -45);
          spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 16, '#c084fc', 90, -35);
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#ffffff');
          spawnFloatingText(p.x + p.w / 2 - 20, p.y - 12, '¡PILAR QUEBRADO! +200', '#38bdf8');
          spawnDroppedLilies(p.x + p.w / 2, p.y + p.h / 2, 3);
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

  const isForged = player.hasForgedPick;
  // Icono del Pico de Hielo en el HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(x - 3, y, isForged ? 64 : 54, 16);
  ctx.strokeStyle = isForged ? '#facc15' : '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 3, y, isForged ? 64 : 54, 16);

  // Mini pico
  ctx.fillStyle = isForged ? '#facc15' : '#38bdf8';
  ctx.fillRect(x + 2, y + 2, 7, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 7, y + 2, 2, 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 4, y + 4, 2, 8);

  // Etiqueta
  ctx.fillStyle = isForged ? '#fef08a' : '#e0f2fe';
  ctx.font = 'bold 5.5px sans-serif';
  ctx.fillText(isForged ? 'PICO FORJADO' : 'PICO DE HIELO', x + 12, y + 10);
}

if (typeof module !== 'undefined') {
  module.exports = {
    initIcePickAbility,
    updateIcePickAbility,
    drawIcePickWorld,
    drawIcePickHUD
  };
}
