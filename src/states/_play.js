import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import Player from '../entities/player'
import TextManager from '../entities/textManager'

const playStateFactory = ({ tilemap, create=()=>{}, update=()=>{}, render=()=>{} }) => {
  return {
    create(game) {
      game.stage.backgroundColor = '#2d2d2d'

      game.interface = new UserInterface(game)
      game.gameMap = new GameMap(game, tilemap)
      game.player = new Player(game)
      game.textManager = new TextManager(game)

      game.camera.x = 0
      game.camera.y = 0
      game.camera.follow(game.player.sprite)
      create(game)
    },

    update(game) {
      game.interface.update(game)
      game.player.update(game)
      game.textManager.update(game)
      update(game)
    },

    render(game) {
      render(game)
    }
  }
}

export default playStateFactory
