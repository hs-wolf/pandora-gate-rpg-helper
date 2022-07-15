import IEnvironment from './environment.schema';

const environment: IEnvironment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDTZZ_FObJXykYCBlQiKQUse2qwwSScN4M',
    projectId: 'pandora-gate-60296',
    storageBucket: 'pandora-gate-60296.appspot.com ',
  },
  backend: 'http://localhost:3000',
};

export default environment;
