// ============================================================================
// BOSS FIGHT: EL GRAN YETI DE CRISTAL (MUNDO 4 • FASE 6)
// ============================================================================
// Combate colosal en el Santuario de Cristal: pisotones con estalactitas,
// lanzamiento de bolas de nieve gigantes y embestidas con aturdimiento.

let yetiBossState = {
  active: false,
  x: 29050,
  y: 78,
  w: 44,
  h: 48,
  vx: 0,
  vy: 0,
  facingRight: false,
  hp: 6,
  maxHp: 6,
  phase: 1,
  action: 'idle',
  actionTimer: 1.6,
  isStunned: false,
  stunTimer: 0,
  hitCooldown: 0,
  isDefeated: false,
  icicles: [],
  snowballs: [],
  shockwaves: [],
  gateLeft: { x: 28640, y: 126, closed: false },
  gateRight: { x: 29360, y: 126, closed: false },
  arenaMinX: 28655,
  arenaMaxX: 29345
};

function initYetiBoss() {
  yetiBossState = {
    active: false,
    x: 29050,
    y: 78,
    w: 44,
    h: 48,
    vx: 0,
    vy: 0,
    facingRight: false,
    hp: 6,
    maxHp: 6,
    phase: 1,
    action: 'idle',
    actionTimer: 1.6,
    isStunned: false,
    stunTimer: 0,
    hitCooldown: 0,
    isDefeated: false,
    icicles: [],
    snowballs: [],
    shockwaves: [],
    gateLeft: { x: 28640, y: 126, closed: false },
    gateRight: { x: 29360, y: 126, closed: false },
    arenaMinX: 28655,
    arenaMaxX: 29345
  };
  window.yetiBossState = yetiBossState;
}

function startYetiBossFight() {
  if (yetiBossState.active || yetiBossState.isDefeated) return;
  yetiBossState.active = true;
  yetiBossState.gateLeft.closed = true;
  yetiBossState.gateRight.closed = true;
  yetiBossState.action = 'roar';
  yetiBossState.actionTimer = 1.4;
  yetiBossState.hp = 6;
  yetiBossState.phase = 1;
  window.yetiBossState = yetiBossState;

  if (typeof triggerShake === 'function') triggerShake(1.2, 2.5);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 30, player.y - 25, 'BATALLA: EL GRAN YETI!', '#38bdf8');
  }
}

