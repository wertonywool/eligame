// ============================================================================
// GRAN JEFE FINAL: EL DRAGÓN ASTRAL DE POLARIS (MUNDO 4 • FASE 9)
// ============================================================================
// El enfrentamiento cumbre en el Sanctum Sanctorum de la Estrella Polar:
// cometas estelares, rayos de plasma orbital y disolucion en constelacion.

let astralBossState = {
  active: false,
  x: 41050,
  y: 65,
  w: 74,
  h: 46,
  vx: 0,
  vy: 0,
  hp: 8,
  maxHp: 8,
  phase: 1,
  action: 'orbit',
  actionTimer: 2.0,
  hitCooldown: 0,
  isVulnerable: false,
  isDefeated: false,
  comets: [],
  stars: [],
  beam: { active: false, x: 0, y: 0, angle: 0, timer: 0 },
  gateLeft: { x: 40740, y: 126, closed: false },
  gateRight: { x: 41380, y: 126, closed: false },
  arenaMinX: 40755,
  arenaMaxX: 41365
};

function initAstralBoss() {
  astralBossState = {
    active: false,
    x: 41050,
    y: 65,
    w: 74,
    h: 46,
    vx: 0,
    vy: 0,
    hp: 8,
    maxHp: 8,
    phase: 1,
    action: 'orbit',
    actionTimer: 2.0,
    hitCooldown: 0,
    isVulnerable: false,
    isDefeated: false,
    comets: [],
    stars: [],
    beam: { active: false, x: 0, y: 0, angle: 0, timer: 0 },
    gateLeft: { x: 40740, y: 126, closed: false },
    gateRight: { x: 41380, y: 126, closed: false },
    arenaMinX: 40755,
    arenaMaxX: 41365
  };
  window.astralBossState = astralBossState;
}

function startAstralBossFight() {
  if (astralBossState.active || astralBossState.isDefeated) return;
  astralBossState.active = true;
  astralBossState.gateLeft.closed = true;
  astralBossState.gateRight.closed = true;
  astralBossState.hp = 8;
  astralBossState.phase = 1;
  astralBossState.action = 'intro';
  astralBossState.actionTimer = 1.8;
  window.astralBossState = astralBossState;

  if (typeof triggerShake === 'function') triggerShake(1.5, 3.0);
  if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 35, player.y - 25, 'JEFE FINAL: DRAGON ASTRAL!', '#ffd166');
  }
}

