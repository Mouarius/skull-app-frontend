import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// import { socket } from '../../connection/socket';
import {
  GameState,
  playCard,
  selectGame,
  setGame,
  updatePlayer,
} from '../../features/game/gameSlice';
import playerServices from '../../features/player/playerServices';
import {
  PlayerObject,
  selectPlayer,
  setPlayer,
} from '../../features/player/playerSlice';
import { CardObject } from '../../util/types';
import GameCardPlaceholder from './GameCardPlaceholder';

interface IGameBoardParams {
  gameID: string;
}

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<IGameBoardParams>();
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  const fetchGame = (gameID: string) => {
    //socket.emit('fetch_game/request', gameID);
  };

  useEffect(() => {
    //!!! There is repetition here with Lobby.tsx
    fetchGame(params.gameID);
  }, []);

  useEffect(() => {
    // socket.on('fetch_game/response', (game: GameState) => {
    //   dispatch(setGame(game));
    //   const currentPlayer = window.localStorage.getItem('skullAppPlayerData');
    //   dispatch(setPlayer(playerServices.toPlayerObject(currentPlayer)));
    // });
    // socket.on('card/card_played', (card: CardObject) => {
    //   console.log(`Card played : ${card}`);
    //   dispatch(playCard(card));
    // });
    // return () => {
    //   socket.removeAllListeners();
    // }; // Cleanup fix
  }, []);

  return (
    <div className="w-full p-8 bg-white border-2 border-solid shadow-md game-board white card border-purple">
      <div className="flex flex-row flex-wrap items-center justify-center">
        {game.players.map((p) => (
          <GameCardPlaceholder key={p.id} player={p} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
