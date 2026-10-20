// ============================================================================
// HABILIDAD MUNDO 4: LA PALA (CAVADO DE TÚNELES EN NIEVE Y BOLAS DE NIEVE)
// ============================================================================
// 1. Cavado subterráneo: Elizabeth se sumerge en los bancos de nieve (snow_bank)
//    para avanzar a gran velocidad como ratona, esquivando ventiscas y enemigos.
// 2. Bolas de nieve (Máx 5): Con la pala recoge bolas de nieve en el suelo helado
//    y las arroja a los enemigos con trayectoria balística para congelarlos/destruirlos.

let shovelState = {
  snowballs: 0,
  maxSnowballs: 5,
  isDigging: false,
  digSpeed: 235,
  projectiles: [],
  scoopCooldown: 0,
  throwCooldown: 0
};

function getShovelState() {
  return shovelState;
}

function initShovelAbility() {
  shovelState = {
    snowballs: 0,
    maxSnowballs: 5,
    isDigging: false,
    digSpeed: 235,
    projectiles: [],
    scoopCooldown: 0,
    throwCooldown: 0
  };
  if (typeof player !== 'undefined' && player) {
    player.snowballs = 0;
    player.isDigging = false;
  }
}

function updateShovelAbility(dt) {
  if (gameState !== 'PLAYING' || !player || player.ability !== 'shovel') {
    return;
  }

  if (shovelState.scoopCooldown > 0) shovelState.scoopCooldown -= dt;
  if (shovelState.throwCooldown > 0) shovelState.throwCooldown -= dt;

  // 1. DETECCIÓN DE BANCOS DE NIEVE PARA CAVAR TÚNELES SUBTERRÁNEOS
  const feetX = player.x + player.w / 2;
  const feetY = player.y + player.h;
  let inSnowBank = false;
  let activeSnowBank = null;

  if (level && level.platforms) {
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if (p.subType === 'snow_bank') {
        if (feetX >= p.x && feetX <= p.x + p.w && feetY >= p.y - 2 && player.y <= p.y + p.h + 6) {
          inSnowBank = true;
          activeSnowBank = p;
          break;
        }
      }
    }
  }

  // Activar o desactivar estado de cavado subterráneo
  const wantsDive = inSnowBank && (keys.down || keys.downJustPressed || (keys.dashJustPressed && shovelState.snowballs === shovelState.maxSnowballs));
  if (inSnowBank && (wantsDive || shovelState.isDigging)) {
    shovelState.isDigging = true;
    player.isDigging = true;

    // Mantener la posición física dentro de la masa de nieve
    if (activeSnowBank) {
      player.y = activeSnowBank.y - 4;
      player.vy = 0;
    }

    // Aumento de velocidad al excavar por debajo de la nieve
    if (keys.left || keys.right) {
      const dir = keys.right ? 1 : -1;
      player.vx = dir * shovelState.digSpeed;
      player.facingRight = dir > 0;
    }

    // Efectos de partículas de nieve salpicando mientras excava
    if (globalFrame % 3 === 0) {
      spawnParticles(player.x + 11, player.y + 18, 3, '#ffffff', 50, -35);
      spawnParticles(player.x + 11, player.y + 18, 2, '#caf0f8', 40, -25);
      spawnParticles(player.x + 11, player.y + 18, 1, '#90e0ef', 30, -15);
    }

    // Salto impulsado para salir del banco de nieve
    if (keys.jumpJustPressed) {
      shovelState.isDigging = false;
      player.isDigging = false;
      player.vy = -295;
      triggerShake(0.08, 1.4);
      spawnParticles(player.x + 11, player.y + 10, 16, '#ffffff', 90, -60);
      spawnParticles(player.x + 11, player.y + 10, 10, '#caf0f8', 80, -45);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
      spawnFloatingText(player.x - 10, player.y - 12, '¡SALTO DE NIEVE!', '#ffffff');
    }
  } else if (!inSnowBank) {
    shovelState.isDigging = false;
    player.isDigging = false;
  }

  // 2. DETECCIÓN DE NIEVE EN EL SUELO (SNOW_GROUND O SNOW_BANK)
  let onSnowGround = false;
  if (level && level.platforms && player.onGround) {
    const feetX = player.x + player.w / 2;
    const feetY = player.y + player.h + 2;
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if ((p.subType === 'snow_ground' || p.subType === 'snow_bank' || (level.theme === 'snow' && (!p.subType || p.subType === 'grass'))) &&
          feetX >= p.x && feetX <= p.x + p.w && feetY >= p.y && feetY <= p.y + p.h + 10) {
        onSnowGround = true;
        break;
      }
    }
  }

  // 3. RECOGER BOLAS DE NIEVE CON LA PALA (MÁXIMO 5)
  // Se recoge al pulsar Dash estando sobre nieve si no tenemos el máximo y (agachados o sin bolas)
  const wantsScoop = keys.dashJustPressed && onSnowGround &&
    shovelState.snowballs < shovelState.maxSnowballs &&
    (keys.down || shovelState.snowballs === 0 || !keys.left && !keys.right);

  if (wantsScoop && shovelState.scoopCooldown <= 0) {
    keys.dashJustPressed = false;
    shovelState.scoopCooldown = 0.32;
    shovelState.snowballs = Math.min(shovelState.maxSnowballs, shovelState.snowballs + 1);
    player.snowballs = shovelState.snowballs;

    triggerShake(0.06, 1.0);
    spawnParticles(player.x + (player.facingRight ? 18 : 4), player.y + 20, 10, '#ffffff', 60, -30);
    spawnParticles(player.x + (player.facingRight ? 18 : 4), player.y + 20, 6, '#caf0f8', 50, -20);
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();

    spawnFloatingText(
      player.x - 14,
      player.y - 12,
      `¡BOLA DE NIEVE! (${shovelState.snowballs}/${shovelState.maxSnowballs})`,
      '#caf0f8'
    );
  }

  // 4. LANZAR BOLA DE NIEVE A LOS ENEMIGOS
  // Si se pulsa Dash y tenemos bolas de nieve acumuladas
  const wantsThrow = keys.dashJustPressed && shovelState.snowballs > 0 && !wantsScoop;

  if (wantsThrow && shovelState.throwCooldown <= 0) {
    keys.dashJustPressed = false;
    shovelState.throwCooldown = 0.28;
    shovelState.snowballs--;
    player.snowballs = shovelState.snowballs;

    const dir = player.facingRight ? 1 : -1;
    const startX = player.x + (player.facingRight ? 18 : -2);
    const startY = player.y + 8;

    shovelState.projectiles.push({
      x: startX,
      y: startY,
      vx: dir * 350,
      vy: -80,
      radius: 4.5,
      life: 1.8
    });

    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    spawnParticles(startX, startY, 5, '#ffffff', 50, -10);
  }

  // 5. FÍSICA Y COLISIONES DE LAS BOLAS DE NIEVE
  for (let i = shovelState.projectiles.length - 1; i >= 0; i--) {
    const b = shovelState.projectiles[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.vy += 270 * dt; // Gravedad suave
    b.life -= dt;

    // Estela de nieve voladora
    if (globalFrame % 2 === 0) {
      spawnParticles(b.x, b.y, 1, '#ffffff', 18, -5);
    }

    let hit = false;

    // Colisión con enemigos (magmaCrawlers, fireBats u orugas heladas)
    const enemies = (level && level.magmaCrawlers ? level.magmaCrawlers : []).concat(level && level.fireBats ? level.fireBats : []);
    for (let e of enemies) {
      if (!e.dead && Math.hypot(b.x - (e.x + (e.w || 20) / 2), b.y - (e.y + (e.h || 18) / 2)) < 18) {
        hit = true;
        e.dead = true;
        triggerShake(0.12, 1.8);
        spawnParticles(e.x + 10, e.y + 10, 18, '#ffffff', 90, 40);
        spawnParticles(e.x + 10, e.y + 10, 12, '#caf0f8', 80, 30);
        spawnParticles(e.x + 10, e.y + 10, 8, '#00b4d8', 70, 20);
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        spawnFloatingText(e.x - 10, e.y - 14, '¡CONGELADO!', '#caf0f8');
        break;
      }
    }

    // Colisión con terreno sólido
    if (!hit && level && level.platforms) {
      for (let p of level.platforms) {
        if (!p.oneWay && b.x >= p.x && b.x <= p.x + p.w && b.y >= p.y && b.y <= p.y + p.h) {
          hit = true;
          spawnParticles(b.x, b.y, 8, '#ffffff', 60, -20);
          spawnParticles(b.x, b.y, 5, '#caf0f8', 45, -15);
          break;
        }
      }
    }

    if (hit || b.life <= 0) {
      shovelState.projectiles.splice(i, 1);
    }
  }
}

