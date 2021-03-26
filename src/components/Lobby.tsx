import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../connection/socket';
import {
  addPlayer,
  GameState,
  selectGame,
  setGame,
  updatePlayer,
} from '../features/game/gameSlice';
import {
  PlayerObject,
  selectPlayer,
  toggleReady,
} from '../features/player/playerSlice';
import { TeamColor } from '../util/types';
import PlayersList from './Player/PlayersList';
import Button from './UI/Button/Button';
import ButtonColorList from './UI/Button/ButtonColorList';
import Card from './UI/Card/Card';
import InputText from './UI/Input/InputText';

interface ParamTypes {
  gameID: string;
}

const Lobby: React.FC = () => {
  const dispatch = useDispatch();
  const player = useSelector(selectPlayer);
  const game = useSelector(selectGame);
  const history = useHistory();
  const params = useParams<ParamTypes>();
  const [takenColors, setTakenColors] = useState<TeamColor[]>([]);
  const [startButtonDisabled, setStartButtonDisabled] = useState<boolean>(true);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(game.id);
  };

  const handleReadyButton = (): void => {
    console.log(`Ready clicked`);
    socket.emit('lobby/player_ready', player);
    dispatch(toggleReady());
  };

  const areAllPlayersReady = (): boolean => {
    const allPlayersAreReady = game.players.reduce((playersReady, current) => {
      if (current.id != game.owner_id) {
        return playersReady && current.isReady;
      }
      return playersReady && true;
    }, true);

    return allPlayersAreReady;
  };

  //TODO : Add condition to start the game that all players have chosen a color

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
    socket.emit('lobby/start_game/request', game.id);
  };

  const startOrReadyButton = (): ReactElement => {
    if (player.id === game.owner_id) {
      return (
        <Button
          className="w-full start-button"
          disabled={startButtonDisabled}
          onClick={handleStartButton}
        >
          Start
        </Button>
      );
    }
    return (
      <Button className="w-full ready-button" onClick={handleReadyButton}>
        Ready
      </Button>
    );
  };

  const fetchGame = (gameID: string) => {
    socket.emit('fetch_game/request', gameID);
  };

  useEffect(() => {
    if (game.players) {
      const colorsList: TeamColor[] = [];
      game.players.forEach((p) => {
        if (p.color) {
          colorsList.push(p.color);
        }
      });
      setTakenColors(colorsList);
    }
    setStartButtonDisabled(!areAllPlayersReady());
  }, [game]);

  useEffect(() => {
    //Update the player data in localStorage each time it changes
    if (player.username) {
      window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player));
    }
  }, [player]);

  //* At first render, asks the server if the game trying to be rendered exists
  //TODO : Try to persist the state through render
  useEffect(() => {
    console.log(`Fetching data from the server`);
    // const fetchGamesList = async () => {
    //   try {
    //     console.log(`Requesting the game : ${params.gameID}`);
    //     const response = await axios.get('/api/games/' + params.gameID);
    //     dispatch(setGame(response.data));
    //     const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
    //     dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
    //   } catch (e) {
    //     // If it doesnt exist, redirect the user to home
    //     console.log(e);
    //     history.push('/');
    //   }
    // };
    fetchGame(params.gameID);
  }, []);

  // * Socket listeners
  // TODO Add enum types for listeners
  useEffect(() => {
    socket.on('fetch_game/response', (game: GameState) => {
      dispatch(setGame(game));
      const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
      // dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
    });
    socket.on('lobby/player_joined', (player: PlayerObject) => {
      console.log(`A user has logged in : ${player.username}`);
      dispatch(addPlayer(player));
    });
    socket.on('lobby/game_updated', (game: GameState) => {
      dispatch(setGame(game));
    });
    socket.on('lobby/change_color/response', (player: PlayerObject) => {
      console.log(`You have changed your color to ${player.color}`);
      // dispatch(setColor(player.color));
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
    socket.on('lobby/start_game/response', (game: GameState) => {
      dispatch(setGame(game));
      console.log('Starting the game');
      history.push(`${history.location.pathname}/board`);
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
          value={game.id}
        />
      </div>
      <ButtonColorList takenColors={takenColors} />
      <PlayersList players={game.players} />
      {startOrReadyButton()}
    </Card>
  );
};

export default Lobby;
