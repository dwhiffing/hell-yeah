import playStateFactory from './_play'

export default playStateFactory({
  tilemap: 'trivia',
  exit: 'win',
  numLevels: 3,
  levelIndex: 1,
  create: (game) => {
    game.killOnWrongChoice = true
  },
  update: (game) => {
    if (!game.gameMap.canExit) {
      game.gameMap.revealExit()
    }
  },
})
