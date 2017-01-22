import Entity from './entity'
let slashTimerMax = 8
let slashTimer = 0
let exitIndex = 31

export default class Player extends Entity {
  constructor(game, x=0, y=0, direction=0) {
    super(game, x, y, 'player')
    this.game = game
    this.game.interface.zKey.onDown.add(this.doSlash.bind(this))
    this.game.interface.spaceKey.onDown.add(this.doSlash.bind(this))
  }

  update(game) {
    super.update()

    if (!this.game.textManager.finishedWithConvo || !this.game.playerCanMove) {
      return
    }

    if (!this.moving) {
      if (game.upPressed()) {
        this.takeMoveInput(0)
      } else if (game.downPressed()) {
        this.takeMoveInput(2)
      }
      if (game.leftPressed()) {
        this.takeMoveInput(3)
      } else if (game.rightPressed()) {
        this.takeMoveInput(1)
      }
    }
    slashTimer--
    if (slashTimer <= 0) {
      this.canSlash = true
    }
  }

  doSlash() {
    if (this.canSlash) {
      this.slash()
    }
  }

  takeMoveInput(dir) {
    if (this.dir === dir && this.game.allowPushing) {
      let pushedTile = this.pushIfOccupied(dir)
      if (pushedTile) {
        return
      }
    }
    this.doMove(dir)
  }

  pushIfOccupied(dir) {
    if (dir === 0 && this.game.gameMap.isOccupied(this.x, this.y-1)) {
      return this.game.gameMap.pushTile(this.x, this.y-1, this.x, this.y-2)
    }
    if (dir === 1 && this.game.gameMap.isOccupied(this.x+1, this.y)) {
      return this.game.gameMap.pushTile(this.x+1, this.y, this.x+2, this.y)
    }
    if (dir === 2 && this.game.gameMap.isOccupied(this.x, this.y+1)) {
      return this.game.gameMap.pushTile(this.x, this.y+1, this.x, this.y+2)
    }
    if (dir === 3 && this.game.gameMap.isOccupied(this.x-1, this.y)) {
      return this.game.gameMap.pushTile(this.x-1, this.y, this.x-2, this.y)
    }
  }

  slash() {
    let x = this.x
    let y = this.y
    slashTimer = slashTimerMax

    const pos = this.posFromDir()
    let tile = this.game.gameMap.getTile(...pos)
    let npc = this.game.nonPlayerManager.getNpc(...pos)

    if (npc) {
      this.game.textManager.bufferConvo(npc.convo, npc.key)
      npc.setDirection(this.inverseDirection[this.dir])
    }
  }

  postMove() {
    const tile = this.game.gameMap.getTile(this.x, this.y, 'Tile Layer 3')
    if (tile && tile.index === exitIndex) {
      let dir
      if (this.y === 0) { dir = 2 }
      if (this.x === this.game.gameMap.map.width-1) { dir = 3 }
      if (this.y === this.game.gameMap.map.height-1) { dir = 0 }
      if (this.x === 0) { dir = 1 }
      this.game.gameMap.exit(dir)
    }
  }
}
