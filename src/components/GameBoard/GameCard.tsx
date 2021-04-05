import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardType, TeamColor } from '../../util/types';
import GameCardLogo from './GameCardLogo';

interface IGameCardProps {
  color: TeamColor | undefined;
  card: Card;
  isVisible?: boolean;
  player_id: string;
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
