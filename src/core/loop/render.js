// ============================================================================
// RENDERIZADO PRINCIPAL (60 FPS)
// ============================================================================
function draw() {
  ctx.save();
  ctx.scale(renderScale, renderScale);
  ctx.imageSmoothingEnabled = false;

  if (shakeTime > 0) {
    const dx = (Math.random() - 0.5) * 2 * shakeMagnitude;
    const dy = (Math.random() - 0.5) * 2 * shakeMagnitude;
    ctx.translate(Math.round(dx), Math.round(dy));
  }

  if (drawMenuOrCutsceneScreen()) return;

  const isGardenLevel = !level || !level.theme || level.theme === 'garden';

  // Fondo dinámico según el tema del nivel ('garden', 'volcano' o 'coastal')
  drawParallaxBackground(level.theme || 'garden');

  // ================== MUNDO DEL NIVEL (CON CÁMARA 2D X/Y) ==================
  ctx.save();
  const smoothCamX = Math.round(cameraX * renderScale) / renderScale;
  const smoothCamY = Math.round(cameraY * renderScale) / renderScale;
  ctx.translate(-smoothCamX, -smoothCamY);

  const viewL = cameraX - 70;
  const viewR = cameraX + W + 70;
  const viewT = cameraY - 70;
  const viewB = cameraY + H + 70;

  // Luciérnagas del Jardín o Brasas Volcánicas flotando
  for (const f of fireflies) {
    if (f.x < viewL || f.x > viewR) continue;
    const fx = f.x + Math.sin(globalFrame * 0.03 + f.phase) * 8;
    const fy = f.y + Math.cos(globalFrame * 0.04 + f.phase) * 6;
    if (isGardenLevel) {
      if (f.x < 1750) {
        const sway = Math.sin(globalFrame * 0.05 + f.phase) * 3;
        ctx.fillStyle = f.phase % 2 === 0 ? '#ffb3c6' : '#ffffff';
        ctx.fillRect(Math.round(fx + sway), Math.round(fy), 3, 2);
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(Math.round(fx + sway) + 1, Math.round(fy), 1, 1);
      } else {
        ctx.fillStyle = 'rgba(149, 213, 178, 0.55)';
        ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
      }
    } else if (level && level.theme === 'volcano') {
      ctx.fillStyle = 'rgba(255, 120, 0, 0.55)';
      ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
    } else if (level && level.theme === 'space') {
      ctx.fillStyle = f.phase % 2 === 0 ? 'rgba(255, 42, 112, 0.7)' : 'rgba(255, 209, 102, 0.8)';
      ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
    }
  }

  // Fondo arquitectonico de la Heladeria de Sami (X: 7300 -> 7750)
  if (level && level.id === 3 && typeof drawIceCreamParlorBackdrop === 'function') {
    drawIceCreamParlorBackdrop(ctx, viewL, viewR, globalFrame);
  }

  // Fondo arquitectonico del interior del Rascacielos (Lobby: X: 13450 -> 14050)
  if (level && level.id === 3 && typeof drawSkyscraperLobbyBackdrop === 'function') {
    drawSkyscraperLobbyBackdrop(ctx, viewL, viewR, globalFrame);
  }

  // Fondo arquitectonico de interiores del Pueblo Nevado (Taberna: X: 15000 -> 15300)
  if (level && level.theme === 'snow' && typeof drawSnowVillageInteriors === 'function') {
    drawSnowVillageInteriors(ctx, viewL, viewR, globalFrame);
  }

  // Decoraciones ambientales del nivel con frustum culling
  if (level.decorations) {
    for (const d of level.decorations) {
      const dw = d.w || 90;
      if (d.x + dw < viewL || d.x - dw > viewR) continue;
      if (level && (level.theme === 'coastal' || level.theme === 'coastal_sunset') && window.sprites.drawCoastalDecoration) {
        window.sprites.drawCoastalDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'snow' && window.sprites.drawSnowDecoration) {
        window.sprites.drawSnowDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'space' && window.sprites.drawSpaceDecoration) {
        window.sprites.drawSpaceDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'volcano') {
        window.sprites.drawVolcanoDecor(ctx, d, globalFrame);
      } else {
        window.sprites.drawGardenDecor(ctx, d, globalFrame);
      }
    }
  }

  // Faroles y Lirios con culling
  if (level.lanterns) {
    for (const l of level.lanterns) {
      if (l.x < viewL || l.x > viewR) continue;
      window.sprites.drawLantern(ctx, l.x, l.y, globalFrame);
    }
  }
  if (level.lilies) {
    for (const li of level.lilies) {
      if (li.x < viewL || li.x > viewR) continue;
      const dist = Math.abs((player.x + 11) - li.x);
      const sway = dist < 20 ? (player.facingRight ? 2 : -2) : Math.sin(globalFrame * 0.06 + li.x) * 1.2;
      window.sprites.drawWildLily(ctx, li.x, li.y, sway);
    }
  }

  // Cascadas / Paredes verticales de Lava
  for (const lw of lavaWalls) {
    if (lw.x + lw.w < viewL || lw.x > viewR) continue;
    drawLavaWall(lw);
  }

  // Flores de Brisa Mágica / Géiseres Térmicos
  for (const g of geysers) {
    if (g.x + 35 < viewL || g.x > viewR) continue;
    window.sprites.drawGeyser(ctx, g, globalFrame, isGardenLevel);
  }

  // Plataformas con frustum culling
  for (const p of level.platforms) {
    if (p.x + p.w < viewL || p.x > viewR || p.y + p.h < viewT || p.y > viewB) continue;
    drawPlatform(p);
  }

  // Olas de rompiente del desafío de surf de Kai
  if (typeof drawKaiWaves === 'function') {
    drawKaiWaves(ctx);
  }

  // Puerta del Castillo de Omni-Man
  if (level.bossCastleGate) {
    drawBossCastleGate(level.bossCastleGate);
  }

  // Checkpoints
  for (const cp of checkpoints) {
    if (cp.x < viewL || cp.x > viewR) continue;
    window.sprites.drawCheckpoint(ctx, cp.x, cp.y, cp.active, globalFrame, isGardenLevel);
  }

  // NPCs con sombra Chiki's Chase
  for (const npc of npcs) {
    if (npc.x < viewL || npc.x > viewR) continue;
    drawDropShadow(ctx, npc.x + 8, npc.y + 15, 8, 2.8, 0.32);
    window.sprites.drawNPC(ctx, npc.x, npc.y, npc, globalFrame, isGardenLevel);
  }

  // Espinas con culling
  for (const s of (level.spikes || [])) {
    if (s.x + s.w < viewL || s.x > viewR) continue;
    drawSpikes(s);
  }

  // Botones de Secuencia de Color
  for (let i = 0; i < colorPads.length; i++) {
    const pad = colorPads[i];
    if (pad.x + pad.w < viewL || pad.x > viewR) continue;
    const isTarget = homelanderPuzzle && !homelanderPuzzle.solved && homelanderPuzzle.sequence[homelanderPuzzle.currentIndex] === pad.id;
    const isWrong = pad.wrongFlash > 0;
    window.sprites.drawColorPad(ctx, pad, isTarget, pad.activated, isWrong, globalFrame);
  }

  // Quesos del nivel con sombra precalculada y culling
  for (const c of cheeses) {
    if (!c.collected && c.x >= viewL && c.x <= viewR) {
      const cy = c.groundY ?? (c.y + 16);
      drawDropShadow(ctx, c.x + 6, cy, 6.5, 2.4, 0.22);
      window.sprites.drawCheese(ctx, c.x, c.y, globalFrame);
    }
  }

  // Lirios de Dexter físicos caídos de enemigos
  for (const dl of droppedLilies) {
    if (dl.x >= viewL && dl.x <= viewR) {
      drawDropShadow(ctx, dl.x + 4, dl.y + 12, 5.5, 2.0, 0.24);
      window.sprites.drawDroppedLily(ctx, dl.x, dl.y, globalFrame);
    }
  }

  // Último pedazo de llave de Don Pancho (Fase 4)
  if (typeof drawDonPanchoHotdogsWorld === 'function') {
    drawDonPanchoHotdogsWorld(ctx);
  }

  // Portal Interdimensional
  if (exitPortal && exitPortal.x >= viewL && exitPortal.x <= viewR) {
    window.sprites.drawPortal(ctx, exitPortal.x, exitPortal.y, globalFrame, exitPortal.scale);
  }
  if (typeof drawPortalTeleportWorld === 'function') {
    drawPortalTeleportWorld(ctx, viewL, viewR);
  }

  // Hijo Ratoncito en la meta con sombra
  if (level.babyMouse && level.babyMouse.x >= viewL && level.babyMouse.x <= viewR) {
    drawDropShadow(ctx, level.babyMouse.x + 8, level.babyMouse.y + 15, 7, 2.5, 0.32);
    window.sprites.drawBabyMouse(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, level.babyMouse.id || 1);
    if (level.babyMouse.requiresBossDefeat && omniMen.length > 0) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, false);
    } else if (level.babyMouse.requiresPuzzle && homelanderPuzzle && !homelanderPuzzle.solved) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, true);
    } else if (level.id === 4 && typeof astralBossState !== 'undefined' && astralBossState && !astralBossState.isDefeated) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, true);
    }
  }

  // Criaturas y enemigos con frustum culling
  for (const mc of magmaCrawlers) {
    if (mc.x < viewL || mc.x > viewR) continue;
    drawDropShadow(ctx, mc.x + 10, mc.y + 13, 9, 3, 0.28);
    window.sprites.drawMagmaCrawler(ctx, mc.x, mc.y, mc.dir > 0, globalFrame, mc.variant || 'magma');
  }
  for (const fb of fireBats) {
    if (fb.x < viewL || fb.x > viewR) continue;
    window.sprites.drawFireBat(ctx, fb.x, fb.y, globalFrame, fb.variant || 'fire_bat');
  }
  for (const lh of lavaHoppers) {
    if (lh.x < viewL || lh.x > viewR) continue;
    drawDropShadow(ctx, lh.x + 8, lh.y + 16, 7, 2.5, 0.28);
    window.sprites.drawLavaHopper(ctx, lh.x, lh.y, lh.dir > 0, lh.inAir, globalFrame);
  }
  for (const fw of flameWisps) {
    if (fw.x < viewL || fw.x > viewR) continue;
    window.sprites.drawFlameWisp(ctx, fw.x, fw.y, globalFrame);
  }
  for (const ob of obsidianBrutes) {
    if (ob.x < viewL || ob.x > viewR) continue;
    drawDropShadow(ctx, ob.x + 12, ob.y + 24, 13, 4, 0.38);
    window.sprites.drawObsidianBrute(ctx, ob.x, ob.y, ob.dir > 0, ob.hp, ob.maxHp, ob.hitTimer > 0, globalFrame);
  }
  for (const mw of magmaWorms) {
    if (mw.x < viewL || mw.x > viewR) continue;
    window.sprites.drawMagmaWorm(ctx, mw.x, mw.y, globalFrame);
  }

  // Boss Omni-Man Volador (5 Vidas, se enfurece tras 2 golpes, solo ataca dentro de su Castillo)
  for (const om of omniMen) {
    if (om.bossState === 'slam_aim') {
      ctx.fillStyle = Math.floor(globalFrame / 2) % 2 === 0 ? 'rgba(255, 0, 85, 0.45)' : 'rgba(255, 209, 102, 0.35)';
      ctx.fillRect(Math.round(om.x + 6), Math.round(om.y + 24), 12, Math.round(om.groundY - om.y + 4));
    }
    const isThrowing = bossFightActive && om.bossState === 'patrol' && om.timer < 0.45;
    window.sprites.drawOmniMan(
      ctx,
      om.x,
      om.y,
      om.facingRight,
      isThrowing,
      globalFrame,
      om.hp,
      om.maxHp,
      om.hitTimer > 0,
      om.bossState,
      om.isEnraged
    );
  }

  // Proyectiles de Rocas de Magma y Ondas de Choque a ras de suelo
  for (const r of magmaRocks) {
    if (r.isShockwave) {
      const rx = Math.round(r.x);
      const ry = Math.round(r.y);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(rx - 6, ry - 10, 12, 12);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(rx - 3, ry - 7, 6, 8);
    } else {
      window.sprites.drawMagmaRock(ctx, r.x, r.y, globalFrame);
    }
  }

  // Estelas de Doble Salto o Lava Run
  for (const ai of afterimages) {
    ctx.save();
    ctx.globalAlpha = ai.alpha;
    window.sprites.drawMamaMouse(ctx, ai.x, ai.y, 'jump', 0, ai.facingRight, 1, 1, -100, ai.isLavaDash, saveState.equippedSkin);
    ctx.restore();
  }

  // Sombra dinámica bajo Mamá Ratón (Chiki's Chase style: proyectada en la plataforma bajo sus patas)
  const mamaFeetX = player.x + player.w / 2;
  const mamaFeetY = player.y + player.h;
  const groundY = getGroundYUnder(mamaFeetX, mamaFeetY, 120);
  if (groundY !== null) {
    const fallDist = Math.max(0, groundY - mamaFeetY);
    const shadowScale = Math.max(0.35, 1 - fallDist / 120);
    const shadowAlpha = Math.max(0.12, 0.34 * shadowScale);
    drawDropShadow(ctx, mamaFeetX, groundY + 1, 9 * shadowScale, 3.2 * shadowScale, shadowAlpha);
  }

  // Mamá Ratón (Modo Surfing, Teletransporte o Caminata Normal)
  if (typeof isPortalPlayerHidden === 'function' && isPortalPlayerHidden()) {
    // Elizabeth oculta dentro del hiperespacio entre entrada y salida
  } else if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) {
    const pt = typeof getPortalPlayerTransform === 'function' ? getPortalPlayerTransform() : null;
    const px = pt ? pt.x : player.x;
    const py = pt ? pt.y : player.y;
    const pAlpha = pt && typeof pt.alpha === 'number' ? pt.alpha : 1;
    const pSquashX = pt && typeof pt.squashX === 'number' ? pt.squashX : player.squashX;
    const pSquashY = pt && typeof pt.squashY === 'number' ? pt.squashY : player.squashY;
    const pState = pt && pt.state ? pt.state : player.state;

    ctx.save();
    ctx.globalAlpha = pAlpha;
    window.sprites.drawMamaMouse(
      ctx,
      px,
      py,
      pState,
      player.animFrame,
      player.facingRight,
      pSquashX,
      pSquashY,
      0,
      false,
      saveState.equippedSkin
    );
    if (portalTeleportState && (portalTeleportState.phase === 'aim' || portalTeleportState.phase === 'fire')) {
      if (typeof drawPortalGunOnPlayer === 'function') {
        drawPortalGunOnPlayer(ctx, { x: px, y: py, facingRight: player.facingRight }, globalFrame, portalTeleportState.gunRecoil);
      }
    }
    ctx.restore();
  } else if (player.invulnTimer <= 0 || Math.floor(globalFrame / 3) % 2 === 0) {
    if (player.isSurfing && window.sprites.drawMamaSurfing) {
      window.sprites.drawMamaSurfing(
        ctx,
        player.x,
        player.y,
        player.facingRight,
        player.dashTimer > 0,
        globalFrame,
        saveState.equippedSkin,
        saveState.surfboardSkin
      );
    } else if (player.isDigging) {
      // Ratona excavando túnel: medio sumergida en el banco de nieve
      ctx.save();
      ctx.beginPath();
      ctx.rect(player.x - 8, player.y - 12, player.w + 16, player.h + 2);
      ctx.clip();
      window.sprites.drawMamaMouse(
        ctx,
        player.x,
        player.y + 11,
        'run',
        player.animFrame,
        player.facingRight,
        player.squashX,
        player.squashY,
        0,
        false,
        saveState.equippedSkin
      );
      ctx.restore();
    } else {
      window.sprites.drawMamaMouse(
        ctx,
        player.x,
        player.y,
        player.state,
        player.animFrame,
        player.facingRight,
        player.squashX,
        player.squashY,
        player.vy,
        player.dashTimer > 0,
        saveState.equippedSkin
      );
    }

    // Ranita de Raúl sobre la cabeza de Mamá Ratón
    if (typeof drawFrogOnHead === 'function') {
      drawFrogOnHead(ctx, player, globalFrame);
    }
  }

  // Homelander (Nivel 1)
  if (homelander) {
    drawHomelanderAndLaser();
  }

  // Indicador visual de interacción con NPC (Flecha hacia abajo para hablar)
  if (nearbyNpc && gameState === 'PLAYING') {
    const bob = Math.sin(globalFrame * 0.18) * 2;
    const nx = Math.round(nearbyNpc.x + 8);
    const ny = Math.round(nearbyNpc.y - 19 + bob);
    drawRoundedPanel(nx - 11, ny - 9, 22, 15, 4, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.2);
    // Flecha hacia abajo pixel art en dorado y blanco
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(nx - 1, ny - 6, 2, 5);
    ctx.fillRect(nx - 4, ny - 1, 8, 2);
    ctx.fillRect(nx - 3, ny + 1, 6, 1);
    ctx.fillRect(nx - 2, ny + 2, 4, 1);
    ctx.fillRect(nx - 1, ny + 3, 2, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(nx - 1, ny - 5, 2, 2);
  }

  // Indicador interactivo de puertas y ascensor del rascacielos
  if (typeof drawSkyscraperDoorPrompt === 'function') {
    drawSkyscraperDoorPrompt(ctx);
  }

  // Indicador interactivo de consola arcade
  if (typeof drawArcadeCabinetPrompt === 'function') {
    drawArcadeCabinetPrompt(ctx);
  }

  // Efectos de sorpresa sísmica en la azotea (signo !!! sobre Mamá Ratón)
  if (typeof drawRooftopShockEffects === 'function') {
    drawRooftopShockEffects(ctx);
  }

  // Kraken de las Profundidades (Combate Mundo 3 • Fase 5)
  if (typeof drawKrakenBossWorld === 'function') {
    drawKrakenBossWorld(ctx);
  }

  // Gran Yeti de Cristal (Combate Mundo 4 • Fase 6)
  if (typeof drawYetiBoss === 'function') {
    drawYetiBoss(ctx);
  }

  // Mecánicas de Kangshung: Vórtices y Seracs (Mundo 4 • Fase 6)
  if (typeof drawKangshungMechanics === 'function') {
    drawKangshungMechanics(ctx);
  }

  // Dragón Astral de Polaris (Jefe Final Mundo 4 • Fase 9)
  if (typeof drawAstralBoss === 'function') {
    drawAstralBoss(ctx);
  }

  // Habilidades Mundo 4: Pala y Pico de Hielo
  if (typeof drawShovelWorld === 'function') drawShovelWorld(ctx);
  if (typeof drawIcePickWorld === 'function') drawIcePickWorld(ctx);

  // Partículas atmosféricas y post-procesado
  drawAtmosphericParticlesAndVignette();
  drawHUDAndOverlayScenes();
}
