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
      const newPlayers = state.players.map((player) =>
        player.id === action.payload.id ? action.payload : player
      )
      state.players = newPlayers
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
