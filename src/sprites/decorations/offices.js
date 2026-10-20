// ============================================================================
// SPRITES MUNDO 3: OFICINAS CORPORATIVAS Y LOBBY (PIXEL ART)
// ============================================================================
function drawOfficeDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);

  if (d.type === 'office_desk') {
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 18, 28, 18);
    ctx.fillStyle = '#3b0820'; ctx.fillRect(px + 2, py - 16, 24, 4);
    ctx.fillStyle = '#120415'; ctx.fillRect(px + 3, py - 12, 4, 12); ctx.fillRect(px + 21, py - 12, 4, 12);
    ctx.fillStyle = '#07020a'; ctx.fillRect(px + 8, py - 28, 14, 11);
    ctx.fillStyle = (frame % 30 < 15) ? '#ffcad4' : '#ffffff'; ctx.fillRect(px + 9, py - 27, 12, 8);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 11, py - 25, 8, 2);
    ctx.fillStyle = '#8f143c'; ctx.fillRect(px + 10, py - 16, 9, 2);
  } else if (d.type === 'office_cooler') {
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 24, 12, 24);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 14, 8, 13);
    ctx.fillStyle = '#ffcad4'; ctx.fillRect(px + 2, py - 23, 8, 8);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 4, py - 13, 2, 2);
  } else if (d.type === 'rooftop_hvac') {
    const w = d.w || 36, h = d.h || 24;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - h, w, h);
    ctx.fillStyle = '#1e0524'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 4);
    const cx = px + Math.floor(w / 2), cy = py - Math.floor(h / 2);
    ctx.fillStyle = '#07020a'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
    const angle = (frame * 0.3) % (Math.PI * 2);
    ctx.strokeStyle = '#ff2a70'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(cx - Math.cos(angle) * 6, cy - Math.sin(angle) * 6);
    ctx.lineTo(cx + Math.cos(angle) * 6, cy + Math.sin(angle) * 6); ctx.stroke();
  } else if (d.type === 'rooftop_antenna') {
    const h = d.h || 52;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px + 1, py - h, 3, h);
    ctx.fillStyle = '#8f143c'; ctx.fillRect(px + 2, py - h + 2, 1, h - 2);
    for (let y = py - h + 12; y < py - 6; y += 10) { ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 5, y, 15, 2); }
    const beacon = (frame % 20 < 10);
    ctx.fillStyle = beacon ? '#ff2a70' : '#3b0820'; ctx.fillRect(px - 2, py - h - 4, 9, 5);
    if (beacon) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 1, py - h - 3, 3, 3); }
  } else if (d.type === 'helipad' || d.subType === 'city_helipad') {
    const w = d.w || 64;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 4, w, 4);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 3, w - 8, 2);
    const hx = px + Math.floor(w / 2) - 6;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(hx, py - 12, 3, 10); ctx.fillRect(hx + 9, py - 12, 3, 10);
    ctx.fillRect(hx + 3, py - 8, 6, 2);
  } else if (d.subType === 'skyscraper_doors' && typeof drawSkyscraperDoors === 'function') {
    drawSkyscraperDoors(ctx, px, py, false, frame);
  } else if (d.subType === 'lobby_reception_desk' && typeof drawReceptionDesk === 'function') {
    drawReceptionDesk(ctx, px, py, frame);
  } else if (d.subType === 'lobby_turnstiles' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'turnstile', frame);
  } else if (d.subType === 'lobby_elevator' && typeof drawLobbyElevator === 'function') {
    drawLobbyElevator(ctx, px, py, d.isRooftop, frame);
  } else if (d.subType === 'lobby_decor_palm' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'palm', frame);
  } else if (d.subType === 'lobby_decor_bench' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'bench', frame);
  } else if (d.subType === 'lobby_chandelier' && typeof drawLobbyChandelier === 'function') {
    drawLobbyChandelier(ctx, px, py, frame);
  } else if (d.subType === 'lobby_luggage_cart' && typeof drawLuggageCart === 'function') {
    drawLuggageCart(ctx, px, py, frame);
  } else if (d.subType === 'lobby_directory_board' && typeof drawDirectoryBoard === 'function') {
    drawDirectoryBoard(ctx, px, py, frame);
  } else if (d.subType === 'lobby_evacuation_siren' && typeof drawEvacuationSiren === 'function') {
    drawEvacuationSiren(ctx, px, py, frame);
  } else if (d.subType === 'lobby_stanchions' && typeof drawStanchions === 'function') {
    drawStanchions(ctx, px, py);
  } else if (d.subType === 'lobby_lounge_table' && typeof drawLoungeTable === 'function') {
    drawLoungeTable(ctx, px, py);
  } else if (d.subType === 'lobby_water_cooler') {
    drawOfficeDecoration(ctx, { type: 'office_cooler', x: px, y: py }, frame);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawOfficeDecoration = drawOfficeDecoration;
}

if (typeof module !== 'undefined') {
  module.exports = { drawOfficeDecoration };
}
