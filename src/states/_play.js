import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import Player from '../entities/player'
import TextManager from '../entities/textManager'
import NonPlayerManager from '../entities/nonPlayerManager'

const playStateFactory = ({ tilemap, create=()=>{}, update=()=>{}, render=()=>{}, shutdown=()=>{} }) => {
  return {
    create(game) {
      game.stage.backgroundColor = '#2d2d2d'

      game.interface = new UserInterface(game)
      game.gameMap = new GameMap(game, tilemap)
      game.player = new Player(game, game.gameMap.playerX, game.gameMap.playerY)
      game.textManager = new TextManager(game)
      game.nonPlayerManager = new NonPlayerManager(game)

      game.canWalk = (x, y) => {
        return game.gameMap.canWalk(x, y) && game.nonPlayerManager.canWalk(x, y)
      }

      game.camera.x = 0
      game.camera.y = 0
      game.camera.follow(game.player.sprite)
      create(game)
    },

    update(game) {
      game.interface.update(game)
      game.player.update(game)
      game.textManager.update(game)
      game.nonPlayerManager.update(game)
      update(game)
    },

    render(game) {
      render(game)
    },

    shutdown(game) {
      shutdown(game)
    },
  }
}

export default playStateFactory
