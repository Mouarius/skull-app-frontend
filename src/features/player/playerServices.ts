import axios, { AxiosResponse } from 'axios';
import { isString } from 'lodash';
import { PlayerObject } from './playerSlice';
import { Player } from '../../util/types';

const baseUrl = 'http://localhost:3001/api/players';

const loginPlayer = async (username: string): Promise<Player> => {
  const response = await axios.post(baseUrl, { username: username });
  return response.data;
};

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

export default { toPlayerObject, loginPlayer };
