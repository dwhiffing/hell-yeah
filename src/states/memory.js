import playStateFactory from './_play'
import FloaterManager from '../entities/floater'

let floaterManager

export default playStateFactory({
  tilemap: 'memory',
  exit: 'node',
  create: (game) => {
    const tiles = game.gameMap.getPositionsForIndex(23)
    floaterManager = new FloaterManager(game, tiles)
    tiles.forEach(tile => game.gameMap.destroyTile(tile.x, tile.y))
  },
  update: (game) => {

  },
  shutdown: (game) => {
    floaterManager.destroy()
  }
})
