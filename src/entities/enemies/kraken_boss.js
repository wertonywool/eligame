// ============================================================================
// BOSS FIGHT: KRAKEN DE LAS PROFUNDIDADES (8 OJOS, 3 FASES Y COMBATE CINEMÁTICO)
// ============================================================================
let krakenBossState = {
  active: false,
  x: 18920,
  y: 135,
  eyesRemaining: 8,
  maxEyes: 8,
  phase: 1,
  hitTimer: 0,
  attackTimer: 2.0,
  waveTimer: 4.5,
  geyserTimer: 3.5,
  sweepTimer: 6.0,
  slams: [],
  shockwaves: [],
  waves: [],
  geysers: [],
  sweep: { active: false, x: 0, w: 90, h: 22, timer: 0 },
  debrisRock: { active: false, x: 0, y: 0, vx: 0, vy: 0, type: 'slab' },
  isDefeated: false
};

function startKrakenBossFight() {
  krakenBossState = {
    active: true,
    x: 18920,
    y: 135,
    eyesRemaining: 8,
    maxEyes: 8,
    phase: 1,
    hitTimer: 0,
    attackTimer: 1.8,
    waveTimer: 4.0,
    geyserTimer: 3.5,
    sweepTimer: 6.0,
    slams: [],
    shockwaves: [],
    waves: [],
    geysers: [],
    sweep: { active: false, x: 0, w: 90, h: 22, timer: 0 },
    debrisRock: { active: false, x: 0, y: 0, vx: 0, vy: 0, type: 'slab' },
    isDefeated: false
  };
  window.krakenBossState = krakenBossState;
  triggerShake(1.4, 2.8);
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 20, player.y - 30, '¡BATALLA: KRAKEN ABISAL!', '#ffd166');
  }
}

