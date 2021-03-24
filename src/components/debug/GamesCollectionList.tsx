import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebase from 'firebase';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

interface IProps {
  name: string;
}

const GamesCollectionList: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [elements, setElements] = useState<any[]>();
  const gamesRef = useFirestore().collection('games');
  const { status, data } = useFirestoreCollectionData(gamesRef, {
    idField: 'id',
  });

  useEffect(() => {
    const newState: { [key: string]: unknown }[] = [];
    if (data) {
      data.forEach((elem) => {
        newState.push(elem);
      });
      setElements(() => newState);
    }
  }, [data]);

  return (
    <div>
      <h1>ALL {props.name.toUpperCase()} IN DB</h1>
      <ul>
        {elements?.map((elem) => (
          <li key={elem.id}>
            {elem.id}{' '}
            <button
              onClick={() => {
                console.log(`Removing element with id : ${elem.id}`);
                gamesRef
                  .doc(elem.id)
                  .collection('players')
                  .get()
                  .then((snapshot) => {
                    snapshot.docs.forEach((doc) => doc.ref.delete);
                  });
                gamesRef.doc(elem.id).delete();
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

export default GamesCollectionList;
