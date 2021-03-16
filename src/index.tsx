import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import './index.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBXcfFcX-moHGstGZ_qg01ZS5jYHeg6xF8',
  authDomain: 'skull-game-4a6db.firebaseapp.com',
  databaseURL:
    'https://skull-game-4a6db-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'skull-game-4a6db',
  storageBucket: 'skull-game-4a6db.appspot.com',
  messagingSenderId: '613024563494',
  appId: '1:613024563494:web:264b463f59adf0f58cc1e7',
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseAppProvider>,
  document.getElementById('root')
);
