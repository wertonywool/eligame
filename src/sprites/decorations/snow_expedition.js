// ============================================================================
// SPRITES MUNDO 4: DECORACIONES DE EXPEDICIÓN ALPINAS (PIXEL ART)
// ============================================================================
// Carpa geodésica, banderines tibetanos, pináculos de hielo, arco glacial y estufa.

function drawSherpaTent(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 48;
  const h = 26;

  // Falda de nieve que sella la carpa contra el viento
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 4, py - 4, w + 8, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 3, py - 5, w + 6, 2);

  // Cúpula geodésica de expedición (amarillo y naranja de alta visibilidad)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2), h, 0, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2) - 2, h - 2, 0, Math.PI, 0);
  ctx.fill();

  // Varillas de aluminio geodésico curvas
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(px + 14, py - 2, 18, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + w - 14, py - 2, 18, Math.PI, 0);
  ctx.stroke();

  // Entrada con cremallera y resplandor interior cálido
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - 18, 10, 18);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + Math.floor(w / 2) - 3, py - 16, 6, 14);

  // Nieve acumulada en la parte superior
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - h + 1, 10, 3, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPrayerFlags(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const span = 64;

  // Postes de madera en los extremos
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 32, 4, 32);
  ctx.fillRect(px + span - 2, py - 32, 4, 32);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 1, py - 31, 2, 31);
  ctx.fillRect(px + span - 1, py - 31, 2, 31);

  // Cuerda combada
  ctx.strokeStyle = '#d7ccc8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px, py - 28);
  ctx.quadraticCurveTo(px + Math.floor(span / 2), py - 18, px + span, py - 28);
  ctx.stroke();

  // 5 Banderines tibetanos
  const colors = ['#2563eb', '#ffffff', '#dc2626', '#16a34a', '#f59e0b'];
  for (let i = 0; i < 5; i++) {
    const t = (i + 0.5) / 5;
    const fx = Math.round(px + t * span);
    const fy = Math.round((py - 28) * (1 - t) * (1 - t) + 2 * (py - 18) * (1 - t) * t + (py - 28) * t * t);
    const flutter = Math.sin(frame * 0.2 + i * 1.5) * 2;

    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(fx - 4, fy);
    ctx.lineTo(fx + 4, fy);
    ctx.lineTo(fx + 2 + flutter, fy + 8);
    ctx.lineTo(fx - 4 + flutter, fy + 8);
    ctx.closePath();
    ctx.fill();
  }
}

function drawIceSpire(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 42;
  const w = 18;

  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(px - Math.floor(w / 2), py);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px + Math.floor(w / 2), py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(px - Math.floor(w / 3), py);
  ctx.lineTo(px, py - h + 2);
  ctx.lineTo(px + Math.floor(w / 2), py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#90e0ef';
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px, py - h + 4);
  ctx.lineTo(px + Math.floor(w / 2) - 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - h + 2, 2, h - 8);
}

function drawIceArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 84;
  const h = 68;

  // Arco monumental de hielo glacial translúcido
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2), Math.PI, 0);
  ctx.lineTo(px + w - 14, py);
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 14, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 2, Math.PI, 0);
  ctx.lineTo(px + w - 12, py);
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 12, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  // Escarcha y nieve en la parte superior
  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) + 2, Math.PI * 0.75, Math.PI * 0.25, true);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + Math.floor(w / 2) - 18, py - h + 12, 36, 4);

  // Carámbanos colgantes del vano interior
  ctx.fillStyle = '#caf0f8';
  for (let ix = px + 22; ix < px + w - 22; ix += 10) {
    const iLen = 4 + ((ix * 7) % 6);
    ctx.fillRect(ix, py - Math.floor(h * 0.55), 2, iLen);
  }
}

function drawExpeditionStove(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Botella de gas de alta montaña (naranja/gris)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 5, py - 8, 10, 8);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(px - 4, py - 7, 8, 6);

  // Quemador y llama azul/naranja viva
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 3, py - 11, 6, 3);
  const flicker = Math.sin(frame * 0.4) * 1.5;
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 2, py - 14 + flicker, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 13 + flicker, 2, 2);

  // Tetera de expedición
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 6, py - 22, 12, 8);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 5, py - 21, 10, 6);
  // Asa y pico
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 20, 2, 4);
  ctx.fillRect(px - 4, py - 24, 8, 2);

  // Volutas de vapor caliente
  for (let s = 0; s < 2; s++) {
    const sOff = ((frame * 0.35 + s * 10) % 20);
    const sx = px - 8 + Math.sin(frame * 0.08 + s) * 3 - sOff * 0.2;
    const sy = py - 24 - sOff;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.4 - sOff * 0.02) + ')';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }
}

function drawClimbingGearRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Piolets / picos de hielo cruzados en la nieve
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 8, py - 16, 2, 16);
  ctx.fillRect(px + 6, py - 16, 2, 16);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 10, py - 18, 6, 2);
  ctx.fillRect(px + 4, py - 18, 6, 2);

  // Cuerda de escalada roja/amarilla enrollada
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(px - 1, py - 6, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px - 1, py - 6, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nieve en la base
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 2, 24, 2);
}

function drawSnowDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.subType === 'alpine_cabin') drawAlpineCabin(ctx, px, py, frame);
  else if (d.subType === 'alpine_pine') drawAlpinePine(ctx, px, py, d.scale || 1, frame);
  else if (d.subType === 'alpine_sign') drawAlpineSign(ctx, px, py, frame);
  else if (d.subType === 'firewood_pile') drawFirewoodPile(ctx, px, py, frame);
  else if (d.subType === 'snow_lantern') drawSnowLantern(ctx, px, py, frame);
  else if (d.subType === 'sherpa_tent') drawSherpaTent(ctx, px, py, frame);
  else if (d.subType === 'prayer_flags') drawPrayerFlags(ctx, px, py, frame);
  else if (d.subType === 'ice_spire') drawIceSpire(ctx, px, py, frame);
  else if (d.subType === 'ice_arch') drawIceArch(ctx, px, py, frame);
  else if (d.subType === 'expedition_stove') drawExpeditionStove(ctx, px, py, frame);
  else if (d.subType === 'climbing_gear_rack') drawClimbingGearRack(ctx, px, py, frame);
  else if (d.subType === 'frozen_ladder' && typeof drawFrozenLadder === 'function') drawFrozenLadder(ctx, px, py, d.h || 48, frame);
  else if (d.subType === 'ice_crystal_cluster' && typeof drawIceCrystalCluster === 'function') drawIceCrystalCluster(ctx, px, py, frame);
  else if (d.subType === 'hanging_rope' && typeof drawHangingRope === 'function') drawHangingRope(ctx, px, py, d.h || 40, frame);
  else if (d.subType === 'alpine_tavern' && typeof drawAlpineTavernFacade === 'function') drawAlpineTavernFacade(ctx, px, py, frame);
  else if (d.subType === 'tavern_fireplace' && typeof drawTavernFireplace === 'function') drawTavernFireplace(ctx, px, py, frame);
  else if (d.subType === 'tavern_counter' && typeof drawTavernCounter === 'function') drawTavernCounter(ctx, px, py, frame);
  else if (d.subType === 'tavern_table' && typeof drawTavernTable === 'function') drawTavernTable(ctx, px, py, frame);
  else if (d.subType === 'village_street_sign' && typeof drawVillageStreetSign === 'function') drawVillageStreetSign(ctx, px, py, frame);
  else if (d.subType === 'hat_shop_facade' && typeof drawHatShopFacade === 'function') drawHatShopFacade(ctx, px, py, frame);
  else if (d.subType === 'shop_display_rack' && typeof drawShopDisplayRack === 'function') drawShopDisplayRack(ctx, px, py, frame);
  else if (d.subType === 'mannequin_with_hat' && typeof drawMannequinWithHat === 'function') drawMannequinWithHat(ctx, px, py, frame);
  else if (d.subType === 'depressed_cabin_facade' && typeof drawDepressedCabinFacade === 'function') drawDepressedCabinFacade(ctx, px, py, frame);
  else if (d.subType === 'depressed_room_furniture' && typeof drawDepressedRoomFurniture === 'function') drawDepressedRoomFurniture(ctx, px, py, frame);
  else if (d.subType === 'ice_pick_stand' && typeof drawIcePickStand === 'function') drawIcePickStand(ctx, px, py, frame);
  else if (d.subType === 'arcade_facade' && typeof drawArcadeFacade === 'function') drawArcadeFacade(ctx, px, py, frame);
  else if (d.subType === 'arcade_cabinet' && typeof drawArcadeCabinet === 'function') drawArcadeCabinet(ctx, px, py, frame);
  else if (d.subType === 'neon_sign_cluster' && typeof drawNeonSignCluster === 'function') drawNeonSignCluster(ctx, px, py, frame);
  else if (d.subType === 'bakery_facade' && typeof drawBakeryFacade === 'function') drawBakeryFacade(ctx, px, py, frame);
  else if (d.subType === 'bakery_oven' && typeof drawBakeryOven === 'function') drawBakeryOven(ctx, px, py, frame);
  else if (d.subType === 'bakery_counter' && typeof drawBakeryDisplayCounter === 'function') drawBakeryDisplayCounter(ctx, px, py, frame);
  else if (d.subType === 'forge_facade' && typeof drawForgeFacade === 'function') drawForgeFacade(ctx, px, py, frame);
  else if (d.subType === 'forge_anvil' && typeof drawIceForgeAnvilAndFurnace === 'function') drawIceForgeAnvilAndFurnace(ctx, px, py, frame);
  else if (d.subType === 'forge_tool_rack' && typeof drawForgeToolRack === 'function') drawForgeToolRack(ctx, px, py, frame);
  else if (d.subType === 'townhall_facade' && typeof drawTownHallFacade === 'function') drawTownHallFacade(ctx, px, py, frame);
  else if (d.subType === 'townhall_desk' && typeof drawTownHallMayorDesk === 'function') drawTownHallMayorDesk(ctx, px, py, frame);
  else if (d.subType === 'glacial_exit_gate' && typeof drawGlacialGateArch === 'function') drawGlacialGateArch(ctx, px, py, frame);
  else if (d.subType === 'ice_fishing_hut' && typeof drawIceFishingHut === 'function') drawIceFishingHut(ctx, px, py, frame);
  else if (d.subType === 'ice_sculpture' && typeof drawIceSculpture === 'function') drawIceSculpture(ctx, px, py, frame);
  else if (d.subType === 'frozen_buoy' && typeof drawFrozenLakeBuoy === 'function') drawFrozenLakeBuoy(ctx, px, py, frame);
  else if (d.subType === 'glacial_altar' && typeof drawGlacialAltar === 'function') drawGlacialAltar(ctx, px, py, frame);
  else if (d.subType === 'crevasse_marker' && typeof drawIceCrevasseMarker === 'function') drawIceCrevasseMarker(ctx, px, py, frame);
  else if (d.subType === 'summit_signpost' && typeof drawSummitSignpost === 'function') drawSummitSignpost(ctx, px, py, frame);
  else if (d.subType === 'ladder_bridge' && typeof drawAluminumLadderBridge === 'function') drawAluminumLadderBridge(ctx, px, py, d.w || 64, frame);
  else if (d.subType === 'oxygen_depot' && typeof drawOxygenDepot === 'function') drawOxygenDepot(ctx, px, py, frame);
  else if (d.subType === 'fixed_ropes' && typeof drawFixedRopesAnchor === 'function') drawFixedRopesAnchor(ctx, px, py, d.h || 60, frame);
  else if (d.subType === 'weather_station' && typeof drawWeatherStationMast === 'function') drawWeatherStationMast(ctx, px, py, frame);
  else if (d.subType === 'prayer_cairn' && typeof drawPrayerCairn === 'function') drawPrayerCairn(ctx, px, py, frame);
  else if (d.subType === 'summit_monument' && typeof drawSummitVictoryMonument === 'function') drawSummitVictoryMonument(ctx, px, py, frame);
  else if (d.subType === 'hillary_step_ropes' && typeof drawHillaryStepRopes === 'function') drawHillaryStepRopes(ctx, px, py, d.h || 64, frame);
  else if (d.subType === 'assault_tent' && typeof drawAssaultTent === 'function') drawAssaultTent(ctx, px, py, frame);
  else if (d.subType === 'summit_nest' && typeof drawSummitNest === 'function') drawSummitNest(ctx, px, py, frame);
  else if (d.subType === 'yeti_tracks' && typeof drawYetiFootprint === 'function') drawYetiFootprint(ctx, px, py, frame);
  else if (d.subType === 'ice_cavern_arch' && typeof drawIceCavernArch === 'function') drawIceCavernArch(ctx, px, py, frame);
  else if (d.subType === 'runic_crystal_spire' && typeof drawRunicCrystalSpire === 'function') drawRunicCrystalSpire(ctx, px, py, frame);
  else if (d.subType === 'yeti_warning_totem' && typeof drawYetiWarningTotem === 'function') drawYetiWarningTotem(ctx, px, py, frame);
  else if (d.subType === 'frost_bridge' && typeof drawHangingFrostBridge === 'function') drawHangingFrostBridge(ctx, px, py, d.w || 120, frame);
  else if (d.subType === 'polar_vortex' && typeof drawPolarWindVortex === 'function') drawPolarWindVortex(ctx, px, py, frame);
  else if (d.subType === 'blue_fire_brazier' && typeof drawBlueBrazier === 'function') drawBlueBrazier(ctx, px, py, frame);
  else if (d.subType === 'sanctuary_portal_arch' && typeof drawSanctuaryPortalArch === 'function') drawSanctuaryPortalArch(ctx, px, py, frame);
  else if (d.subType === 'great_snow_yeti' && typeof drawGreatSnowYeti === 'function') drawGreatSnowYeti(ctx, px, py, frame);
  else if (d.subType === 'yeti_crystal_throne' && typeof drawYetiCrystalThrone === 'function') drawYetiCrystalThrone(ctx, px, py, frame);
  else if (d.subType === 'crystal_lotus' && typeof drawCrystalLotusFlower === 'function') drawCrystalLotusFlower(ctx, px, py, frame);
  else if (d.subType === 'shambhala_prayer_bell' && typeof drawShambhalaPrayerBell === 'function') drawShambhalaPrayerBell(ctx, px, py, frame, d);
  else if (d.subType === 'hot_spring' && typeof drawHotSpringPool === 'function') drawHotSpringPool(ctx, px, py, frame);
  else if (d.subType === 'golden_pagoda_tower' && typeof drawGoldenPagodaTower === 'function') drawGoldenPagodaTower(ctx, px, py, frame);
  else if (d.subType === 'nirvana_lotus_altar' && typeof drawNirvanaLotusAltar === 'function') drawNirvanaLotusAltar(ctx, px, py, frame);
  else if (d.subType === 'sanctuary_portal_gate' && typeof drawSanctuaryPortalGate === 'function') drawSanctuaryPortalGate(ctx, px, py, frame);
  else if (d.subType === 'kailash_chorten' && typeof drawKailashChorten === 'function') drawKailashChorten(ctx, px, py, frame);
  else if (d.subType === 'astral_star_crystal' && typeof drawAstralStarCrystal === 'function') drawAstralStarCrystal(ctx, px, py, frame);
  else if (d.subType === 'rainbow_bridge' && typeof drawRainbowBridge === 'function') drawRainbowBridge(ctx, px, py, d.w || 180, frame);
  else if (d.subType === 'agartha_crystal_palace' && typeof drawAgarthaCrystalPalace === 'function') drawAgarthaCrystalPalace(ctx, px, py, frame);
  else if (d.subType === 'celestial_star_throne' && typeof drawCelestialStarThrone === 'function') drawCelestialStarThrone(ctx, px, py, frame);
  else if (d.subType === 'cosmic_burrow_portal' && typeof drawCosmicBurrowPortal === 'function') drawCosmicBurrowPortal(ctx, px, py, frame);
  else if (d.subType === 'boreal_pillar' && typeof drawBorealPillar === 'function') drawBorealPillar(ctx, px, py, frame);
  else if (d.subType === 'constellation_arch' && typeof drawConstellationArch === 'function') drawConstellationArch(ctx, px, py, frame);
  else if (d.subType === 'comet_altar' && typeof drawCometAltar === 'function') drawCometAltar(ctx, px, py, frame);
  else if (d.subType === 'nebula_garden_flora' && typeof drawNebulaGardenFlora === 'function') drawNebulaGardenFlora(ctx, px, py, frame);
  else if (d.subType === 'shooting_star_arch' && typeof drawShootingStarArch === 'function') drawShootingStarArch(ctx, px, py, frame);
  else if (d.subType === 'polaris_throne' && typeof drawPolarisThrone === 'function') drawPolarisThrone(ctx, px, py, frame);
  else if (d.subType === 'cosmic_nebula_sanctum' && typeof drawCosmicNebulaSanctum === 'function') drawCosmicNebulaSanctum(ctx, px, py, frame);
  else if (d.subType === 'sanctum_burrow_gate' && typeof drawSanctumBurrowGate === 'function') drawSanctumBurrowGate(ctx, px, py, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSnowDecoration = drawSnowDecoration;
  SpriteManager.prototype.drawSherpaTent = drawSherpaTent;
  SpriteManager.prototype.drawPrayerFlags = drawPrayerFlags;
  SpriteManager.prototype.drawIceSpire = drawIceSpire;
  SpriteManager.prototype.drawIceArch = drawIceArch;
  SpriteManager.prototype.drawExpeditionStove = drawExpeditionStove;
  SpriteManager.prototype.drawClimbingGearRack = drawClimbingGearRack;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSnowDecoration,
    drawSherpaTent,
    drawPrayerFlags,
    drawIceSpire,
    drawIceArch,
    drawExpeditionStove,
    drawClimbingGearRack
  };
}
