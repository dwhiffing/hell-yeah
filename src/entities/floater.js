const tileSize = 116
const numTypes = 3
let floaters, startPositions

export default class FloaterManager {
  constructor(game, tiles) {
    this.game = game

    floaters = []
    startPositions = []

    tiles.forEach(tile => {
      let floater = game.add.sprite(tile.x * tileSize, tile.y * tileSize, 'stuff')
      floater.frame = 2
      floater.colorType = Math.floor(Math.random() * numTypes)
      floaters.push(floater)
      startPositions.push(tile)
    })

    this.timeout = setTimeout(this.reveal.bind(this), 1000)
  }

  update(game) {

  }

  destroy() {
    clearTimeout(this.timeout)
  }

  move() {
    const endPositions = Phaser.ArrayUtils.shuffle(startPositions)
    floaters.forEach((floater, index) => {
      const x = endPositions[index].x - 5
      const y = endPositions[index].y
      let tween = this.game.add.tween(floater).to({ x: x * tileSize, y: y * tileSize }, 2000).start()
    })
  }

  reveal() {
    floaters.forEach(floater => floater.tint = this.getColor(floater.colorType))
    this.timeout = setTimeout(this.hide.bind(this), 1000)
  }

  hide() {
    floaters.forEach(floater => floater.tint = 0xffffff)
    this.timeout = setTimeout(this.move.bind(this), 1000)
  }

  getColor(type) {
    if (type === 0) {
      return 0xff0000
    } else if (type === 1) {
      return 0x00ff00
    } else {
      return 0x0000ff
    }
  }
}
