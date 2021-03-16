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

  const { status, data } = useFirestoreCollectionData(playersRef, {
    idField: 'id',
  });

  const toPlayer = (data: { [x: string]: unknown; username?: any }) => {
    const playerObject: IPlayerObject = {
      username: '',
      id: '',
    };
    if (data.username && data.id) {
      playerObject.username = data.username;
      playerObject.id = data.id as string;
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
          <li key={p.id}>
            {p.username}{' '}
            <button
              onClick={() => {
                console.log(`Removing player with id : ${p.id}`);
                playersRef.doc(p.id).delete();
              }}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlayersList;
