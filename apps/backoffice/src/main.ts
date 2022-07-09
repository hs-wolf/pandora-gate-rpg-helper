import { createApp, App as Vue } from 'vue';
import { createHead } from '@vueuse/head';
import App from '@src/app.vue';
import { EVENT_ON_AUTH_STATE_CHANGED } from '@src/constants';
import { AppContext } from '@src/types';
import { routes, router } from '@plugins/router';
import '@assets/style/nprogress.scss';
import '@assets/style/global.scss';

let app: Vue;
window.addEventListener(EVENT_ON_AUTH_STATE_CHANGED, async () => {
  if (!app) {
    app = createApp(App);
    const head = createHead();
    app.use(head);
    app.use(router);
    const plugins = import.meta.globEager('./plugins/*.ts');
    Object.values(plugins).map((plugin) => {
      const ctx: AppContext = { app, router, routes, head };
      plugin.install?.(ctx);
    });
    app.mount('#app');
  }
});
