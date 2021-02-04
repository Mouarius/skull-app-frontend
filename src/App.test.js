import { render, screen } from '@testing-library/react'
import App from './App'
import Card from './model/card'
import Deck from './model/deck'
import { cardType, teamColor } from './model/common'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

describe('CARDS AND DECKS', () => {
  test('a card can be created', () => {
    const newCard = new Card(teamColor.ORANGE, cardType.FLOWER, 1)
    expect(newCard).not.toBeNull()
  })
  test('a deck is initialized with the correct number of cards', () => {
    const newDeck = new Deck(teamColor.BLUE)
    expect(newDeck.cards).toHaveLength(4)
  })
  test('a card can be played', () => {
    const newDeck = new Deck(teamColor.BLUE)
    const someCard = newDeck.cards[0]
    someCard.play()
    expect(someCard['isInGame']).toBe(true)
  })
})
