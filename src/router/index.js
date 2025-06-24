import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { guestOnly: true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guestOnly: true}
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true}
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // ❌ Block logged-in users from visiting guest-only pages
  if (to.meta.guestOnly && token) {
    return next('/about') // or '/dashboard'
  }

  if (to.meta.requiresAuth && !token) {
    return next('/') // or '/login'
  }

  // ✅ Allow everything else
  next()
})

export default router
