// ============================================================================
// PELIGRO AMBIENTAL MUNDO 4: VENTISCAS HELADAS PERIÓDICAS (ICE BLIZZARD)
// ============================================================================
// Cada 7 segundos, una furiosa ventisca ártica azota la superficie de la montaña.
// - En superficie: empuja fuertemente a Elizabeth hacia atrás y congela.
// - Bajo la nieve: si Elizabeth cava con la pala (player.isDigging), es 100% inmune.

let blizzardState = {
  active: false,
  cycleTimer: 7.0,
  duration: 2.8,
  timer: 0,
  particles: []
};

function getBlizzardState() {
  return blizzardState;
}

function updateBlizzardSystem(dt) {
  if (gameState !== 'PLAYING' || !level || level.theme !== 'snow') {
    blizzardState.active = false;
    return;
  }

  // En la Fase 6 (Santuario del Yeti), Fase 7 (Valle Sagrado de Shambhala) y Fase 8/9 (Cosmos),
  // el clima está protegido o fuera de la atmósfera montañosa.
  if (player.x >= 23700) {
    blizzardState.active = false;
    return;
  }

  blizzardState.cycleTimer -= dt;
  if (blizzardState.cycleTimer <= 0) {
    if (!blizzardState.active) {
      blizzardState.active = true;
      blizzardState.timer = blizzardState.duration;
      triggerShake(0.15, 2.0);
      if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
      const warnMsg = (player && player.ability === 'ice_pick')
        ? '¡VENTISCA HELADA! ¡CLAVA EL PICO CON [ABAJO] O REFÚGIATE!'
        : '¡VENTISCA HELADA! ¡CAVA BAJO LA NIEVE O REFÚGIATE!';
      spawnFloatingText(player.x - 45, player.y - 18, warnMsg, '#caf0f8');
    }
  }

  if (blizzardState.active) {
    blizzardState.timer -= dt;

    // Resistencia del viento helado: Cabañas, templos, tiendas, anclaje de pico y túneles subterráneos resguardan
    let isSheltered = (player.isDigging) || (player.x < 420);

    // Mecánica única de Alta Montaña: Clavar el Pico de Hielo en el permafrost con [ABAJO]
    const isIceAnchored = (player.ability === 'ice_pick' && player.onGround && (keys.down || keys.downJustPressed));
    if (isIceAnchored) {
      isSheltered = true;
      player.vx = 0;
      if (globalFrame % 8 === 0) {
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + (player.facingRight ? 18 : 2), player.y + 22, 2, '#38bdf8');
          spawnStarSparkles(player.x + (player.facingRight ? 18 : 2), player.y + 22, 1, '#ffffff');
        }
      }
      if (globalFrame % 45 === 0) {
        spawnFloatingText(player.x - 16, player.y - 12, 'PICO ANCLADO!', '#38bdf8');
      }
    }

    if (!isSheltered && level && level.decorations) {
      for (let i = 0; i < level.decorations.length; i++) {
        const d = level.decorations[i];
        if (d.subType === 'alpine_cabin' || d.subType === 'ice_fishing_hut' || d.subType === 'sherpa_tent' ||
            d.subType === 'assault_tent' || d.subType === 'glacial_altar' || d.subType === 'prayer_cairn' ||
            d.subType === 'summit_monument' || d.subType === 'summit_nest' || d.subType === 'climbing_gear_rack' ||
            d.subType === 'expedition_stove') {
          if (Math.abs(player.x - d.x) < 55 && Math.abs(player.y - d.y) < 50) {
            isSheltered = true;
            break;
          }
        }
      }
    }

    if (isSheltered) {
      if (globalFrame % 50 === 0) {
        spawnFloatingText(player.x - 14, player.y - 10, 'REFUGIADO!', '#00f5d4');
      }
    } else {
      player.vx -= 160 * dt;
      if (globalFrame % 14 === 0) {
        spawnParticles(player.x + 11, player.y + 12, 1, '#caf0f8', 40, -10);
      }
    }

    if (blizzardState.timer <= 0) {
      blizzardState.active = false;
      blizzardState.cycleTimer = 7.5;
    }
  }

  // 2. SISTEMA DE CARÁMBANOS INESTABLES DE KHUMBU (FALLING ICICLES)
  if (level && level.icicles && Array.isArray(level.icicles)) {
    updateKhumbuIcicles(dt);
  }
}

