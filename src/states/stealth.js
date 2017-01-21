import playStateFactory from './_play'
const nonPlayers = [
  [5, 5, [2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 0, 0]],
  [6, 8, [2, 1, 0, 3]],
]

export default playStateFactory({
  tilemap: 'stealth',
  create: (game) => {
    game.nonPlayerManager.createEntities(nonPlayers)
  },
  update: (game) => {
  },
})
