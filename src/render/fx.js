// ============================================================================
// EFECTOS VISUALES, PARTÍCULAS, SOMBRAS Y POLVO ESTILO CHIKI'S CHASE
// ============================================================================
// ============================================================================
// SOMBRAS DINÁMICAS, PARTÍCULAS Y JUICE ESTILO CHIKI'S CHASE
// ============================================================================
function drawDropShadow(ctx, cx, cy, rx, ry, alpha = 0.28) {
  ctx.save();
  ctx.fillStyle = `rgba(10, 5, 22, ${alpha})`;
  ctx.beginPath();
  ctx.ellipse(Math.round(cx), Math.round(cy), Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getGroundYUnder(x, startY, maxCheck = 120) {
  if (!level || !level.platforms) return null;
  let groundY = startY + maxCheck;
  let found = false;
  for (let i = 0; i < level.platforms.length; i++) {
    const p = level.platforms[i];
    if (x >= p.x && x <= p.x + p.w && p.y >= startY - 3 && p.y < groundY) {
      groundY = p.y;
      found = true;
    }
  }
  return found ? groundY : null;
}

function drawSparkleStar(arg1, arg2, arg3, arg4, arg5) {
  let c = ctx;
  let cx = arg1, cy = arg2, size = arg3, color = arg4 || '#ffd166';
  if (arg1 && typeof arg1.save === 'function') {
    c = arg1;
    cx = arg2;
    cy = arg3;
    size = arg4;
    color = arg5 || '#ffd166';
  }
  c.save();
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(cx, cy - size);
  c.lineTo(cx + size * 0.32, cy - size * 0.32);
  c.lineTo(cx + size, cy);
  c.lineTo(cx + size * 0.32, cy + size * 0.32);
  c.lineTo(cx, cy + size);
  c.lineTo(cx - size * 0.32, cy + size * 0.32);
  c.lineTo(cx - size, cy);
  c.lineTo(cx - size * 0.32, cy - size * 0.32);
  c.closePath();
  c.fill();
  c.fillStyle = '#ffffff';
  c.fillRect(cx - 0.75, cy - 0.75, 1.5, 1.5);
  c.restore();
}

function getBiomeDustColor(playerX) {
  if (level && level.theme === 'volcano') {
    return Math.random() > 0.5 ? '#ff9e00' : '#ff5400';
  }
  if (playerX < 1800) {
    return Math.random() > 0.4 ? '#ffb3c1' : '#ffe5ec'; // Pétalos suaves de cerezo
  } else if (playerX < 3670) {
    return Math.random() > 0.4 ? '#bbf2f6' : '#d8f3dc'; // Brisa botánica de loto
  } else {
    return Math.random() > 0.4 ? '#fde4cf' : '#ffd166'; // Polvo áureo y mármol real
  }
}

function spawnDustPuff(x, y, count, color, baseVx = 0) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * 1.3 - Math.PI / 2;
    const spd = 16 + Math.random() * 32;
    const life = 0.22 + Math.random() * 0.16;
    particles.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y - 1,
      vx: baseVx + Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd * 0.4 - 12,
      gravity: -10, // Flota hacia arriba sutilmente como humo/polvillo
      color: color || '#ffccd5',
      size: 2.2 + Math.random() * 1.6,
      life,
      maxLife: life,
      isDust: true
    });
  }
}

function spawnStarSparkles(x, y, count, color = '#ffd166') {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const spd = 36 + Math.random() * 50;
    const life = 0.32 + Math.random() * 0.22;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 14,
      gravity: 70,
      color,
      size: 3 + Math.random() * 2,
      life,
      maxLife: life,
      isStar: true
    });
  }
}

function spawnParticles(x, y, count, color, speed = 60, gravity = 120) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (0.3 + Math.random() * 0.7) * speed;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 20,
      gravity,
      color,
      size: Math.random() > 0.4 ? 2 : 3,
      life: 0.25 + Math.random() * 0.35
    });
  }
}

function spawnFloatingText(x, y, text, color = '#ffd166') {
  // Sin textos intrusivos en el gameplay
  return;
}

function triggerShake(duration, magnitude) {
  shakeTime = duration;
  shakeMagnitude = magnitude;
}


function updateEffects(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += p.gravity * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }

  for (let i = afterimages.length - 1; i >= 0; i--) {
    afterimages[i].alpha -= dt * 2.4;
    if (afterimages[i].alpha <= 0) afterimages.splice(i, 1);
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y -= 20 * dt;
    ft.life -= dt;
    if (ft.life <= 0) floatingTexts.splice(i, 1);
  }

  for (let i = scorchMarks.length - 1; i >= 0; i--) {
    scorchMarks[i].life -= dt;
    if (scorchMarks[i].life <= 0) scorchMarks.splice(i, 1);
  }
}


