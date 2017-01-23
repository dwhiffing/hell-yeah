export default {
  create() {
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.state.start('load', true, false)
  }
}
