import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { socket } from '../connection/socket';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlayer, setUsername } from '../features/player/playerSlice';
import Button from './UI/Button/Button';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [inputGameID, setInputGameID] = useState('');

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const handleCreateGameButton = () => {
    if (player.username !== '') {
      // if user has defined his username
      // First, create a new game request to the server, to create a room in socket.io
      // Then get this room id, and make the player to join it
      socket.emit('create_game/request', player);
      // We must wait for the response to redirect the player to the new game and new room
    }
    //TODO : Display notification to ask the user to give a username
  };

  const handleJoinGameButton = () => {
    if (inputGameID) {
      socket.emit('join_game/request', {
        player: player,
        gameID: inputGameID,
      });
      console.log(`Join game requested`);
    }
  };

  const joinGame = (game) => {
    // window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player))
    if (game) {
      history.push('/game/' + game.gameID);
    }
  };

  useEffect(() => {
    socket.on('create_game/response', joinGame);
    socket.on('join_game/response', joinGame);
  }, []);

  return (
    <Card title="Login">
      <InputText
        label="Username"
        id="username"
        placeholder="username"
        value={player.username}
        onChange={handleUsernameChange}
      />
      <Button className="w-full mt-2" onClick={handleCreateGameButton}>
        create a game
      </Button>
      <div className="flex flex-col p-2 mt-4 space-y-4 border-2 rounded-lg border-purple">
        <InputText
          label="Game ID"
          id="game-id-input"
          placeholder="game_id"
          value={inputGameID}
          onChange={(e) => setInputGameID(e.target.value)}
        />
        <Button onClick={handleJoinGameButton}>join</Button>
      </div>
    </Card>
  );
};

export default Login;
