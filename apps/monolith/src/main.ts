import { apps, credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import app from './app';

if (!apps.length) {
  initializeApp({
    credential: credential.cert('./firebase-keys.json'),
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(
    `\u001b[32mAPI being listened at: \u001b[1;32mhttp://localhost:${port}`
  );
});