function updateYetiBoss(dt) {
  if (!level || level.id !== 4) return;
  const s = yetiBossState;

  // Activar combate cuando Elizabeth entra al santuario
  if (!s.active && !s.isDefeated && player.x >= 28680 && player.x <= 29320) {
    startYetiBossFight();
  }

  if (!s.active && !s.isDefeated) return;

  // Bloquear a Elizabeth dentro de la arena durante la batalla
  if (s.active && !s.isDefeated) {
    if (player.x < s.arenaMinX) { player.x = s.arenaMinX; if (player.vx < 0) player.vx = 0; }
    if (player.x > s.arenaMaxX) { player.x = s.arenaMaxX; if (player.vx > 0) player.vx = 0; }
  }

  if (s.hitCooldown > 0) s.hitCooldown -= dt;

  // Actualizar proyectiles: estalactitas cayendo
  for (let i = s.icicles.length - 1; i >= 0; i--) {
    const ic = s.icicles[i];
    ic.y += ic.vy * dt;
    ic.vy += 450 * dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, ic.x - 4, ic.y, 8, 16)) {
      damagePlayer(false);
      s.icicles.splice(i, 1);
      continue;
    }
    if (ic.y >= 126) {
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(ic.x, 126, 4, '#e0f2fe');
      }
      s.icicles.splice(i, 1);
    }
  }

  // Actualizar proyectiles: bolas de nieve rodantes
  for (let i = s.snowballs.length - 1; i >= 0; i--) {
    const sb = s.snowballs[i];
    sb.x += sb.vx * dt;
    sb.rot += sb.vx * dt * 0.08;

    if (rectOverlap(player.x, player.y, player.w, player.h, sb.x - sb.r, sb.y - sb.r, sb.r * 2, sb.r * 2)) {
      damagePlayer(false);
      s.snowballs.splice(i, 1);
      continue;
    }
    if (sb.x < s.arenaMinX - 20 || sb.x > s.arenaMaxX + 20) {
      s.snowballs.splice(i, 1);
    }
  }

  // Actualizar ondas de choque en el suelo
  for (let i = s.shockwaves.length - 1; i >= 0; i--) {
    const sw = s.shockwaves[i];
    sw.x += sw.dir * sw.speed * dt;
    sw.life -= dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, sw.x - 8, sw.y - 10, 16, 12)) {
      damagePlayer(false);
    }
    if (sw.life <= 0 || sw.x < s.arenaMinX || sw.x > s.arenaMaxX) {
      s.shockwaves.splice(i, 1);
    }
  }

  // Si esta derrotado, esperar y permanecer pacifico
  if (s.isDefeated) {
    s.vx = 0;
    return;
  }

  // Estado: Aturdido (momento para que Elizabeth golpee con el Pico de Hielo)
  if (s.isStunned) {
    s.stunTimer -= dt;
    s.vx = 0;

    // Elizabeth golpea al Yeti mientras esta mareado
    const canHitWithPick = player.isSwingingPick || (keys.dashJustPressed && player.ability === 'ice_pick');
    const isStomping = player.vy > 0 && player.y + player.h <= s.y + 26;
    const isNear = Math.abs((player.x + 11) - (s.x + s.w / 2)) < 44;

    if (s.hitCooldown <= 0 && isNear && (canHitWithPick || isStomping)) {
      s.hitCooldown = 1.0;
      s.hp--;
      if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
      if (typeof triggerShake === 'function') triggerShake(0.35, 3.2);

      if (typeof spawnParticles === 'function') {
        spawnParticles(s.x + s.w / 2, s.y + 18, 25, '#38bdf8', 120, -50);
        spawnParticles(s.x + s.w / 2, s.y + 18, 15, '#ffffff', 80, -30);
      }
      if (isStomping) {
        player.vy = -260;
        player.jumpsLeft = 2;
      }

      if (s.hp <= 0) {
        // Derrota del Yeti
        s.isDefeated = true;
        s.active = false;
        s.isStunned = false;
        s.action = 'defeated';
        s.gateLeft.closed = false;
        s.gateRight.closed = false;
        score += 5000;
        if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(s.x - 20, s.y - 20, 'YETI PACIFICADO! +5000', '#ffd166');
        }
        return;
      } else {
        // Despertar enfurecido
        s.isStunned = false;
        s.phase = s.hp <= 2 ? 3 : (s.hp <= 4 ? 2 : 1);
        s.action = 'roar';
        s.actionTimer = 0.9;
      }
    }

    if (s.stunTimer <= 0) {
      s.isStunned = false;
      s.action = 'roar';
      s.actionTimer = 0.8;
    }
    return;
  }

  // Daño por contacto si Elizabeth toca al Yeti cuando NO esta aturdido
  if (rectOverlap(player.x, player.y, player.w, player.h, s.x + 4, s.y + 4, s.w - 8, s.h - 4)) {
    damagePlayer(false);
  }

  // Maquina de estados del combate
  s.actionTimer -= dt;
  s.facingRight = player.x > s.x + s.w / 2;

  // 1. Rugido inicial o transicion
  if (s.action === 'roar') {
    s.vx = 0;
    if (globalFrame % 5 === 0 && typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + 12, 2, '#e0f2fe', 40, -10);
    }
    if (s.actionTimer <= 0) {
      // Elegir siguiente accion segun fase
      const r = Math.random();
      if (s.phase === 1) {
        s.action = r < 0.5 ? 'stomp' : 'charge';
      } else if (s.phase === 2) {
        s.action = r < 0.35 ? 'stomp' : (r < 0.7 ? 'throw' : 'charge');
      } else {
        s.action = r < 0.4 ? 'charge' : (r < 0.7 ? 'stomp' : 'throw');
      }
      s.actionTimer = s.action === 'charge' ? 2.2 : (s.action === 'stomp' ? 1.4 : 1.2);
    }
  }

  // 2. Pisoton Sismico (Estalactitas y Ondas)
  else if (s.action === 'stomp') {
    s.vx = 0;
    if (s.actionTimer < 0.6 && s.actionTimer > 0.5) {
      if (typeof triggerShake === 'function') triggerShake(0.25, 2.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();

      // Ondas en el suelo
      s.shockwaves.push({ x: s.x + s.w / 2, y: 126, dir: -1, speed: 110, life: 2.0 });
      s.shockwaves.push({ x: s.x + s.w / 2, y: 126, dir: 1, speed: 110, life: 2.0 });

      // Caida de 4 estalactitas
      for (let k = 0; k < 4; k++) {
        const dropX = s.arenaMinX + 40 + Math.random() * (s.arenaMaxX - s.arenaMinX - 80);
        s.icicles.push({ x: dropX, y: 30, vy: 40 });
      }
    }
    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 1.0;
    }
  }

  // 3. Lanzamiento de Bola de Nieve Gigante
  else if (s.action === 'throw') {
    s.vx = 0;
    if (s.actionTimer < 0.5 && s.actionTimer > 0.4) {
      const dir = s.facingRight ? 1 : -1;
      s.snowballs.push({
        x: s.x + (dir > 0 ? s.w + 10 : -10),
        y: 116,
        vx: dir * (s.phase === 3 ? 165 : 130),
        r: 10,
        rot: 0
      });
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    }
    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 1.2;
    }
  }

  // 4. Embestida Salvaje (Charge)
  else if (s.action === 'charge') {
    const chargeSpeed = s.phase === 3 ? 195 : 155;
    s.vx = (s.facingRight ? 1 : -1) * chargeSpeed;
    s.x += s.vx * dt;

    if (globalFrame % 3 === 0 && typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + s.h - 4, 3, '#ffffff', -s.vx * 0.3, -15);
    }

    // Chocar contra las columnas de los extremos de la arena
    if (s.x <= s.arenaMinX + 15 || s.x + s.w >= s.arenaMaxX - 15) {
      s.isStunned = true;
      s.stunTimer = 3.2;
      s.vx = 0;
      if (typeof triggerShake === 'function') triggerShake(0.4, 3.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      if (typeof spawnParticles === 'function') {
        spawnParticles(s.x + s.w / 2, s.y + 15, 20, '#e0f2fe', 80, -30);
      }
      return;
    }

    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 0.8;
      s.vx = 0;
    }
  }

  // 5. Reposo entre ataques
  else if (s.action === 'idle') {
    s.vx = 0;
    if (s.actionTimer <= 0) {
      s.action = 'roar';
      s.actionTimer = 0.6;
    }
  }
}
