import React from 'react';
import { Player } from '../../util/types';

interface Props {
  player: Player;
}

const GameCardPlaceholder: React.FC<Props> = (props) => {
  return (
    <div className="relative flex flex-col items-center justify-end m-1 overflow-hidden align-bottom shadow w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-content-100 rounded-2xl">
      {props.children}
      <span className="mb-1 font-medium text-content-300">
        {props.player.username}
      </span>
    </div>
  );
};

export default GameCardPlaceholder;
