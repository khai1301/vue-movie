import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import NotFound from '../pages/404.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '*',
                    name: 'notFound',
                    component: NotFound,
                },
                {
                    path: '',
                    name: 'home',
                    component: HomePage,
                }
            ],
        },
    ],
})

export default router
