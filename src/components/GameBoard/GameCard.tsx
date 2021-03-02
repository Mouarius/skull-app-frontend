import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '../../connection/socket';
import { PlayerObject } from '../../features/player/playerSlice';
import { CardObject, CardType, TeamColor } from '../../util/types';
import Button from '../UI/Button/Button';
import GameCardLogo from './GameCardLogo';

interface IGameCardProps {
  color: TeamColor | null;
  card: CardObject;
  isVisible?: boolean;
  playerID: string;
}

const GameCard: React.FC<IGameCardProps> = (props) => {
  const dispatch = useDispatch();

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
      className={`absolute flex items-center justify-center w-full h-full bg-${props.color} rounded-full`}
    ></div>
  );
};

export default GameCard;
