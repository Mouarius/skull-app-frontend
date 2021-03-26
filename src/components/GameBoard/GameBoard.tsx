import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { socket } from '../../connection/socket';
import {
  GameState,
  selectGame,
  setGame,
  updatePlayer,
} from '../../features/game/gameSlice';
import { PlayerObject, selectPlayer } from '../../features/player/playerSlice';
import GameCard from './GameCard';

interface IGameBoardParams {
  gameID: string;
}

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<IGameBoardParams>();
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  const fetchGame = (gameID: string) => {
    socket.emit('fetch_game/request', gameID);
  };

  useEffect(() => {
    //!!! There is repetition here with Lobby.tsx
    fetchGame(params.gameID);
  }, []);

  useEffect(() => {
    socket.on('fetch_game/response', (game: GameState) => {
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
        {game.players.map((p) => {
          if (p.deck) {
            return p.deck.map((c) => {
              if (c.isInGame) {
                return (
                  <div
                    key={player.id}
                    className="relative flex flex-col items-center justify-end m-1 overflow-hidden align-bottom shadow w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-content-100 rounded-2xl"
                  >
                    <GameCard
                      playerID={p.id}
                      color={p.color}
                      isVisible={c.isVisible}
                      card={c}
                    />
                    <span className="mb-1 font-medium text-content-300">
                      {p.username}
                    </span>
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
