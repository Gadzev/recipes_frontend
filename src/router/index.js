import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import auth from '../api/auth'
import Guard from '../services/authMiddleware'

import authRoutes from './auth'
import recipeRoutes from './recipes'

import Home from '@/components/home'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: Guard.auth
        },
        ...authRoutes,
        ...recipeRoutes
    ]
});

export default router;