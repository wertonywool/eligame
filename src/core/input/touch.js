function bindTouchButton(id, onDown, onUp) {
  const btn = document.getElementById(id);
  if (!btn) return;

  const handleStart = e => {
    e.preventDefault();
    window.sfx.init();
    btn.classList.add('pressed');
    document.getElementById('touch-controls')?.classList.remove('gamepad-active');
    onDown();
  };

  const handleEnd = e => {
    e.preventDefault();
    btn.classList.remove('pressed');
    if (onUp) onUp();
  };

  btn.addEventListener('touchstart', handleStart, { passive: false });
  btn.addEventListener('touchend', handleEnd, { passive: false });
  btn.addEventListener('touchcancel', handleEnd, { passive: false });
  btn.addEventListener('mousedown', handleStart);
  btn.addEventListener('mouseup', handleEnd);
  btn.addEventListener('mouseleave', handleEnd);
}

bindTouchButton(
  'btn-left',
  () => { touchState.left = true; keys.left = true; },
  () => { touchState.left = false; keys.left = keyboardState.left || gamepadMovement.left; }
);
bindTouchButton(
  'btn-right',
  () => { touchState.right = true; keys.right = true; },
  () => { touchState.right = false; keys.right = keyboardState.right || gamepadMovement.right; }
);
bindTouchButton('btn-dash', () => { keys.dashJustPressed = true; });
bindTouchButton(
  'btn-jump',
  () => {
    touchState.jump = true;
    if (!keys.jumpPressed) keys.jumpJustPressed = true;
    keys.jumpPressed = true;
  },
  () => {
    touchState.jump = false;
    keys.jumpPressed = keyboardState.jump || gamepadMovement.jump;
  }
);
