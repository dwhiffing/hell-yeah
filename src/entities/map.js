const tileSize = 116

export default class GameMap {
  constructor(game, mapKey) {
    this.game = game
    this.map = game.add.tilemap(mapKey, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.map.addTilesetImage('stuff')
    this.groundLayer = this.map.createLayer('Tile Layer 1')
    this.groundLayer.resizeWorld()
    this.stuffLayer = this.map.createLayer('Tile Layer 2')
    this.stuffLayer.resizeWorld()
  }

  canWalk(x, y) {
    return !!this.map.getTile(x, y, 'Tile Layer 1')
  }

  getTile(x, y) {
    return this.map.getTile(x, y, 'Tile Layer 2')
  }

  moveTile(x, y) {
    return this.map.putTile(16, x, y, 'Tile Layer 2')
  }

  pushTile(srcX, srcY, destX, destY) {
    this.map.removeTile(srcX, srcY, 'Tile Layer 2')
    return this.map.putTile(16, destX, destY, 'Tile Layer 2')
  }

  destroyTile(x, y) {
    return this.map.removeTile(x, y, 'Tile Layer 2')
  }

  isOccupied(x, y) {
    const tile = this.getTile(x, y)
    return !!tile
  }
}
