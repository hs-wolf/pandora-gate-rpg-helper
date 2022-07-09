import NProgress from 'nprogress';
import type { UserPlugin } from '@src/types';

export const install: UserPlugin = ({ router }) => {
  router.beforeEach(() => {
    NProgress.start();
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
