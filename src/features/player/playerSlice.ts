import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Deck from '../../model/deck';
import { v4 as uuidv4 } from 'uuid';
import { TeamColor } from '../../util/types';
import { RootState } from '../../app/store';

export interface Player {
  color: TeamColor | null;
  username: string;
  deck: Deck | null;
  hasWonOneRound: boolean;
  hasWonTheGame: boolean;
  id: string;
}

const initialState: Player = {
  username: '',
  color: null,
  deck: null,
  hasWonOneRound: false,
  hasWonTheGame: false,
  id: uuidv4(),
};

// export const setPlayerColorAndUpdate = (color: TeamColor) => (
//   dispatch: AppDispatch,
//   getState
// ) => {
//   dispatch(setColor(color));
//   const updatedState = getState();
//   dispatch(updatePlayer(updatedState.player));
//   const finalState = getState();
//   socket.emit('update_game', {
//     game: finalState.game,
//   });
// };

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    createDeck: (state, action: PayloadAction<TeamColor>) => {
      state.deck = new Deck(action.payload);
    },
    setPlayer: (state, action: PayloadAction<Player>) => {
      return action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      return { ...state, username: action.payload };
    },
    setColor: (state, action: PayloadAction<TeamColor | null>) => {
      return { ...state, color: action.payload };
    },
    win: (state) => {
      if (state.hasWonOneRound) {
        state.hasWonTheGame = true;
      } else {
        state.hasWonOneRound = true;
      }
    },
  },
});

export const selectPlayer = (state: RootState): Player => state.player;

export const {
  setPlayer,
  createDeck,
  setUsername,
  setColor,
  win,
} = playerSlice.actions;

export default playerSlice.reducer;
