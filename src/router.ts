import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Tareaformulario from './components/Tareaformulario.vue';
import Dashboard from './components/Dashboard.vue';
import Registro from './components/Registro.vue';
import { TareaAPI } from './stores/pinia';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/task-form', component: Tareaformulario, meta: { requiresAuth: true } },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/registro', component: Registro },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = TareaAPI();

  if (to.meta.requiresAuth && !store.currentUserId) {
    if (to.path !== '/login') {
      next('/login'); 
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router;
