const tileSize = 116

export default class GameMap {
  constructor(game, mapKey, exitMap, direction) {
    this.game = game
    this.map = game.add.tilemap(mapKey, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.map.addTilesetImage('stuff')
    this.groundLayer = this.map.createLayer('Tile Layer 1')
    this.groundLayer.resizeWorld()
    this.stuffLayer = this.map.createLayer('Tile Layer 2')
    this.stuffLayer.resizeWorld()

    let spawnTile = this.map.searchTileIndex(18, 0, false, 'Tile Layer 2')
    this.destroyTile(spawnTile.x, spawnTile.y)
    if (typeof direction === 'number') {
      let exits = this.getPositionsForIndex(19)
      let filteredExits = [
        exits.filter(e => e.y === 0)[0],
        exits.filter(e => e.x === this.game.gameMap.map.width-1)[0],
        exits.filter(e => e.y === this.game.gameMap.map.height-1)[0],
        exits.filter(e => e.x === 0)[0],
      ]
      let dest = filteredExits[direction]
      if (dest) { spawnTile = Object.assign({}, dest) }
      if (direction === 0) {
        spawnTile.y += 1
        this.playerDir = 2
      } else if (direction === 1) {
        spawnTile.x -= 1
        this.playerDir = 3
      } else if (direction === 2) {
        spawnTile.y -= 1
        this.playerDir = 0
      } else  {
        spawnTile.x += 1
        this.playerDir = 1
      }
    }
    this.playerX = spawnTile.x
    this.playerY = spawnTile.y

    this.getTilesForIndex(19).forEach(t => t.alpha = 0)

    this.exitMap = exitMap
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

  getTilesForIndex(index) {
    let arr = []
    let tile
    let skip = 0
    do {
      tile = this.map.searchTileIndex(index, skip, false, 'Tile Layer 2')
      if (tile) {
        arr.push(tile)
      }
      skip++
    } while (tile && skip < 500)
    return arr
  }

  getPositionsForIndex(index) {
    return this.getTilesForIndex(index).map(t => ({ x: t.x, y: t.y }))
  }

  destroyTile(x, y) {
    return this.map.removeTile(x, y, 'Tile Layer 2')
  }

  isOccupied(x, y) {
    const tile = this.getTile(x, y)
    return tile ? [15, 16, 17].indexOf(tile.index) > -1 : false
  }
  exit(dir) {
    let stateName = typeof this.exitMap === 'string' ? this.exitMap : this.exitMap[dir]
    this.game.state.start(stateName, true, false, { direction: dir })
  }
}
