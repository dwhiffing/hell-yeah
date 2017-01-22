import 'pixi'
import 'p2'
import Phaser from 'phaser'
var script = document.createElement('script'); script.src = "http://netcell.github.io/phaser-inspector/build/phaser-inspector.js"; document.getElementsByTagName('head')[0].appendChild(script); function phaserInspectorInject(){ if (Phaser.Plugin.Inspector) Phaser.GAMES[0].plugins.add(Phaser.Plugin.Inspector); else setTimeout(phaserInspectorInject); } setTimeout(phaserInspectorInject);
window.Phaser = Phaser

import BootState from './states/boot'
import LoadState from './states/load'

import SokobanState from './states/sokoban'
import TriviaState from './states/trivia'
import StealthState from './states/stealth'

(function() {
  let game = new Phaser.Game(1334, 750, Phaser.AUTO, 'app', null, false, false)

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('sokoban', SokobanState)
  game.state.add('trivia', TriviaState)
  game.state.add('stealth', StealthState)
  game.state.start('boot')
})()
