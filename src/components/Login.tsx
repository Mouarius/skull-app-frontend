import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { socket } from '../connection/socket';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayer,
  setPlayer,
  setUsername,
  resetPlayer,
} from '../features/player/playerSlice';
import Button from './UI/Button/Button';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';
import { GameState } from '../features/game/gameSlice';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [inputGameID, setInputGameID] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handleCreateGameButton = () => {
    if (player.username !== '') {
      // if user has defined his username
      // First, create a new game request to the server, to create a room in socket.io
      // Then get this room id, and make the player to join it
      socket.emit('login/create_game/request', player);
      // We must wait for the response to redirect the player to the new game and new room
    }
    //TODO : Display notification to ask the user to give a username
  };

  const handleInputGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGameID(e.target.value);
  };

  const handleJoinGameButton = () => {
    if (inputGameID) {
      socket.emit('login/join_game/request', {
        playerObject: player,
        gameID: inputGameID,
      });
      console.log(`Join game requested`);
    }
  };

  const joinGame = (game: GameState) => {
    if (game) {
      window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player));
      history.push('/game/' + game.gameID);
    }
  };

  useEffect(() => {
    socket.on('login/create_game/response', joinGame);
    socket.on('login/join_game/response', joinGame);
    return () => {
      socket.removeAllListeners();
    };
  });

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
      <Button
        onClick={() => {
          console.log(player.username);
        }}
      >
        get player data
      </Button>
      <div className="flex flex-col p-2 mt-4 space-y-4 border-2 rounded-lg border-purple">
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
