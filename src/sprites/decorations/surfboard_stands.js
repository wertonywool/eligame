// ============================================================================
// SPRITES MUNDO 3 • FASE 3: PEDESTALES DE SKINS DE SURF EN LA TIENDA DE KAI
// ============================================================================
// Renderiza los 3 pedestales de exhibición con las tablas expuestas:
// 1. Rosa Neón ('classic')
// 2. Nácar Marina ('nacar')
// 3. Obsidiana Magma ('obsidian')

function drawSurfboardStand(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);
  const skinKey = d.skinKey || 'classic';
  const isShopOpen = typeof saveState !== 'undefined' && saveState.kaiQuest && saveState.kaiQuest.shopOpen;
  const isEquipped = typeof saveState !== 'undefined' && (saveState.surfboardSkin || 'classic') === skinKey;

  // 1. Pedestal de madera de teca con ranura
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(px - 14, py - 6, 28, 6);
  ctx.fillStyle = '#b57639';
  ctx.fillRect(px - 12, py - 5, 24, 4);
  ctx.fillStyle = '#d49b5d';
  ctx.fillRect(px - 10, py - 4, 20, 2);

  // 2. Tabla de Surf colocada verticalmente sobre el pedestal
  ctx.save();
  ctx.translate(px, py - 18);
  ctx.rotate(-0.25); // Inclinación elegante de exhibición
  if (typeof SpriteManager !== 'undefined' && SpriteManager.prototype.drawSurfboard) {
    SpriteManager.prototype.drawSurfboard(ctx, 0, 0, true, 0, false, skinKey);
  }
  ctx.restore();

  // 3. Brillo de estrellas si está equipada
  if (isEquipped) {
    const pulse = Math.sin(frame * 0.12) * 2;
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px - 10, py - 38 + pulse, 3, 3);
    ctx.fillRect(px + 8, py - 32 - pulse, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 6, py - 40, 2, 2);
  }

  // 4. Cartel identificador / Etiqueta debajo del pedestal
  const labelY = py + 2;
  ctx.fillStyle = '#212529';
  ctx.fillRect(px - 18, labelY, 36, 11);
  ctx.fillStyle = isEquipped ? '#ffd166' : (isShopOpen ? '#ffffff' : '#ced4da');
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';

  const title = skinKey === 'classic' ? 'ROSA NEON' : (skinKey === 'nacar' ? 'NACAR' : 'OBSIDIANA');
  ctx.fillText(title, px, labelY + 6);

  // 5. Estado: EQUIPADA / [SALTAR]
  if (isEquipped) {
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 4.5px sans-serif';
    ctx.fillText('EQUIPADA', px, labelY + 10);
  } else if (isShopOpen) {
    ctx.fillStyle = '#90e0ef';
    ctx.font = 'bold 4.5px sans-serif';
    ctx.fillText('SALTAR', px, labelY + 10);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfboardStand = drawSurfboardStand;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfboardStand };
}
