// ============================================================================
// SPRITES: ELEMENTOS DECORATIVOS DEL LOBBY DEL RASCACIELOS (PIXEL ART)
// ============================================================================

function drawLobbyChandelier(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Cadena de suspension
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 1, py, 2, 14);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px, py + 1, 1, 12);

  // Corona octogonal de bronce
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 10, py + 14, 20, 4);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 8, py + 15, 16, 2);

  // Prismas colgantes de cristal art-deco con destello
  const shimmer = (frame % 16 < 8);
  ctx.fillStyle = shimmer ? '#ffffff' : '#caf0f8';
  ctx.fillRect(px - 7, py + 18, 3, 7);
  ctx.fillRect(px - 2, py + 18, 4, 9);
  ctx.fillRect(px + 4, py + 18, 3, 7);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 1, py + 26, 2, 2);

  // Resplandor dorado tenue
  ctx.fillStyle = 'rgba(255, 235, 120, 0.18)';
  ctx.beginPath(); ctx.arc(px, py + 20, 14, 0, Math.PI * 2); ctx.fill();
}

function drawLuggageCart(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Ruedas y plataforma base
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 4, 26, 4);
  ctx.fillRect(px + 2, py - 2, 4, 4); ctx.fillRect(px + 20, py - 2, 4, 4);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 1, py - 5, 24, 2);

  // Marco tubular arqueado de laton dorado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 2, py - 22, 2, 17); ctx.fillRect(px + 22, py - 22, 2, 17);
  ctx.fillRect(px + 2, py - 22, 22, 2);

  // Maletas de cuero marrón apiladas
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 4, py - 12, 18, 7);
  ctx.fillStyle = '#c4923e'; ctx.fillRect(px + 6, py - 11, 2, 5); ctx.fillRect(px + 18, py - 11, 2, 5);
  ctx.fillStyle = '#7f5539'; ctx.fillRect(px + 6, py - 18, 14, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 12, py - 19, 2, 1); // Hebilla
}

function drawDirectoryBoard(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Marco de bronce y panel
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 32, 22, 32);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 1, py - 31, 20, 30);
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 2, py - 30, 18, 28);

  // Lineas de texto iluminadas del directorio
  for (let ly = py - 27; ly < py - 8; ly += 4) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, ly, 10, 1.5);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 15, ly, 3, 1.5);
  }
  // Aviso de evacuacion titilante
  const alertBlink = (frame % 20 < 10);
  ctx.fillStyle = alertBlink ? '#e63946' : '#583110';
  ctx.fillRect(px + 3, py - 7, 16, 4);
}

function drawEvacuationSiren(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Caja de pared
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 28, 12, 14);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 1, py - 27, 10, 12);

  // Baliza giratoria de sirena
  const sirenBlink = (frame % 12 < 6);
  ctx.fillStyle = sirenBlink ? '#ffbe0b' : '#c1121f';
  ctx.fillRect(px + 2, py - 34, 8, 6);
  if (sirenBlink) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 33, 4, 3);
    ctx.fillStyle = 'rgba(255, 190, 11, 0.25)';
    ctx.beginPath(); ctx.arc(px + 6, py - 31, 10, 0, Math.PI * 2); ctx.fill();
  }
}

function drawStanchions(ctx, x, y) {
  const px = Math.round(x), py = Math.round(y);
  // Poste izquierdo con esfera
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 1, py - 16, 4, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px, py - 15, 2, 15);
  ctx.fillRect(px - 1, py - 18, 4, 3); // Bola dorada

  // Poste derecho con esfera
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px + 23, py - 16, 4, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 24, py - 15, 2, 15);
  ctx.fillRect(px + 23, py - 18, 4, 3);

  // Cordon de terciopelo rojo combado
  ctx.fillStyle = '#c1121f';
  ctx.fillRect(px + 2, py - 13, 7, 2);
  ctx.fillRect(px + 8, py - 11, 10, 2);
  ctx.fillRect(px + 17, py - 13, 7, 2);
}

function drawLoungeTable(ctx, x, y) {
  const px = Math.round(x), py = Math.round(y);
  // Mesa de centro de caoba
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 8, 24, 8);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 1, py - 7, 22, 3);
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 2, py - 4, 3, 4); ctx.fillRect(px + 19, py - 4, 3, 4);

  // Periodico de la bahia sobre la mesa
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 5, py - 10, 7, 3);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 6, py - 9, 5, 1);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawLobbyChandelier = drawLobbyChandelier;
  SpriteManager.prototype.drawLuggageCart = drawLuggageCart;
  SpriteManager.prototype.drawDirectoryBoard = drawDirectoryBoard;
  SpriteManager.prototype.drawEvacuationSiren = drawEvacuationSiren;
  SpriteManager.prototype.drawStanchions = drawStanchions;
  SpriteManager.prototype.drawLoungeTable = drawLoungeTable;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawLobbyChandelier, drawLuggageCart, drawDirectoryBoard,
    drawEvacuationSiren, drawStanchions, drawLoungeTable
  };
}
