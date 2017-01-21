import Entity from './entity'
let slashTimerMax = 8
let slashTimer = 0

export default class Player extends Entity {
  constructor(game, x=0, y=0) {
    super(game, x, y)
    this.game = game
    this.game.interface.zKey.onDown.add(this.doSlash.bind(this))
    this.game.interface.spaceKey.onDown.add(this.doSlash.bind(this))
  }

  update(game) {
    super.update()

    if (!this.game.textManager.finishedWithText) {
      return
    }

    if (!this.moving) {
      if (game.upPressed()) {
        this.takeMoveInput(1)
      } else if (game.downPressed()) {
        this.takeMoveInput(0)
      }
      if (game.leftPressed()) {
        this.takeMoveInput(2)
      } else if (game.rightPressed()) {
        this.takeMoveInput(3)
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
    if (this.dir === dir) {
      let pushedTile = this.pushIfOccupied(dir)
      if (pushedTile) {
        this.moving = true
        return
      }
    }
    this.doMove(dir)
  }

  pushIfOccupied(dir) {
    if (dir === 0 && this.game.gameMap.isOccupied(this.x, this.y+1)) {
      return this.game.gameMap.pushTile(this.x, this.y+1, this.x, this.y+2)
    }
    if (dir === 1 && this.game.gameMap.isOccupied(this.x, this.y-1)) {
      return this.game.gameMap.pushTile(this.x, this.y-1, this.x, this.y-2)
    }
    if (dir === 2 && this.game.gameMap.isOccupied(this.x-1, this.y)) {
      return this.game.gameMap.pushTile(this.x-1, this.y, this.x-2, this.y)
    }
    if (dir === 3 && this.game.gameMap.isOccupied(this.x+1, this.y)) {
      return this.game.gameMap.pushTile(this.x+1, this.y, this.x+2, this.y)
    }
  }

  posFromDir(dir=this.dir, x=this.x, y=this.y) {
    if (dir === 2) {
      return [x-1, y]
    } else if (dir === 3) {
      return [x+1, y]
    } else if (dir === 1) {
      return [x, y-1]
    } else if (dir === 0) {
      return [x, y+1]
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
      this.game.textManager.bufferText()
    }
  }
}
