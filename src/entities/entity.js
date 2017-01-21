const tileSize = 116
let timerMax = 8

export default class Entity {
  constructor(game, x=0, y=0) {
    this.moving = false
    this.game = game
    this.x = x
    this.y = y
    this.dir = 0
    this.mod = 2
    this.speed = tileSize/this.mod
    this.moveCount = 0
    this.timer = 0
    this.sprite = game.add.sprite(this.x * tileSize + tileSize/2, (this.y * tileSize + tileSize/2) - tileSize/10, 'player')
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
  }

  update(game) {
    if (this.moving) {
      this.timer--
      if (this.timer <= 0) {
        if (this.didMove) {
          this.move()
        } else {
          this.turn()
        }
        this.timer = timerMax
      }
    }
  }

  doMove(dir) {
    this.lastX = this.x
    this.lastY = this.y
    this.moveCount = 0
    this.moving = true

    if (this.dir === dir) {
      this.didMove = true
      if (dir === 0 && this.game.canWalk(this.x, this.y+1)) {
        this.y += 1
      } else if (dir === 1 && this.game.canWalk(this.x, this.y-1)) {
        this.y -= 1
      } else if (dir === 2 && this.game.canWalk(this.x-1, this.y)) {
        this.x -= 1
      } else if (dir === 3 && this.game.canWalk(this.x+1, this.y)) {
        this.x += 1
      } else {
        this.moving = false
        this.didMove = false
      }
    }
    this.dir = dir
  }

  turn() {
    this.moveCount++
    if (this.dir === 2) {
      this.sprite.scale.x = 1
      this.sprite.frame = 2
    } else if (this.dir === 3) {
      this.sprite.frame = 2
      this.sprite.scale.x = -1
    } else if (this.dir === 1) {
      this.sprite.frame = 1
    } else if (this.dir === 0) {
      this.sprite.frame = 0
    }
    if (this.moveCount >= this.mod) {
      this.postMove()
      this.moving = false
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

  move() {
    if (this.x === this.lastX && this.y === this.lastY) {
      return
    }
    this.moveCount++
    if (this.dir === 2) {
      this.sprite.x -= this.speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 3) {
      this.sprite.x += this.speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 1) {
      this.sprite.y -= this.speed
      this.sprite.frame = this.sprite.frame !== 4 ? 4 : 1
    } else if (this.dir === 0) {
      this.sprite.y += this.speed
      this.sprite.frame = this.sprite.frame !== 3 ? 3 : 0
    }
    if (this.moveCount >= this.mod) {
      this.postMove()
      this.moving = false
      this.didMove = false
    }
  }

  preMove() {
    return true
  }
  postMove() {
    return true
  }
}
