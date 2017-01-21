import 'pixi'
import 'p2'
import Phaser from 'phaser'

window.Phaser = Phaser

import BootState from './states/boot'
import LoadState from './states/load'

import SokobanState from './states/sokoban'
import BridgeState from './states/bridge'
import MemoryState from './states/memory'
import TriviaState from './states/trivia'
import StealthState from './states/stealth'

(function() {
  let game = new Phaser.Game(160, 160, Phaser.AUTO, 'app', null, false, false)

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('sokoban', SokobanState)
  game.state.add('bridge', BridgeState)
  game.state.add('memory', MemoryState)
  game.state.add('trivia', TriviaState)
  game.state.add('stealth', StealthState)
  game.state.start('boot')
})()
