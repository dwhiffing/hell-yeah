import Entity from './entity'
const tileSize = 116

export default class NonPlayer extends Entity {
  constructor(game, x=0, y=0, key='man', direction=0, _movements=[], convo, speedMod=4) {
    super(game, x, y, key)
    this.movements = [..._movements]
    this.queued = []
    this.mod = speedMod
    this.speed = tileSize/speedMod
    this.convo = convo
    this.wait = false
    this.dir = direction
    this.setDirection()
    this.moveTo()
  }

  update(game) {
    super.update()
    if (this.wait || this.movements.length === 0) {
      return
    }

    if (!this.moving) {
      if (this.queued.length > 0) {

        let shouldMove = this.preMove()
        if (!shouldMove) {
          return
        }

        this.doMove(this.queued.shift())
      } else {
        this.moveTo()
      }
    }
  }

  moveTo() {
    this.queued = [...this.movements]
  }

  preMove() {
    return !this.checkLineOfSight()
  }

  postMove() {
    return !this.checkLineOfSight()
  }

  checkLineOfSight() {
    const tilesToCheck = []
    let tile
    let inSight = false
    do {
      let thing = tilesToCheck.length === 0 ? this : tilesToCheck[tilesToCheck.length - 1]
      tile = this.posFromDir(this.dir, thing.x, thing.y)
      tile = { x: tile[0], y: tile[1] }
      tilesToCheck.push(tile)
    } while (tile.x > 0 && tile.x <= this.game.gameMap.map.width-1 && tile.y > 0 && tile.y <= this.game.gameMap.map.height-1)

    tilesToCheck.forEach(({ x, y }) => {
      if (x === this.game.player.x && y === this.game.player.y) {
        inSight = true
      }
    })

    if (inSight) {
      this.wait = true
      setTimeout(() => {
        this.wait = false
      }, 500)
    }

    return inSight
  }
}
