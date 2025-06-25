import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import api from '@/axios'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {guestOnly: true}
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: {guestOnly: true}
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {requiresAuth: true}
        },
    ],
})

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')

    // ❌ Block logged-in users from visiting guest-only pages
    if (to.meta.guestOnly && token) {
        return next('/about') // or '/dashboard'
    }

    if (to.meta.requiresAuth && !token) {
        return next('/') // or '/login'
    }

    console.log(to.meta.requiresAuth)

    if(to.meta.requiresAuth) {
        try {
            await api.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return next()
        } catch (error) {
            localStorage.removeItem('token')
            return next('/')
        }
    }



    // ✅ Allow everything else
    return next()
})

export default router
