let marker, menu, markerGraphics, timer = 0, timerMax = 20

export default class Inventory {
  constructor(game) {
    this.game = game
    menu = game.add.sprite(5, 16, 'menu')
    menu.alpha = 0
    menu.fixedToCamera = true

    marker = game.add.group()
    markerGraphics = game.add.graphics()
    markerGraphics.lineStyle(2, 0x0f380f, 1)
    markerGraphics.drawRect(0, 0, game.tileSize, game.tileSize)
    marker.add(markerGraphics)
    marker.alpha = 0
    marker.fixedToCamera = true

    for (let x = 1; x < 10; x+=1) {
      for (let y = 2; y < 10; y+=1) {
        const square = game.add.graphics()
        square.beginFill(0x8bac0f)
        marker.add(square)
      }
    }
  }

  update(game) {
    if (timer > 0) {
      timer--
    }
    if (game.upPressed()) {
      this.move(1)
    } else if (game.downPressed()) {
      this.move(0)
    }
    if (game.leftPressed()) {
      this.move(2)
    } else if (game.rightPressed()) {
      this.move(3)
    }
    if (game.priPressed() && this.canSlash) {
      this.pick()
    }
  }

  move(dir) {
    if (timer <= 0) {
      timer = timerMax
      if (dir === 0) {
        markerGraphics.y += this.game.tileSize + 6
      }
      if (dir === 1) {
        markerGraphics.y -= this.game.tileSize + 6
      }
      if (dir === 2) {
        markerGraphics.x -= this.game.tileSize + 6
      }
      if (dir === 3) {
        markerGraphics.x += this.game.tileSize + 6
      }
    }
  }

  pick() {

  }

  openMenu() {
    menu.alpha = 1
    marker.alpha = 1
    markerGraphics.x = 20
    markerGraphics.y = 30
  }

  closeMenu() {
    menu.alpha = 0
    marker.alpha = 0
  }
}
