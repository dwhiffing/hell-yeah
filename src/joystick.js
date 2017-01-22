var initialPoint
const threshold = 50
class Joystick {
  constructor(game, x, y) {
    this.game = game
    this.input = this.game.input
    this.imageGroup = []

    // this.imageGroup.push(this.game.add.sprite(0, 0, 'compass'))
    // this.imageGroup.push(this.game.add.sprite(0, 0, 'touch_segment'))
    this.tip = this.game.add.sprite(x, y, 'joyTip')
    this.base = this.game.add.sprite(x, y, 'joyBase')
    this.imageGroup.push(this.base)
    this.imageGroup.push(this.tip)
    this.imageGroup.forEach(function (e) {
      e.bringToTop()
      e.anchor.set(0.5)
      e.fixedToCamera=true
    })

    this.cursors = {
      up: false, down: false, left: false, right: false
    }

    this.settings = {
      maxDistanceInPixels: 200,
      singleDirection: true
    }

    this.speed = {
      x:0, y:0
    }
  }

  preUpdate() {
    this.fadeOut()
  }

  fadeOut() {
    if (this.base.alpha > 0.1) {
      this.base.alpha -= 0.03
      this.tip.alpha -= 0.03
    }
  }

  inputEnable() {
    this.input.onDown.add(this.createCompass.bind(this))
    this.input.onUp.add(this.removeCompass.bind(this))
  }

  inputDisable() {
    this.input.onDown.remove(this.createCompass.bind(this))
    this.input.onUp.remove(this.removeCompass.bind(this))
  }

  createCompass(){
    initialPoint = this.input.activePointer.position.clone()
    this.isClick = true
    setTimeout(() => this.isClick = false, 150)
    this.base.alpha = 1
    this.tip.alpha = 1

    if (initialPoint.y < 100 || initialPoint.y > this.game.height - 60) {
      return
    }

    this.imageGroup.forEach(function (e) {
      e.cameraOffset.x = this.input.worldX
      e.cameraOffset.y = this.input.worldY
    }, this)

    this.preUpdate = this.setDirection.bind(this)
  }

  removeCompass () {
    this.cursors.up = false
    this.cursors.down = false
    this.cursors.left = false
    this.cursors.right = false
    var d = initialPoint.distance(this.input.activePointer.position)

    if (this.isClick && d < 5) {
      this.pressed = true
      if (this.onPress) {
        this.onPress()
      }
      setTimeout(() => this.pressed = false, 100)
    }

    this.imageGroup.forEach(function (e) {
      e.cameraOffset.x = initialPoint.x
      e.cameraOffset.y = initialPoint.y
    }, this)

    this.speed.x = 0
    this.speed.y = 0

    this.preUpdate = this.fadeOut
  }

  setDirection() {
    var d = initialPoint.distance(this.input.activePointer.position)
    var maxDistanceInPixels = this.settings.maxDistanceInPixels

    var deltaX = this.input.activePointer.position.x - initialPoint.x
    var deltaY = this.input.activePointer.position.y - initialPoint.y

    if (this.settings.singleDirection){
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        deltaY = 0
        this.input.activePointer.position.y = initialPoint.y
      } else {
        deltaX = 0
        this.input.activePointer.position.x = initialPoint.x
      }
    }
    var angle = initialPoint.angle(this.input.activePointer.position)

    if (d > maxDistanceInPixels) {
      deltaX = Math.cos(angle) * maxDistanceInPixels
      deltaY = Math.sin(angle) * maxDistanceInPixels
    }

    this.speed.x = parseInt((deltaX/maxDistanceInPixels) * 100 * -1, 10)
    this.speed.y = parseInt((deltaY/maxDistanceInPixels) * 100 * -1, 10)

    this.cursors.up = (deltaY < -threshold)
    this.cursors.down = (deltaY > threshold)
    this.cursors.left = (deltaX < -threshold)
    this.cursors.right = (deltaX > threshold)

    if (this.cursors.left && this.onLeft && !this.justLeft) {
      this.justLeft = true
      setTimeout(() => this.justLeft = false, 300)
      this.onLeft()
    }
    if (this.cursors.right && this.onRight && !this.justRight) {
      this.justRight = true
      setTimeout(() => this.justRight = false, 300)
      this.onRight()
    }

    this.imageGroup.forEach(function(e,i){
      e.cameraOffset.x = initialPoint.x+(deltaX)*i/3
      e.cameraOffset.y = initialPoint.y+(deltaY)*i/3
    }, this)
  }
}

export default Joystick
