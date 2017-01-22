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

    game.upPressed = () => cursors.up.isDown || wKey.isDown
    game.downPressed = () => cursors.down.isDown || sKey.isDown
    game.leftPressed = () => cursors.left.isDown || aKey.isDown
    game.rightPressed = () => cursors.right.isDown || dKey.isDown
    game.priPressed = () => spaceKey.justDown || zKey.justDown
    game.priDown = () => spaceKey.isDown || zKey.isDown

    this.addRight = (fn) => {
      cursors.right.onDown.add(fn)
      dKey.onDown.add(fn)
    }
    this.addLeft = (fn) => {
      cursors.left.onDown.add(fn)
      aKey.onDown.add(fn)
    }

    this.addRestart = (fn) => {
      rKey.onDown.add(fn)
    }

    this.spaceKey = spaceKey
    this.zKey = zKey

    zeroKey.onDown.add(this.game.nextLevel)
    nineKey.onDown.add(this.game.previousLevel)
  }

  update(game) {}
}
