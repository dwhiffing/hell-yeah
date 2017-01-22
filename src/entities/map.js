const tileSize = 116
const spawnIndex = 27
const exitIndex = 31
const npcIndex = 32
const stuffIndexes = [21, 22, 23]

export default class GameMap {
  constructor(game, mapKey, exitMap, direction, numLevels, levelIndex=1) {
    this.game = game
    this.exitMap = exitMap
    this.numLevels = numLevels
    this.levelIndex = levelIndex
    this.mapKey = mapKey
    this.loadLevel = this.loadLevel.bind(this)
    this.canExit = false
    this.exits = []
  }

  loadLevel() {
    if (this.map) {
      this.map.destroy()
    }

    let mapKey = this.mapKey
    if (this.levelIndex > 1) {
      mapKey = this.mapKey+'_'+this.levelIndex
    }

    this.map = this.game.add.tilemap(mapKey, tileSize, tileSize)
    this.map.addTilesetImage('tile')
    this.map.addTilesetImage('stuff')
    this.map.addTilesetImage('triggers')
    this.groundLayer = this.map.createLayer('Tile Layer 1')
    this.groundLayer.resizeWorld()
    this.triggersLayer = this.map.createLayer('Tile Layer 3')
    this.triggersLayer.resizeWorld()
    this.stuffLayer = this.map.createLayer('Tile Layer 2')
    this.stuffLayer.resizeWorld()
    this.canExit = false

    this.entityPositions = this.getTilesForIndex(npcIndex, 'Tile Layer 3')
    this.entityPositions.forEach(e => this.destroyTile(e.x, e.y, 'Tile Layer 3'))

    let spawnTile = this.map.searchTileIndex(spawnIndex, 0, false, 'Tile Layer 3')
    this.exits = this.getTilesForIndex(exitIndex, 'Tile Layer 3')
    this.exits.forEach(e => e.alpha = 0)

    if (typeof direction === 'number') {
      let filteredExits = [
        this.exits.filter(e => e.y === 0)[0],
        this.exits.filter(e => e.x === this.map.width-1)[0],
        this.exits.filter(e => e.y === this.map.height-1)[0],
        this.exits.filter(e => e.x === 0)[0],
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
  }

  canWalk(x, y) {
    const tile = this.map.getTile(x, y, 'Tile Layer 1')
    return (tile && tile.index % 3 !== 0) && !this.getTile(x, y)
  }

  getTile(x, y, layer='Tile Layer 2') {
    return this.map.getTile(x, y, layer)
  }

  pushTile(srcX, srcY, destX, destY) {
    if (this.canWalk(destX, destY)) {
      if (this.getTile(destX, destY) || !this.game.canWalk(destX, destY)) {
        return 'blocked'
      } else {
        this.game.rockSound.play()
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
    if (!this.canExit) {
      return
    }

    let stateName = typeof this.exitMap === 'string' ? this.exitMap : this.exitMap[dir]
    this.levelIndex++
    if (this.levelIndex <= this.numLevels) {
      this.game.loadLevel()
    } else {
      this.game.state.start(stateName, true, false, { direction: dir })
    }
  }

  revealExit() {
    this.canExit = true
    this.exits.forEach(e => e.alpha = 1)
    this.triggersLayer.dirty = true
  }
}
