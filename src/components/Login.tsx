import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayer,
  setUsername,
  resetPlayer,
} from '../features/player/playerSlice';
import Button from './UI/Button/Button';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';
import { useFirestore } from 'reactfire';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [inputGameID, setInputGameID] = useState('');
  const currentPlayerRef = useFirestore().collection('players').doc();
  const gamesRef = useFirestore().collection('games');
  const currentGameRef = useFirestore().collection('games').doc();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  const handleCreateGameButton = () => {
    if (player.username !== '') {
      // if user has defined his username
      // First, create a new game request to the server, to create a room in socket.io
      // Then get this room id, and make the player to join it
      currentPlayerRef.set({
        username: player.username,
      });

      currentGameRef
        .set({
          ownerID: currentPlayerRef.id,
        })
        .then(() => {
          joinGame(currentGameRef.id);
        });

      // We must wait for the response to redirect the player to the new game and new room
    }
    //TODO : Display notification to ask the user to give a username
  };

  const handleInputGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGameID(e.target.value);
  };

  const handleJoinGameButton = () => {
    if (inputGameID) {
      gamesRef
        .doc(inputGameID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            joinGame(doc.id);
          } else {
            console.log('No games found with this id !');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const joinGame = (gameID: string) => {
    if (gameID) {
      window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player));
      history.push('/game/' + gameID);
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
