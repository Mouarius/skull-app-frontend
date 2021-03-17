import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayer,
  setUsername,
  resetPlayer,
  setID,
} from '../features/player/playerSlice';
import Button from './UI/Button/Button';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';
import { useFirestore } from 'reactfire';
import { addPlayer } from '../features/game/gameSlice';

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const [inputGameID, setInputGameID] = useState('');

  //*FIRESTORE REFS
  const playersRef = useFirestore().collection('players');
  const currentPlayerRef = playersRef.doc();
  const gamesRef = useFirestore().collection('games');
  const currentGameRef = useFirestore().collection('games').doc();

  //* CHANGE HANDLERS
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };
  const handleInputGameIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGameID(e.target.value);
  };

  //* ACTION HANDLERS
  const handleCreateGameButton = () => {
    if (player.username !== '') {
      currentGameRef
        .collection('players')
        .add({ ...player })
        .then((doc) => {
          dispatch(setID(doc.id));
          currentGameRef.set({ ownerID: doc.id });
        });
      joinGame(currentGameRef.id);
    }
    //TODO : Display notification to ask the user to give a username
  };

  const handleJoinGameButton = () => {
    if (inputGameID) {
      gamesRef
        .doc(inputGameID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            currentGameRef.collection('games').add({ ...player });
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
      dispatch(addPlayer(player));
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
