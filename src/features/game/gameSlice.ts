import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CardObject } from '../../util/types';
import { PlayerObject } from '../player/playerSlice';

export interface GameState {
  gameID: string;
  ownerID: string;
  players: PlayerObject[];
}

interface ISetCardVisiblePayload {
  playerID: string;
  cardID: string;
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
    setCardVisible: (state, action: PayloadAction<ISetCardVisiblePayload>) => {
      const { playerID, cardID } = action.payload;
      const player = state.players.find((p) => p.id === playerID);
      const card = player?.deck?.cards?.find((c) => c.id === cardID);
      if (card) {
        card.isVisible = true;
      }
    },
    playCard: (state, action: PayloadAction<CardObject>) => {
      const playerToUpdate = state.players.find(
        (p) => p.color === action.payload.color
      );
      const cardToUpdate = playerToUpdate?.deck?.cards?.find(
        (c) => c.id === action.payload.id
      );
      if (cardToUpdate) {
        cardToUpdate.isInGame = true;
      }
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
  setCardVisible,
  playCard,
} = gameSlice.actions;

export default gameSlice.reducer;
