import React, { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PlayersList from './Player/PlayersList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayer,
  setPlayer,
  toggleReady,
} from '../features/player/playerSlice';
import { selectGame, setPlayers, updateGame } from '../features/game/gameSlice';
import Button from './UI/Button/Button';
import ButtonColorList from './UI/Button/ButtonColorList';
import InputText from './UI/Input/InputText';
import Card from './UI/Card/Card';
import { ITakenColors } from '../util/types';
import playerServices from '../features/player/playerServices';
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from 'reactfire';

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

  const currentGameRef = useFirestore().collection('games').doc(params.gameID);
  const playersInGameRef = currentGameRef.collection('players');

  const { data: gameData } = useFirestoreDocData(currentGameRef, {
    idField: 'id',
  });

  const {
    data: playersInGameData,
  } = useFirestoreCollectionData(playersInGameRef, { idField: 'id' });

  //* LISTEN TO DATABASE CHANGES
  useEffect(() => {
    if (gameData) {
      dispatch(updateGame(gameData));
    }
    if (playersInGameData) {
      dispatch(setPlayers(playersInGameData));
      playersInGameData.forEach((p) => {
        if (p.id === player.id) {
          dispatch(setPlayer(playerServices.toPlayerObject(p)));
        }
      });
    }
  }, [playersInGameData, gameData]);

  //* FETCH LOCAL PLAYER DATA
  useEffect(() => {
    const localPlayerData = window.localStorage.getItem('skullAppPlayerData');
    if (localPlayerData) {
      dispatch(setPlayer(JSON.parse(localPlayerData)));
    }
  }, []);

  useEffect(() => {
    if (game.players) {
      setTakenColors(
        game.players.map((player) => {
          return [player.username, player.color];
        })
      );
    }
    setStartButtonDisabled(!areAllPlayersReady());
    if (player.username) {
      window.localStorage.setItem('skullAppPlayerData', JSON.stringify(player));
    }
  }, [game, player]);

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(game.id);
  };

  const changeColor = (player_id: string, color: string) => {
    playersInGameRef.doc(player_id).update({ color: color });
  };

  const handleReadyButton = (): void => {
    console.log(`Ready clicked`);
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
    // socket.emit('lobby/start_game/request', game.id);
  };

  const startOrReadyButton = (): ReactElement => {
    if (player.id === game.ownerID) {
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

  // * Socket listeners
  // TODO Add enum types for listeners
  // useEffect(() => {
  //   socket.on('fetch_game/response', (game: GameState) => {
  //     dispatch(setGame(game));
  //     const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
  //     dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
  //   });
  //   socket.on('lobby/player_joined', (player: PlayerObject) => {
  //     console.log(`A user has logged in : ${player.username}`);
  //     dispatch(addPlayer(player));
  //   });
  //   socket.on('lobby/game_updated', (game: GameState) => {
  //     dispatch(setGame(game));
  //   });
  //   socket.on('lobby/change_color/response', (player: PlayerObject) => {
  //     console.log(`You have changed your color to ${player.color}`);
  //     dispatch(setColor(player.color));
  //   });
  //   socket.on('lobby/player_color_update', (player: PlayerObject) => {
  //     console.log(
  //       `The player ${player.username} changed his color to ${player.color}`
  //     );
  //     dispatch(updatePlayer(player));
  //   });
  //   socket.on('lobby/player_ready', (player: PlayerObject) => {
  //     console.log(
  //       `The player ${player.username} is${player.isReady ? '' : ' not'} ready`
  //     );
  //     dispatch(updatePlayer(player));
  //   });
  //   socket.on('lobby/start_game/response', () => {
  //     console.log('Starting the game');
  //     history.push(`${history.location.pathname}/board`);
  //   });

  //   return () => {
  //     socket.removeAllListeners();
  //   }; // Cleanup fix
  // }, []);

  return (
    <Card title="Lobby" hasBackLink={true}>
      <div className="mb-8">
        <InputText
          label="Code to join this game :"
          readOnly
          onFocus={copyToClipboard}
          value={currentGameRef.id}
        />
      </div>
      <ButtonColorList takenColors={takenColors} />
      <PlayersList players={game.players} />
      {startOrReadyButton()}
    </Card>
  );
};

export default Lobby;
