import NonPlayer from '../entities/npc'

export default class NonPlayerManager {
  constructor(game) {
    this.nonPlayerObjects = []
    this.game = game
    this.group = game.add.group()
  }

  createEntities(nonPlayers) {
    nonPlayers.forEach(p => {
      let nonPlayer = new NonPlayer(this.game, ...p)
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
}
