import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setGame } from '../features/game/gameSlice';
import gamesServices from '../features/game/gamesServices';
import { sendErrorMessage } from '../features/notification/notificationSlice';
import playerServices from '../features/player/playerServices';
import {
  resetPlayer,
  selectPlayer,
  setPlayerID,
  setUsername,
} from '../features/player/playerSlice';
import Button from './UI/Button/Button';
import Card from './UI/Card/Card';
import InputText from './UI/Input/InputText';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [inputGameID, setInputGameID] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handleCreateGameButton = async () => {
    if (player.username !== '') {
      const loggedPlayer = await playerServices.loginPlayer(player.username);
      dispatch(setPlayerID(loggedPlayer.id));
      const newGame = await gamesServices.createGame(loggedPlayer.id);
      dispatch(setGame(newGame));
      history.push('/game/' + newGame.id);
    } else {
      dispatch(sendErrorMessage('You must provide a username.'));
    }
  };

  const handleInputGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGameID(e.target.value);
  };

  const handleJoinGameButton = async () => {
    if (inputGameID) {
      const loggedPlayer = await playerServices.loginPlayer(player.username);
      console.log(loggedPlayer);
      dispatch(setPlayerID(loggedPlayer.id));
      const game = await gamesServices.joinGame(loggedPlayer.id, inputGameID);
      if (game) {
        history.push('/game/' + game.id);
      } else {
        dispatch(
          sendErrorMessage(
            `No games have been found with the id "${inputGameID}"`
          )
        );
        setInputGameID('');
      }
    } else {
      dispatch(sendErrorMessage('You must provide a game id.'));
    }
  };

  //reset the stored state
  useEffect(() => {
    console.log(`Reset the state`);
    window.localStorage.removeItem('skullAppPlayerData');
    dispatch(resetPlayer());
  }, []);

  return (
    <Card title="Login">
      <InputText
        label="Username"
        id="username-input"
        placeholder="username"
        value={player.username}
        onChange={handleUsernameChange}
      />
      <Button
        className="w-full mt-2 create-game-button"
        onClick={handleCreateGameButton}
      >
        create a game
      </Button>
      <div className="flex flex-col p-2 mt-4 space-y-4 border-2 rounded-lg border-primary">
        <InputText
          label="Game ID"
          id="game-id-input"
          placeholder="game_id"
          value={inputGameID}
          onChange={handleInputGameIDChange}
        />
        <Button onClick={handleJoinGameButton} className="join-game-button">
          join
        </Button>
      </div>
    </Card>
  );
};

export default Login;
