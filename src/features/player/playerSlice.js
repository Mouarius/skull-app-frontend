import { createSlice } from '@reduxjs/toolkit'
import Deck from '../../model/deck'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  username: '',
  deck: [],
  hasWonOneRound: false,
  hasWonTheGame: false,
  id: uuidv4(),
}

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
      return { ...state, color: action.payload }
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
