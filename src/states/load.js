export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.game.stage.smoothed = false

    this.load.image('tile', 'images/tile.png')
    this.load.image('menu', 'images/menu.png')
    this.load.spritesheet('player', 'images/player.png', 16, 16)
    this.load.spritesheet('stuff', 'images/stuff.png', 16, 16)
    this.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON)
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
