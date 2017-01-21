export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.game.stage.smoothed = false

    this.load.image('tile', 'images/tile.png')
    this.load.image('menu', 'images/menu.png')
    this.load.spritesheet('player', 'images/player.png', 16, 16)
    this.load.spritesheet('stuff', 'images/stuff.png', 16, 16)

    this.load.tilemap('sokoban', 'json/sokoban.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('bridge', 'json/bridge.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('memory', 'json/memory.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('trivia', 'json/trivia.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth', 'json/stealth.json', null, Phaser.Tilemap.TILED_JSON)
  },

  onLoadComplete() {
    this.game.state.start('stealth', true, false)
  }
}