// Renderizado de las bolas de nieve en vuelo y efectos subterráneos
function drawShovelWorld(ctx) {
  if (!shovelState) return;

  // Bolas de nieve activas proyectadas
  for (const b of shovelState.projectiles) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#caf0f8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Brillo estelar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(b.x - 1, b.y - 1, 2, 2);
  }

  // Efecto visual cuando Elizabeth cava bajo un banco de nieve
  if (player && player.isDigging) {
    const mx = player.x + 11;
    const my = player.y + 16;
    const pulse = Math.sin(globalFrame * 0.3) * 2;

    // Montículo de nieve superficial en avance
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(mx, my + 6, 14 + pulse, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.beginPath();
    ctx.ellipse(mx, my + 5, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pala de metal asomando rítmicamente
    ctx.fillStyle = '#adb5bd';
    const palaOff = Math.sin(globalFrame * 0.4) * 4;
    ctx.fillRect(mx + (player.facingRight ? 8 : -12), my - 2 + palaOff, 4, 6);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(mx + (player.facingRight ? 9 : -11), my + 4 + palaOff, 2, 5);
  }
}

// Renderizado de la munición de bolas de nieve en el HUD
function drawShovelHUD(ctx, x, y) {
  if (!player || player.ability !== 'shovel') return;

  // Icono de la pala
  ctx.fillStyle = '#495057';
  ctx.fillRect(x, y + 2, 3, 10);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(x - 2, y + 10, 7, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - 1, y + 11, 5, 3);

  // 5 ranuras de bolas de nieve
  const sx = x + 12;
  for (let i = 0; i < shovelState.maxSnowballs; i++) {
    const bx = sx + i * 9;
    const by = y + 7;
    const hasBall = i < shovelState.snowballs;

    if (hasBall) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#90e0ef';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getShovelState,
    initShovelAbility,
    updateShovelAbility,
    drawShovelWorld,
    drawShovelHUD
  };
}
