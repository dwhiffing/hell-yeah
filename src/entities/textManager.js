const boxHeight = 200
const leftBuffer = 200
const rightBuffer = 40
const textBuffer = 30
const lorem = "Food truck church-key master cleanse, succulents brunch forage cold-pressed pok pok lo-fi twee organic banjo. Shoreditch blue bottle cliche austin biodiesel four loko. Fam PBR&B cliche kinfolk forage, lo-fi chambray bicycle rights gochujang kickstarter fashion axe bitters church-key 90's iPhone. XOXO synth meditation, aesthetic tumeric stumptown unicorn normcore blog 3 wolf moon try-hard offal pok pok you probably haven't heard of them. Knausgaard lo-fi live-edge whatever. Freegan sriracha chartreuse, synth iPhone succulents fanny pack vinyl live-edge mumblecore tacos. Bushwick poke cliche roof party, snackwave chillwave venmo fingerstache paleo portland enamel pin vape meditation jianbing."
const timing = 3
const doWeirdThing = false

let textToDisplay = ''
let index, gotoNextPage, lastWordIndex, textTimer, fastMode, startIndex, finishedCurrentPage, textObject, objectGroup, convoIndex, choiceAText, choiceBText, choiceIndex, inChoice

export default class TextManager {
  constructor(game) {
    this.game = game

    finishedCurrentPage = true
    this.finishedWithConvo = true
    this.convo = []
    textToDisplay = ''
    index = 0
    convoIndex = 0
    choiceIndex = 0
    gotoNextPage = false
    lastWordIndex = []
    textTimer = timing
    fastMode = false
    startIndex = 0
    finishedCurrentPage = true
    this.onPress = this.onPress.bind(this)

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

    const choiceOpts = Object.assign({}, opts, { font: 'bold Slackey', fontSize: 30 })

    choiceAText = this.game.add.text(leftBuffer + textBuffer, y + textBuffer + 120, 'choiceA', choiceOpts)
    choiceBText = this.game.add.text(leftBuffer + textBuffer + 300, y + textBuffer + 120, 'choiceB', choiceOpts)
    choiceAText.fixedToCamera = true
    choiceBText.fixedToCamera = true
    this.game.interface.addLeft(this.toggleChoice.bind(this))
    this.game.interface.addRight(this.toggleChoice.bind(this))

    objectGroup.add(this.graphics)
    objectGroup.add(textObject)
    objectGroup.add(choiceAText)
    objectGroup.add(choiceBText)
    objectGroup.alpha = 0

    this.graphics.beginFill(0x111111)
    this.graphics.drawRect(0, 0, this.game.width - leftBuffer - rightBuffer, boxHeight)
    this.graphics.endFill()

    this.game.interface.zKey.onDown.add(this.onPress)
    this.game.interface.spaceKey.onDown.add(this.onPress)
  }

  update(game) {
    if (!finishedCurrentPage && gotoNextPage) {

      if (textObject._height > 159 && textObject.text != '') {
        textObject.text = textToDisplay.slice(startIndex, lastWordIndex[1]+1)
        startIndex = lastWordIndex[1]+1
        index = lastWordIndex[0]+1
        fastMode = false
        gotoNextPage = false
        return
      }

      if (textTimer > 0) {
        textTimer -= fastMode ? 2 : 1
      } else {
        let lettersForUpdate = fastMode ? 2 : 1
        index += lettersForUpdate

        let nextString
        if (doWeirdThing) {
          nextString = textToDisplay.slice(startIndex, index+lettersForUpdate)
        } else {
          nextString = textToDisplay.slice(index, index+lettersForUpdate)
        }

        textObject.text = textToDisplay.slice(startIndex, index)

        const match = /\s/.exec(nextString)
        if (match) {
          lastWordIndex[1] = lastWordIndex[0]
          lastWordIndex[0] = index + match.index
        }

        if (index > textToDisplay.length) {
          finishedCurrentPage = true
        }

        if (!fastMode) {
          textTimer = timing
        }
      }
    }
  }

  bufferConvo(convo) {
    if (this.finishedWithConvo) {
      convoIndex = 0
      this.convo = convo
      objectGroup.alpha = 1
      choiceAText.alpha = 0
      choiceBText.alpha = 0
      this.doNext()
    }
  }

  bufferText(text=lorem) {
    if (finishedCurrentPage) {
      textToDisplay = text
      fastMode = false
      finishedCurrentPage = false
      index = 0
      startIndex = 0
      this.finishedWithConvo = false
    }
  }

  bufferChoice(choice) {
    inChoice = true
    textToDisplay = choice.text
    finishedCurrentPage = false
    index = 0
    choiceIndex = 0
    choiceAText.fontSize = 35
    startIndex = 0
    choiceAText.alpha = 1
    choiceAText.text = choice.choiceA.text
    choiceBText.text = choice.choiceB.text
    choiceBText.alpha = 1
    this.finishedWithConvo = false
  }

  doNext() {
    if (convoIndex >= this.convo.length) {
      this.finishedWithConvo = true
      objectGroup.alpha = 0
    } else {
      if (inChoice) {
        const response = this.convo[convoIndex][choiceIndex === 0 ? 'choiceA' : 'choiceB'].response
        this.bufferText(response)
        inChoice = false
        convoIndex++
        choiceAText.alpha = 0
        choiceBText.alpha = 0
      } else {
        let nextPartOfConvo = this.convo[convoIndex]
        if (typeof nextPartOfConvo === 'string') {
          this.bufferText(nextPartOfConvo)
          convoIndex++
        } else {
          this.bufferChoice(nextPartOfConvo)
        }
      }
    }
  }

  onPress() {
    if (finishedCurrentPage) {
      setTimeout(this.doNext.bind(this), 500)
    } else if (gotoNextPage) {
      fastMode = true
    } else {
      textObject.text = ''
      gotoNextPage = true
    }
  }

  toggleChoice() {
    choiceIndex = choiceIndex === 0 ? 1 : 0
    if (choiceIndex === 0) {
      choiceAText.fontSize = 35
      choiceBText.fontSize = 30
    } else {
      choiceAText.fontSize = 30
      choiceBText.fontSize = 35
    }
  }
}
