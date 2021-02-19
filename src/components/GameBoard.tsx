import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { selectGame, setGame } from '../features/game/gameSlice';
import playerServices from '../features/player/playerServices';
import { selectPlayer, setPlayer } from '../features/player/playerSlice';

interface IGameBoardParams {
  gameID: string;
}

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<IGameBoardParams>();
  const history = useHistory();
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  useEffect(() => {
    //!!! There is repetition here with Lobby.tsx
    console.log(`Fetching data from the server`);
    const fetchGame = async () => {
      try {
        const response = await axios.get('/api/games/' + params.gameID);
        dispatch(setGame(response.data));
        const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
        dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
      } catch (e) {
        // If it doesnt exist, redirect the user to home
        history.push('/');
      }
    };
    fetchGame();
  }, []);

  return (
    <div className="p-8 bg-white border-2 border-solid shadow-md white card border-purple">
      {game.players.map((p) => (
        <div key={player.id}>
          <h2>{p.username}</h2>
        </div>
      ))}
      Game Board
    </div>
  );
};

export default GameBoard;
