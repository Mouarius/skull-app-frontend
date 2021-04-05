import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { socket } from '../../connection/socket';
import {
  selectGame,
  setGame,
  updatePlayer,
} from '../../features/game/gameSlice';
import gamesServices from '../../features/game/gamesServices';
import playerServices from '../../features/player/playerServices';
import {
  PlayerObject,
  selectPlayer,
  setPlayer,
} from '../../features/player/playerSlice';
import { Game } from '../../util/types';
import GameCard from './GameCard';
import GameCardPlaceholder from './GameCardPlaceholder';

interface IGameBoardParams {
  game_id: string;
}

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<IGameBoardParams>();
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  const fetchGame = async (game_id: string) => {
    const game = await gamesServices.getGame(game_id);
    if (game) {
      dispatch(setGame(game));
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    //!!! There is repetition here with Lobby.tsx
    console.log(`Fetching game data [id: ${params.game_id}] from the server`);
    fetchGame(params.game_id);
    const playerData = window.localStorage.getItem('skullAppPlayerData');
    if (playerData) {
      const player = playerServices.toPlayerObject(playerData);
      if (player) {
        dispatch(setPlayer(player));
      }
    }
  }, []);

  useEffect(() => {
    socket.on('fetch_game/response', (game: Game) => {
      dispatch(setGame(game));
      const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
      // dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
    });
    socket.on('card/card_played', (player: PlayerObject) => {
      dispatch(updatePlayer(player));
    });
    return () => {
      socket.removeAllListeners();
    }; // Cleanup fix
  }, []);

  return (
    <div className="w-full p-8 bg-white border-2 border-solid shadow-md game-board white card border-purple">
      <div className="flex flex-row flex-wrap items-center justify-center">
        {game.players.map((p) => (
          <GameCardPlaceholder key={p.id} player={p}></GameCardPlaceholder>
        ))}
        {game.players.map((p) => {
          if (p.deck) {
            return p.deck.map((c) => {
              if (c.isPlayed) {
                return (
                  <div
                    key={player.id}
                    className="relative flex flex-col items-center justify-end m-1 overflow-hidden align-bottom shadow w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-content-100 rounded-2xl"
                  >
                    <GameCard
                      player_id={p.id}
                      color={p.color}
                      isVisible={c.isVisible}
                      card={c}
                    />
                  </div>
                );
              }
            });
          }
        })}
      </div>
    </div>
  );
};

export default GameBoard;
