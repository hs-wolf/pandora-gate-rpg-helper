import { apps, credential, firestore } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import app from './app';

if (!apps.length) {
  initializeApp({
    credential:
      process.env.USE_DEFAULT_SERVICE_ACCOUNT === 'true'
        ? credential.applicationDefault()
        : credential.cert('./firebase-keys.json'),
    projectId: 'pandora-gate-rpg-helper',
    storageBucket: 'pandora-gate-rpg-helper.appspot.com',
  });
  firestore().settings({ ignoreUndefinedProperties: true });
}

const port = 3000;
app.listen(port, () => {
  console.log(
    `\u001b[32mAPI being listened at: \u001b[1;32mhttp://localhost:${port}/api`
  );
});
