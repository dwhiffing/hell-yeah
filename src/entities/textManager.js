const boxHeight = 200
const leftBuffer = 300
const rightBuffer = 40
const textBuffer = 30
const timing = 2
const doWeirdThing = false

export default class TextManager {
  constructor(game) {
    this.game = game

    this.onPress = this.onPress.bind(this)

    const y = this.game.height - boxHeight - rightBuffer
    const opts = {
      font: 'Slackey',
      fontSize: 42,
      fill: '#fff',
      wordWrap: true,
      wordWrapWidth: this.game.width - rightBuffer - textBuffer - leftBuffer,
    }

    this.objectGroup = this.game.add.group()
    this.graphics = this.game.add.graphics(leftBuffer, y)
    this.graphics.fixedToCamera = true

    this.textObject = this.game.add.text(leftBuffer + textBuffer, y + textBuffer - 10, this.textToDisplay, opts)
    this.textObject.fixedToCamera = true

    this.portrait = this.game.add.sprite(leftBuffer - 120, y + 50, 'portrait')
    this.portrait.anchor.x = 0.5
    this.portrait.anchor.y = 0.5
    this.portrait.fixedToCamera = true
    this.portraitTiming = 0
    this.portraitTimingMax = 2
    this.portraitFrame = 0
    this.soundTiming = 0
    this.soundTimingMin = 10
    this.soundTimingMax = 30
    this.sounds = [game.talk1Sound,game.talk2Sound,game.talk3Sound]

    const choiceOpts = Object.assign({}, opts, { font: 'bold Slackey', fontSize: 30 })

    this.choiceAText = this.game.add.text(leftBuffer + textBuffer + 220, y + textBuffer + 120, 'choiceA', choiceOpts)
    this.choiceBText = this.game.add.text(leftBuffer + textBuffer + 640, y + textBuffer + 120, 'choiceB', choiceOpts)
    this.choiceAText.anchor.y = 0.5
    this.choiceAText.anchor.x = 0.5
    this.choiceBText.anchor.y = 0.5
    this.choiceBText.anchor.x = 0.5

    this.choiceAText.fixedToCamera = true
    this.choiceBText.fixedToCamera = true
    this.game.interface.addLeft(this.toggleChoice.bind(this))
    this.game.interface.addRight(this.toggleChoice.bind(this))

    this.objectGroup.add(this.graphics)
    this.objectGroup.add(this.textObject)
    this.objectGroup.add(this.choiceAText)
    this.objectGroup.add(this.choiceBText)
    this.objectGroup.add(this.portrait)
    this.objectGroup.alpha = 0

    this.graphics.beginFill(0x112222)
    this.graphics.lineStyle(8, 0xddffdd, 0.8)
    this.graphics.drawRoundedRect(0, 0, this.game.width - leftBuffer - rightBuffer, boxHeight, 10)
    this.graphics.endFill()

    this.game.interface.zKey.onDown.add(this.onPress)
    this.game.interface.spaceKey.onDown.add(this.onPress)
    this.game.interface.onPri(this.onPress)

    this.reset()
  }

  reset() {
    this.finishedCurrentPage = true
    this.finishedWithConvo = true
    this.convo = []
    this.textToDisplay = ''
    this.index = 0
    this.convoIndex = 0
    this.choiceIndex = 0
    this.gotoNextPage = true
    this.lastWordIndex = []
    this.textTimer = timing
    this.fastMode = false
    this.startIndex = 0
    this.finishedCurrentPage = true
  }

