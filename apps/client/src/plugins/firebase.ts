import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { EVENT_ON_AUTH_STATE_CHANGED } from '@src/constants';
import environment from '@environments/environment';
import { updateHeaders } from '@plugins/axios';
import { pinia } from '@plugins/pinia';
import { router } from '@plugins/router';
import { useAuthStore } from '@stores/auth';
import { useCharactersStore } from '@stores/characters';
import { useLocalesStore } from '@stores/locales';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);

auth.onAuthStateChanged(async (user) => {
  try {
    const token = await user?.getIdToken();
    updateHeaders(token ?? '');

    const authStore = useAuthStore(pinia);
    const charactersStore = useCharactersStore(pinia);
    const localesStore = useLocalesStore(pinia);

    localesStore.loadLocale();
    await authStore.updateCurrentUser();

    if (authStore.currentUser) {
      charactersStore.getUserCharacters();
      if (router.currentRoute.value.meta.requiresOffline) {
        router.push({ name: 'index' });
      }
    } else {
      if (router.currentRoute.value.meta.requiresAuth) {
        router.push({ name: 'login' });
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    const authChangedEvent = new CustomEvent(EVENT_ON_AUTH_STATE_CHANGED);
    window.dispatchEvent(authChangedEvent);
  }
});

export { auth, app };
