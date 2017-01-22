import Entity from './entity'
const tileSize = 116

export default class NonPlayer extends Entity {
  constructor(game, x=0, y=0, key='man', direction=0, _movements=[], convo, speed) {
    super(game, x, y, key)
    this.movements = [..._movements]
    this.queued = []
    this.key = key
    this.speed = speed
    this.convo = convo
    this.wait = false
    this.dir = direction
    this.setDirection()
    this.moveTo()
  }

  update(game) {
    super.update()
    if (this.wait || this.movements.length === 0 || !this.game.textManager.finishedWithConvo || (!this.game.playerCanMove && !this.movingToPlayer)) {
      return
    }

    if (!this.moving) {
      if (this.queued.length > 0) {
        let shouldMove = this.preMove()
        if (!shouldMove) {
          return
        }

        this.doMove(this.queued.shift())
      } else if (!this.movingToPlayer) {
        this.moveTo()
      } else if (!this.wait) {
        this.wait = true
        this.game.textManager.bufferConvo(this.convo, this.key, () => this.game.loadLevel())
      }
    }
  }

  moveTo(movement=this.movements) {
    this.queued = [...movement]
  }

  preMove() {
    if (this.movingToPlayer && this.movements.length > 0) {
      return true
    }
    return !this.checkLineOfSight()
  }

  postMove() {
    if (this.movingToPlayer && this.movements.length > 0) {
      return true
    }
    return !this.checkLineOfSight()
  }

  checkLineOfSight() {
    let tilesToCheck = []
    let tile, playerIndex
    let inSight = false
    let other
    do {
      let thing = tilesToCheck.length === 0 ? this : tilesToCheck[tilesToCheck.length - 1]
      tile = this.posFromDir(this.dir, thing.x, thing.y)
      tile = { x: tile[0], y: tile[1] }
      other = this.game.gameMap.getTile(tile.x, tile.y, 'Tile Layer 1')
      tilesToCheck.push(tile)
    } while ((tile.x > 0 && tile.x <= this.game.gameMap.map.width-1 && tile.y > 0 && tile.y <= this.game.gameMap.map.height-1) && tilesToCheck.length <= 3 && (!other || (other && other.index % 3 !== 0)))

    tilesToCheck.forEach(({ x, y }, index) => {
      if (x === this.game.player.x && y === this.game.player.y) {
        inSight = true
        playerIndex = index
      }
    })

    if (inSight) {
      this.wait = true
      let tilesToWalk = []
      for (let i = 0; i < playerIndex; i++) {
        tilesToWalk.push(this.dir)
      }
      this.movingToPlayer = true
      this.game.playerCanMove = false
      setTimeout(() => {
        this.wait = false
        this.moveTo(tilesToWalk)
      }, 500)
    }

    return inSight
  }
}
