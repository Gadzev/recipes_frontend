import Login from '@/components/auth/login'
import Guard from '../services/authMiddleware'

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: Guard.guest
    }
]