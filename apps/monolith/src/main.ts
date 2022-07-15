import * as admin from 'firebase-admin';
import app from './app';

if (!admin.apps.length) {
  admin.initializeApp({
    credential:
      process.env.USE_DEFAULT_SERVICE_ACCOUNT === 'true'
        ? admin.credential.applicationDefault()
        : admin.credential.cert('firebase-keys.json'),
    projectId: 'pandora-gate-60296',
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `\u001b[32mAPI being listened at: \u001b[1;32mhttp://localhost:${port}`
  );
});
