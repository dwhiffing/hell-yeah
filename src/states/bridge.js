import playStateFactory from './_play'

export default playStateFactory({
  tilemap: 'bridge',
  create: (game) => {
    game.nonPlayerManager.createEntities([[5, 5]])
  },
  update: (game) => {
  },
})
