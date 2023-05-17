import { createRouter, createWebHashHistory } from 'vue-router';
import { useIsAuthenticate } from '@/composables/user.js';
import publicRoutes from './public';
import privateRoutes from './private';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
});

router.beforeEach(async (to, from) => {
  const { meta } = to;

  if (!meta.requireAuth) return true;

  const user = await useIsAuthenticate();

  if (!user) return false; //retornar para a pagina de not found

  return true;
});

export default router;
