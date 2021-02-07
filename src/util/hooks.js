import { useState } from 'react'
import Deck from '../model/deck'
import Game from '../model/game'
import Player from '../model/player'

export const useGame = () => {
  const initialState = new Game()
  const [state, setState] = useState(initialState)

  const addPlayer = (player) => {
    setState((prev) => ({ ...prev, players: prev.players.concat(player) }))
  }
  const removePlayer = (playerToRemove) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.filter((player) => player.id !== playerToRemove.id),
    }))
  }
  const setGame = (gameObject) => {
    setState((prev) => gameObject)
  }

  return { state, setGame, addPlayer, removePlayer }
}

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
