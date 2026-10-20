// MUNDO 3 - FASE 3 - PARTE 4: NPC Conserje del Edificio Corporativo
module.exports = [
  {
    x: 10480,
    y: 202,
    name: 'Conserje Bruno',
    role: 'Seguridad del Edificio',
    color: '#ffcad4',
    hatColor: '#b31b52',
    getLines: function() {
      const keys = saveState.keysPhase3 || 0;
      if (keys === 0) {
        return [
          '¡Alto ahi, ratoncita! Este es el edificio corporativo principal.',
          'Para activar el ascensor hacia la azotea se requieren 4 Llaves Maestras.',
          'Los comerciantes y deportistas de la playa custodian cada una de las 4 llaves.',
          'Ve a la playa y ayudales con sus misiones para conseguirlas.'
        ];
      }
      if (keys < 4) {
        return [
          `Llevas ${keys} de las 4 Llaves Maestras de la Ciudadela.`,
          'Ya tienes la Llave de Sami el Heladero. ¡Excelente trabajo!',
          'Aun te faltan las llaves de las otras 3 misiones de la playa para abrir el ascensor.'
        ];
      }
      return [
        '¡Increible! ¡Tienes las 4 Llaves Maestras completas!',
        'Las puertas del ascensor estan desbloqueadas. ¡Sube a la azotea y salva a tu hijo!'
      ];
    }
  }
];
