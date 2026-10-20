// MUNDO 3 - FASE 3 - PARTE 1: NPC Sami el Heladero (Mision 1 de 4)
module.exports = [
  {
    x: 7390,
    y: 202,
    name: 'Sami el Heladero',
    role: 'Maestro Heladero',
    color: '#ffcad4',
    hatColor: '#b31b52',
    getLines: function() {
      const q = typeof getSamiQuest === 'function' ? getSamiQuest() : { state: 'NOT_STARTED', sold: 0, target: 10 };
      if (q.state === 'NOT_STARTED') {
        return [
          '¡Hola Elizabeth! ¡Bienvenida a mi Heladeria Artesanal!',
          'Tengo las vitrinas llenas de deliciosos helados de fresa y vainilla...',
          'Pero con este dolor de espalda no puedo recorrer toda la playa.',
          '¿Me ayudarias a ofrecer 10 helados a los turistas de las mesas y la costa?',
          'Entregaselos a 10 visitantes, traeme el pago de $100 y te dare una Llave de la Ciudadela.'
        ];
      }
      if (q.state === 'ACTIVE') {
        return [
          `Llevas vendidos ${q.sold} de 10 helados.`,
          'Reparte helados tanto en las mesas de la heladeria como en las tumbonas de la playa.',
          'Vuelve cuando hayas vendido los 10 con todo el dinero recaudado.'
        ];
      }
      if (q.state === 'READY_TO_TURN_IN') {
        return [
          '¡Extraordinario Elizabeth! ¡Vendiste los 10 helados y me trajiste los $100 completos!',
          'Toma esta Llave de Bronce de la Ciudadela como recompensa prometida.',
          '¡Es la primera de las 4 llaves necesarias para entrar a las oficinas del frente!'
        ];
      }
      return [
        '¡Gracias a ti todos los clientes y turistas estan disfrutando de sus helados!',
        'Avanza por la playa, todavia hay otras personas que necesitan tu ayuda para las otras llaves.'
      ];
    },
    onDialogueEnd: function() {
      const q = typeof getSamiQuest === 'function' ? getSamiQuest() : null;
      if (!q) return;
      if (q.state === 'NOT_STARTED') {
        startSamiQuest();
      } else if (q.state === 'READY_TO_TURN_IN') {
        completeSamiQuest(this);
      }
    }
  }
];
