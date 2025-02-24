import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          sort: route.query.sort || '',
          pricemin: Number(route.query.pricemin) || '',
          pricemax: Number(route.query.pricemin) || '',
          title: route.query.title,
        }
      },
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      props: true,
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
