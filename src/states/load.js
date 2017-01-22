export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.game.stage.smoothed = false

    this.load.audio('talk1', 'audio/talk9.mp3')
    this.load.audio('talk2', 'audio/talk10.mp3')
    this.load.audio('talk3', 'audio/talk7.mp3')

    this.load.spritesheet('tile', 'images/tile.png', 116, 116)
    this.load.spritesheet('triggers', 'images/triggers.png', 116, 116)
    this.load.spritesheet('stuff', 'images/stuff.png', 116, 116)
    this.load.spritesheet('player', 'images/player.png', 116, 116)
    this.load.spritesheet('man', 'images/man.png', 116, 116)
    this.load.spritesheet('charon', 'images/charon.png', 116, 116)
    this.load.spritesheet('skull', 'images/skull.png', 116, 116)
    this.load.spritesheet('woman', 'images/woman.png', 116, 116)
    this.load.spritesheet('portrait', 'images/faces.png', 400, 400)

    this.load.tilemap('sokoban', 'json/sokoban.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('sokoban_2', 'json/sokoban_2.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('sokoban_3', 'json/sokoban_3.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('sokoban_4', 'json/sokoban_4.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('sokoban_5', 'json/sokoban_5.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth', 'json/stealth.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth_2', 'json/stealth_2.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth_3', 'json/stealth_3.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth_4', 'json/stealth_4.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('stealth_5', 'json/stealth_5.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.tilemap('trivia', 'json/trivia.json', null, Phaser.Tilemap.TILED_JSON)
  },

  onLoadComplete() {
    this.game.state.start('trivia', true, false)
  }
}
