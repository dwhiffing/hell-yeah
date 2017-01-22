import playStateFactory from './_play'

const stoneIndex = 21
const boneIndex = 28

export default playStateFactory({
  tilemap: 'sokoban',
  exit: 'bridge',
  numLevels: 5,
  levelIndex: 1,
  create: function(game) {
  },
  update: function(game) {
    const stones = game.gameMap.getTilesForIndex(stoneIndex, 'Tile Layer 2')
    const bones = game.gameMap.getTilesForIndex(boneIndex, 'Tile Layer 3')
    let finished = bones.every(b => stones.some(s => s.x === b.x && s.y === b.y))
    if (finished) {
      game.allowPushing = false
      game.gameMap.revealExit()
    }
  },
})
