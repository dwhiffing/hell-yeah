let cursors, aKey, wKey, sKey, dKey, spaceKey, zKey, xKey

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
    xKey = game.input.keyboard.addKey(Phaser.Keyboard.X)

    game.upPressed = () => cursors.up.isDown || wKey.isDown
    game.downPressed = () => cursors.down.isDown || sKey.isDown
    game.leftPressed = () => cursors.left.isDown || aKey.isDown
    game.rightPressed = () => cursors.right.isDown || dKey.isDown
    game.priPressed = () => spaceKey.justDown || zKey.justDown
    game.secPressed = () => xKey.justDown
  }

  update(game) {
    if (game.secPressed()) {
      game.menuOpen = !game.menuOpen
      game.menuOpen ?
        game.inventory.openMenu() :
        game.inventory.closeMenu()
    }
  }
}
