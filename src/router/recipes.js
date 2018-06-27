import Create from '@/components/recipes/create'
import Details from '@/components/recipes/details'
import Guard from '../services/authMiddleware'

export default [
    {
        path: '/create',
        name: 'create',
        component: Create,
        beforeEnter: Guard.auth
    },
    {
        path: '/recipe',
        name: 'recipe',
        component: Details,
        beforeEnter: Guard.auth
    }
]
