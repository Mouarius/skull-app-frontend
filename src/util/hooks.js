import { useState } from 'react'
import Deck from '../model/deck'
import Player from '../model/player'

export const usePlayer = () => {
  const initialState = new Player()

  const [state, setState] = useState(initialState)

  const createDeck = (color) => {
    setState((prev) => ({ ...prev, deck: new Deck(color) }))
  }
  const setPlayer = (playerObject) => {
    setState(playerObject)
  }
  const setUsername = (username) => {
    setState((prev) => ({ ...prev, username: username }))
  }
  const setColor = (color) => {
    setState((prev) => ({ ...prev, color: color }))
  }
  const win = () => {
    if (state.hasWonOneRound) {
      setState((prev) => ({ ...prev, hasWonTheGame: true }))
    } else {
      setState((prev) => ({ ...prev, hasWonOneRound: true }))
    }
  }

  return { state, setPlayer, setUsername, setColor, win, createDeck }
}
