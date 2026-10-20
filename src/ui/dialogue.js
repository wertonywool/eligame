// ============================================================================
// CAJA DE DIÁLOGOS (HISTORIA, NPCS Y OPCIONES INTERACTIVAS)
// ============================================================================
let dialogueChoiceIndex = 0;
let dialogueChoiceButtons = [];

function selectDialogueChoice(idx) {
  const currentLine = activeDialogueList && activeDialogueList[dialogueIndex];
  if (!currentLine || !currentLine.choices || !currentLine.choices[idx]) return;
  const choice = currentLine.choices[idx];
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  if (typeof currentLine.onChoice === 'function') {
    currentLine.onChoice(idx, choice);
  }
}

function drawDialogueBox() {
  const currentLine = activeDialogueList[dialogueIndex];
  if (!currentLine) return;

  const hasChoices = currentLine.choices && currentLine.choices.length > 0 && dialogueCharIndex >= currentLine.text.length;
  const boxX = 30;
  const boxY = 24;
  const boxW = W - 60;
  const boxH = hasChoices ? 84 : 72;

  drawRoundedPanel(boxX, boxY, boxW, boxH, 10, 'rgba(18, 5, 22, 0.96)', '#b31b52', 1.8);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 9.5px ${UI_FONT}`;
  ctx.fillText(currentLine.speaker + ':', boxX + 12, boxY + 18);

  const visibleText = currentLine.text.slice(0, dialogueCharIndex);
  ctx.fillStyle = '#ffffff';
  ctx.font = `8.5px ${UI_FONT}`;
  wrapText(ctx, visibleText, boxX + 12, boxY + 34, boxW - 24, 13);

  dialogueChoiceButtons = [];

  if (hasChoices) {
    const choices = currentLine.choices;
    const btnW = Math.floor((boxW - 24 - (choices.length - 1) * 6) / choices.length);
    const btnH = 20;
    const btnY = boxY + boxH - 26;

    for (let i = 0; i < choices.length; i++) {
      const btnX = boxX + 12 + i * (btnW + 6);
      const isSelected = (dialogueChoiceIndex === i);
      dialogueChoiceButtons.push({ x: btnX, y: btnY, w: btnW, h: btnH, index: i });

      drawRoundedPanel(
        btnX, btnY, btnW, btnH, 6,
        isSelected ? '#8f143c' : 'rgba(10, 3, 14, 0.92)',
        isSelected ? '#ffffff' : '#b31b52',
        isSelected ? 1.8 : 1.0
      );

      ctx.textAlign = 'center';
      ctx.fillStyle = isSelected ? '#ffffff' : '#ffcad4';
      ctx.font = `bold 6.5px ${UI_FONT}`;
      ctx.fillText(`${i + 1}. ${choices[i].text}`, btnX + btnW / 2, btnY + 13);
    }
    ctx.textAlign = 'left';
  } else if (Math.floor(globalFrame / 20) % 2 === 0) {
    ctx.fillStyle = '#ffcad4';
    ctx.font = `bold 7.5px ${UI_FONT}`;
    const skipLabel = gamepadConnected ? '[A] SIGUIENTE ▶' : '[SALTAR ▶]';
    ctx.fillText(skipLabel, boxX + boxW - 84, boxY + boxH - 8);
  }
}
