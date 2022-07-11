import IEnvironment from './environment.schema';

const environment: IEnvironment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBWc2rorN7UwfBvkVrnQdh6xpJnqhyqhbM',
    authDomain: 'pandora-gate-rpg-helper.firebaseapp.com',
    projectId: 'pandora-gate-rpg-helper',
    storageBucket: 'pandora-gate-rpg-helper.appspot.com',
    messagingSenderId: '1056929563577',
    appId: '1:1056929563577:web:60ded32ca49d57db672c68',
  },
  backend: 'http://localhost:3000',
};

export default environment;
