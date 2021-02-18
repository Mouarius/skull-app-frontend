import { isString } from 'lodash';
import { Player } from './playerSlice';

//TODO add type validation for each parameter

const toPlayer = (playerObject: any): Player => {
  if (!playerObject) {
    throw new Error('Missing player object.');
  }
  if (isString(playerObject)) {
    playerObject = JSON.parse(playerObject);
  }
  try {
    const player = {
      username: playerObject.username,
      color: playerObject.color,
      deck: playerObject.deck,
      isReady: playerObject.isReady,
      hasWonOneRound: playerObject.hasWonOneRound,
      hasWonTheGame: playerObject.hasWonTheGame,
      id: playerObject.id,
    } as Player;
    return player;
  } catch (e) {
    return e;
  }
};

export default { toPlayer };
