// ============================================================================
// ESCENA CINEMÁTICA: APARICIÓN Y RUGIDO DEL KRAKEN DE LAS PROFUNDIDADES
// ============================================================================
let krakenIntroState = {
  active: false,
  timer: 0,
  duration: 4.2
};

function startKrakenIntroAnimation() {
  gameState = 'KRAKEN_INTRO';
  krakenIntroState = {
    active: true,
    timer: 0,
    duration: 4.2
  };
  window.krakenIntroState = krakenIntroState;
  triggerShake(1.5, 4.0);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
}

function updateKrakenIntro(dt) {
  const s = window.krakenIntroState || krakenIntroState;
  s.timer += dt;

  if (globalFrame % 7 === 0) {
    triggerShake(0.6, 1.4);
  }

  if (s.timer >= s.duration || keys.jumpJustPressed) {
    s.active = false;
    gameState = 'PLAYING';
    if (typeof startKrakenBossFight === 'function') {
      startKrakenBossFight();
    }
  }
}

function drawKrakenIntroScene() {
  const s = window.krakenIntroState || krakenIntroState;
  const t = s.timer;

  // 1. Cielo de tempestad marina abisal
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#03071e');
  skyGrad.addColorStop(0.4, '#0a1128');
  skyGrad.addColorStop(0.75, '#1c2541');
  skyGrad.addColorStop(1, '#001233');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Relámpago ambiental cinemático
  if (t > 1.2 && (Math.floor(t * 12) % 18 === 0)) {
    ctx.fillStyle = 'rgba(202, 240, 248, 0.45)';
    ctx.fillRect(0, 0, W, H);
  }

  // 2. Aguas torrenciales y remolino en la base
  const seaGrad = ctx.createLinearGradient(0, H - 75, 0, H);
  seaGrad.addColorStop(0, '#0077b6');
  seaGrad.addColorStop(0.3, '#023e8a');
  seaGrad.addColorStop(0.7, '#001845');
  seaGrad.addColorStop(1, '#000814');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, H - 75, W, 75);

  // Espuma rompiente y spray pulverizado
  ctx.fillStyle = '#ffffff';
  for (let x = 0; x < W; x += 6) {
    const wy = H - 75 + Math.round(Math.sin(globalFrame * 0.15 + x * 0.25) * 3);
    ctx.fillRect(x, wy, 5, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(x + 1, wy + 2, 3, 2);
    ctx.fillStyle = '#ffffff';
  }

  // 3. Tentáculos laterales alzándose del remolino
  const tentRise = Math.min(1, t / 1.6);
  const ty = H - Math.round(tentRise * 115);
  if (window.sprites && window.sprites.drawKrakenTentacle) {
    window.sprites.drawKrakenTentacle(ctx, W / 2 - 120, ty + 20, globalFrame, 1.4);
    window.sprites.drawKrakenTentacle(ctx, W / 2 + 120, ty + 20, globalFrame, 1.4);
    window.sprites.drawKrakenTentacle(ctx, W / 2 - 65, ty + 40, globalFrame, 1.15);
    window.sprites.drawKrakenTentacle(ctx, W / 2 + 65, ty + 40, globalFrame, 1.15);
  }

  // 4. Cabeza colosal del Kraken emergiendo desde el fondo
  const headRise = Math.min(1, Math.max(0, (t - 0.7) / 2.0));
  const headY = H - 15 - Math.round(headRise * 95);
  const tempBoss = { x: W / 2, y: headY, hitTimer: 0, eyesRemaining: 8, phase: 1 };
  if (window.sprites && window.sprites.drawKrakenBoss) {
    window.sprites.drawKrakenBoss(ctx, tempBoss, globalFrame);
  }

  // Ondas de choque sónicas del rugido si t > 1.8
  if (t >= 1.8) {
    const pulse = ((t - 1.8) * 140) % 200;
    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W / 2, headY - 10, pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(W / 2, headY - 10, pulse * 0.65, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 5. Banner cinemático del Boss en marco náutico abisal
  if (t >= 1.4) {
    const bw = 350;
    const bh = 36;
    const bx = Math.round((W - bw) / 2);
    const by = 20;
    drawRoundedPanel(bx, by, bw, bh, 8, 'rgba(3, 7, 30, 0.95)', '#00b4d8', 2.0);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = `bold 8.5px ${UI_FONT}`;
    ctx.fillText('¡KRAKEN ABISAL DEL MEGATSUNAMI!', W / 2, by + 13);

    ctx.fillStyle = '#caf0f8';
    ctx.font = `6px ${UI_FONT}`;
    ctx.fillText('Guardián del Remolino - ¡Arroja escombros para destruir sus 8 ojos!', W / 2, by + 26);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenIntroAnimation, updateKrakenIntro, drawKrakenIntroScene };
}
