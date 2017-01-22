let getStyle = (size, bold) => {
  return {
    font: `${bold ? 'bold ' : ''}${size}px Arial`,
    fill: "#fff",
    align: 'center'
  }
}

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000000'
    let x = this.game.world.centerX
    let y = this.game.world.centerY
    let titleText = game.add.text(x, 70, "Hell Yeah!", getStyle(60, true))

    let daniel = game.add.text(x, 200, "Coding", getStyle(38, true))
    let daniel2 = game.add.text(x, 250, "Daniel Whiffing", getStyle(28))

    let twins = game.add.text(x, 320, "Art", getStyle(38, true))
    let twins2 = game.add.text(x, 370, "Steph & Sam Braithwaite", getStyle(28))

    let john = game.add.text(x, 450, "Music", getStyle(38, true))
    let john2 = game.add.text(x, 520, "M - Gentalmen: Focus Remix\nhttps://soundcloud.com/mentalgen", getStyle(28))

    let startText = game.add.text(x, this.game.height - 60, "Back to menu", getStyle(38, true))

    titleText.anchor.setTo(0.5)
    daniel.anchor.setTo(0.5)
    daniel2.anchor.setTo(0.5)
    twins.anchor.setTo(0.5)
    twins2.anchor.setTo(0.5)
    john.anchor.setTo(0.5)
    john2.anchor.setTo(0.5)
    startText.anchor.setTo(0.5)

    game.input.onDown.add(() => {
      game.state.start('menu', true, false)
    })
  },
}
