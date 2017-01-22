export default class LightManager {
  constructor(game, lightRadius=600) {
    this.game = game
    this.lightRadius = lightRadius

    this.shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height)
    this.shadowTexture.fixedToCamera = true

    this.lightSprite = game.add.image(0, 0, this.shadowTexture)
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY
    this.lightSprite.fixedToCamera = true
  }
  update() {
    this.shadowTexture.context.fillStyle = 'rgba(13, 13, 13, 1)'
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height)

    this.target = this.getPositionOnCamera(this.game, this.game.player.sprite)
    this.center = [
      this.target.x,
      this.target.y,
    ]

    this.drawAura()
    this.shadowTexture.dirty = true
  }
  getPositionOnCamera(game, target, offset= true) {
    let offsetX = 0
    let offsetY = 20
    return {
      x: (target.x - game.camera.position.x) + offsetX,
      y: (target.y - game.camera.position.y) + offsetY
    }
  }
  drawAura() {
    const ctx = this.shadowTexture.context
    const { width, height } = this.game
    const flicker = this.game.rnd.integerInRange(0, this.lightRadius / 20)
    const innerRadius = this.lightRadius * 0.05
    const outerRadius = this.lightRadius + flicker
    const gradient = ctx.createRadialGradient(...this.center, innerRadius, ...this.center, outerRadius)
    gradient.addColorStop(0, `rgba(255,255,255, 0.7)`)
    gradient.addColorStop(0.5, `rgba(255,255,255, 0.2 )`)
    gradient.addColorStop(0.9, `rgba(255,255,255, 0)`)
    this.shadowTexture.context.beginPath()
    this.shadowTexture.context.fillStyle = gradient
    this.shadowTexture.context.arc(this.target.x, this.target.y,
        this.lightRadius, 0, Math.PI*2)
    this.shadowTexture.context.fill()

  }
  getLight(level) {
    return `${24 * level}, ${23 * level}, ${22 * level}`
  }
}