// ============================================================================
// PARTÍCULAS ATMOSFÉRICAS FLOTANTES POR FASE (SAKURA, LOTO, ROSAS)
// ============================================================================
function drawDriftingSakuraPetals() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX > 1860 && player.x > 1860) return;

  for (const sp of sakuraPetals) {
    const sx = (sp.x + globalFrame * sp.speedX + Math.sin(globalFrame * sp.swingSpeed + sp.phase) * 16) % 1820;
    const sy = (sp.y + globalFrame * sp.speedY) % 230 + 10;

    if (sx < cameraX - 20 || sx > cameraX + W + 20) continue;

    // Desvanecimiento suave sobre el río antes del muelle de la Fase 2
    const fade = Math.max(0, Math.min(1, (1820 - sx) / 180));
    if (fade <= 0) continue;

    ctx.save();
    ctx.fillStyle = sp.color;
    ctx.globalAlpha = (0.8 + Math.sin(globalFrame * 0.06 + sp.phase) * 0.2) * fade;
    const angle = Math.sin(globalFrame * sp.swingSpeed * 0.9 + sp.phase) * 0.6;
    ctx.translate(Math.round(sx), Math.round(sy));
    ctx.rotate(angle);
    ctx.fillRect(-sp.size, -1, sp.size * 2, sp.size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -1, 1, 1);
    ctx.restore();
  }
}

// 🦋 Esporas bioluminiscentes y luciérnagas acuáticas de la Fase 2 del Mundo 1 (X: 1800 -> 3670)
const lotusSpores = Array.from({ length: 46 }, (_, i) => ({
  x: 1800 + (i * 41) % 1870,
  y: 30 + (i * 29) % 210,
  speedX: 0.15 + (i % 3) * 0.08,
  speedY: -0.22 - (i % 4) * 0.05, // Ascienden suavemente desde el agua
  pulseSpeed: 0.06 + (i % 5) * 0.015,
  phase: i * 0.75,
  size: (i % 3 === 0) ? 2 : 1.5,
  color: (i % 4 === 0) ? '#00f5d4' : ((i % 4 === 1) ? '#48cae4' : ((i % 4 === 2) ? '#95d5b2' : '#ffd166'))
}));

function drawDriftingLotusSpores() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX < 1700 || cameraX > 3700) return;

  for (const ls of lotusSpores) {
    const lx = 1800 + ((ls.x - 1800 + globalFrame * ls.speedX + Math.sin(globalFrame * 0.04 + ls.phase) * 12) % 1870 + 1870) % 1870;
    const ly = ((ls.y + globalFrame * ls.speedY) % 230 + 230) % 230 + 15;

    if (lx < cameraX - 20 || lx > cameraX + W + 20) continue;

    ctx.save();
    ctx.fillStyle = ls.color;
    const pulse = 0.65 + Math.sin(globalFrame * ls.pulseSpeed + ls.phase) * 0.35;
    ctx.globalAlpha = pulse;
    ctx.fillRect(Math.round(lx), Math.round(ly), ls.size, ls.size);
    if (ls.size >= 2) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(lx), Math.round(ly), 1, 1);
    }
    ctx.restore();
  }
}

// 🌹 Pétalos de rosas reales flotando en la brisa de la Fase 3 del Mundo 1 (X: 3670 -> 5600)
const rosePetals = Array.from({ length: 48 }, (_, i) => ({
  x: 3670 + (i * 39) % 1900,
  y: 20 + (i * 29) % 200,
  speedX: 0.35 + (i % 4) * 0.15,
  speedY: 0.18 + (i % 3) * 0.12,
  swingSpeed: 0.04 + (i % 5) * 0.015,
  phase: i * 0.9,
  size: (i % 3 === 0) ? 3 : 2,
  color: (i % 4 === 0) ? '#ff4d6d' : ((i % 4 === 1) ? '#ff758f' : ((i % 4 === 2) ? '#ffb3c1' : '#c9184a'))
}));

function drawDriftingRosePetals() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX < 3600) return;

  for (const rp of rosePetals) {
    const rx = 3670 + ((rp.x - 3670 - globalFrame * rp.speedX + Math.sin(globalFrame * rp.swingSpeed + rp.phase) * 14) % 1900 + 1900) % 1900;
    const ry = (rp.y + globalFrame * rp.speedY) % 230 + 15;

    if (rx < cameraX - 20 || rx > cameraX + W + 20) continue;

    ctx.save();
    ctx.fillStyle = rp.color;
    ctx.globalAlpha = 0.75 + Math.sin(globalFrame * 0.05 + rp.phase) * 0.2;
    const angle = Math.sin(globalFrame * rp.swingSpeed * 0.8 + rp.phase) * 0.5;
    ctx.translate(Math.round(rx), Math.round(ry));
    ctx.rotate(angle);
    ctx.fillRect(-rp.size, -1, rp.size * 2, rp.size);
    ctx.fillStyle = '#fff0f3';
    ctx.fillRect(-1, -1, 1, 1);
    ctx.restore();
  }
}


