const boxHeight = 200
const leftBuffer = 200
const rightBuffer = 40
const textBuffer = 30
const lorem = "Food truck church-key master cleanse, succulents brunch forage cold-pressed pok pok lo-fi twee organic banjo. Shoreditch blue bottle cliche austin biodiesel four loko. Fam PBR&B cliche kinfolk forage, lo-fi chambray bicycle rights gochujang kickstarter fashion axe bitters church-key 90's iPhone. XOXO synth meditation, aesthetic tumeric stumptown unicorn normcore blog 3 wolf moon try-hard offal pok pok you probably haven't heard of them. Knausgaard lo-fi live-edge whatever. Freegan sriracha chartreuse, synth iPhone succulents fanny pack vinyl live-edge mumblecore tacos. Bushwick poke cliche roof party, snackwave chillwave venmo fingerstache paleo portland enamel pin vape meditation jianbing."
const timing = 3
const doWeirdThing = false

let textToDisplay = ''
let index = 0
let gotoNextPage = true
let lastWordIndex = []
let textTimer = timing
let doneBuffering = true
let fastMode = false
let startIndex = 0
let lettersPerUpdate = 1

let textObject, objectGroup

export default class TextManager {
  constructor(game) {
    this.game = game

    const y = this.game.height - boxHeight - rightBuffer
    const opts = {
      font: 'Slackey',
      fontSize: 42,
      fill: '#fff',
      wordWrap: true,
      wordWrapWidth: this.game.width - rightBuffer - textBuffer - leftBuffer,
    }

    objectGroup = this.game.add.group()
    this.graphics = this.game.add.graphics(leftBuffer, y)
    this.graphics.fixedToCamera = true


    textObject = this.game.add.text(leftBuffer + textBuffer, y + textBuffer - 10, textToDisplay, opts)
    textObject.fixedToCamera = true

    objectGroup.add(this.graphics)
    objectGroup.add(textObject)
    objectGroup.alpha = 0

    this.graphics.beginFill(0x111111)
    this.graphics.drawRect(0, 0, this.game.width - leftBuffer - rightBuffer, boxHeight)
    this.graphics.endFill()

    this.game.interface.zKey.onDown.add(this.onPress)
    this.game.interface.spaceKey.onDown.add(this.onPress)
  }

  update(game) {
    if (!doneBuffering && gotoNextPage) {

      if (textObject._height > 159 && textObject.text != '') {
        textObject.text = textToDisplay.slice(startIndex, lastWordIndex[1]+1)
        startIndex = lastWordIndex[1]+1
        index = lastWordIndex[0]+1
        fastMode = false
        lettersPerUpdate = 1
        gotoNextPage = false
        return
      }

      if (textTimer > 0) {
        textTimer -= fastMode ? 5 : 1
      } else {
        index += lettersPerUpdate

        let nextString
        if (doWeirdThing) {
          nextString = textToDisplay.slice(startIndex, index+lettersPerUpdate)
        } else {
          nextString = textToDisplay.slice(index, index+lettersPerUpdate)
        }

        textObject.text = textToDisplay.slice(startIndex, index)

        const match = /\s/.exec(nextString)
        if (match) {
          lastWordIndex[1] = lastWordIndex[0]
          lastWordIndex[0] = index + match.index
        }

        if (index > textToDisplay.length) {
          doneBuffering = true
        }

        if (!fastMode) {
          textTimer = timing
        }
      }
    }
  }

  bufferText(text=lorem) {
    textToDisplay = text
    doneBuffering = false
    objectGroup.alpha = 1
  }

  onPress() {
    if (doneBuffering) {
      objectGroup.alpha = 0
    } else if (gotoNextPage) {
      fastMode = true
      lettersPerUpdate = 5
    } else {
      textObject.text = ''
      gotoNextPage = true
    }
  }
}
