import playerReducer from '../features/player/playerSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    player: playerReducer,
  },
})
