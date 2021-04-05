import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Game } from '../../util/types';

const initialState: Game = { id: '', owner_id: '', players: [] };

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players.filter((player) => player.id !== action.payload.id);
    },
    updatePlayer: (state, action) => {
      const newPlayers = state.players.map((player) =>
        player.id === action.payload.id ? action.payload : player
      );
      state.players = newPlayers;
    },
    setCardVisible: (state, action) => {
      const { playerID, cardID } = action.payload;
      const player = state.players.find((p) => p.id === playerID);
      const card = player?.deck?.find((c) => c.id === cardID);
      if (card) {
        card.isVisible = true;
      }
    },
    setGame: (state, action) => {
      return action.payload;
    },
  },
});

export const selectGame = (state: RootState): Game => state.game;

export const {
  addPlayer,
  removePlayer,
  updatePlayer,
  setGame,
  setCardVisible,
} = gameSlice.actions;

export default gameSlice.reducer;
