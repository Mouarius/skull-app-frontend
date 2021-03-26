import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/game/gameSlice';
import notificationReducer from '../features/notification/notificationSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
    notification: notificationReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
