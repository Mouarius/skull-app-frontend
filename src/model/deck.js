import Card from './card'
import { cardType, teamColor } from './common'

class Deck {
  cards = []
  constructor(color) {
    this.color = color
    this.cards = this.createDeck()
  }

  createDeck() {
    let emptyDeck = []

    // Initialize Skull
    const newSkull = new Card(this.color, cardType.SKULL, 0)
    emptyDeck.push(newSkull)

    // Initialize Flowers
    for (let i = 0; i < 3; i++) {
      const newFlower = new Card(this.color, cardType.FLOWER, i + 1)
      emptyDeck.push(newFlower)
    }
    return emptyDeck
  }
}

export default Deck
