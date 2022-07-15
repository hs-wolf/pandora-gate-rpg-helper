export default interface IEnvironment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    projectId: string;
    storageBucket: string;
  };
  backend: string;
}
