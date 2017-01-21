const tileSize = 116
const spawnIndex = 27
const exitIndex = 31
const stuffIndexes = [21, 22, 23]

export default class GameMap {
  constructor(game, mapKey, exitMap, direction) {
    this.game = game
    this.map = game.add.tilemap(mapKey, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.map.addTilesetImage('stuff')
    this.map.addTilesetImage('triggers')
    this.groundLayer = this.map.createLayer('Tile Layer 1')
    this.groundLayer.resizeWorld()
    this.triggersLayer = this.map.createLayer('Tile Layer 3')
    this.triggersLayer.resizeWorld()
    this.stuffLayer = this.map.createLayer('Tile Layer 2')
    this.stuffLayer.resizeWorld()

    let spawnTile = this.map.searchTileIndex(spawnIndex, 0, false, 'Tile Layer 3')
    if (spawnTile) {
      this.destroyTile(spawnTile.x, spawnTile.y, 'Tile Layer 3')
    }
    if (typeof direction === 'number') {
      let exits = this.getPositionsForIndex(exitIndex, 'Tile Layer 3')
      let filteredExits = [
        exits.filter(e => e.y === 0)[0],
        exits.filter(e => e.x === this.map.width-1)[0],
        exits.filter(e => e.y === this.map.height-1)[0],
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

    this.getTilesForIndex(exitIndex, 'Tile Layer 3').forEach(t => t.alpha = 0)

    this.exitMap = exitMap
  }

  canWalk(x, y, layer='Tile Layer 1') {
    return !!this.map.getTile(x, y, layer)
  }

  getTile(x, y, layer='Tile Layer 2') {
    return this.map.getTile(x, y, layer)
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

  getTilesForIndex(index, layer='Tile Layer 2') {
    let arr = []
    let tile
    let skip = 0
    do {
      tile = this.map.searchTileIndex(index, skip, false, layer)
      if (tile) {
        arr.push(tile)
      }
      skip++
    } while (tile && skip < 500)
    return arr
  }

  getPositionsForIndex(index, layer='Tile Layer 2') {
    return this.getTilesForIndex(index, layer).map(t => ({ x: t.x, y: t.y }))
  }

  destroyTile(x, y, layer='Tile Layer 2') {
    return this.map.removeTile(x, y, layer)
  }

  isOccupied(x, y) {
    const tile = this.getTile(x, y)
    return tile ? stuffIndexes.indexOf(tile.index) > -1 : false
  }

  exit(dir) {
    let stateName = typeof this.exitMap === 'string' ? this.exitMap : this.exitMap[dir]
    this.game.state.start(stateName, true, false, { direction: dir })
  }
}
