import { createSlice } from '@reduxjs/toolkit'

const initialState = { gameID: '', ownerID: '', players: [] }

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload)
    },
    removePlayer: (state, action) => {
      state.players.filter((player) => player.id !== action.payload.id)
    },
    updatePlayer: (state, action) => {
      let playerToUpdate = state.players.find(
        (player) => player.id === action.payload.id
      )
      if (playerToUpdate) {
        playerToUpdate = action.payload
      }
    },

    setGame: (state, action) => {
      return action.payload
    },
  },
})

export const selectGame = (state) => state.game

export const {
  addPlayer,
  removePlayer,
  updatePlayer,
  setGame,
} = gameSlice.actions

export default gameSlice.reducer
