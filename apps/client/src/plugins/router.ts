import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { pinia } from '@plugins/pinia';
import { useAuthStore } from '@stores/auth';
import { UserRoles } from '@pandora-gate-rpg-helper/models';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    requiresOffline?: boolean;
    requiredRole?: UserRoles;
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
    if (_from.name) {
      return { name: _from.name.toString() };
    }
    return { name: 'login' };
  }
  if (authStore.currentUser) {
    if (_to.meta.requiresOffline) {
      if (_from.name) {
        return { name: _from.name.toString() };
      }
      return { name: 'index' };
    }
    if (
      _to.meta.requiredRole &&
      authStore.currentUser.role !== _to.meta.requiredRole
    ) {
      if (_from.name) {
        return { name: _from.name.toString() };
      }
      return { name: 'index' };
    }
  }
  return;
});

router.afterEach((to) => {
  const parent = to.matched.find((record) => record.meta.title);
  const parentTitle = parent ? (parent.meta.title as string) : null;
  document.title = (to.meta.title as string) || parentTitle || 'Pandora Gate';
});

export { routes, router };
