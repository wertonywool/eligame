// ============================================================================
// ESCENA CINEMÁTICA: ENSAMBLAJE DE LA LLAVE MAESTRA DEL RASCACIELOS (ANIMACIÓN 1)
// ============================================================================
let keyAssemblyState = { timer: 0, flashAlpha: 0, shockwaveR: 0, clanks: [false, false, false] };

function startKeyAssemblyAnimation() {
  gameState = 'KEY_ASSEMBLY';
  keyAssemblyState = { timer: 0, flashAlpha: 0, shockwaveR: 0, clanks: [false, false, false] };
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function updateKeyAssembly(dt) {
  const s = keyAssemblyState;
  s.timer += dt;
  if (s.flashAlpha > 0) s.flashAlpha = Math.max(0, s.flashAlpha - dt * 2.5);
  if (s.shockwaveR > 0) s.shockwaveR += dt * 280;

  // Clanks mecánicos de acoplamiento progresivo
  if (s.timer >= 1.2 && !s.clanks[0]) {
    s.clanks[0] = true; triggerShake(0.08, 1.5);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
  if (s.timer >= 1.8 && !s.clanks[1]) {
    s.clanks[1] = true; triggerShake(0.1, 2.0);
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
  }
  if (s.timer >= 2.4 && !s.clanks[2]) {
    s.clanks[2] = true; s.flashAlpha = 1.0; s.shockwaveR = 8;
    triggerShake(0.25, 4.0);
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
  }

  if ((s.timer >= 3.0 && keys.jumpJustPressed) || s.timer >= 7.5) {
    saveState.keysPhase3 = 4;
    saveState.keyAssemblySeen = true;
    persistSave();
    gameState = 'PLAYING';
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
}

function drawKeyAssemblyScene() {
  const s = keyAssemblyState;
  const t = s.timer;
  const cx = W / 2, cy = 102;

  ctx.fillStyle = '#07020a';
  ctx.fillRect(0, 0, W, H);

  // Anillo de ondas de choque en la fusión
  if (s.shockwaveR > 0 && s.shockwaveR < W) {
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, s.shockwaveR, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('FORJA DE LA LLAVE MAESTRA DEL RASCACIELOS', cx, 22);

  if (t < 2.4) {
    // Fase 1: Las 4 partes atraídas magnéticamente hacia el centro
    const progress = Math.min(1, t / 2.2);
    const ease = 1 - Math.pow(1 - progress, 3);
    const dist = (1 - ease) * 130;
    const coords = [
      { x: cx - dist * 0.7, y: cy - dist - 16 },           // Pieza 1: Cabezal (Norte)
      { x: cx, y: cy + dist * 0.2 },                       // Pieza 2: Vástago (Centro)
      { x: cx + dist * 0.8 + 8, y: cy + dist * 0.5 + 14 }, // Pieza 3: Dientes (Este)
      { x: cx - dist * 0.8, y: cy + dist * 0.4 }           // Pieza 4: Joya (Oeste)
    ];

    for (let i = 0; i < 4; i++) {
      if (window.sprites && window.sprites.drawKeyFragment) {
        window.sprites.drawKeyFragment(ctx, i, coords[i].x, coords[i].y, 1.6, 1);
      }
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = `7px ${UI_FONT}`;
    ctx.fillText('ATRAYENDO FRAGMENTOS DE LA CIUDADELA...', cx, 196);
  } else {
    // Fase 2: Llave Maestra ensamblada y resplandeciente
    const bob = Math.sin((t - 2.4) * 3) * 3;
    const glint = (t - 2.4) * 0.8;
    if (window.sprites && window.sprites.drawMasterKeyAssembled) {
      window.sprites.drawMasterKeyAssembled(ctx, cx, cy + bob, 1.8, 1.2, glint);
    }

    ctx.fillStyle = '#ffd166';
    ctx.font = `bold 8px ${UI_FONT}`;
    ctx.fillText('¡4/4 PIEZAS UNIFICADAS CON ÉXITO!', cx, 186);
    ctx.fillStyle = '#ffffff';
    ctx.font = `6.5px ${UI_FONT}`;
    ctx.fillText('Las puertas del ascensor hacia la azotea están desbloqueadas.', cx, 200);

    if (Math.floor(globalFrame / 20) % 2 === 0) {
      ctx.fillStyle = '#ffcad4';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('[SALTAR / CONTINUAR >]', cx, 216);
    }
  }

  // Destello blanco cegador de fusión
  if (s.flashAlpha > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${s.flashAlpha})`;
    ctx.fillRect(0, 0, W, H);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKeyAssemblyAnimation, updateKeyAssembly, drawKeyAssemblyScene };
}
