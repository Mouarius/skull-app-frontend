import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/game/gameSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
