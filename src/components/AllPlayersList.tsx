import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import firebase from 'firebase';

interface IPlayerObject {
  username: string;
  color?: string;
  id?: string;
  roundsWon?: number;
}

const AllPlayersList: React.FC = () => {
  const [players, setPlayers] = useState<IPlayerObject[]>();
  const playersRef = useFirestore().collection('players');

  const { status, data } = useFirestoreCollectionData(playersRef);

  const toPlayer = (data: { [x: string]: unknown; username?: any }) => {
    const playerObject: IPlayerObject = {
      username: '',
    };
    if (data.username) {
      playerObject.username = data.username;
    }
    return playerObject;
  };

  useEffect(() => {
    const newState: IPlayerObject[] = [];
    if (data) {
      data.forEach((p) => {
        newState.push(toPlayer(p));
      });
      setPlayers((prevState) => newState);
    }
  }, [data]);

  return (
    <div>
      <h1>ALL PLAYERS IN DB</h1>
      <ul>
        {players?.map((p) => (
          <li key={p.id}>{p.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlayersList;
