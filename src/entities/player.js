let marker
let timer = 0
let moveCount = 0
let timerMax = 8
let slashTimerMax = 8
let slashTimer = 0
const speed = 8

export default class Player {
  constructor(game) {
    this.moving = false
    this.game = game
    this.x = 8
    this.y = 8
    this.dir = 0
    this.canSlash = true
    this.sprite = game.add.sprite(this.x * 16 + 9, this.y * 16 + 6, 'player')
    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.currentTile = null

    marker = game.add.group()
    const markerGraphics = game.add.graphics()
    markerGraphics.lineStyle(2, 0x0f380f, 1)
    markerGraphics.drawRect(4, 4, game.tileSize-10, game.tileSize-10)
    marker.add(markerGraphics)
  }

  update(game) {
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
      if (game.priPressed() && this.canSlash) {
        this.slash()
      }
    } else {
      timer--
      if (timer <= 0) {
        if (this.didMove) {
          this.move()
        } else {
          this.turn()
        }
        timer = timerMax
      }
    }
    slashTimer--
    if (slashTimer <= slashTimerMax/2) {
      marker.alpha = 0
    }
    if (slashTimer <= 0) {
      this.canSlash = true
    }
  }

  takeMoveInput(dir) {
    this.moving = true
    this.lastX = this.x
    this.lastY = this.y
    if (this.dir === dir) {
      if (dir === 0) {
        if (this.game.gameMap.isOccupied(this.x, this.y+1)) {
          this.game.gameMap.pushTile(this.x, this.y+1, this.x, this.y+2)
        } else {
          this.didMove = true
          moveCount = 0
          this.y++
        }
      }
      if (dir === 1) {
        if (this.game.gameMap.isOccupied(this.x, this.y-1)) {
          this.game.gameMap.pushTile(this.x, this.y-1, this.x, this.y-2)
        } else {
          this.didMove = true
          moveCount = 0
          this.y--
        }
      }
      if (dir === 2) {
        if (this.game.gameMap.isOccupied(this.x-1, this.y)) {
          this.game.gameMap.pushTile(this.x-1, this.y, this.x-2, this.y)
        } else {
          this.didMove = true
          moveCount = 0
          this.x--
        }
      }
      if (dir === 3) {
        if (this.game.gameMap.isOccupied(this.x+1, this.y)) {
          this.game.gameMap.pushTile(this.x+1, this.y, this.x+2, this.y)
        } else {
          this.didMove = true
          moveCount = 0
          this.x++
        }
      }
    }
    this.dir = dir
  }

  turn() {
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
    this.moving = false
  }

  move() {
    if (this.x === this.lastX && this.y === this.lastY) {
      return
    }
    moveCount++
    if (this.dir === 2) {
      this.sprite.x -= speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 3) {
      this.sprite.x += speed
      this.sprite.frame = this.sprite.frame !== 5 ? 5 : 2
    } else if (this.dir === 1) {
      this.sprite.y -= speed
      this.sprite.frame = this.sprite.frame !== 4 ? 4 : 1
    } else if (this.dir === 0) {
      this.sprite.y += speed
      this.sprite.frame = this.sprite.frame !== 3 ? 3 : 0
    }
    if (moveCount >= 2) {
      this.moving = false
      this.didMove = false
    }
  }

  slash() {
    let x = this.x
    let y = this.y
    marker.alpha = 1
    slashTimer = slashTimerMax
    if (this.dir === 2) {
      x -= 1
      this.game.gameMap.destroyTile(this.x-1, this.y)
    }
    if (this.dir === 3) {
      x += 1
      this.game.gameMap.destroyTile(this.x+1, this.y)
    }
    if (this.dir === 1) {
      y -= 1
      this.game.gameMap.destroyTile(this.x, this.y-1)
    }
    if (this.dir === 0) {
      y += 1
      this.game.gameMap.destroyTile(this.x, this.y+1)
    }
    marker.x = x * 16 + 2
    marker.y = y * 16
  }
}
