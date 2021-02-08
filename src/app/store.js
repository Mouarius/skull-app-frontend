import playerReducer from '../features/player/playerSlice'
import gameReducer from '../features/game/gameSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
  },
})
