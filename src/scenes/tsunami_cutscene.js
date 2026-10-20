// ============================================================================
// ESCENA CINEMÁTICA: DESTRUCCIÓN DEL RASCACIELOS, MEGATSUNAMI Y SEPARACIÓN DEL HIJO
// ============================================================================
let tsunamiCutsceneState = { active: false, timer: 0, duration: 7.2, destX: 16050, destY: 172 };

function startTsunamiCutscene(destX = 16050, destY = 172) {
  gameState = 'TSUNAMI_CUTSCENE';
  tsunamiCutsceneState = { active: true, timer: 0, duration: 7.2, destX, destY };
  window.tsunamiCutsceneState = tsunamiCutsceneState;
  triggerShake(1.2, 3.8);
  rumbleGamepad(700, 0.95, 0.95);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
}

function updateTsunamiCutscene(dt) {
  const s = window.tsunamiCutsceneState || tsunamiCutsceneState;
  s.timer += dt;
  const t = s.timer;

  // Sacudidas continuas según el clímax de la escena
  if (t < 2.5) {
    // Acto 1: Terremoto destructor y colapso de hormigón
    if (globalFrame % 5 === 0) triggerShake(0.55, 1.8);
    if (t >= 0.5 && t - dt < 0.5 && window.sfx && window.sfx.playHit) window.sfx.playHit();
  } else if (t < 5.0) {
    // Acto 2: Impacto colosal de la masa de agua del megatsunami
    if (globalFrame % 4 === 0) triggerShake(0.7, 2.2);
    if (t >= 2.6 && t - dt < 2.6 && window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
  } else {
    // Acto 3: Salto épico con tabla y viento extremo
    if (globalFrame % 10 === 0) triggerShake(0.3, 1.2);
  }

  // Finalización o salto de la cinemática
  if (s.timer >= s.duration || keys.jumpJustPressed) {
    s.active = false;
    gameState = 'PLAYING';
    currentPhase = 5;
    player.x = s.destX || 16050;
    player.y = 172; // Ras de la superficie en y=196 (196 - 24 = 172)
    player.vx = 280;
    player.vy = 0;
    player.facingRight = true;
    player.ability = 'surf';
    player.isSurfing = true;
    player.inWater = true;
    player.onGround = true;
    player.spawnX = player.x;
    player.spawnY = player.y;
    player.lives = player.maxLives;

    if (typeof persistSave === 'function') {
      if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
      saveState.activeCheckpoints[3] = { id: 155, x: 16120, y: 196, name: 'Entrada al Megatsunami' };
      persistSave();
    }

    cameraX = player.x - W / 2;
    cameraY = player.y - H / 2;

    // Gran estallido de espuma y agua al entrar al megatsunami
    spawnParticles(player.x + 11, player.y + 20, 28, '#ffffff', 160, -50);
    spawnParticles(player.x + 11, player.y + 20, 20, '#caf0f8', 140, -40);
    spawnParticles(player.x + 11, player.y + 20, 14, '#00b4d8', 110, -25);
    if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
  }
}

function drawTsunamiCutscene() {
  const s = window.tsunamiCutsceneState || tsunamiCutsceneState;
  const t = s.timer;

  // Fondo cielo costero tormentoso
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#02182b');
  skyGrad.addColorStop(0.55, '#073b4c');
  skyGrad.addColorStop(1, '#118ab2');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Relámpagos intermitentes en el horizonte
  if (globalFrame % 50 < 2) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(0, 0, W, H);
  }

  // Sol oscurecido por la tormenta
  ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
  ctx.beginPath();
  ctx.arc(W / 2 + 80, 50, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(W / 2 + 80, 50, 24, 0, Math.PI * 2);
  ctx.fill();

  // ==========================================================================
  // ACTO 1: EL EDIFICIO SE PARTE EN DOS Y SE DESTRUYE (0.0s -> 2.5s)
  // ==========================================================================
  if (t < 2.5) {
    const sinkY = t < 0.5 ? 0 : Math.min(38, (t - 0.5) * 20);

    // 1. Edificio Izquierdo (Donde está Elizabeth)
    ctx.fillStyle = '#141724';
    ctx.fillRect(20, 140, 185, H);
    // Cornisa superior y barandilla
    ctx.fillStyle = '#2b2d42';
    ctx.fillRect(16, 136, 192, 5);
    ctx.fillStyle = '#48cae4';
    ctx.fillRect(16, 135, 192, 1);
    // Ventanas del rascacielos
    ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
    for (let wx = 35; wx < 190; wx += 22) {
      for (let wy = 148; wy < H; wy += 20) {
        ctx.fillRect(wx, wy, 10, 12);
      }
    }

    // 2. Edificio Derecho (Donde está el Hijo Ratón) - Se quiebra y se inclina
    ctx.save();
    ctx.translate(225, 140 + sinkY);
    const tilt = t < 0.5 ? 0 : Math.min(0.06, (t - 0.5) * 0.035);
    ctx.rotate(tilt);

    ctx.fillStyle = '#1a1c29';
    ctx.fillRect(0, 0, 225, H);
    ctx.fillStyle = '#3a3d52';
    ctx.fillRect(-2, -4, 230, 5);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(-2, -5, 230, 1);
    ctx.fillStyle = 'rgba(144, 224, 239, 0.35)';
    for (let wx = 15; wx < 210; wx += 22) {
      for (let wy = 8; wy < H; wy += 20) {
        ctx.fillRect(wx, wy, 10, 12);
      }
    }
    ctx.restore();

    // 3. FRACTURA COLOSAL EN EL CENTRO (Grieta abismal que separa a ambos)
    const crackX = 205;
    ctx.fillStyle = '#05030a';
    ctx.beginPath();
    ctx.moveTo(crackX, 135);
    ctx.lineTo(crackX + 18, 135);
    ctx.lineTo(crackX + 28, H);
    ctx.lineTo(crackX - 4, H);
    ctx.closePath();
    ctx.fill();

    // Líneas incandescentes de fricción y rotura estructural
    ctx.strokeStyle = '#ff2a70';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(crackX + 3, 135);
    ctx.lineTo(crackX + 11, 165);
    ctx.lineTo(crackX + 4, 195);
    ctx.lineTo(crackX + 16, 235);
    ctx.lineTo(crackX + 9, H);
    ctx.stroke();

    // Bloques de hormigón y escombros desprendiéndose al abismo
    for (let i = 0; i < 9; i++) {
      const rx = crackX - 10 + (i * 7);
      const ry = 145 + ((t * 120 + i * 28) % (H - 120));
      ctx.fillStyle = i % 2 === 0 ? '#8d99ae' : '#2b2d42';
      ctx.fillRect(rx, ry, 5, 5);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(rx + 1, ry + 1, 2, 2);
    }

    // Polvareda del derrumbe
    for (let p = 0; p < 6; p++) {
      const px = crackX - 15 + p * 8 + Math.sin(globalFrame * 0.1 + p) * 6;
      const py = 138 + Math.sin(globalFrame * 0.15 + p * 2) * 5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(px, py, 6 + (p % 4), 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Mamá Elizabeth en el borde izquierdo, desesperada
    const mamaX = 150;
    const mamaY = 112;
    window.sprites.drawMamaMouse(ctx, mamaX, mamaY, 'idle', globalFrame, true, 1.15, 0.9, 0, false, saveState.equippedSkin);

    // Bocadillo de Elizabeth: "¡¡HIJITO!! ¡¡NOOO!!"
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 14, '¡¡HIJITO!! ¡¡NOOO!!', '#ffd166', '#ff2a70');

    // 5. Hijo Ratón en el bloque derecho hundiéndose, aterrado y llorando
    const babyX = 305;
    const babyY = 118 + sinkY;
    window.sprites.drawBabyMouse(ctx, babyX, babyY, globalFrame, 3);

    // Lágrimas del hijo salpicando en el aire
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(babyX + 2, babyY + 8, 2, 3);
    ctx.fillRect(babyX - 3, babyY + 11, 2, 2);
    ctx.fillRect(babyX - 7, babyY + 14, 2, 2);

    // Bocadillo del Hijo: "¡¡MAMÁAA!! ¡¡EL PISO SE CAE!!"
    drawDialogueBubble(ctx, babyX + 10, babyY - 15, '¡¡MAMÁAA!! ¡¡EL PISO SE CAE!!', '#ffffff', '#00b4d8');

    // Banner de Alerta Sísmica
    drawCutsceneBottomBanner(ctx, '¡¡EL RASCACIELOS SE DERRUMBA Y SE PARTE EN DOS POR EL TERREMOTO!!');
  }

  // ==========================================================================
  // ACTO 2: VIENE EL MONTÓN DE AGUA Y ARRASTRA AL HIJO (2.5s -> 5.0s)
  // ==========================================================================
  else if (t < 5.0) {
    const waveProgress = Math.min(1, (t - 2.5) / 2.5);
    const waveFrontX = Math.round(W + 40 - waveProgress * (W * 0.76));
    const floodH = Math.round(40 + waveProgress * (H - 80));

    // Edificio izquierdo resistiendo el empuje
    ctx.fillStyle = '#141724';
    ctx.fillRect(15, 140, 165, H);
    ctx.fillStyle = '#2b2d42';
    ctx.fillRect(10, 136, 175, 5);

    // Muro Colosal del Megatsunami que arrasa la ciudad y el segundo edificio
    const waveGrad = ctx.createLinearGradient(0, H - floodH - 30, 0, H);
    waveGrad.addColorStop(0, '#48cae4');
    waveGrad.addColorStop(0.2, '#00b4d8');
    waveGrad.addColorStop(0.6, '#0077b6');
    waveGrad.addColorStop(1, '#023e8a');
    ctx.fillStyle = waveGrad;
    ctx.fillRect(waveFrontX, H - floodH, W - waveFrontX + 40, floodH);

    // Corrientes turbulentas y vórtices de agua dentro del megatsunami
    ctx.fillStyle = 'rgba(202, 240, 248, 0.3)';
    for (let vx = waveFrontX; vx < W; vx += 28) {
      const vOff = Math.sin(globalFrame * 0.16 + vx * 0.08) * 8;
      ctx.fillRect(vx, H - floodH + 16 + vOff, 20, 4);
      ctx.fillRect(vx + 6, H - floodH + 36 - vOff, 18, 3);
    }

    // Cresta violenta de espuma marina rompiendo hacia la izquierda
    for (let x = waveFrontX - 8; x < W; x += 4) {
      const cy = H - floodH + Math.round(Math.sin(globalFrame * 0.18 + x * 0.14) * 5 + Math.cos(globalFrame * 0.1 + x * 0.06) * 4);
      ctx.fillStyle = '#03045e';
      ctx.fillRect(x, cy + 4, 5, 4);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(x, cy + 1, 5, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, cy - 2, 5, 3);

      // Salpicaduras violentas pulverizadas
      if ((globalFrame + x) % 4 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - 2, cy - 8, 2, 3);
        ctx.fillRect(x - 6, cy - 12, 3, 2);
      }
    }

    // Edificio derecho siendo devorado por las aguas del megatsunami
    ctx.fillStyle = 'rgba(20, 23, 36, 0.85)';
    ctx.fillRect(230, 160 + waveProgress * 40, 190, H);

    // Mamá Elizabeth en el borde del edificio izquierdo, estirando los brazos
    const mamaX = 145;
    const mamaY = 112;
    window.sprites.drawMamaMouse(ctx, mamaX, mamaY, 'run', globalFrame, true, 1.2, 0.85, 0, false, saveState.equippedSkin);

    // Bocadillo de Elizabeth: "¡¡NOOO!! ¡¡HIJOOO!!"
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 14, '¡¡NOOO!! ¡¡HIJOOO!!', '#ffd166', '#ff2a70');

    // Hijo Ratón siendo arrastrado por el torrente del tsunami mar adentro
    const babyX = Math.round(280 + waveProgress * 110);
    const babyY = Math.round(130 - Math.sin(waveProgress * Math.PI) * 16 + Math.sin(globalFrame * 0.22) * 5);

    // Espuma arremolinada alrededor del hijo
    ctx.fillStyle = '#caf0f8';
    ctx.beginPath();
    ctx.arc(babyX + 8, babyY + 16, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(babyX + 8, babyY + 16, 9, 0, Math.PI * 2);
    ctx.fill();

    window.sprites.drawBabyMouse(ctx, babyX, babyY, globalFrame, 3);

    // Lágrimas y salpicaduras del hijo pidiendo auxilio
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(babyX - 4, babyY + 6, 2, 2);
    ctx.fillRect(babyX - 8, babyY + 2, 2, 2);
    ctx.fillRect(babyX - 12, babyY - 2, 2, 2);

    drawDialogueBubble(ctx, babyX + 8, babyY - 16, '¡¡MAMÁAA!! ¡¡EL AGUA ME LLEVA!!', '#ffffff', '#0077b6');

    // Banner informativo inferior
    drawCutsceneBottomBanner(ctx, '¡¡UN MONTÓN COLOSAL DE AGUA ARRASTRA A TU HIJO MAR ADENTRO!!');
  }

  // ==========================================================================
  // ACTO 3: ELIZABETH SE LANZA CON SU TABLA DE SURF (5.0s -> 7.2s)
  // ==========================================================================
  else {
    const diveProgress = Math.min(1, (t - 5.0) / 2.2);

    // Mar embravecido en la parte inferior ocupando la pantalla
    const seaGrad = ctx.createLinearGradient(0, H / 2, 0, H);
    seaGrad.addColorStop(0, '#0077b6');
    seaGrad.addColorStop(0.35, '#023e8a');
    seaGrad.addColorStop(1, '#001233');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, H / 2 + 10, W, H / 2);

    // Oleaje agitado con espuma blanca continua
    for (let x = 0; x < W; x += 6) {
      const waveDy = Math.sin(globalFrame * 0.16 + x * 0.12) * 5;
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(x, H / 2 + 12 + waveDy, 6, 4);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(x, H / 2 + 10 + waveDy, 6, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, H / 2 + 8 + waveDy, 6, 2);
    }

    // Silueta de la torre sumergida en el horizonte (Antesala del Kraken)
    ctx.fillStyle = 'rgba(7, 18, 38, 0.75)';
    ctx.fillRect(W - 85, H / 2 - 35, 65, 80);
    ctx.fillRect(W - 75, H / 2 - 50, 45, 20);

    // Hijo en la cresta de la ola siendo llevado hacia la torre sumergida
    const sonDistX = Math.round(W - 100 + Math.sin(globalFrame * 0.15) * 8);
    const sonDistY = Math.round(H / 2 + 6 + Math.cos(globalFrame * 0.18) * 4);
    window.sprites.drawBabyMouse(ctx, sonDistX, sonDistY - 14, globalFrame, 3);
    drawDialogueBubble(ctx, sonDistX + 8, sonDistY - 26, '¡¡AYÚDAME MAMÁ!!', '#ffffff', '#00b4d8');

    // Salto parabólico épico de Elizabeth con su tabla de surf
    const arcY = Math.sin(diveProgress * Math.PI) * 48;
    const mamaX = Math.round(90 + diveProgress * (W / 2 - 40));
    const mamaY = Math.round(45 - arcY + diveProgress * 75);

    // Estela aerodinámica y destellos estelares tras la tabla
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(mamaX - 16 - i * 14, mamaY + 6 - i * 5, 10, 2);
    }
    ctx.fillStyle = '#ffd166';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(mamaX - 12 - i * 18, mamaY + 9 - i * 4, 3, 3);
    }

    // Dibujar a Mamá Elizabeth montada en su tabla
    window.sprites.drawMamaSurfing(ctx, mamaX, mamaY, true, true, globalFrame, saveState.equippedSkin, saveState.surfboardSkin);

    // Bocadillo de Elizabeth con determinación heroica
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 16, '¡¡RESISTE, HIJO! ¡¡YA VOY POR TI!!', '#ffd166', '#ff2a70');

    // Banner de lanzamiento
    drawCutsceneBottomBanner(ctx, '¡¡LANZAMIENTO ÉPICO: SURFEA EL MEGATSUNAMI PARA RESCATAR A TU HIJO!!');
  }
}

