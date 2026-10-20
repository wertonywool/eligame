// ============================================================================
// SISTEMA DE SONIDO RETRO 8/16-BIT + SOPORTE PARA MÚSICA IA
// ============================================================================

class RetroAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmAudio = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.muted;
    }
    return this.muted;
  }

  playTone(freqStart, freqEnd, duration, type = 'square', volume = 0.12) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    if (freqEnd !== freqStart) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
    }

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playJump(isDouble = false) {
    if (isDouble) {
      this.playTone(340, 720, 0.14, 'square', 0.11);
    } else {
      this.playTone(220, 510, 0.13, 'square', 0.11);
    }
  }

  // Sonido del "Lava Run" (Dash oscuro / magma estilo Hollow Knight)
  playLavaDash() {
    this.playTone(150, 45, 0.22, 'sawtooth', 0.18);
    setTimeout(() => this.playTone(420, 110, 0.16, 'triangle', 0.14), 30);
  }

  // Sonido de Portal Interdimensional (estilo Rick & Morty)
  playPortal() {
    const freqs = [280, 440, 330, 580, 490, 740];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, f * 1.35, 0.11, 'sine', 0.12), i * 55);
    });
  }

  // Disparo de la Pistola de Portales
  playPortalGunShot() {
    this.playTone(880, 220, 0.16, 'sawtooth', 0.18);
    setTimeout(() => this.playTone(330, 990, 0.20, 'sine', 0.15), 50);
  }

  // Deformacion del espacio-tiempo al abrirse el portal
  playPortalWoosh() {
    this.playTone(180, 480, 0.22, 'triangle', 0.14);
    setTimeout(() => this.playTone(520, 260, 0.18, 'sine', 0.12), 60);
  }

  // Sonido de Checkpoint activado
  playCheckpoint() {
    this.playTone(440, 660, 0.12, 'triangle', 0.14);
    setTimeout(() => this.playTone(660, 880, 0.18, 'triangle', 0.14), 90);
  }

  // Sonido de Omni-Man lanzando roca de magma
  playMagmaThrow() {
    this.playTone(130, 65, 0.24, 'sawtooth', 0.14);
  }

  // Sonido al golpear a Omni-Man o un enemigo con el Lava Run Dash
  playEnemyHit() {
    this.playTone(320, 140, 0.14, 'square', 0.18);
    setTimeout(() => this.playTone(580, 260, 0.12, 'sawtooth', 0.15), 40);
  }

  // Sonido al derrotar a Omni-Man (3 golpes) o enemigo volcánico
  playEnemyDefeat() {
    const notes = [220, 330, 440, 660, 880];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, n * 1.15, 0.11, 'square', 0.15), i * 50);
    });
  }

  // Sonido de Géiser / Corriente Térmica de impulso vertical
  playGeyser() {
    this.playTone(180, 640, 0.22, 'triangle', 0.15);
  }

  // Sonido de compra en la Tienda de Quesos
  playBuy() {
    this.playTone(523.25, 783.99, 0.09, 'square', 0.13);
    setTimeout(() => this.playTone(783.99, 1046.5, 0.15, 'square', 0.13), 80);
  }

  playCheese() {
    this.playTone(587.33, 880, 0.08, 'triangle', 0.15);
    setTimeout(() => this.playTone(880, 1174.66, 0.12, 'square', 0.12), 65);
  }

  playLaserWarning() {
    this.playTone(740, 520, 0.09, 'sawtooth', 0.08);
  }

  playLaserFire() {
    this.playTone(180, 55, 0.35, 'sawtooth', 0.18);
  }

  playHurt() {
    this.playTone(260, 80, 0.25, 'sawtooth', 0.16);
  }

  playBlip(isBaby = false) {
    const base = isBaby ? 680 + Math.random() * 180 : 420 + Math.random() * 110;
    this.playTone(base, base * 1.12, 0.045, 'square', 0.07);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, n * 1.02, 0.16, 'square', 0.13), i * 110);
    });
  }

  // Sonido al pulsar el botón de color correcto en la secuencia de Homelander
  playPatternCorrect(step) {
    const notes = [392, 440, 523.25, 659.25, 783.99, 1046.5];
    const n = notes[Math.min(step, notes.length - 1)];
    this.playTone(n, n * 1.25, 0.14, 'triangle', 0.16);
    setTimeout(() => this.playTone(n * 1.5, n * 1.5, 0.12, 'square', 0.13), 50);
  }

  // Sonido de error al pisar un color fuera de orden
  playPatternWrong() {
    this.playTone(180, 110, 0.18, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(130, 85, 0.22, 'sawtooth', 0.15), 80);
  }

  // Sonido de ruptura del escudo de Homelander y rescate
  playShieldBreak() {
    const notes = [330, 440, 554, 659, 880, 1108, 1318];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, n * 1.08, 0.14, 'square', 0.15), i * 40);
    });
  }
}

window.sfx = new RetroAudio();
