import Create from '@/components/recipes/create'
import Guard from '../services/authMiddleware'

export default [
    {
        path: '/create',
        name: 'create',
        component: Create,
        beforeEnter: Guard.auth
    }
]