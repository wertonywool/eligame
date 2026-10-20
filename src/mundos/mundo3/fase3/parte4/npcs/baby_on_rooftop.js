// MUNDO 3 - FASE 3 - PARTE 4: Hijo Raton en la Azotea del Edificio del Frente
module.exports = [
  {
    x: 11680,
    y: 32,
    name: 'Hijo Ratón',
    role: 'Hijo Secuestrado',
    questNpc: 'baby_rooftop',
    dialogue: [
      '¡MAMÁ! ¡MAMÁ! ¡ESTOY AQUÍ EN LA AZOTEA DEL EDIFICIO DE ENFRENTE!',
      '¡Nos atraparon mientras jugábamos en la playa! ¡Ayúdame a bajar!',
      '¡Mamá, mira hacia el horizonte! ¡El mar se ha retirado por completo!',
      '¡EL SUELO ESTÁ EMPEZANDO A TEMBLAR MUY FUERTE!'
    ],
    getLines: function() {
      return this.dialogue;
    }
  }
];
