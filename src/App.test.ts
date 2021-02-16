import { render, screen } from '@testing-library/react';
import Card from './model/card';
import Deck from './model/deck';
import { cardType, teamColor } from './model/common';
import { CardType, TeamColor } from './util/types';

describe('CARDS AND DECKS', () => {
  test('a card can be created', () => {
    const newCard = new Card(TeamColor.ORANGE, CardType.FLOWER, 1);
    expect(newCard).not.toBeNull();
  });
  test('a deck is initialized with the correct number of cards', () => {
    const newDeck = new Deck(TeamColor.BLUE);
    expect(newDeck.cards).toHaveLength(4);
  });
  test('a card can be played', () => {
    const newDeck = new Deck(TeamColor.BLUE);
    if (newDeck.cards) {
      const someCard = newDeck.cards[0];
      someCard.play();
      expect(someCard['isInGame']).toBe(true);
    }
  });
});
