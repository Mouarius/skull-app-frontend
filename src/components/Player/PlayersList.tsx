import React from 'react';
import { Player } from '../../features/player/playerSlice';

interface PlayerListProps {
  players: Player[];
}

const PlayersList: React.FC<PlayerListProps> = ({ players }) => {
  if (!players) {
    return null;
  }
  return (
    <div className="mb-8">
      <h2>Players</h2>
      <ul className="flex flex-col flex-wrap">
        {players.map((player) => (
          <li className="px-2 font-light text-md" key={player.id}>
            {player.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
