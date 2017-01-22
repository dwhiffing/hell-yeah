const boxHeight = 200
const leftBuffer = 200
const rightBuffer = 40
const textBuffer = 30
const timing = 3
const doWeirdThing = false

export default class TextManager {
  constructor(game) {
    this.game = game

    this.onPress = this.onPress.bind(this)

    this.reset()

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

    const choiceOpts = Object.assign({}, opts, { font: 'bold Slackey', fontSize: 30 })

    this.choiceAText = this.game.add.text(leftBuffer + textBuffer, y + textBuffer + 100, 'choiceA', choiceOpts)
    this.choiceBText = this.game.add.text(leftBuffer + textBuffer + 300, y + textBuffer + 100, 'choiceB', choiceOpts)
    this.choiceAText.fixedToCamera = true
    this.choiceBText.fixedToCamera = true
    this.game.interface.addLeft(this.toggleChoice.bind(this))
    this.game.interface.addRight(this.toggleChoice.bind(this))

    this.objectGroup.add(this.graphics)
    this.objectGroup.add(this.textObject)
    this.objectGroup.add(this.choiceAText)
    this.objectGroup.add(this.choiceBText)
    this.objectGroup.alpha = 0

    this.graphics.beginFill(0x111111)
    this.graphics.drawRect(0, 0, this.game.width - leftBuffer - rightBuffer, boxHeight)
    this.graphics.endFill()

    this.game.interface.zKey.onDown.add(this.onPress)
    this.game.interface.spaceKey.onDown.add(this.onPress)
  }

  reset() {
    this.finishedCurrentPage = true
    this.finishedWithConvo = true
    this.convo = []
    this.textToDisplay = ''
    this.index = 0
    this.convoIndex = 0
    this.choiceIndex = 0
    this.gotoNextPage = false
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
        this.textTimer -= this.fastMode ? 2 : 1
      } else {
        let lettersForUpdate = this.fastMode ? 2 : 1
        this.index += lettersForUpdate

        let nextString
        if (doWeirdThing) {
          nextString = this.textToDisplay.slice(this.startIndex, this.index+lettersForUpdate)
        } else {
          nextString = this.textToDisplay.slice(this.index, this.index+lettersForUpdate)
        }

        this.textObject.text = this.textToDisplay.slice(this.startIndex, this.index)

        const match = /\s/.exec(nextString)
        if (match) {
          this.lastWordIndex[1] = this.lastWordIndex[0]
          this.lastWordIndex[0] = this.index + match.index
        }

        if (this.index > this.textToDisplay.length) {
          this.finishedCurrentPage = true
        }

        if (!this.fastMode) {
          this.textTimer = timing
        }
      }
    }
  }

  bufferConvo(convo) {
    if (this.finishedWithConvo) {
      this.reset()
      this.convoIndex = 0
      this.convo = convo
      this.objectGroup.alpha = 1
      this.choiceAText.alpha = 0
      this.choiceBText.alpha = 0
      console.log(this.convo)
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
    this.inChoice = true
    this.textToDisplay = choice.text
    this.finishedCurrentPage = false
    this.index = 0
    this.choiceIndex = 0
    this.choiceAText.fontSize = 50
    this.choiceBText.fontSize = 30
    this.choiceAText.fill = '#ffffff'
    this.choiceBText.fill = '#999999'
    this.startIndex = 0
    this.choiceAText.alpha = 1
    this.choiceAText.text = choice.choiceA.text
    this.choiceBText.text = choice.choiceB.text
    this.choiceBText.alpha = 1
    this.finishedWithConvo = false
  }

  doNext() {
    if (this.convoIndex >= this.convo.length) {
      this.finishedWithConvo = true
      this.reset()
      this.objectGroup.alpha = 0
    } else {
      if (this.inChoice) {
        const response = this.convo[this.convoIndex][this.choiceIndex === 0 ? 'choiceA' : 'choiceB'].response
        this.bufferText(response)
        this.inChoice = false
        this.convoIndex++
        this.choiceAText.alpha = 0
        this.choiceBText.alpha = 0
      } else {
        let nextPartOfConvo = this.convo[this.convoIndex]
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
      setTimeout(this.doNext.bind(this), 200)
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
