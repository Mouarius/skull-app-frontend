// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyBXcfFcX-moHGstGZ_qg01ZS5jYHeg6xF8',
  authDomain: 'skull-game-4a6db.firebaseapp.com',
  databaseURL:
    'https://skull-game-4a6db-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'skull-game-4a6db',
  storageBucket: 'skull-game-4a6db.appspot.com',
  messagingSenderId: '613024563494',
  appId: '1:613024563494:web:264b463f59adf0f58cc1e7',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
