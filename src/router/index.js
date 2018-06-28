import Vue from 'vue'
import VueRouter from 'vue-router'

import Guard from '../services/authMiddleware'

import authRoutes from './auth'
import recipeRoutes from './recipes'

import Home from '@/components/home'
import NotFound from '@/components/common/404'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {name: 'home'}
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: Guard.auth
        },
        {
            path: '*',
            name: '404',
            component: NotFound
        },
        ...authRoutes,
        ...recipeRoutes
    ]
});

export default router;