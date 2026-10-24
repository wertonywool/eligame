// ============================================================================
// MECÁNICAS ÚNICAS DE KANGSHUNG: VÓRTICES POLARES, SERACS Y PRESENCIA DEL YETI
// (MUNDO 4 • FASE 6: "LA VERTIENTE PROHIBIDA DEL KANGSHUNG Y EL SANTUARIO DEL YETI")
// ============================================================================

let kangshungState = {
  updrafts: [
    { x: 25620, w: 75, minY: 40, maxY: 230, name: 'Vórtice Abismo Occidental' },
    { x: 26340, w: 75, minY: 40, maxY: 230, name: 'Vórtice Gran Puente Oriental' },
    { x: 27170, w: 70, minY: 45, maxY: 230, name: 'Vórtice del Cañón Sagrado' }
  ],
  seracs: [],
  roarTimer: 18.0,
  activeWindSoundCooldown: 0
};

function initKangshungMechanics() {
  kangshungState.seracs = [
    { id: 1, x: 24650, y: 44, startY: 44, triggerX: 24650, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 140 },
    { id: 2, x: 24780, y: 42, startY: 42, triggerX: 24780, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 114 },
    { id: 3, x: 24890, y: 46, startY: 46, triggerX: 24890, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 96 },
    { id: 4, x: 27040, y: 40, startY: 40, triggerX: 27040, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 116 },
    { id: 5, x: 27790, y: 42, startY: 42, triggerX: 27790, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 148 }
  ];
  kangshungState.roarTimer = 16.0;
  kangshungState.activeWindSoundCooldown = 0;
  window.kangshungState = kangshungState;
}

function updateKangshungMechanics(dt) {
  if (gameState !== 'PLAYING' || !level || level.id !== 4) return;
  if (player.x < 23700 || player.x > 29650) return;

  const s = kangshungState;
  if (!s.seracs || s.seracs.length === 0) {
    initKangshungMechanics();
  }

  // 1. VÓRTICES POLARES ASCENDENTES DE KANGSHUNG (KANGSHUNG UPDRAFTS)
  for (const ud of s.updrafts) {
    const pCenterX = player.x + player.w / 2;
    const inColX = pCenterX >= ud.x - ud.w / 2 && pCenterX <= ud.x + ud.w / 2;
    const inColY = player.y >= ud.minY && (player.y + player.h) <= ud.maxY + 15;

    if (inColX && inColY) {
      // Fuerza ascensional suave y controlada
      if (player.vy > -175) {
        player.vy = Math.max(player.vy - 480 * dt, -175);
      }
      player.jumpsLeft = 2; // Permite saltos aéreos dentro de la corriente

      // Partículas y destellos de viento ártico
      if (globalFrame % 2 === 0 && typeof spawnParticles === 'function') {
        spawnParticles(pCenterX + (Math.random() * 24 - 12), player.y + player.h, 2, '#38bdf8', 45, -90);
        spawnParticles(pCenterX + (Math.random() * 20 - 10), player.y + player.h, 1, '#ffffff', 30, -80);
      }
      if (globalFrame % 8 === 0 && typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(pCenterX, player.y + 12, 1, '#e0f2fe');
      }

      if (s.activeWindSoundCooldown <= 0) {
        s.activeWindSoundCooldown = 0.55;
        if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
      }
    }
  }

  if (s.activeWindSoundCooldown > 0) s.activeWindSoundCooldown -= dt;

  // 2. SERACS REACTIVOS CAÍDOS (ESTALACTITAS GLACIALES)
  for (let i = s.seracs.length - 1; i >= 0; i--) {
    const sc = s.seracs[i];

    if (sc.state === 'idle') {
      // Detectar aproximación horizontal de Elizabeth
      const pCenterX = player.x + player.w / 2;
      if (Math.abs(pCenterX - sc.triggerX) < 42 && player.y > sc.y) {
        sc.state = 'shaking';
        sc.shakeTimer = 0.32;
      }
    } else if (sc.state === 'shaking') {
      sc.shakeTimer -= dt;
      if (sc.shakeTimer <= 0) {
        sc.state = 'falling';
        sc.vy = 50;
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.y, 4, '#e0f2fe', 40, -20);
        }
      }
    } else if (sc.state === 'falling') {
      sc.vy += 430 * dt;
      sc.y += sc.vy * dt;

      // Colisión con Elizabeth
      if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, sc.x - 4, sc.y, 8, 18)) {
        damagePlayer(false);
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.y + 10, 10, '#38bdf8', 70, -20);
        }
        s.seracs.splice(i, 1);
        continue;
      }

      // Colisión con el suelo rocoso/helado
      if (sc.y >= sc.groundY) {
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.groundY, 12, '#38bdf8', 80, -30);
          spawnParticles(sc.x, sc.groundY, 8, '#ffffff', 60, -20);
        }
        if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
        s.seracs.splice(i, 1);
        continue;
      }
    }
  }

  // 3. RUGIDOS DISTANTES DEL GRAN YETI Y TEMBLOR SÍSMICO (X: 23800 -> 28600)
  if (player.x < 28600) {
    s.roarTimer -= dt;
    if (s.roarTimer <= 0) {
      s.roarTimer = 22.0 + Math.random() * 8.0;
      if (typeof triggerShake === 'function') triggerShake(0.18, 1.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 28, player.y - 20, '¡UN RUGIDO SACUDE EL KANGSHUNG!', '#38bdf8');
      }
      if (typeof spawnParticles === 'function') {
        for (let k = 0; k < 12; k++) {
          spawnParticles(player.x - 80 + Math.random() * 160, player.y - 50 + Math.random() * 40, 1, '#ffffff', 40, 30);
        }
      }
    }
  }
}

