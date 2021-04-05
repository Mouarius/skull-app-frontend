import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../connection/socket';
import { addPlayer, selectGame, setGame } from '../features/game/gameSlice';
import gamesServices from '../features/game/gamesServices';
import { sendInfoMessage } from '../features/notification/notificationSlice';
import playerServices from '../features/player/playerServices';
import {
  selectPlayer,
  setPlayer,
  toggleReady,
} from '../features/player/playerSlice';
import { Game, Player, TeamColor } from '../util/types';
import PlayersList from './Player/PlayersList';
import Button from './UI/Button/Button';
import ButtonColorList from './UI/Button/ButtonColorList';
import Card from './UI/Card/Card';
import InputText from './UI/Input/InputText';

interface ParamTypes {
  game_id: string;
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
    socket.emit('PLAYER_READY', player.id);
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
    console.log(areAllPlayersReady());
    if (areAllPlayersReady()) {
      socket.emit('START_GAME', game.id);
    }
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

  const fetchGame = async (game_id: string) => {
    const game = await gamesServices.getGame(game_id);
    if (game) {
      dispatch(setGame(game));
    } else {
      history.push('/');
    }
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
    // * Fetch game data
    console.log(`Fetching game data [id: ${params.game_id}] from the server`);
    fetchGame(params.game_id);
    const playerData = window.localStorage.getItem('skullAppPlayerData');
    if (playerData) {
      const player = playerServices.toPlayerObject(playerData);
      if (player) {
        dispatch(setPlayer(player));
      }
    }

    // * Join the lobby
    socket.emit('JOIN_LOBBY', player.id, params.game_id);
  }, []);

  // * Socket listeners
  // TODO Add enum types for listeners
  useEffect(() => {
    socket.on('PLAYER_JOINED', (player: Player) => {
      console.log(`The player ${player.username} has joined the lobby.`);
      dispatch(addPlayer(player));
      dispatch(
        sendInfoMessage(`The player ${player.username} has joined the lobby.`)
      );
    });

    socket.on('PLAYER_LEFT', (player: Player) => {
      console.log(`The player ${player.username} has left the lobby.`);
      dispatch(
        sendInfoMessage(`The player ${player.username} has left the lobby.`)
      );
    });

    let gameStarting = false;
    socket.on('GAME_STARTED', (game: Game) => {
      dispatch(setGame(game));
      console.log('Starting the game');
      gameStarting = true;
      history.push(`${history.location.pathname}/board`);
    });

    return () => {
      if (!gameStarting) {
        console.log('Leaving the game...');
        socket.emit('LEAVE_GAME');
      }
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
