let cursors, aKey, wKey, sKey, dKey, spaceKey, zKey, rKey
let nineKey, zeroKey

export default class Interface {
  constructor(game) {
    this.game = game

    cursors = game.input.keyboard.createCursorKeys()
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    rKey = game.input.keyboard.addKey(Phaser.Keyboard.P)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z)

    nineKey = game.input.keyboard.addKey(Phaser.Keyboard.NINE)
    zeroKey = game.input.keyboard.addKey(Phaser.Keyboard.ZERO)

    game.upPressed = () => cursors.up.isDown || wKey.isDown || game.joystick.cursors.up
    game.downPressed = () => cursors.down.isDown || sKey.isDown || game.joystick.cursors.down
    game.leftPressed = () => cursors.left.isDown || aKey.isDown || game.joystick.cursors.left
    game.rightPressed = () => cursors.right.isDown || dKey.isDown || game.joystick.cursors.right
    game.priPressed = () => spaceKey.justDown || zKey.justDown || game.joystick.pressed
    game.priDown = () => spaceKey.isDown || zKey.isDown

    this.addRight = (fn) => {
      cursors.right.onDown.add(fn)
      dKey.onDown.add(fn)
      game.joystick.onRight = fn
    }
    
    this.addLeft = (fn) => {
      cursors.left.onDown.add(fn)
      aKey.onDown.add(fn)
      game.joystick.onLeft = fn
    }

    this.addRestart = (fn) => {
      rKey.onDown.add(fn)
    }

    this.onPri = (fn) => {
      game.joystick.onPress = fn
    }

    this.spaceKey = spaceKey
    this.zKey = zKey

    zeroKey.onDown.add(game.nextLevel)
    nineKey.onDown.add(game.previousLevel)
  }

  createUI() {
    this.game.muteButton = this.game.add.button(this.game.width - 120, this.game.height - 62, 'mute', this.mute)
    this.game.muteButton.fixedToCamera = true
    this.game.muteButton.scale.setTo(2.5)
    this.game.muteButton.frame = 1
    this.game.muteButton.alpha = 0.5

    this.game.fullscreenButton = this.game.add.button(this.game.width - 60, this.game.height - 60, 'full', () => {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen()
      } else {
        this.game.scale.startFullScreen(false)
      }
    })

    this.game.fullscreenButton.fixedToCamera = true
    this.game.fullscreenButton.scale.setTo(0.2)

    this.game.refreshButton = this.game.add.button(this.game.width - 90, 30, 'refresh', this.game.loadLevel)
    this.game.refreshButton.fixedToCamera = true
    this.game.refreshButton.alpha = 0.5
    this.game.refreshButton.scale.setTo(0.25)
  }

  mute() {
    this.game.sound.mute = !this.game.sound.mute
    this.game.muteButton.frame = !!this.game.sound.mute ? 0 : 1
  }

  update(game) {}
}