function drawKangshungMechanics(ctx) {
  if (!level || level.id !== 4) return;
  const s = kangshungState;
  if (!s) return;
  const frame = globalFrame;

  // 1. DIBUJAR VÓRTICES POLARES ASCENDENTES
  for (const ud of s.updrafts) {
    const vx = Math.round(ud.x);
    if (vx < cameraX - 100 || vx > cameraX + W + 100) continue;

    ctx.save();
    // Columna de resplandor etéreo
    const grad = ctx.createLinearGradient(vx, ud.minY, vx, ud.maxY);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.02)');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.14)');
    grad.addColorStop(1, 'rgba(186, 230, 253, 0.28)');
    ctx.fillStyle = grad;
    ctx.fillRect(vx - ud.w / 2, ud.minY, ud.w, ud.maxY - ud.minY);

    // Cintas espirales de viento ascendente
    for (let b = 0; b < 3; b++) {
      const phase = (frame * 0.06 + (b * Math.PI * 2 / 3)) % (Math.PI * 2);
      ctx.strokeStyle = b % 2 === 0 ? 'rgba(224, 242, 254, 0.65)' : 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let y = ud.maxY; y >= ud.minY; y -= 8) {
        const prog = (ud.maxY - y) / (ud.maxY - ud.minY);
        const wave = Math.sin(phase + prog * 6) * (ud.w * 0.35);
        if (y === ud.maxY) ctx.moveTo(vx + wave, y);
        else ctx.lineTo(vx + wave, y);
      }
      ctx.stroke();
    }

    // Cristales de hielo ascendentes
    ctx.fillStyle = '#ffffff';
    for (let c = 0; c < 5; c++) {
      const cy = ((ud.maxY - (frame * 1.8 + c * 38)) % (ud.maxY - ud.minY) + (ud.maxY - ud.minY)) % (ud.maxY - ud.minY) + ud.minY;
      const cx = vx + Math.sin(cy * 0.08 + c) * (ud.w * 0.28);
      ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 2, 2);
    }
    ctx.restore();
  }

  // 2. DIBUJAR SERACS REACTIVOS (ESTALACTITAS)
  for (const sc of s.seracs) {
    const sx = Math.round(sc.x + (sc.state === 'shaking' ? (Math.random() * 3 - 1.5) : 0));
    const sy = Math.round(sc.y);
    if (sx < cameraX - 40 || sx > cameraX + W + 40) continue;

    ctx.save();
    // Cuerpo del carámbano de hielo
    ctx.fillStyle = sc.state === 'shaking' ? '#00f5d4' : '#0284c7';
    ctx.beginPath();
    ctx.moveTo(sx - 4, sy);
    ctx.lineTo(sx + 4, sy);
    ctx.lineTo(sx + 1, sy + 18);
    ctx.lineTo(sx - 1, sy + 18);
    ctx.closePath();
    ctx.fill();

    // Brillo interior diamantino
    ctx.fillStyle = sc.state === 'shaking' ? '#ffffff' : '#7dd3fc';
    ctx.beginPath();
    ctx.moveTo(sx - 2, sy + 2);
    ctx.lineTo(sx + 2, sy + 2);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fill();

    // Punta afilada blanca
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy + 15, 2, 3);
    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    initKangshungMechanics,
    updateKangshungMechanics,
    drawKangshungMechanics
  };
}
