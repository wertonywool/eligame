// ============================================================================
// MUNDO 3 - FASE 4 - PARTE 1: NPCs de la Avenida y Plaza del Edificio Objetivo
// ============================================================================
module.exports = [
  {
    x: 12180,
    y: 196,
    name: 'Don Pancho',
    role: 'Vendedor de Hot Dogs',
    questNpc: 'hotdogs',
    color: '#ffcad4',
    hatColor: '#ffffff',
    lines: [
      'Hola Elizabeth! Acabo de inventar una nueva receta secreta de hot dogs costeros!',
      'Toma, prueba uno recien salido de la parrilla! Que te parece el sabor?'
    ],
    dialogue: [
      'Hola Elizabeth! Acabo de inventar una nueva receta secreta de hot dogs costeros!',
      'Toma, prueba uno recien salido de la parrilla! Que te parece el sabor?'
    ]
  },
  {
    x: 12360,
    y: 196,
    name: 'Raúl',
    role: 'Amigo de los Anfibios',
    questNpc: 'raul',
    color: '#ffcad4',
    hatColor: '#8f143c',
    lines: [
      'Hola Elizabeth! Me llamo Raul y esta es mi querida ranita de la bahia.',
      'Nos enteramos de que buscas subir a la cima del rascacielos para salvar a tu hijo.',
      'Mi ranita encontro este fragmento brillante junto al estanque... toma la [LLAVE DE BRONCE #3]!',
      'Mucho exito enfrentando la gran ola marina que se aproxima!'
    ],
    dialogue: [
      'Hola Elizabeth! Me llamo Raul y esta es mi querida ranita de la bahia.',
      'Nos enteramos de que buscas subir a la cima del rascacielos para salvar a tu hijo.',
      'Mi ranita encontro este fragmento brillante junto al estanque... toma la [LLAVE DE BRONCE #3]!',
      'Mucho exito enfrentando la gran ola marina que se aproxima!'
    ],
    getLines: function() {
      const q = typeof getRaulQuest === 'function' ? getRaulQuest() : null;
      if (!q || !q.keyGiven) {
        return this.lines;
      }
      return [
        'Mucho exito en la cima del rascacielos, Elizabeth!',
        'Usa las llaves maestras en el gran portal para tomar el ascensor de alta velocidad.'
      ];
    },
    onDialogueEnd: function() {
      if (typeof completeRaulDialogue === 'function') {
        completeRaulDialogue(this);
      }
    }
  },
  {
    x: 12760,
    y: 152,
    name: 'Guardia Miranda',
    role: 'Seguridad de la Bahia',
    questNpc: 'miranda',
    color: '#ffffff',
    hatColor: '#120415',
    lines: [
      'El agua de la bahia entera se ha retirado hacia el horizonte! Es la calma antes de la catastrofe!',
      'Un megatsunami gigantesco viene en camino y arrasara todas las avenidas de la costa.',
      'Tu hijo esta arriba en el edificio. Escala por las terrazas exteriores antes del impacto!',
      'Manten tu tabla de surf bien sujeta, la vas a necesitar para sobrevivir a la ola gigante!'
    ],
    dialogue: [
      'El agua de la bahia entera se ha retirado hacia el horizonte! Es la calma antes de la catastrofe!',
      'Un megatsunami gigantesco viene en camino y arrasara todas las avenidas de la costa.',
      'Tu hijo esta arriba en el edificio. Escala por las terrazas exteriores antes del impacto!',
      'Manten tu tabla de surf bien sujeta, la vas a necesitar para sobrevivir a la ola gigante!'
    ]
  }
];
