// ============================================================================
// MINIJUEGO ARCADE: YETI-99 ICE BREAKER (CASA 4 • PUEBLO NEVADO)
// ============================================================================
// Minijuego interactivo estilo retro Arkanoid / Pong en la consola del Arcade Polar.

let arcadeMinigame = {
  active: false,
  score: 0,
  lives: 3,
  won: false,
  gameOver: false,
  paddle: { x: 75, w: 32, h: 5, speed: 180 },
  ball: { x: 90, y: 70, vx: 90, vy: -90, r: 3 },
  blocks: [],
  winTimer: 0
};

let activeArcadePrompt = false;

function initArcadeBlocks() {
  arcadeMinigame.blocks = [];
  const colors = ['#06b6d4', '#ec4899', '#facc15', '#10b981', '#f43f5e'];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      arcadeMinigame.blocks.push({
        x: 18 + c * 29,
        y: 22 + r * 10,
        w: 25,
        h: 7,
        color: colors[(r * 5 + c) % colors.length],
        alive: true
      });
    }
  }
}

function startArcadeMinigame() {
  arcadeMinigame.active = true;
  arcadeMinigame.score = 0;
  arcadeMinigame.lives = 3;
  arcadeMinigame.won = false;
  arcadeMinigame.gameOver = false;
  arcadeMinigame.winTimer = 0;
  arcadeMinigame.paddle.x = 75;
  arcadeMinigame.ball.x = 90;
  arcadeMinigame.ball.y = 80;
  arcadeMinigame.ball.vx = (Math.random() > 0.5 ? 95 : -95);
  arcadeMinigame.ball.vy = -105;
  initArcadeBlocks();

  gameState = 'ARCADE_MINIGAME';
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function exitArcadeMinigame() {
  arcadeMinigame.active = false;
  gameState = 'PLAYING';
  keys.jumpJustPressed = false;
  keys.upJustPressed = false;
  if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
}

function updateArcadeCabinetInteraction() {
  if (gameState !== 'PLAYING' || !player) {
    activeArcadePrompt = false;
    return;
  }

  // Zona de interacción frente al gabinete maestro en el interior del arcade (X: 51350 -> 51420)
  const px = player.x + player.w / 2;
  const py = player.y + player.h;
  if (px >= 51330 && px <= 51430 && py >= 160 && py <= 230) {
    activeArcadePrompt = true;
    if (keys.upJustPressed || keys.jumpJustPressed || keyboardState.ArrowUp || keyboardState.KeyW) {
      keys.upJustPressed = false;
      keys.jumpJustPressed = false;
      keyboardState.ArrowUp = false;
      keyboardState.KeyW = false;
      startArcadeMinigame();
    }
  } else {
    activeArcadePrompt = false;
  }
}

function updateArcadeMinigame(dt) {
  // Salir con tecla de salto o Escape
  if (keys.jumpJustPressed || keyboardState.Escape || keyboardState.KeyX) {
    exitArcadeMinigame();
    return;
  }

  if (arcadeMinigame.won || arcadeMinigame.gameOver) {
    if (keys.dashJustPressed || keys.upJustPressed) {
      startArcadeMinigame();
    }
    return;
  }

  const p = arcadeMinigame.paddle;
  const b = arcadeMinigame.ball;
  const boxW = 180;
  const boxH = 120;

  // Movimiento de la paleta
  if (keys.left || keyboardState.ArrowLeft || keyboardState.KeyA) {
    p.x -= p.speed * dt;
  }
  if (keys.right || keyboardState.ArrowRight || keyboardState.KeyD) {
    p.x += p.speed * dt;
  }
  p.x = Math.max(4, Math.min(boxW - p.w - 4, p.x));

  // Movimiento de la bola
  b.x += b.vx * dt;
  b.y += b.vy * dt;

  // Rebote en paredes laterales y techo
  if (b.x - b.r <= 4) {
    b.x = 4 + b.r;
    b.vx = Math.abs(b.vx);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  } else if (b.x + b.r >= boxW - 4) {
    b.x = boxW - 4 - b.r;
    b.vx = -Math.abs(b.vx);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
  if (b.y - b.r <= 16) {
    b.y = 16 + b.r;
    b.vy = Math.abs(b.vy);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }

  // Rebote en la paleta
  const padY = boxH - 14;
  if (b.y + b.r >= padY && b.y - b.r <= padY + p.h && b.x >= p.x - 2 && b.x <= p.x + p.w + 2) {
    b.y = padY - b.r;
    const hitOffset = (b.x - (p.x + p.w / 2)) / (p.w / 2);
    b.vx = hitOffset * 130;
    b.vy = -Math.abs(b.vy);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
  }

  // Caída de la bola
  if (b.y > boxH + 6) {
    arcadeMinigame.lives--;
    if (arcadeMinigame.lives <= 0) {
      arcadeMinigame.gameOver = true;
    } else {
      b.x = p.x + p.w / 2;
      b.y = padY - 10;
      b.vx = (Math.random() > 0.5 ? 90 : -90);
      b.vy = -105;
    }
  }

  // Colisión con bloques
  let remaining = 0;
  for (const block of arcadeMinigame.blocks) {
    if (block.alive) {
      remaining++;
      if (b.x + b.r >= block.x && b.x - b.r <= block.x + block.w &&
          b.y + b.r >= block.y && b.y - b.r <= block.y + block.h) {
        block.alive = false;
        b.vy = -b.vy;
        arcadeMinigame.score += 50;
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        break;
      }
    }
  }

  if (remaining === 0 && !arcadeMinigame.won) {
    arcadeMinigame.won = true;
    score += 500;
    saveState.dexterLilies = (saveState.dexterLilies || 0) + 25;
    if (typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(W / 2, H / 2, 28, '#ec4899');
      spawnStarSparkles(W / 2, H / 2, 28, '#06b6d4');
      spawnStarSparkles(W / 2, H / 2, 28, '#ffd166');
    }
    if (typeof spawnFloatingText === 'function') {
      spawnFloatingText(player.x, player.y - 24, '¡CAMPEÓN DE YETI-99! +25 LIRIOS', '#ffd166');
    }
    if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
  }
}

function drawArcadeCabinetPrompt(ctx) {
  if (!activeArcadePrompt || gameState !== 'PLAYING') return;
  const bob = Math.sin(globalFrame * 0.16) * 2;
  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 22 + bob);

  const text = '[ARRIBA: JUGAR ARCADE YETI-99]';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  drawRoundedPanel(bx - tw / 2 - 6, by - 8, tw + 12, 14, 4, 'rgba(15, 5, 29, 0.95)', '#06b6d4', 1.2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#facc15';
  ctx.fillText(text, bx, by + 1);
}

function drawArcadeMinigame(ctx) {
  // Oscurecer fondo del juego
  ctx.fillStyle = 'rgba(10, 4, 20, 0.88)';
  ctx.fillRect(0, 0, W, H);

  const boxW = 180, boxH = 120;
  const bx = Math.round((W - boxW) / 2);
  const by = Math.round((H - boxH) / 2);

  // Chasis exterior del gabinete CRT
  drawRoundedPanel(bx - 6, by - 6, boxW + 12, boxH + 12, 8, '#0f051d', '#ec4899', 2);
  ctx.fillStyle = '#022c22';
  ctx.fillRect(bx, by, boxW, boxH);

  // Barra de cabecera retro
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(bx, by, boxW, 14);
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('YETI-99 • ICE BREAKER', bx + 6, by + 10);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#facc15';
  ctx.fillText(`SCORE: ${arcadeMinigame.score}`, bx + boxW - 6, by + 10);

  // Bloques de hielo
  for (const blk of arcadeMinigame.blocks) {
    if (blk.alive) {
      ctx.fillStyle = blk.color;
      ctx.fillRect(bx + blk.x, by + blk.y, blk.w, blk.h);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillRect(bx + blk.x, by + blk.y, blk.w, 1.5);
    }
  }

  // Paleta del jugador
  const p = arcadeMinigame.paddle;
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(bx + p.x, by + boxH - 14, p.w, p.h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx + p.x + 2, by + boxH - 14, p.w - 4, 1.5);

  // Bola
  const b = arcadeMinigame.ball;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(bx + b.x, by + b.y, b.r, 0, Math.PI * 2);
  ctx.fill();

  // Vidas (mini corazones)
  for (let l = 0; l < arcadeMinigame.lives; l++) {
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(bx + 6 + l * 8, by + boxH - 6, 5, 4);
  }

  // Rótulos de Victoria o Game Over
  if (arcadeMinigame.won) {
    drawRoundedPanel(bx + 20, by + 40, boxW - 40, 40, 6, 'rgba(15, 23, 42, 0.95)', '#22c55e', 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('¡VICTORIA RETRO!', bx + boxW / 2, by + 56);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px monospace';
    ctx.fillText('+500 PUNTOS • [SALTAR: SALIR]', bx + boxW / 2, by + 70);
  } else if (arcadeMinigame.gameOver) {
    drawRoundedPanel(bx + 20, by + 40, boxW - 40, 40, 6, 'rgba(15, 23, 42, 0.95)', '#ef4444', 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('GAME OVER', bx + boxW / 2, by + 56);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px monospace';
    ctx.fillText('[DASH: REINTENTAR • SALTAR: SALIR]', bx + boxW / 2, by + 70);
  }

  // Botón de salir en la esquina inferior
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '5px monospace';
  ctx.fillText('[SALTAR: SALIR]', bx + boxW - 6, by + boxH - 2);
}

if (typeof module !== 'undefined') {
  module.exports = {
    startArcadeMinigame,
    exitArcadeMinigame,
    updateArcadeCabinetInteraction,
    updateArcadeMinigame,
    drawArcadeCabinetPrompt,
    drawArcadeMinigame
  };
}
