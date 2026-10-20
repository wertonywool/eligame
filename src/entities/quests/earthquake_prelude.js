// ============================================================================
// CINEMÁTICA Y PRELUDIO DE LA FASE 4: EL ENCUENTRO EN LA AZOTEA Y EL TERREMOTO
// ============================================================================
let earthquakeTriggered = false;
let earthquakeTimer = 0;
let tsunamiLaunched = false;

// Estado de la animación de sorpresa (Terremoto, signo !!! y mirada a los lados)
let rooftopShock = {
  triggered: false,
  active: false,
  timer: 0,
  duration: 2.8,
  popScale: 0
};

function isRooftopTremorLocked() {
  return rooftopShock && rooftopShock.active;
}

function updateEarthquakePrelude(dt) {
  if (gameState !== 'PLAYING') return;

  // Si el jugador está antes del mirador del edificio, reiniciar estado si retrocede o reaparece
  if (player.x < 15000) {
    earthquakeTriggered = false;
    tsunamiLaunched = false;
    earthquakeTimer = 0;
    rooftopShock.triggered = false;
    rooftopShock.active = false;
    rooftopShock.timer = 0;
    rooftopShock.popScale = 0;
    return;
  }

  // Se activa cuando el jugador salta y aterriza en el segundo edificio (X >= 15110)
  const landedOnSecondBuilding = player.x >= 15110 && player.x <= 15300 && player.onGround;

  if (landedOnSecondBuilding && !rooftopShock.triggered) {
    rooftopShock.triggered = true;
    rooftopShock.active = true;
    rooftopShock.timer = 0;
    rooftopShock.popScale = 0;

    earthquakeTriggered = true;
    earthquakeTimer = 999.0;

    triggerShake(0.9, 3.2);
    rumbleGamepad(600, 0.9, 0.9);
    if (window.sfx && window.sfx.playHit) window.sfx.playHit();

    // Reacción física de sobresalto
    player.squashY = 1.3;
    player.squashX = 0.75;
    player.vx = 0;
    player.facingRight = true;

    spawnParticles(player.x + 11, player.y - 25, 18, '#ffffff', 80, 50);
    spawnParticles(player.x + 11, player.y - 25, 12, '#ffcad4', 60, 40);
    spawnParticles(player.x + 11, player.y - 25, 10, '#ff2a70', 70, 50);
  }

  // Secuencia de animación de sorpresa: temblor, signo !!! y mirada a los lados
  if (rooftopShock.active) {
    rooftopShock.timer += dt;
    const t = rooftopShock.timer;

    // Escala del pop para el signo !!! (animación elástica)
    if (t < 0.18) {
      rooftopShock.popScale = (t / 0.18) * 1.35;
    } else if (t < 0.35) {
      rooftopShock.popScale = 1.35 - ((t - 0.18) / 0.17) * 0.35;
    } else {
      rooftopShock.popScale = 1.0;
    }

    // Terremoto violento continuo durante la sorpresa
    if (globalFrame % 5 === 0) {
      triggerShake(0.28, 2.2);
    }
    // Partículas de polvo cayendo y desprendiéndose de la estructura
    if (globalFrame % 4 === 0) {
      spawnParticles(player.x + (Math.random() * 60 - 30), player.y - 14, 2, '#ffffff', 40, 25);
      spawnParticles(player.x + (Math.random() * 40 - 20), player.y + 24, 1, '#ffd166', 30, -10);
    }

    // Elizabeth no puede moverse y mira a los lados asustada
    player.vx = 0;
    player.state = 'idle';

    if (t < 0.6) {
      // 1. Momento de impacto inicial: mira al frente (derecha), sobresaltada
      player.facingRight = true;
    } else if (t < 1.2) {
      // 2. Gira la cabeza y mira hacia atrás (izquierda) alarmada
      player.facingRight = false;
    } else if (t < 1.8) {
      // 3. Gira de nuevo hacia el frente (derecha), viendo al hijo en apuros
      player.facingRight = true;
    } else if (t < 2.4) {
      // 4. Mira rápidamente a ambos lados con el terremoto intensificándose
      player.facingRight = (Math.floor(t * 8) % 2 === 0);
    } else {
      // 5. ¡DE LA NADA! Se desencadena la destrucción del rascacielos y el megatsunami
      rooftopShock.active = false;
      tsunamiLaunched = true;
      player.facingRight = true;
      if (typeof startTsunamiCutscene === 'function') {
        startTsunamiCutscene(16050, 172);
      }
    }
  }

  // Temblores sísmicos ambientales continuos
  if (earthquakeTriggered && !tsunamiLaunched && !rooftopShock.active) {
    if (globalFrame % 14 === 0) {
      triggerShake(0.12, 1.4);
      spawnParticles(player.x + (Math.random() * 80 - 40), player.y - 20, 2, '#ffffff', 40, 30);
    }
  }
}

