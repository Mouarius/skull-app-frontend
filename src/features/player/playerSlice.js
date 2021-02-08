import { createSlice } from '@reduxjs/toolkit'
import Deck from '../../model/deck'
import { v4 as uuidv4 } from 'uuid'
import { socket } from '../../connection/socket'
import { updatePlayer } from '../game/gameSlice'

const initialState = {
  username: '',
  deck: [],
  hasWonOneRound: false,
  hasWonTheGame: false,
  id: uuidv4(),
}

export const setPlayerColorAndUpdate = (color) => (dispatch, getState) => {
  const initialState = getState()
  console.log('initialState :>> ', initialState)
  dispatch(setColor(color))
  const updatedState = getState()
  console.log('updatedState :>> ', updatedState)
  dispatch(updatePlayer(updatedState.player))
  const finalState = getState()
  console.log('finalState :>> ', finalState)
  socket.emit('update_game', {
    game: finalState.game,
  })
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
