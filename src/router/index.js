import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { inject } from 'vue'

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
          // title: route.query.title,
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
    {
      path: '/publish',
      name: 'publish',
      props: true,
      component: () => import('../views/PublishView.vue'),
      meta: { requireAuth: true },
    },
    {
      path: '/payment/:id',
      name: 'payment',
      props: true,
      component: () => import('../views/PayView.vue'),
      meta: { requireAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  const Store = inject('Store')
  if (to.meta.requireAuth && !Store.userInfos.value.token) {
    return { name: 'login' }
  }
})

export default router
