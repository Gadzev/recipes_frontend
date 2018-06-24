import user from './user'
 
export default {
    guest (to, from, next) {
        next(!user.check())
    },
 
    auth (to, from, next) {
        next(user.check() ? true : {
            path: '/login',
            query: {
                redirect: to.name
            }  
        })
    }
}