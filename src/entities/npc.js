import Entity from './entity'


export default class NonPlayer extends Entity {
  constructor(game, x=0, y=0, _movements=[], loop=true) {
    super(game, x, y)
    this.movements = [..._movements]
    this.queued = []
    this.moveTo()
  }

  update(game) {
    super.update()
    if (!this.moving) {
      if (this.queued.length > 0) {
        this.doMove(this.queued.shift())
      } else {
        this.moveTo()
      }
    }
  }

  moveTo() {
    this.queued = [...this.movements]
  }
}
