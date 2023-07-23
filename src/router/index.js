import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminView from '../views/AdminView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CartView from '../views/CartView.vue';
import MerchantRegisterView from '../views/MerchantRegisterView.vue';
import MerchantLoginView from '../views/MerchantLoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },

    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/merchant/register',
      name: 'merchant register',
      component: MerchantRegisterView
    },
    {
      path: '/merchant/login',
      name: 'merchant login',
      component: MerchantLoginView
    }
  ],
});

export default router;
