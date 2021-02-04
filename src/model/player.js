import Deck from './deck'

class Player {
  constructor(color, username) {
    this.color = color
    this.username = username
    this.deck = new Deck(color)
    this.hasWonOneRound = false
    this.hasWonTheGame = false
  }

  winTheRound() {
    if (this.hasWonOneRound) {
      this.hasWonTheGame = true
    } else {
      this.hasWonOneRound = true
    }
  }
}

export default Player
