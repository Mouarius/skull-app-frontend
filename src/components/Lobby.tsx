import React, { ReactElement } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../connection/socket';
import PlayersList from './Player/PlayersList';
import { useDispatch, useSelector } from 'react-redux';
import {
  PlayerObject,
  selectPlayer,
  setColor,
  setPlayer,
  toggleReady,
} from '../features/player/playerSlice';
import {
  addPlayer,
  GameState,
  selectGame,
  setGame,
  updatePlayer,
} from '../features/game/gameSlice';
import Button from './UI/Button/Button';
import ButtonColorList from './UI/Button/ButtonColorList';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';
import { ITakenColors } from '../util/types';
import playerServices from '../features/player/playerServices';

interface ParamTypes {
  gameID: string;
}

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const game = useSelector(selectGame);
  const history = useHistory();
  const params = useParams<ParamTypes>();
  const [takenColors, setTakenColors] = useState<ITakenColors>([]);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(game.gameID);
  };

  const handleReadyButton = (): void => {
    console.log(`Ready clicked`);
    socket.emit('lobby/player_ready', player);
    dispatch(toggleReady());
  };

  const areAllPlayersReady = (): boolean => {
    const allPlayersAreReady = game.players.reduce((playersReady, current) => {
      if (current.id != game.ownerID) {
        return playersReady && current.isReady;
      }
      return playersReady && true;
    }, true);

    return allPlayersAreReady;
  };

  const allPlayersChoseColor = (): boolean => {
    const numberOfPlayers = game.players.length;
    const numberOfPlayersColor = game.players.reduce((playerCount, current) => {
      if (current.color) {
        return playerCount + 1;
      }
      return playerCount;
    }, 0);
    return numberOfPlayersColor === numberOfPlayers;
  };

  const handleStartButton = (): void => {
    console.log('Start clicked');

    socket.emit('lobby/start/request');
  };

  const startOrReadyButton = (): ReactElement => {
    if (player.id === game.ownerID) {
      return (
        <Button
          className="w-full"
          disabled={startButtonDisabled}
          onClick={handleStartButton}
        >
          Start
        </Button>
      );
    }
    return (
      <Button className="w-full" onClick={handleReadyButton}>
        Ready
      </Button>
    );
  };

  useEffect(() => {
    if (game.players) {
      setTakenColors(game.players.map((player) => player.color));
    }
    setStartButtonDisabled(!areAllPlayersReady());
  }, [game]);

  useEffect(() => {
    //Update the player data in localStorage each time it changes
    window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player));
  }, [player]);

  //* At first render, asks the server if the game trying to be rendered exists
  //TODO : Try to persist the state through render
  useEffect(() => {
    console.log(`Fetching data from the server`);
    const fetchGamesList = async () => {
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
    fetchGamesList();
  }, []);

  // * Socket listeners
  // TODO Add enum types for listeners
  useEffect(() => {
    socket.on('lobby/player_joined', (player: PlayerObject) => {
      console.log(`A user has logged in : ${player.username}`);
      dispatch(addPlayer(player));
    });
    socket.on('lobby/game_updated', (game: GameState) => {
      dispatch(setGame(game));
    });
    socket.on('lobby/change_color/response', (player: PlayerObject) => {
      console.log(`You have changed your color to ${player.color}`);
      dispatch(setColor(player.color));
    });
    socket.on('lobby/player_color_update', (player: PlayerObject) => {
      console.log(
        `The player ${player.username} changed his color to ${player.color}`
      );
      dispatch(updatePlayer(player));
    });
    socket.on('lobby/player_ready', (player: PlayerObject) => {
      console.log(
        `The player ${player.username} is${player.isReady ? '' : ' not'} ready`
      );
      dispatch(updatePlayer(player));
    });

    return () => {
      socket.removeAllListeners();
    }; // Cleanup fix
  }, []);

  return (
    <Card title="Lobby" hasBackLink={true}>
      <div className="mb-8">
        <InputText
          label="Code to join this game :"
          readOnly
          onFocus={copyToClipboard}
          value={game.gameID}
        />
      </div>
      <ButtonColorList takenColors={takenColors} />
      <PlayersList players={game.players} />
      {startOrReadyButton()}
    </Card>
  );
};

export default Lobby;
