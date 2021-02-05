import Deck from './deck'
import { v4 as uuidv4 } from 'uuid'

class Player {
  constructor() {
    this.color = null
    this.username = null
    this.deck = null
    this.hasWonOneRound = false
    this.hasWonTheGame = false
    this.id = uuidv4()
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
