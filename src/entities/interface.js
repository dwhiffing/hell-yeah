let cursors, aKey, wKey, sKey, dKey, spaceKey, zKey
let oneKey, twoKey, threeKey, fourKey, fiveKey

export default class Interface {
  constructor(game) {
    this.game = game

    cursors = game.input.keyboard.createCursorKeys()
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A)
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S)
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z)

    oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE)
    twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO)
    threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    fiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE)

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

    this.spaceKey = spaceKey
    this.zKey = zKey

    oneKey.onDown.add(() => this.game.state.start('sokoban', true, false))
    twoKey.onDown.add(() => this.game.state.start('bridge', true, false))
    threeKey.onDown.add(() => this.game.state.start('memory', true, false))
    fourKey.onDown.add(() => this.game.state.start('trivia', true, false))
    fiveKey.onDown.add(() => this.game.state.start('stealth', true, false))
  }

  update(game) {}
}