function updateAstralBoss(dt) {
  if (!level || level.id !== 4) return;
  const s = astralBossState;

  // Activar combate cuando Elizabeth cruza hacia el atrio de Polaris
  if (!s.active && !s.isDefeated && player.x >= 40780 && player.x <= 41350) {
    startAstralBossFight();
  }

  if (!s.active && !s.isDefeated) return;

  // Bloquear a Elizabeth dentro de la arena celestial
  if (s.active && !s.isDefeated) {
    if (player.x < s.arenaMinX) { player.x = s.arenaMinX; if (player.vx < 0) player.vx = 0; }
    if (player.x > s.arenaMaxX) { player.x = s.arenaMaxX; if (player.vx > 0) player.vx = 0; }
  }

  if (s.hitCooldown > 0) s.hitCooldown -= dt;

  // Actualizar proyectiles: cometas que caen
  for (let i = s.comets.length - 1; i >= 0; i--) {
    const c = s.comets[i];
    c.x += c.vx * dt;
    c.y += c.vy * dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, c.x - 6, c.y - 6, 12, 12)) {
      damagePlayer(false);
      s.comets.splice(i, 1);
      continue;
    }
    if (c.y > 170 || c.x < s.arenaMinX - 30 || c.x > s.arenaMaxX + 30) {
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(c.x, Math.min(150, c.y), 6, '#00f5d4');
      }
      s.comets.splice(i, 1);
    }
  }

  // Actualizar proyectiles: estrellas teledirigidas
  for (let i = s.stars.length - 1; i >= 0; i--) {
    const st = s.stars[i];
    const dx = (player.x + 11) - st.x;
    const dy = (player.y + 12) - st.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5) {
      st.vx += (dx / dist) * 110 * dt;
      st.vy += (dy / dist) * 110 * dt;
    }
    st.x += st.vx * dt;
    st.y += st.vy * dt;
    st.life -= dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, st.x - 4, st.y - 4, 8, 8)) {
      damagePlayer(false);
      s.stars.splice(i, 1);
      continue;
    }
    if (st.life <= 0) {
      s.stars.splice(i, 1);
    }
  }

  // Si esta derrotado, desvanecerse en el cosmos
  if (s.isDefeated) {
    return;
  }

  // Comprobar si Elizabeth golpea al Dragon en su nucleo vulnerable
  const isAttacking = player.isSwingingPick || (keys.dashJustPressed && player.ability === 'ice_pick');
  const isStomping = player.vy > 0 && player.y + player.h <= s.y + 22;
  const isClose = Math.abs((player.x + 11) - (s.x + s.w / 2)) < 42 && Math.abs((player.y + 12) - (s.y + s.h / 2)) < 36;

  if (s.hitCooldown <= 0 && isClose && (isAttacking || isStomping)) {
    s.hitCooldown = 0.9;
    s.hp--;
    if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
    if (typeof triggerShake === 'function') triggerShake(0.35, 3.0);

    if (typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + s.h / 2, 28, '#ffd166', 140, -60);
      spawnParticles(s.x + s.w / 2, s.y + s.h / 2, 18, '#ffffff', 100, -30);
    }
    if (isStomping) {
      player.vy = -280;
      player.jumpsLeft = 2;
    }

    if (s.hp <= 0) {
      // Derrota Suprema del Dragon Final
      s.isDefeated = true;
      s.active = false;
      s.gateLeft.closed = false;
      s.gateRight.closed = false;
      score += 10000;
      if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(s.x - 30, s.y - 30, 'CONSTELACION LIBERADA! +10000', '#ffd166');
      }
      return;
    } else {
      s.phase = s.hp <= 3 ? 3 : (s.hp <= 5 ? 2 : 1);
      s.action = 'recoil';
      s.actionTimer = 0.7;
    }
  }

  // Daño por contacto si el cuerpo del dragon toca a Elizabeth
  if (rectOverlap(player.x, player.y, player.w, player.h, s.x + 8, s.y + 8, s.w - 16, s.h - 16)) {
    damagePlayer(false);
  }

  // Maquina de estados del Dragon Astral
  s.actionTimer -= dt;

  if (s.action === 'intro') {
    s.y = 55 + Math.sin(globalFrame * 0.08) * 8;
    if (s.actionTimer <= 0) {
      s.action = 'orbit';
      s.actionTimer = 2.4;
    }
  } else if (s.action === 'recoil') {
    s.y = 45 + Math.sin(globalFrame * 0.14) * 6;
    if (s.actionTimer <= 0) {
      s.action = 'swoop';
      s.actionTimer = 2.0;
    }
  } else if (s.action === 'orbit') {
    // Vuelo ondulante horizontal
    const t = globalFrame * 0.03;
    s.x = (s.arenaMinX + s.arenaMaxX) / 2 + Math.sin(t) * 160;
    s.y = 58 + Math.cos(t * 1.8) * 16;

    if (globalFrame % 14 === 0) {
      // Disparar cometa estelar
      const dirX = (player.x > s.x ? 1 : -1) * (60 + Math.random() * 40);
      s.comets.push({
        x: s.x + s.w / 2,
        y: s.y + s.h / 2,
        vx: dirX,
        vy: 110 + (s.phase === 3 ? 40 : 0)
      });
      if (window.sfx && window.sfx.playPortalGunShot) window.sfx.playPortalGunShot();
    }

    if (s.actionTimer <= 0) {
      s.action = s.phase >= 2 && Math.random() < 0.5 ? 'homing_stars' : 'swoop';
      s.actionTimer = s.action === 'homing_stars' ? 1.8 : 2.2;
    }
  } else if (s.action === 'swoop') {
    // Picada rasante hacia la altura del jugador (momento vulnerable)
    const swoopT = (2.2 - s.actionTimer) / 2.2;
    const targetX = player.x;
    s.x += (targetX - s.x) * dt * 2.2;
    s.y = 50 + Math.sin(swoopT * Math.PI) * 55;

    if (s.actionTimer <= 0) {
      s.action = 'orbit';
      s.actionTimer = 2.5;
    }
  } else if (s.action === 'homing_stars') {
    // Flotar en el centro y emitir 3 estrellas teledirigidas
    s.y = 48 + Math.sin(globalFrame * 0.1) * 4;
    if (s.actionTimer < 1.0 && s.actionTimer > 0.9 && s.stars.length === 0) {
      for (let k = 0; k < (s.phase === 3 ? 4 : 2); k++) {
        const ang = (k * Math.PI * 2) / (s.phase === 3 ? 4 : 2);
        s.stars.push({
          x: s.x + s.w / 2 + Math.cos(ang) * 20,
          y: s.y + s.h / 2 + Math.sin(ang) * 20,
          vx: Math.cos(ang) * 70,
          vy: Math.sin(ang) * 70,
          life: 3.5
        });
      }
      if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
    }

    if (s.actionTimer <= 0) {
      s.action = 'swoop';
      s.actionTimer = 2.0;
    }
  }
}
