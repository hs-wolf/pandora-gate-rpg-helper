import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { pinia } from '@plugins/pinia';
import { useAuthStore } from '@stores/auth';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    requiresOffline?: boolean;
  }
}

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    if (_to.hash) {
      return {
        el: _to.hash,
        behavior: 'smooth',
      };
    }
    return;
  },
});

router.beforeEach((_to, _from) => {
  const authStore = useAuthStore(pinia);
  if (!authStore.currentUser && _to.meta.requiresAuth) {
    return { name: 'login' };
  }
  if (authStore.currentUser && _to.meta.requiresOffline) {
    return { name: 'index' };
  }
  return;
});

router.afterEach((to) => {
  const parent = to.matched.find((record) => record.meta.title);
  const parentTitle = parent ? (parent.meta.title as string) : null;
  document.title = (to.meta.title as string) || parentTitle || 'Pandora Gate';
});

export { routes, router };
