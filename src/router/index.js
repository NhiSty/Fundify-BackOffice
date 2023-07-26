import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import DashboardView from '../views/DashboardView.vue';
import AdminView from '../views/AdminView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import MerchantLoginView from '../views/MerchantLoginView.vue';
import ListingTransactionView from '../views/ListingTransactionView.vue';

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
      path: '/listing-transaction',
      name: 'listing-transaction',
      component: ListingTransactionView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/merchant/login',
      name: 'merchant login',
      component: MerchantLoginView,
    },
  ],
});

export default router;