function updateKrakenBossFight(dt) {
  const k = window.krakenBossState || krakenBossState;
  if (!k.active || k.isDefeated) return;

  // 1. Confinar a Elizabeth en la plataforma de combate del helipuerto
  if (player.x < 18260) { player.x = 18260; if (player.vx < 0) player.vx = 0; }
  if (player.x > 18860) { player.x = 18860; if (player.vx > 0) player.vx = 0; }

  if (k.hitTimer > 0) k.hitTimer -= dt;

  // 2. Fases de dificultad según ojos destruidos
  k.phase = k.eyesRemaining <= 2 ? 3 : (k.eyesRemaining <= 5 ? 2 : 1);

  // --------------------------------------------------------------------------
  // 3. ATAQUE A: IMPACTOS DE TENTÁCULO Y ONDAS DE CHOQUE (SLAMS)
  // --------------------------------------------------------------------------
  k.attackTimer -= dt;
  if (k.attackTimer <= 0) {
    k.attackTimer = k.phase === 3 ? 1.3 : (k.phase === 2 ? 1.7 : 2.2);

    // En Fase 2 y 3, lanza 1 o 2 tentáculos
    const count = k.phase >= 2 && Math.random() > 0.4 ? 2 : 1;
    for (let c = 0; c < count; c++) {
      const offset = c === 0 ? (Math.random() * 60 - 30) : (Math.random() > 0.5 ? 90 : -90);
      const targetX = Math.min(18920, Math.max(18280, player.x + offset));
      k.slams.push({ x: targetX, y: 196, timer: 0.8, struck: false });
    }
  }

  // Actualizar impactos de tentáculos
  for (let i = k.slams.length - 1; i >= 0; i--) {
    const s = k.slams[i];
    s.timer -= dt;
    if (s.timer <= 0 && !s.struck) {
      s.struck = true;
      triggerShake(0.3, 1.4);
      spawnParticles(s.x, s.y, 16, '#00b4d8', 90, 40);
      spawnParticles(s.x, s.y, 10, '#ffffff', 80, 30);

      // Generar dos ondas de choque que viajan por el suelo hacia izq y der
      k.shockwaves.push({ x: s.x - 8, y: 194, vx: -160, life: 0.7 });
      k.shockwaves.push({ x: s.x + 8, y: 194, vx: 160, life: 0.7 });

      // Daño por aplastamiento directo
      if (Math.abs(player.x + 11 - s.x) < 28 && Math.abs(player.y + 12 - s.y) < 28 && player.dashTimer <= 0) {
        damagePlayer(false);
      }
    }
    if (s.timer < -0.45) k.slams.splice(i, 1);
  }

  // Actualizar ondas de choque en el suelo
  for (let i = k.shockwaves.length - 1; i >= 0; i--) {
    const sw = k.shockwaves[i];
    sw.x += sw.vx * dt;
    sw.life -= dt;
    // Daño si el jugador está en el suelo y colisiona con la onda
    if (Math.abs(player.x + 11 - sw.x) < 14 && player.y >= 180 && player.dashTimer <= 0 && player.invulnTimer <= 0) {
      damagePlayer(false);
    }
    if (sw.life <= 0 || sw.x < 18220 || sw.x > 18980) {
      k.shockwaves.splice(i, 1);
    }
  }

  // --------------------------------------------------------------------------
  // 4. ATAQUE B: OLAS DE SURF AVANZANDO POR EL SUELO
  // --------------------------------------------------------------------------
  k.waveTimer -= dt;
  if (k.waveTimer <= 0) {
    k.waveTimer = k.phase === 3 ? 3.2 : (k.phase === 2 ? 4.2 : 5.2);
    k.waves.push({ x: 19020, y: 194, vx: -200, w: 38, h: 22 });
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }

  for (let i = k.waves.length - 1; i >= 0; i--) {
    const wv = k.waves[i];
    wv.x += wv.vx * dt;
    // Si el jugador está sobre la plataforma y no salta / no surfea la ola
    if (Math.abs(player.x + 11 - (wv.x + wv.w / 2)) < 20 && player.y >= 178 && player.dashTimer <= 0 && player.invulnTimer <= 0) {
      damagePlayer(false);
      player.vy = -180;
    }
    if (wv.x + wv.w < 18200) {
      k.waves.splice(i, 1);
    }
  }

  // --------------------------------------------------------------------------
  // 5. ATAQUE C: GÉISERES DE AGUA A PRESIÓN (FASE 2 Y 3)
  // --------------------------------------------------------------------------
  if (k.phase >= 2) {
    k.geyserTimer -= dt;
    if (k.geyserTimer <= 0) {
      k.geyserTimer = k.phase === 3 ? 2.5 : 3.8;
      const geyserX = 18320 + Math.floor(Math.random() * 5) * 120;
      k.geysers.push({ x: geyserX, y: 196, timer: 0.7, activeTimer: 0.6, erupted: false });
    }

    for (let i = k.geysers.length - 1; i >= 0; i--) {
      const g = k.geysers[i];
      g.timer -= dt;
      if (g.timer <= 0) {
        g.erupted = true;
        g.activeTimer -= dt;
        // Chorro activo hacia arriba
        if (Math.abs(player.x + 11 - g.x) < 22 && player.y > 110 && player.invulnTimer <= 0) {
          damagePlayer(false);
          player.vy = -260;
        }
      }
      if (g.activeTimer <= 0) {
        k.geysers.splice(i, 1);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. ATAQUE D: BARRIDO DE TENTÁCULO HORIZONTAL (FASE 3 - CLÍMAX)
  // --------------------------------------------------------------------------
  if (k.phase === 3) {
    k.sweepTimer -= dt;
    if (k.sweepTimer <= 0 && !k.sweep.active) {
      k.sweepTimer = 5.5;
      k.sweep = { active: true, x: 19050, vx: -360, y: 184, w: 90, h: 18, timer: 2.4 };
      triggerShake(0.8, 1.8);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 20, player.y - 25, '¡BARRIDO! ¡SUBE A LOS CONTENEDORES!', '#ff0054');
      }
    }

    if (k.sweep.active) {
      k.sweep.x += k.sweep.vx * dt;
      k.sweep.timer -= dt;
      // Daño si el jugador está en el nivel del suelo (y >= 165)
      if (rectOverlap(player.x, player.y, player.w, player.h, k.sweep.x, k.sweep.y, k.sweep.w, k.sweep.h)) {
        if (player.dashTimer <= 0 && player.invulnTimer <= 0) {
          damagePlayer(false);
          player.vy = -200;
        }
      }
      if (k.sweep.x + k.sweep.w < 18180 || k.sweep.timer <= 0) {
        k.sweep.active = false;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. LANZAMIENTO DE ESCOMBROS HACIA LOS OJOS DEL KRAKEN
  // --------------------------------------------------------------------------
  const piles = [
    { x: 18360, type: 'slab' },
    { x: 18660, type: 'taxi' },
    { x: 18860, type: 'girder' }
  ];
  const currentNearPile = piles.find(p => Math.abs(player.x + 11 - p.x) < 42);

  if (keys.dashJustPressed && currentNearPile && !k.debrisRock.active) {
    k.debrisRock = {
      active: true,
      x: player.x + 14,
      y: player.y + 6,
      vx: 440,
      vy: -125,
      type: currentNearPile.type,
      rot: 0
    };
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
    spawnFloatingText(player.x - 10, player.y - 22, '¡ESCOMBRO LANZADO!', '#ffd166');
    triggerShake(0.2, 0.4);
  }

  // --------------------------------------------------------------------------
  // 8. FÍSICAS E IMPACTO DEL ESCOMBRO EN LOS OJOS
  // --------------------------------------------------------------------------
  const r = k.debrisRock;
  if (r && r.active) {
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    r.vy += 220 * dt;
    r.rot += dt * 8;

    // Colisión con la cabeza del Kraken
    if (r.x >= k.x - 38 && r.y >= k.y - 55 && r.y <= k.y + 35) {
      r.active = false;
      k.eyesRemaining--;
      k.hitTimer = 0.5;
      triggerShake(0.7, 2.2);

      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      spawnParticles(k.x, k.y - 15, 26, '#ffd166', 120, 60);
      spawnParticles(k.x, k.y - 15, 22, '#00f5d4', 110, 50);
      spawnParticles(k.x, k.y - 15, 18, '#ffffff', 100, 40);

      spawnFloatingText(k.x - 50, k.y - 60, `¡OJO DESTRUIDO! (QUEDAN ${k.eyesRemaining})`, '#ffd166');

      // Si se destruyeron todos los ojos -> VICTORIA MONUMENTAL
      if (k.eyesRemaining <= 0) {
        k.isDefeated = true;
        k.active = false;
        triggerShake(1.6, 4.5);
        if (typeof startKrakenVictoryCutscene === 'function') {
          startKrakenVictoryCutscene();
        } else if (window.sfx && window.sfx.playVictory) {
          window.sfx.playVictory();
        }
      }
    }
    if (r.y > 230 || r.x > k.x + 60) r.active = false;
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenBossFight, updateKrakenBossFight };
}
