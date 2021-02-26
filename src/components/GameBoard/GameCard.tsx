import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../connection/socket';
import { PlayerObject } from '../../features/player/playerSlice';
import { CardObject, CardType, TeamColor } from '../../util/types';
import Button from '../UI/Button/Button';
import GameCardLogo from './GameCardLogo';
import { setCardVisible, updatePlayer } from '../../features/game/gameSlice';

interface IGameCardProps {
  color: TeamColor | null;
  card: CardObject;
  isVisible?: boolean;
}

const GameCard: React.FC<IGameCardProps> = (props) => {
  const dispatch = useDispatch();

  const handleVisibleButton = () => {
    socket.emit('board/set_card_visible/request', props.card);
  };

  useEffect(() => {
    socket.on('board/set_card_visible/response', (payload: PlayerObject) => {
      console.log(payload);
      //Update the player
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  if (props.isVisible) {
    return (
      <div
        className={`absolute flex items-center justify-center w-full h-full bg-${props.color} rounded-full`}
      >
        <GameCardLogo
          cardType={CardType.FLOWER}
          className={`w-1/2 text-white fill-current`}
        />
      </div>
    );
  }
  return (
    <div
      className={`absolute flex items-center justify-center w-full h-full bg-${props.color} rounded-full opacity-20`}
    >
      <Button onClick={handleVisibleButton}>SET VISIBLE</Button>
    </div>
  );
};

export default GameCard;
