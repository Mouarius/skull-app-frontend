import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebase from 'firebase';
import { useFirestoreCollectionData } from 'reactfire';

interface IProps {
  collectionRef: firebase.firestore.CollectionReference;
  name: string;
}

const DatabaseCollectionList: React.FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [elements, setElements] = useState<any[]>();
  const { status, data } = useFirestoreCollectionData(props.collectionRef, {
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
                props.collectionRef.doc(elem.id).delete();
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

export default DatabaseCollectionList;
