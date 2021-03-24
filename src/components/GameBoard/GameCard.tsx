import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { socket } from '../../connection/socket';
import { setCardVisible } from '../../features/game/gameSlice';
import { CardObject, CardType, TeamColor } from '../../util/types';
import GameCardLogo from './GameCardLogo';

interface IGameCardProps {
  color: TeamColor | null;
  card: CardObject;
  isVisible?: boolean;
  playerID: string;
}

interface ICardVisiblePayload {
  playerID: string;
  cardID: string;
}

const GameCard: React.FC<IGameCardProps> = (props) => {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    console.log('Card clicked !');
    // socket.emit('card/set_card_visible', {
    //   playerID: props.playerID,
    //   cardID: props.card.id,
    // });
  };

  useEffect(() => {
    // socket.on('card/card_visible', (payload: ICardVisiblePayload) => {
    //   dispatch(
    //     setCardVisible({ playerID: payload.playerID, cardID: payload.cardID })
    //   );
    // });
    // return () => {
    //   socket.removeAllListeners();
    // };
  }, []);

  return (
    <button
      onClick={handleCardClick}
      className={`focus:outline-none game-card absolute flex items-center justify-center w-full h-full bg-${props.color} rounded-full`}
    >
      {props.isVisible && (
        <GameCardLogo
          cardType={props.card.type}
          className={`w-1/2 text-white fill-current`}
        />
      )}
    </button>
  );
};

export default GameCard;
