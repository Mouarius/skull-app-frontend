import axios from 'axios';
import { Game } from '../../util/types';
const baseUrl = 'http://localhost:3001/api/games';

const createGame = async (owner_id: string): Promise<Game> => {
  const response = await axios.post(baseUrl, { owner_id: owner_id });
  return response.data;
};

const getGame = async (game_id: string): Promise<Game> => {
  const response = await axios.get(`${baseUrl}/${game_id}`);
  return response.data;
};

const joinGame = async (player_id: string, game_id: string): Promise<Game> => {
  const response = await axios.post(`${baseUrl}/join/${game_id}`, {
    player_id: player_id,
  });
  return response.data;
};

export default { createGame, getGame, joinGame };
