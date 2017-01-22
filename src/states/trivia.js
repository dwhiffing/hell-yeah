import playStateFactory from './_play'

export default playStateFactory({
  tilemap: 'trivia',
  exit: 'node',
  create: (game) => {
    game.killOnWrongChoice = true
  },
  update: (game) => {

  },
})
