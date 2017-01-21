const tileSize = 116

export default class GameMap {
  constructor(game, mapKey, exitMap) {
    this.game = game
    this.map = game.add.tilemap(mapKey, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.map.addTilesetImage('stuff')
    this.groundLayer = this.map.createLayer('Tile Layer 1')
    this.groundLayer.resizeWorld()
    this.stuffLayer = this.map.createLayer('Tile Layer 2')
    this.stuffLayer.resizeWorld()
    let spawnTile = this.map.searchTileIndex(18, 0, false, 'Tile Layer 2')
    this.playerX = spawnTile.x
    this.playerY = spawnTile.y
    this.exitMap = exitMap
    this.destroyTile(spawnTile.x, spawnTile.y)
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
    if (this.canWalk(destX, destY)) {
      if (this.getTile(destX, destY) || !this.canWalk(destX, destY)) {
        return 'blocked'
      } else {
        let tile = this.map.removeTile(srcX, srcY, 'Tile Layer 2')
        return this.map.putTile(tile.index, destX, destY, 'Tile Layer 2')
      }
    } else {
      return 'blocked'
    }

  }

  getPositionsForIndex(index) {
    let arr = []
    let tile
    let skip = 0
    do {
      tile = this.map.searchTileIndex(index, skip, false, 'Tile Layer 2')
      if (tile) {
        arr.push({ x: tile.x, y: tile.y })
      }
      skip++
    } while (tile && skip < 500)
    return arr
  }

  destroyTile(x, y) {
    return this.map.removeTile(x, y, 'Tile Layer 2')
  }

  isOccupied(x, y) {
    const tile = this.getTile(x, y)
    return tile ? [15, 16, 17].indexOf(tile.index) > -1 : false
  }
  exit(dir) {
    if (typeof this.exitMap === 'string') {
      this.game.state.start(this.exitMap)
    } else {
      this.game.state.start(this.exitMap[dir])
    }
  }
}