// Dibuja el signo !!! y los efectos de sorpresa sobre Mamá Ratón en coordenadas del mundo
function drawRooftopShockEffects(ctx) {
  if (!rooftopShock.active || rooftopShock.popScale <= 0) return;

  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 10 + Math.sin(globalFrame * 0.2) * 1.5);
  const scale = rooftopShock.popScale;

  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(scale, scale);

  const bw = 26;
  const bh = 16;
  const rx = -bw / 2;
  const ry = -bh / 2;

  // Sombra exterior
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(rx + 2, ry + 2, bw, bh);

  // Panel del badge (estilo cómic / alerta)
  drawRoundedPanel(rx, ry, bw, bh, 4, 'rgba(18, 4, 21, 0.95)', '#ff2a70', 1.6);

  // Flechita / puntero del bocadillo hacia la cabeza de Elizabeth
  ctx.fillStyle = '#ff2a70';
  ctx.beginPath();
  ctx.moveTo(-4, ry + bh);
  ctx.lineTo(0, ry + bh + 4);
  ctx.lineTo(4, ry + bh);
  ctx.fill();

  ctx.fillStyle = '#120415';
  ctx.beginPath();
  ctx.moveTo(-2, ry + bh);
  ctx.lineTo(0, ry + bh + 2);
  ctx.lineTo(2, ry + bh);
  ctx.fill();

  // Rayos de impacto estilo manga / cómic
  const pulse = Math.sin(globalFrame * 0.3) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(rx - 4 - pulse, ry - 3, 3, 2);
  ctx.fillRect(rx - 2, ry - 5 - pulse, 2, 3);
  ctx.fillRect(rx + bw + 1 + pulse, ry - 3, 3, 2);
  ctx.fillRect(rx + bw, ry - 5 - pulse, 2, 3);

  // Signo "!!!"
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 8px ${UI_FONT}`;
  ctx.fillText('!!!', 0, 1);
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('!!!', 0, 0);

  ctx.restore();
}

function drawEarthquakePreludeBanner(ctx) {
  // Solo se muestra tras terminar la sorpresa para no sobrecargar la pantalla
  if (!earthquakeTriggered || tsunamiLaunched || rooftopShock.active || gameState !== 'PLAYING') return;

  ctx.save();
  const pw = 360;
  const ph = 32;
  const px = (W - pw) / 2;
  const py = H - 42;

  drawRoundedPanel(px, py, pw, ph, 8, 'rgba(18, 4, 21, 0.94)', '#ff2a70', 1.8);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('¡ALERTA DE MEGATSUNAMI! ¡EL OCÉANO SE RETIRA EN EL HORIZONTE!', W / 2, py + 12);

  ctx.fillStyle = '#ffffff';
  ctx.font = `5.5px ${UI_FONT}`;
  ctx.fillText('¡Habla con tu hijo y corre a la rampa de salto para lanzarte con tu tabla de surf!', W / 2, py + 23);

  ctx.restore();
}

function resetEarthquakePrelude() {
  earthquakeTriggered = false;
  earthquakeTimer = 0;
  tsunamiLaunched = false;
  rooftopShock = {
    triggered: false,
    active: false,
    timer: 0,
    duration: 2.8,
    popScale: 0
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    updateEarthquakePrelude,
    drawEarthquakePreludeBanner,
    drawRooftopShockEffects,
    resetEarthquakePrelude,
    isRooftopTremorLocked
  };
}
