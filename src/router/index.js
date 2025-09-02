import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import NotFound from '../pages/404.vue'
import MovieByCategory from '@/pages/MovieByCategory.vue'
import MovieByCountry from '@/pages/MovieByCountry.vue'
import MovieByYear from '@/pages/MovieByYear.vue'
import MovieByList from '@/pages/MovieByList.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '/:pathMatch(.*)*',
                    name: 'notFound',
                    component: NotFound,
                },
                {
                    path: '',
                    name: 'home',
                    component: HomePage,
                    meta: {
                        breadcrumb: "Phim mới"
                    }
                },
                {
                    path: 'danh-sach/:slug',
                    name: 'list',
                    component: MovieByList,
                },
                {
                    path: 'the-loai/:slug',
                    name: 'category',
                    component: MovieByCategory,
                },
                {
                    path: 'quoc-gia/:slug',
                    name: 'country',
                    component: MovieByCountry,
                },
                {
                    path: 'nam/:slug',
                    name: 'year',
                    component: MovieByYear,
                }
            ],
        },
    ],
})

export default router
