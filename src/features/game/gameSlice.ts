import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { PlayerObject } from '../player/playerSlice';

export interface GameState {
  gameID: string;
  ownerID: string;
  players: PlayerObject[];
}

const initialState: GameState = { gameID: '', ownerID: '', players: [] };

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

    setGame: (state, action) => {
      return action.payload;
    },
  },
});

export const selectGame = (state: RootState): GameState => state.game;

export const {
  addPlayer,
  removePlayer,
  updatePlayer,
  setGame,
} = gameSlice.actions;

export default gameSlice.reducer;
