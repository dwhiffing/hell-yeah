import playStateFactory from './_play'

const convo = ['part one of this dumb conversation, Tell me what to do oh man this is just so much stuff to say to someone I just met dont you think', 'oh and another thing, stay the hell out of here', { text: 'What say you?', choiceA: { text: 'yes', value: 1, response: 'Good riddance' }, choiceB: { text: 'no', value: 2, response: 'Thats quite a thing to say to someone you just met' }}]

export default playStateFactory({
  tilemap: 'bridge',
  exit: ['sokoban', null, 'node', null],
  create: (game) => {
    game.nonPlayerManager.createEntities([[5, 5, [], convo]])
  },
  update: (game) => {
  },
})
