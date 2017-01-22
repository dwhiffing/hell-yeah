export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'

    game.bgMusic = game.add.audio('music', 0.2)
    game.bgMusic.loop = true
    this.game.bgMusic.play()

    let image = this.game.add.image(0,0,'title')
    image.width = this.game.width
    image.height = this.game.height

    let btn = game.add.button(30, 50, 'blank', () => this.start(0))
    let text = game.add.text(0, 0, "Start", { font: "50px Slackey", fill: "#fff" })
    btn.addChild(text)

    let btn2 = game.add.button(30, 120, 'blank', () => this.start(1))
    let text2 = game.add.text(0, 0, "Credits", { font: "50px Slackey", fill: "#fff" })
    btn2.addChild(text2)
  },
  start(index) {
    if (index === 0) {
      this.game.state.start('sokoban', true, false)
    } else {
      this.game.state.start('credits', true, false)
    }
  }
}
