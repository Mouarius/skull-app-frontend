import { isString } from 'lodash';
import { PlayerObject } from './playerSlice';

//TODO add type validation for each parameter

const toPlayerObject = (object: any): PlayerObject => {
  if (!object) {
    throw new Error('Missing player object.');
  }
  if (isString(object)) {
    object = JSON.parse(object);
  }
  try {
    const player = {
      username: object.username,
      color: object.color,
      deck: object.deck,
      isReady: object.isReady,
      hasWonOneRound: object.hasWonOneRound,
      hasWonTheGame: object.hasWonTheGame,
      id: object.id,
    } as PlayerObject;
    return player;
  } catch (e) {
    return e;
  }
};

export default { toPlayerObject };
