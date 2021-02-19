import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Deck from '../../model/deck';
import { v4 as uuidv4 } from 'uuid';
import { TeamColor } from '../../util/types';
import { RootState } from '../../app/store';

export interface PlayerObject {
  color: TeamColor | null;
  username: string;
  deck: Deck | null;
  isReady: boolean;
  hasWonOneRound: boolean;
  hasWonTheGame: boolean;
  id: string;
}

const initialState: PlayerObject = {
  username: '',
  color: null,
  deck: null,
  isReady: false,
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
    resetPlayer: () => {
      return initialState;
    },
    createDeck: (state, action: PayloadAction<TeamColor>) => {
      state.deck = new Deck(action.payload);
    },
    setPlayer: (state, action: PayloadAction<PlayerObject>) => {
      return action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      return { ...state, username: action.payload };
    },
    setColor: (state, action: PayloadAction<TeamColor | null>) => {
      return { ...state, color: action.payload };
    },
    toggleReady: (state) => {
      return { ...state, isReady: !state.isReady };
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

export const selectPlayer = (state: RootState): PlayerObject => state.player;

export const {
  resetPlayer,
  setPlayer,
  createDeck,
  setUsername,
  setColor,
  toggleReady,
  win,
} = playerSlice.actions;

export default playerSlice.reducer;
