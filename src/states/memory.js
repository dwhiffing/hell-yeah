import playStateFactory from './_play'
import FloaterManager from '../entities/floater'

let floaterManager

export default playStateFactory({
  tilemap: 'memory',
  create: (game) => {
    const tiles = game.gameMap.getPositionsForIndex(17)
    floaterManager = new FloaterManager(game, tiles)
    tiles.forEach(tile => game.gameMap.destroyTile(tile.x, tile.y))
  },
  update: (game) => {

  },
  shutdown: (game) => {
    floaterManager.destroy()
  }
})
