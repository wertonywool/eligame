// ============================================================================
// ACTUALIZACIÓN PRINCIPAL (60 FPS)
// ============================================================================
function update(dt) {
  globalFrame += dt * 60;

  if (shakeTime > 0) shakeTime -= dt;
  updateGamepadToast(dt);

  // 1. Pantalla de Menú Principal, Mapa de Mundos o Tienda
  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    if (gameState === 'TITLE' && keys.jumpJustPressed) {
      window.sfx.init();
      window.sfx.playCheese();
      openWorldMap(currentLevelIndex);
    } else if (gameState === 'WORLD_MAP') {
      if (worldMapNavCooldown > 0) worldMapNavCooldown -= dt;

      // Navegación fluida con Teclado (A/D, Flechas) y Mando en el Mapa Estelar
      if (worldMapNavCooldown <= 0) {
        if (keys.right || keyboardState.right) {
          if (selectedWorldIndex < WORLDS_CONFIG.length - 1) {
            selectedWorldIndex++;
            selectedZoneCpId = null;
            worldMapNavCooldown = 0.22;
            if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
          }
        } else if (keys.left || keyboardState.left) {
          if (selectedWorldIndex > 0) {
            selectedWorldIndex--;
            selectedZoneCpId = null;
            worldMapNavCooldown = 0.22;
            if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
          }
        }
      }

      // Desplazamiento horizontal suave (lerp) de la cámara hacia el mundo seleccionado
      targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
      worldMapScrollX += (targetWorldMapScrollX - worldMapScrollX) * Math.min(1, dt * 10);

      if (keys.jumpJustPressed) {
        window.sfx.init();
        if (selectedWorldIndex < 4) {
          jumpToLevelPhase(selectedWorldIndex, selectedZoneCpId);
        } else {
          // Mundo bloqueado
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          shakeTime = 0.2;
          shakeMag = 3;
        }
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Minijuego Arcade Retro (Mundo 4 • Casa 4)
  if (gameState === 'ARCADE_MINIGAME') {
    if (typeof updateArcadeMinigame === 'function') {
      updateArcadeMinigame(dt);
    }
    return;
  }

  // Animación Cinemática de Ensamblaje de Llave Maestra (Mundo 3 • Fase 4)
  if (gameState === 'KEY_ASSEMBLY') {
    if (typeof updateKeyAssembly === 'function') {
      updateKeyAssembly(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Ascensor al Piso 100
  if (gameState === 'ELEVATOR_RIDE') {
    if (typeof updateElevatorCutscene === 'function') {
      updateElevatorCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Terremoto, Megatsunami y Salto en Tabla
  if (gameState === 'TSUNAMI_CUTSCENE') {
    if (typeof updateTsunamiCutscene === 'function') {
      updateTsunamiCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Aparición del Kraken (Mundo 3 • Fase 5)
  if (gameState === 'KRAKEN_INTRO') {
    if (typeof updateKrakenIntro === 'function') {
      updateKrakenIntro(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática Final: Victoria del Kraken y Regreso a la Madriguera
  if (gameState === 'KRAKEN_VICTORY_CUTSCENE') {
    if (typeof updateKrakenVictoryCutscene === 'function') {
      updateKrakenVictoryCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // 2. Pantalla de Victoria Final o Game Over
  if (gameState === 'VICTORY' || gameState === 'GAMEOVER') {
    if (keys.jumpJustPressed) {
      window.sfx.playJump(false);
      if (gameState === 'GAMEOVER') {
        loadLevel(currentLevelIndex);
        gameState = 'PLAYING';
      } else {
        gameState = 'TITLE';
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // 3. Modo Diálogo (Con Hijo Ratón o con un NPC de la Villa)
  if (gameState === 'DIALOGUE') {
    const currentLine = activeDialogueList[dialogueIndex];
    if (currentLine) {
      dialogueTimer += dt;
      if (dialogueTimer >= 0.028 && dialogueCharIndex < currentLine.text.length) {
        dialogueTimer = 0;
        dialogueCharIndex++;
        if (dialogueCharIndex % 2 === 0) {
          const isBaby = currentLine.speaker.includes('Hijo');
          window.sfx.playBlip(isBaby);
        }
      }

      const hasChoices = currentLine.choices && currentLine.choices.length > 0 && dialogueCharIndex >= currentLine.text.length;
      if (hasChoices) {
        if (typeof dialogueChoiceIndex === 'undefined') dialogueChoiceIndex = 0;
        if (keys.rightJustPressed) {
          dialogueChoiceIndex = (dialogueChoiceIndex + 1) % currentLine.choices.length;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        } else if (keys.leftJustPressed) {
          dialogueChoiceIndex = (dialogueChoiceIndex - 1 + currentLine.choices.length) % currentLine.choices.length;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        }

        if (keyboardState['1'] || keyboardState['Digit1'] || keyboardState['Numpad1']) {
          selectDialogueChoice(0);
          keyboardState['1'] = false; keyboardState['Digit1'] = false; keyboardState['Numpad1'] = false;
        } else if (keyboardState['2'] || keyboardState['Digit2'] || keyboardState['Numpad2']) {
          selectDialogueChoice(1);
          keyboardState['2'] = false; keyboardState['Digit2'] = false; keyboardState['Numpad2'] = false;
        } else if (keyboardState['3'] || keyboardState['Digit3'] || keyboardState['Numpad3']) {
          selectDialogueChoice(2);
          keyboardState['3'] = false; keyboardState['Digit3'] = false; keyboardState['Numpad3'] = false;
        } else if (keys.jumpJustPressed) {
          selectDialogueChoice(dialogueChoiceIndex);
        }
        keys.jumpJustPressed = false;
        keys.dashJustPressed = false;
        return;
      }

      if (keys.jumpJustPressed || keys.downJustPressed) {
        if (dialogueCharIndex < currentLine.text.length) {
          dialogueCharIndex = currentLine.text.length;
        } else {
          dialogueIndex++;
          dialogueCharIndex = 0;
          if (dialogueIndex >= activeDialogueList.length) {
            if (dialogueMode === 'NPC') {
              // Termina de hablar con el NPC y sigue jugando
              if (activeNpc && typeof activeNpc.onDialogueEnd === 'function') {
                activeNpc.onDialogueEnd();
              }
              if (activeNpc && typeof handleNpcQuestDialogueEnd === 'function') {
                handleNpcQuestDialogueEnd(activeNpc);
              }
              activeNpc = null;
              gameState = 'PLAYING';
              keys.downJustPressed = false;
              keys.down = false;
              window.sfx.playJump(false);
            } else {
              // Terminó de hablar con el Hijo Ratón: ¡Se abre el Portal estilo Rick & Morty!
              window.sfx.playPortal();
              exitPortal = {
                x: level.babyMouse.x + 36,
                y: level.babyMouse.y + 6,
                scale: 0.05
              };
              triggerShake(0.18, 2.2);
              spawnStarSparkles(exitPortal.x, exitPortal.y, 14, '#ccff33');
              spawnStarSparkles(exitPortal.x, exitPortal.y, 10, '#ffffff');
              gameState = 'PORTAL_OUT';
            }
          } else {
            window.sfx.playJump(false);
          }
        }
      }
    }
    updateEffects(dt);
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    keys.downJustPressed = false;
    return;
  }

  // 4. Animación de Entrada al Portal Interdimensional (Fin de Nivel -> Casa)
  if (gameState === 'PORTAL_OUT') {
    if (exitPortal.scale < 1) {
      exitPortal.scale = Math.min(1, exitPortal.scale + dt * 3.2);
    }
    // Chispas continuas emanando del portal
    if (globalFrame % 5 === 0) {
      spawnStarSparkles(
        exitPortal.x + (Math.random() - 0.5) * 14,
        exitPortal.y + (Math.random() - 0.5) * 24,
        1,
        '#ccff33'
      );
    }

    // Mamá Ratón y el Hijo caminan hacia el portal verde
    const targetX = exitPortal.x - 6;
    const distPlayer = Math.abs(player.x - targetX);
    player.x += (targetX - player.x) * Math.min(1, dt * 4.5);
    level.babyMouse.x += (targetX - level.babyMouse.x) * Math.min(1, dt * 5.5);
    player.state = 'run';
    player.animFrame += dt * 12;

    // Distorsión gravitatoria / atracción del portal
    if (distPlayer < 22) {
      player.squashX = 0.65;
      player.squashY = 1.35;
    }

    if (distPlayer < 5 && exitPortal.scale >= 0.95) {
      // Estallido de plasma al entrar al hiperespacio
      spawnStarSparkles(exitPortal.x, exitPortal.y, 20, '#ffffff');
      spawnStarSparkles(exitPortal.x, exitPortal.y, 16, '#70e000');
      triggerShake(0.15, 2.0);

      // Guardar hijo rescatado en la Casa
      const babyId = level.babyMouse.id || (currentLevelIndex + 1);
      if (!saveState.rescuedBabies.includes(babyId)) {
        saveState.rescuedBabies.push(babyId);
        persistSave();
      }
      enterSafeHouse(level.babyMouse);
    }
    updateEffects(dt);
    keys.jumpJustPressed = false;
    return;
  }

  // 5. Escena en LA CASA / MADRIGUERA (Continuidad de hijos rescatados + Entrega de Habilidad)
  if (gameState === 'SAFE_HOUSE') {
    houseState.timer += dt;
    if (houseState.phase === 'greeting') {
      if (keys.jumpJustPressed) {
        window.sfx.playPortal();
        houseState.phase = 'entering_next';
      }
    } else if (houseState.phase === 'entering_next') {
      houseState.mamaX += 155 * dt;
      // Estela de chispas verdes
      if (globalFrame % 6 === 0) {
        spawnStarSparkles(houseState.mamaX, houseState.mamaY - 10, 1, '#9ef01a');
      }
      if (houseState.mamaX >= houseState.portalX - 10) {
        spawnStarSparkles(houseState.portalX, houseState.portalY, 18, '#ffffff');
        spawnStarSparkles(houseState.portalX, houseState.portalY, 14, '#ccff33');
        triggerShake(0.14, 2.0);
        // Teletransportarse al siguiente nivel (o pantalla de victoria si completó los niveles disponibles)
        if (currentLevelIndex + 1 < window.LEVELS.length) {
          loadLevel(currentLevelIndex + 1);
          window.sfx.playPortal();
          gameState = 'PLAYING';
        } else {
          window.sfx.playVictory();
          gameState = 'VICTORY';
        }
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // ================== 6. JUGABILIDAD ACTIVA ('PLAYING') ==================
  if (gameState === 'PLAYING') {
    // Animacion cinemática de Pistola de Portales y Teletransporte Interdimensional
    if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) {
      if (typeof updatePortalTeleport === 'function') {
        updatePortalTeleport(dt);
      }
      updateEffects(dt);
      keys.jumpJustPressed = false;
      keys.dashJustPressed = false;
      return;
    }

    updatePlayer(dt);

    const isLavaDashing = (player.dashTimer > 0 && player.ability === 'lava_run');
    if (droppedLilies.length > 0) updateDroppedLilies(dt);

    // Actualización de enemigos comunes (Mundo 1 Jardín y Mundo 2 Volcán)
    updateCrawlers(dt, isLavaDashing);
    updateFliers(dt, isLavaDashing);

    if (level.theme === 'volcano') {
      updateOmniMenAndRocks(dt, isLavaDashing);
      updateVolcanoSpecialEnemies(dt, isLavaDashing);
    } else {
      if (colorPads.length > 0) updateColorPadsAndPuzzle(dt);
      if (homelander) updateHomelander(dt);
    }

    if (typeof updateKaiWaves === 'function') {
      updateKaiWaves(dt);
    }

    if (typeof updateSurfboardSkinsInteraction === 'function') {
      updateSurfboardSkinsInteraction();
    }

    if (typeof updateEarthquakePrelude === 'function') {
      updateEarthquakePrelude(dt);
    }

    if (typeof updateRaulFrog === 'function') {
      updateRaulFrog(dt);
    }

    if (typeof updateDonPanchoHotdogs === 'function') {
      updateDonPanchoHotdogs(dt);
    }

    if (typeof updateSkyscraperDoors === 'function') {
      updateSkyscraperDoors();
    }

    if (typeof updateArcadeCabinetInteraction === 'function') {
      updateArcadeCabinetInteraction();
    }

    if (typeof updateKrakenBossFight === 'function') {
      updateKrakenBossFight(dt);
    }

    if (typeof updateYetiBoss === 'function') {
      updateYetiBoss(dt);
    }

    if (typeof updateAstralBoss === 'function') {
      updateAstralBoss(dt);
    }

    if (typeof updateShovelAbility === 'function') {
      updateShovelAbility(dt);
    }

    if (typeof updateIcePickAbility === 'function') {
      updateIcePickAbility(dt);
    }

    if (typeof updateKangshungMechanics === 'function') {
      updateKangshungMechanics(dt);
    }

    if (typeof updateBlizzardSystem === 'function') {
      updateBlizzardSystem(dt);
    }

    if (currentLevelIndex === 2 && player.x >= 18840 && (!window.krakenBossState || !window.krakenBossState.active) && (!window.krakenIntroState || !window.krakenIntroState.active) && (!window.krakenBossState || !window.krakenBossState.isDefeated)) {
      if (typeof startKrakenIntroAnimation === 'function') {
        startKrakenIntroAnimation();
      }
    }
  }

  updateEffects(dt);
  keys.jumpJustPressed = false;
  keys.dashJustPressed = false;
  keys.downJustPressed = false;
}
