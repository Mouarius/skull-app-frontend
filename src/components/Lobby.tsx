import React, { ReactElement } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../connection/socket';
import PlayersList from './Player/PlayersList';
import { useDispatch, useSelector } from 'react-redux';
import { Player, selectPlayer, setColor } from '../features/player/playerSlice';
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

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(game.gameID);
  };

  const startOrReadyButton = (): ReactElement => {
    if (player.id === game.ownerID) {
      return <Button className="w-full">Start</Button>;
    }
    return <Button className="w-full">Ready</Button>;
  };

  useEffect(() => {
    if (game.players) {
      setTakenColors(game.players.map((player) => player.color));
    }
  }, [game]);

  //* At first render, asks the server if the game trying to be rendered exists
  useEffect(() => {
    const fetchGamesList = async () => {
      try {
        const response = await axios.get('/api/games/' + params.gameID);
        dispatch(setGame(response.data));
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
    let mounted = true;
    if (mounted) {
      socket.on('lobby/player_joined', (player: Player) => {
        console.log(`A user has logged in : ${player.username}`);
        dispatch(addPlayer(player));
      });
      socket.on('lobby/game_updated', (game: GameState) => {
        dispatch(setGame(game));
      });
      socket.on('lobby/change_color/response', (player: Player) => {
        console.log(`You have changed your color to ${player.color}`);
        dispatch(setColor(player.color));
      });
      socket.on('lobby/player_color_update', (player: Player) => {
        console.log(
          `The player ${player.username} changed his color to ${player.color}`
        );
        dispatch(updatePlayer(player));
      });
    }
    return () => {
      mounted = false;
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