function updateKhumbuIcicles(dt) {
  if (!level || !level.icicles || !player) return;

  for (let i = 0; i < level.icicles.length; i++) {
    const ic = level.icicles[i];
    if (!ic.state) {
      ic.state = 'hanging';
      ic.baseY = ic.y;
      ic.vy = 0;
      ic.shakeX = 0;
      ic.timer = 0;
      ic.respawnTimer = 0;
    }

    if (ic.state === 'hanging') {
      // Detección: si Elizabeth se acerca a menos de 55px horizontalmente y está debajo
      const dx = Math.abs((player.x + 11) - ic.x);
      if (dx < 55 && player.y > ic.y - 15) {
        ic.state = 'wobbling';
        ic.timer = 0.42; // Tiembla 0.42s con polvo de escarcha antes de soltarse
      }
    } else if (ic.state === 'wobbling') {
      ic.timer -= dt;
      ic.shakeX = Math.sin(globalFrame * 1.8) * 2;
      if (globalFrame % 4 === 0) {
        spawnParticles(ic.x, ic.y + 16, 1, '#caf0f8', 15, 20);
      }
      if (ic.timer <= 0) {
        ic.state = 'falling';
        ic.vy = 75;
        ic.shakeX = 0;
      }
    } else if (ic.state === 'falling') {
      ic.vy += 460 * dt;
      ic.y += ic.vy * dt;
      if (globalFrame % 3 === 0) {
        spawnParticles(ic.x, ic.y, 1, '#ffffff', 18, -10);
      }

      // Colisión con Elizabeth
      const pLeft = player.x + 2;
      const pRight = player.x + player.w - 2;
      const pTop = player.y;
      const pBottom = player.y + player.h;

      if (ic.x >= pLeft && ic.x <= pRight && (ic.y + 18) >= pTop && ic.y <= pBottom) {
        if (player.isDigging) {
          // Si Elizabeth está cavando bajo la nieve, el carámbano se rompe en el manto superior
          spawnParticles(ic.x, ic.y, 12, '#ffffff', 60, -25);
          spawnParticles(ic.x, ic.y, 8, '#caf0f8', 45, -15);
          ic.state = 'broken';
          ic.respawnTimer = 4.0;
        } else {
          // Daño al jugador
          damagePlayer(false);
          triggerShake(0.12, 1.8);
          spawnParticles(ic.x, ic.y, 14, '#caf0f8', 80, -30);
          spawnParticles(ic.x, ic.y, 8, '#00b4d8', 60, -20);
          ic.state = 'broken';
          ic.respawnTimer = 4.5;
        }
      }

      // Colisión con proyectil de bola de nieve de Elizabeth
      if (ic.state === 'falling' && typeof shovelState !== 'undefined' && shovelState.projectiles) {
        for (let b of shovelState.projectiles) {
          if (Math.hypot(b.x - ic.x, b.y - (ic.y + 10)) < 16) {
            b.life = 0;
            ic.state = 'broken';
            ic.respawnTimer = 5.0;
            triggerShake(0.08, 1.2);
            spawnParticles(ic.x, ic.y, 14, '#00f5d4', 70, -30);
            spawnFloatingText(ic.x - 14, ic.y - 8, '¡DESTRUIDO!', '#caf0f8');
            if (window.sfx && window.sfx.playHit) window.sfx.playHit();
            break;
          }
        }
      }

      // Colisión con terreno sólido
      if (ic.state === 'falling' && level && level.platforms) {
        for (let p of level.platforms) {
          if (!p.oneWay && ic.x >= p.x && ic.x <= p.x + p.w && (ic.y + 18) >= p.y && ic.y <= p.y + p.h) {
            spawnParticles(ic.x, p.y, 10, '#caf0f8', 55, -25);
            spawnParticles(ic.x, p.y, 6, '#ffffff', 40, -15);
            ic.state = 'broken';
            ic.respawnTimer = 4.5;
            break;
          }
        }
      }

      if (ic.y > 300) {
        ic.state = 'broken';
        ic.respawnTimer = 4.0;
      }
    } else if (ic.state === 'broken') {
      ic.respawnTimer -= dt;
      if (ic.respawnTimer <= 0) {
        ic.state = 'hanging';
        ic.y = ic.baseY || 40;
        ic.vy = 0;
        ic.shakeX = 0;
      }
    }
  }
}

function drawBlizzardSystem(ctx, camX, frame) {
  if (!level || level.theme !== 'snow' || (player && player.x >= 23700 && player.x <= 29650)) return;

  // 1. Dibujar carámbanos inestables de Khumbu en el mundo
  if (level.icicles && Array.isArray(level.icicles)) {
    for (let ic of level.icicles) {
      if (ic.state === 'broken') continue;
      const ix = Math.round(ic.x + (ic.shakeX || 0));
      const iy = Math.round(ic.y);
      if (ix < camX - 30 || ix > camX + W + 30) continue;

      // Base ancha fijada al techo de roca/hielo
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(ix - 5, iy - 2, 11, 3);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(ix - 4, iy - 1, 9, 2);

      // Cono afilado de carámbano de hielo translúcido
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(ix - 4, iy + 1);
      ctx.lineTo(ix, iy + 22);
      ctx.lineTo(ix + 4, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Capa de hielo cian brillante
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(ix - 3, iy + 1);
      ctx.lineTo(ix, iy + 20);
      ctx.lineTo(ix + 2, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Reflejo blanco cristalino en el borde
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(ix - 2, iy + 1);
      ctx.lineTo(ix, iy + 18);
      ctx.lineTo(ix - 1, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Destello intermitente en la punta
      if ((frame + ix) % 30 < 6) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ix - 1, iy + 20, 2, 2);
      }
    }
  }

  // Generar ráfagas de nieve continua en el viento
  const isBlizzard = blizzardState.active;
  const count = isBlizzard ? 18 : 6;
  const speed = isBlizzard ? 8 : 2.5;

  ctx.fillStyle = isBlizzard ? 'rgba(255, 255, 255, 0.75)' : 'rgba(224, 242, 254, 0.45)';
  for (let i = 0; i < count; i++) {
    const sx = ((i * 37 - frame * speed * 3) % (W + 60) + (W + 60)) % (W + 60) - 30;
    const sy = (i * 23 + frame * 0.8) % H;
    const len = isBlizzard ? (12 + (i % 3) * 6) : 3;

    ctx.fillRect(sx, sy, len, isBlizzard ? 1.5 : 1);
  }

  // Tinte helado durante la ventisca activa
  if (isBlizzard) {
    ctx.fillStyle = 'rgba(202, 240, 248, 0.12)';
    ctx.fillRect(0, 0, W, H);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getBlizzardState,
    updateBlizzardSystem,
    drawBlizzardSystem
  };
}
