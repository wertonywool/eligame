// ============================================================================
// SPRITES MUNDO 4 - FASE 6: EL GRAN YETI Y EL TRONO DE CRISTAL (PIXEL ART)
// ============================================================================

function drawYetiCrystalThrone(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 58;
  const h = 50;

  // 1. Pedestal escalonado de piedra sagrada
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 6, w + 8, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 1, py - 12, w + 2, 6);

  // 2. Respaldo monumental de cristal glacial tallado
  const glow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (glow * 0.35).toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py - h + 14, 26, 0, Math.PI * 2);
  ctx.fill();

  // Facetas del cristal del trono
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px + 6, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h);
  ctx.lineTo(px + w - 6, py - 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px + 12, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h + 4);
  ctx.lineTo(px + Math.floor(w / 2), py - 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px + Math.floor(w / 2), py - h + 4);
  ctx.lineTo(px + w - 12, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - 12);
  ctx.closePath();
  ctx.fill();

  // 3. Cojín de terciopelo real tibetano para el Ratoncito
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 14, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Borde bordado en oro
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 14, 16, 4, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Emblema rúnico sagrado en la cabecera
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + Math.floor(w / 2) - 3, py - h + 14, 6, 6);
}

function drawGreatSnowYeti(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Respiración suave y serena
  const breath = Math.sin(frame * 0.08) * 1.5;
  const by = py + breath;

  // 1. Sombra amplia en el suelo
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.ellipse(px + 24, py - 2, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Piernas y cuerpo voluminoso de pelo blanco ártico
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 16, 25, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 17, 23, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pies peludos gigantes descansando en el suelo
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(px + 6, py - 6, 10, 6, 0, 0, Math.PI * 2);
  ctx.ellipse(px + 42, py - 6, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Torso y hombros imponentes
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 32, 20, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 33, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Guirnalda de cintas ceremoniales de plegaria (Himalaya)
  const colors = ['#3b82f6', '#ffffff', '#ef4444', '#eab308', '#22c55e'];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(px + 14 + i * 4, by - 26, 3, 4);
  }

  // 4. Brazos robustos y garras pacíficas
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(px + 6, by - 26, 8, 0, Math.PI * 2);
  ctx.arc(px + 42, by - 26, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px + 6, by - 27, 7, 0, Math.PI * 2);
  ctx.arc(px + 42, by - 27, 7, 0, Math.PI * 2);
  ctx.fill();

  // 5. Cabeza del Yeti
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(px + 24, by - 44, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px + 24, by - 45, 13, 0, Math.PI * 2);
  ctx.fill();

  // Rostro de piel azul suave
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 43, 8, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ojos benevolentes y sabios (parpadeo ocasional)
  const isBlinking = (frame % 120 < 6);
  if (isBlinking) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px + 20, by - 45, 3, 1);
    ctx.fillRect(px + 25, by - 45, 3, 1);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(px + 21, by - 45, 2, 0, Math.PI * 2);
    ctx.arc(px + 27, by - 45, 2, 0, Math.PI * 2);
    ctx.fill();
    // Brillo en los ojos
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 21, by - 46, 1, 1);
    ctx.fillRect(px + 27, by - 46, 1, 1);
  }

  // Nariz y boca serena
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 23, by - 42, 2, 2);
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px + 22, by - 39, 4, 1);

  // Cuernos de hielo azul en la frente
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px + 15, by - 52);
  ctx.lineTo(px + 13, by - 59);
  ctx.lineTo(px + 18, by - 52);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 30, by - 52);
  ctx.lineTo(px + 35, by - 59);
  ctx.lineTo(px + 33, by - 52);
  ctx.closePath();
  ctx.fill();

  // Vaho de respiración gélida ocasional
  if (frame % 60 < 25) {
    const puffAge = (frame % 60) / 25;
    ctx.fillStyle = 'rgba(224, 242, 254, ' + (1 - puffAge).toFixed(2) + ')';
    ctx.beginPath();
    ctx.arc(px + 24 + puffAge * 6, by - 39 - puffAge * 10, 2 + puffAge * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawYetiCrystalThrone = drawYetiCrystalThrone;
  SpriteManager.prototype.drawGreatSnowYeti = drawGreatSnowYeti;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawYetiCrystalThrone,
    drawGreatSnowYeti
  };
}
