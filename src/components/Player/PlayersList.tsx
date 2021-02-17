import React from 'react';
import { Player } from '../../features/player/playerSlice';

interface IPlayerListProps {
  players: Player[];
}

const PlayersList: React.FC<IPlayerListProps> = ({ players }) => {
  const displayPlayerReadyClass = (player: Player): string => {
    if (player.isReady) return 'underline';
    return '';
  };
  if (!players) {
    return null;
  }
  return (
    <div className="mb-8">
      <h2>Players</h2>
      <ul className="flex flex-col flex-wrap">
        {players.map((player) => (
          <li
            className="flex flex-row items-center px-2 font-light text-md"
            key={player.id}
          >
            <span className={displayPlayerReadyClass(player)}>
              {player.username}{' '}
            </span>
            <span
              className={`m-2 h-3 w-3 rounded-full bg-${player.color}`}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
