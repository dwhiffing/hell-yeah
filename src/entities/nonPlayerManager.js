import NonPlayer from '../entities/npc'

export default class NonPlayerManager {
  constructor(game) {
    this.nonPlayerObjects = []
    this.game = game
    this.group = game.add.group()
  }

  createEntities(nonPlayers, convos) {
    nonPlayers.forEach(p => {
      let nonPlayer = new NonPlayer(this.game, p.x, p.y, p.key, p.direction, p.movement, p.convo, p.speed)
      this.group.add(nonPlayer.sprite)
      this.nonPlayerObjects.push(nonPlayer)
    })
  }

  update(game) {
    this.nonPlayerObjects.forEach(n => n.update(game))
  }

  getNpc(x, y) {
    let toReturn
    this.nonPlayerObjects.forEach(n => {
      if (n.x === x && n.y === y) {
        toReturn = n
      }
    })
    return toReturn
  }

  canWalk(x, y) {
    return !this.getNpc(x, y)
  }

  kill(npc) {
    let index = this.nonPlayerObjects.indexOf(npc)
    if (index > -1) {
      this.nonPlayerObjects.splice(index, 1)
      npc.sprite.kill()
    }
  }
}
