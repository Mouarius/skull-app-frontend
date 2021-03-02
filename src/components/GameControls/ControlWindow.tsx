import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../connection/socket';
import { selectPlayer } from '../../features/player/playerSlice';
import { CardType } from '../../util/types';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';

// interface IControlWindowProps {}

const ControlWindow: React.FC = () => {
  const player = useSelector(selectPlayer);

  const handleFlowerButton = () => {
    console.log('FLOWER CLICKED !');
    socket.emit('card/play_card', {
      cardType: CardType.FLOWER,
      playerID: player.id,
    });
  };
  const handleSkullButton = () => {
    console.log('SKULL CLICKED !');
    socket.emit('card/play_card', {
      cardType: CardType.SKULL,
      playerID: player.id,
    });
  };
  const handleBetButton = () => {
    console.log('BET CLICKED !');
  };
  return (
    <Card title={'Game controls'} className={'fixed bottom-2'}>
      <div className="flex flex-row justify-between">
        <Button onClick={handleFlowerButton}>Flower</Button>
        <Button onClick={handleSkullButton}>Skull</Button>
        <Button onClick={handleBetButton}>Start to bet</Button>
      </div>
    </Card>
  );
};

export default ControlWindow;
