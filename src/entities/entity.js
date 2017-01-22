const tileSize = 116
let timerMax = 8

export default class Entity {
  constructor(game, x=0, y=0, key="player") {
    this.moving = false
    this.game = game
    this.x = x
    this.y = y
    this.lastX = this.x
    this.lastY = this.y
    this.dir = 0
    this.speed = 400
    this.frameRate = 4
    this.sprite = game.add.sprite((this.x * tileSize + tileSize/2), (this.y * tileSize), key)
    this.sprite.anchor.x = 0.5
    this.inverseDirection = [2, 3, 0, 1]
    this.upAnim = this.sprite.animations.add('up', [0, 3], true)
    this.downAnim = this.sprite.animations.add('down', [1, 4], true)
    this.sideAnim = this.sprite.animations.add('side', [2, 5], true)
    this.setDirection()
  }

  update(game) {
    if (this.x === this.lastX && this.y === this.lastY || this.moving) {
      return
    }
    if (this.didMove) {
      if (this.dir === 0) {
        this.downAnim.play(5, true)
      } else if (this.dir === 1) {
        this.sideAnim.play(5, true)
      } else if (this.dir === 2) {
        this.upAnim.play(5, true)
      } else if (this.dir === 3) {
        this.sideAnim.play(5, true)
      }
      this.setDirection()
      this.moving = true
      this.tween = this.game.add.tween(this.sprite)
      this.tween.onComplete.add(this.finishTween.bind(this))
      this.tween.to({ x: this.x * tileSize + tileSize/2, y: this.y * tileSize }, this.speed).start()
    } else {
      this.setDirection()
      this.postMove()
      this.moving = true
      setTimeout(() => {
        this.moving = false
        this.upAnim.stop()
        this.downAnim.stop()
        this.sideAnim.stop()
      }, this.speed)
    }
  }

  doMove(dir) {
    this.lastX = this.x
    this.lastY = this.y

    if (this.dir === dir) {
      this.didMove = true
      if (dir === 0 && this.game.canWalk(this.x, this.y-1)) {
        this.y -= 1
      } else if (dir === 1 && this.game.canWalk(this.x+1, this.y)) {
        this.x += 1
      } else if (dir === 2 && this.game.canWalk(this.x, this.y+1)) {
        this.y += 1
      } else if (dir === 3 && this.game.canWalk(this.x-1, this.y)) {
        this.x -= 1
      } else {
        this.moving = false
        this.didMove = false
      }
    }
    this.dir = dir
  }

  setDirection(dir=this.dir) {
    this.dir = dir
    if (this.dir === 0) {
      // this.sprite.frame = 1
    } else if (this.dir === 1) {
      // this.sprite.frame = 2
      this.sprite.scale.x = 1
    } else if (this.dir === 2) {
      // this.sprite.frame = 0
    } else if (this.dir === 3) {
      this.sprite.scale.x = -1
      // this.sprite.frame = 2
    }
  }

  posFromDir(dir=this.dir, x=this.x, y=this.y) {
    if (dir === 0) {
      return [x, y-1]
    } else if (dir === 1) {
      return [x+1, y]
    } else if (dir === 2) {
      return [x, y+1]
    } else if (dir === 3) {
      return [x-1, y]
    }
  }

  finishTween() {
    this.postMove()
    this.moving = false
    this.upAnim.stop()
    this.downAnim.stop()
    this.sideAnim.stop()
    this.didMove = false
    this.lastX = this.x
    this.lastY = this.y
  }

  preMove() {
    return true
  }
  postMove() {
    return true
  }
}
