import React from 'react';
import GameBoard from './GameBoard/GameBoard';
import ControlWindow from './GameControls/ControlWindow';

const GameArea: React.FC = () => {
  return (
    <>
      <GameBoard />
      <ControlWindow />
    </>
  );
};

export default GameArea;
