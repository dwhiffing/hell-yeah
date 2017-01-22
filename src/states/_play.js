import GameMap from '../entities/map'
import UserInterface from '../entities/interface'
import Player from '../entities/player'
import TextManager from '../entities/textManager'
import NonPlayerManager from '../entities/nonPlayerManager'
import entityData from '../entityData'
import Joystick from '../joystick'

const playStateFactory = ({ tilemap, exit, create=()=>{}, update=()=>{}, render=()=>{}, shutdown=()=>{}, numLevels=1, levelIndex=1 }) => {
  return {
    init(opts) {
      this.opts = opts
    },
    create(game) {
      game.stage.backgroundColor = '#2d2d2d'

      this.opts = this.opts || {}

      this.game.nextLevel = () => {
        if (this.game.gameMap.levelIndex < 5) {
          this.game.gameMap.levelIndex++
          this.game.loadLevel()
        } else {
          let next = 'trivia'
          if (this.game.state.current === 'sokoban') {
            next = 'stealth'
          } else if (this.game.state.current === 'trivia') {
            return
          }
          this.game.state.start(next, true, false)
        }
      }

      this.game.previousLevel = () => {
        if (this.game.gameMap.levelIndex > 1) {
          this.game.gameMap.levelIndex--
          this.game.loadLevel()
        } else {
          let prev = 'stealth'
          if (this.game.state.current === 'stealth') {
            prev = 'sokoban'
          } else if (this.game.state.current === 'sokoban') {
            return
          }
          this.game.state.start(prev, true, false)
        }
      }

      game.talk1Sound = game.add.audio('talk1')
      game.talk2Sound = game.add.audio('talk2')
      game.talk3Sound = game.add.audio('talk3')
      game.rockSound = game.add.audio('push')
      game.wewSound = game.add.audio('wew')
      game.footSound = game.add.audio('foot1', 0.1)
      game.foot2Sound = game.add.audio('foot2', 0.3)

      game.gameMap = new GameMap(game, tilemap, exit, this.opts.direction, numLevels, levelIndex)

      game.loadLevel = () => {
        game.interface = new UserInterface(game)
        this.game.interface.addRestart(this.game.loadLevel)

        game.gameMap.loadLevel()

        game.player = new Player(game, game.gameMap.playerX, game.gameMap.playerY, game.gameMap.playerDir)
        game.nonPlayerManager = new NonPlayerManager(game)
        game.allowPushing = true
        game.playerCanMove = true

        game.nonPlayerManager.createEntities(game.gameMap.entityPositions.map((e, i) => {
          const passedIn = entityData[tilemap][game.gameMap.levelIndex - 1][i]
          return {
            x: e.x,
            y: e.y,
            key: passedIn ? passedIn.key : 'man',
            speed: passedIn ? passedIn.speed : undefined,
            movement: passedIn ? passedIn.movement : [],
            convo: passedIn ? passedIn.convo : [],
            direction: passedIn ? passedIn.direction : 0,
          }
        }))

        game.interface.createUI()

        game.joystick = new Joystick(game, 200, this.game.height - 200)
        game.joystick.inputEnable()

        game.textManager = new TextManager(game)

        game.camera.x = 0
        game.camera.y = 0
        game.camera.follow(game.player.sprite)
      }

      game.loadLevel()

      game.canWalk = (x, y) => {
        return game.gameMap.canWalk(x, y) && game.nonPlayerManager.canWalk(x, y)
      }

      create(game)
    },

    update(game) {
      this.game.joystick.preUpdate(game)
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
