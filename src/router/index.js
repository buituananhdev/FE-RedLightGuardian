import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true },
    },
    // Users router
    {
        path: '/users',
        name: 'users',
        meta: { layout: 'auth' },
        component: () => import('@/views/UserList.vue'),
    },
    // vehicles router
    {
        path: '/vehicles',
        name: 'vehicles',
        meta: { layout: 'empty' },
        component: () => import('@/views/VehiclesPage.vue'),
    },
    // violations router
    {
        path: '/violations',
        name: 'violations',
        meta: { layout: 'empty' },
        component: () => import('@/views/ViolationsPage.vue'),
    },
    // Owners router
    {
        path: '/owners',
        name: 'owners',
        meta: { layout: 'auth' },
        component: () => import('@/views/OwnersPage.vue'),
    },
    // Auth router
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'auth' },
        component: () => import('@/views/auth/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'empty' },
        component: () => import('@/views/auth/RegisterPage.vue'),
    },
    {
        path: '/drawzone',
        name: 'drawzone',
        meta: { layout: 'auth' },
        component: () => import('@/views/DrawZone.vue'),
    },
    {
        path: '/test',
        name: 'test',
        meta: { layout: 'auth' },
        component: () => import('@/views/TestPage.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