  update(game) {
    if (!this.finishedCurrentPage && this.gotoNextPage) {
      if (this.textObject._height > 159 && this.textObject.text != '') {
        this.textObject.text = this.textToDisplay.slice(this.startIndex, this.lastWordIndex[1]+1)
        this.startIndex = this.lastWordIndex[1]+1
        this.index = this.lastWordIndex[0]+1
        this.fastMode = false
        this.gotoNextPage = false
        return
      }

      if (this.textTimer > 0) {
        this.textTimer -= 1
      } else {
        let lettersForUpdate = this.fastMode ? 3 : 1
        this.index += lettersForUpdate

        let nextString
        if (doWeirdThing) {
          nextString = this.textToDisplay.slice(this.startIndex, this.index+lettersForUpdate)
        } else {
          nextString = this.textToDisplay.slice(this.index, this.index+lettersForUpdate)
        }

        this.textObject.text = this.textToDisplay.slice(this.startIndex, this.index)

        this.portraitTiming--
        if (this.portraitTiming <= 0) {
          this.portraitTiming = this.portraitTimingMax
          this.portraitFrame = this.portraitFrame === 0 ? 1 : 0
          this.portrait.frame = this.currentPortrait + this.portraitFrame
        }

        this.soundTiming--
        if (this.soundTiming <= 0) {
          this.soundTiming = this.game.rnd.integerInRange(this.soundTimingMin, this.soundTimingMax)
          const sound = this.sounds[this.game.rnd.integerInRange(0, 2)]
          sound.play()
        }


        const match = /\s/.exec(nextString)
        if (match) {
          this.lastWordIndex[1] = this.lastWordIndex[0]
          this.lastWordIndex[0] = this.index + match.index
        }

        if (this.index > this.textToDisplay.length) {
          this.finishedCurrentPage = true
        }

        this.textTimer = this.fastMode ? timing-1 : timing
      }
    }
  }

  bufferConvo(convo, key, callback) {
    if (this.finishedWithConvo) {
      this.reset()
      this.callback = callback
      this.convoIndex = 0
      this.convo = convo
      this.currentPortrait = 4
      if (key === 'skull') {
        this.currentPortrait = 0
      } else if (key === 'charon') {
        this.currentPortrait = 2
      }
      this.objectGroup.alpha = 1
      this.choiceAText.alpha = 0
      this.choiceBText.alpha = 0
      this.doNext()
    }
  }

  bufferText(text) {
    if (this.finishedCurrentPage) {
      this.textToDisplay = text
      this.fastMode = false
      this.finishedCurrentPage = false
      this.index = 0
      this.startIndex = 0
      this.finishedWithConvo = false
    }
  }

  bufferChoice(choice) {
    this.index = 0
    this.startIndex = 0
    this.choiceIndex = 0
    this.inChoice = true
    this.finishedCurrentPage = false
    this.finishedWithConvo = false
    this.textToDisplay = choice.text

    this.choiceAText.fontSize = 50
    this.choiceAText.alpha = 1
    this.choiceAText.fill = '#ffffff'
    this.choiceAText.text = choice.choiceA.text

    this.choiceBText.fontSize = 30
    this.choiceBText.alpha = 1
    this.choiceBText.fill = '#999999'
    this.choiceBText.text = choice.choiceB.text

  }

  doNext() {
    if (this.convoIndex >= this.convo.length) {
      this.finishedWithConvo = true
      this.reset()
      this.callback && this.callback()
      this.objectGroup.alpha = 0
    } else {
      if (this.inChoice) {
        const choiceObject = this.convo[this.convoIndex][this.choiceIndex === 0 ? 'choiceA' : 'choiceB']
        this.bufferText(choiceObject.response)
        if (choiceObject.value === 2) {
          this.callback = () => {
            this.callback = null
            this.game.loadLevel()
          }
        }
        this.soundTiming = 0
        this.inChoice = false
        this.convoIndex++
        this.choiceAText.alpha = 0
        this.choiceBText.alpha = 0
      } else {
        let nextPartOfConvo = this.convo[this.convoIndex]
        this.soundTiming = 0
        if (typeof nextPartOfConvo === 'string') {
          this.bufferText(nextPartOfConvo)
          this.convoIndex++
        } else {
          this.bufferChoice(nextPartOfConvo)
        }
      }
    }
  }

  onPress() {
    if (this.finishedCurrentPage) {
      setTimeout(this.doNext.bind(this), 100)
    } else if (this.gotoNextPage) {
      this.fastMode = true
    } else {
      this.textObject.text = ''
      this.gotoNextPage = true
    }
  }

  toggleChoice() {
    this.choiceIndex = this.choiceIndex === 0 ? 1 : 0
    if (this.choiceIndex === 0) {
      this.choiceAText.fontSize = 50
      this.choiceBText.fontSize = 30
      this.choiceAText.fill = '#ffffff'
      this.choiceBText.fill = '#999999'
    } else {
      this.choiceAText.fontSize = 30
      this.choiceBText.fontSize = 50
      this.choiceAText.fill = '#999999'
      this.choiceBText.fill = '#ffffff'
    }
  }
}
