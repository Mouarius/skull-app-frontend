import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { socket } from '../../connection/socket';
import { playCard, updatePlayer } from '../../features/game/gameSlice';
import { PlayerObject } from '../../features/player/playerSlice';
import { CardObject } from '../../util/types';
import GameCard from './GameCard';

interface IProps {
  player: PlayerObject;
}

const GameCardPlaceholder: React.FC<IProps> = (props) => {
  const [cardsPlayed, setCardsPlayed] = useState<CardObject[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO : move the listener to higher component, because it is listened 5 times
    // socket.on('card/card_played', (card: CardObject) => {
    //   console.log(`Card played : ${card}`);
    //   dispatch(playCard(card));
    //   if (card.color === props.player.color) {
    //     console.log('card :>> ', card);
    //     const newCardsPlayed = [...cardsPlayed, card];
    //     console.log('newCardsPlayed :>> ', newCardsPlayed);
    //     setCardsPlayed(newCardsPlayed);
    //   }
    // });
    // return () => {
    //   socket.removeAllListeners();
    // };
  }, []);

  const displayCards = () => {
    if (cardsPlayed) {
      return cardsPlayed.map((c) => {
        if (c.isInGame) {
          return (
            <GameCard
              key={c.id}
              playerID={props.player.id}
              color={props.player.color}
              isVisible={c.isVisible}
              card={c}
            />
          );
        }
      });
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-end m-1 overflow-hidden align-bottom shadow w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-content-100 rounded-2xl">
      {displayCards()}
      <span className="mb-1 font-medium text-content-300">
        {props.player.username}
      </span>
    </div>
  );
};

export default GameCardPlaceholder;
