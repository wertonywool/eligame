// 🔴🔵🟢🟡🟣🟠⚪ FASE 3: Puzzle de 7 Cristales Reales
// Botones de colores con brillo radiante distribuidos no linealmente en la Gran Corte Imperial
module.exports = {
  pads: [
    { id: 0, colorKey: 'red',    colorName: 'ROJO',     hex: '#ff0055', glowHex: '#ff758f', rgb: '255,0,85',    x: 4020, y: 220, w: 32, h: 10, label: 'ROJO' },
    { id: 1, colorKey: 'blue',   colorName: 'AZUL',     hex: '#0077b6', glowHex: '#90e0ef', rgb: '0,119,182',   x: 4235, y: 156, w: 32, h: 10, label: 'AZUL' },
    { id: 2, colorKey: 'green',  colorName: 'VERDE',    hex: '#2ec4b6', glowHex: '#cbf3f0', rgb: '46,196,182',  x: 4505, y: 220, w: 32, h: 10, label: 'VERDE' },
    { id: 3, colorKey: 'yellow', colorName: 'AMARILLO', hex: '#ffd166', glowHex: '#fff3b0', rgb: '255,209,102',x: 4780, y: 148, w: 32, h: 10, label: 'AMARILLO' },
    { id: 4, colorKey: 'purple', colorName: 'PÚRPURA',  hex: '#9b5de5', glowHex: '#e0aaff', rgb: '155,93,229',  x: 5280, y: 156, w: 32, h: 10, label: 'PÚRPURA' },
    { id: 5, colorKey: 'orange', colorName: 'NARANJA',  hex: '#ff7b00', glowHex: '#ffb703', rgb: '255,123,0',    x: 5010, y: 220, w: 32, h: 10, label: 'NARANJA' },
    { id: 6, colorKey: 'white',  colorName: 'BLANCO',   hex: '#ffffff', glowHex: '#e2eafc', rgb: '255,255,255',  x: 5460, y: 205, w: 32, h: 10, label: 'BLANCO' }
  ],
  sequence: [1, 5, 3, 0, 4, 2, 6]
};
