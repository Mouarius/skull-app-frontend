import axios from 'axios';
import { isString } from 'lodash';
import { Player } from '../../util/types';

const baseUrl = 'http://localhost:3001/api/players';

const loginPlayer = async (username: string): Promise<Player> => {
  const response = await axios.post(baseUrl, { username: username });
  return response.data;
};

//TODO add type validation for each parameter

const toPlayerObject = (arg: any): Player | null => {
  if (!arg) {
    throw new Error('Missing player object.');
  }
  if (isString(arg)) {
    const object = JSON.parse(arg);
    try {
      const player = {
        username: object.username,
        color: object.color,
        deck: object.deck,
        isReady: object.isReady,
        hasWonOneRound: object.hasWonOneRound,
        hasWonTheGame: object.hasWonTheGame,
        id: object.id,
      } as Player;
      return player;
    } catch (e) {
      console.log(e);
    }
  }
  return null;
};

export default { toPlayerObject, loginPlayer };
