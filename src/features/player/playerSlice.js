import { createSlice } from '@reduxjs/toolkit'
import Deck from '../../model/deck'
import Player from '../../model/player'

const initialState = new Player()

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createDeck: (state, action) => {
      state.deck = new Deck(action.payload)
    },
    setPlayer: (state, action) => {
      return action.payload
    },
    setUsername: (state, action) => {
      return { ...state, username: action.payload }
    },
    setColor: (state, action) => {
      state.color = action.payload
    },
    win: (state, action) => {
      if (state.hasWonOneRound) {
        return (state.hasWonTheGame = true)
      } else {
        return (state.hasWonOneRound = true)
      }
    },
  },
})

export const selectPlayer = (state) => state.player

export const {
  setPlayer,
  createDeck,
  setUsername,
  setColor,
  win,
} = playerSlice.actions

export default playerSlice.reducer