// Bocadillo de diálogo dinámico con estilo cómic / pixel art
function drawDialogueBubble(ctx, cx, cy, text, textColor = '#ffffff', borderColor = '#ff2a70') {
  ctx.save();
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  const bw = Math.round(tw + 12);
  const bh = 15;
  const bx = Math.round(cx - bw / 2);
  const by = Math.round(cy - bh / 2);

  // Sombra exterior
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(bx + 1, by + 1, bw, bh);

  // Panel
  drawRoundedPanel(bx, by, bw, bh, 3, 'rgba(18, 6, 22, 0.95)', borderColor, 1.2);

  // Puntero inferior hacia el personaje
  ctx.fillStyle = borderColor;
  ctx.beginPath();
  ctx.moveTo(cx - 3, by + bh);
  ctx.lineTo(cx, by + bh + 3);
  ctx.lineTo(cx + 3, by + bh);
  ctx.fill();

  // Texto
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = textColor;
  ctx.fillText(text, cx, cy + 0.5);

  ctx.restore();
}

// Banner inferior cinematográfico con borde de neón
function drawCutsceneBottomBanner(ctx, text) {
  const pw = 420;
  const ph = 26;
  const px = (W - pw) / 2;
  const py = H - 34;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(12, 4, 16, 0.94)', '#ff2a70', 1.6);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(text, W / 2, py + ph / 2);
}

if (typeof module !== 'undefined') {
  module.exports = { startTsunamiCutscene, updateTsunamiCutscene, drawTsunamiCutscene };
}
