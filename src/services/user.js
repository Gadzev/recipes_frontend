import { getCookie } from 'tiny-cookie'
import auth from '../api/auth'
import store from '../store'

export default {
    user() {
        return this.$store.state.user
    },

    check() {
        const loginCheck = auth.checkLogin()

        if (loginCheck !== false) {
            store.dispatch('auth/setCurrentJWT', loginCheck)
            return getCookie('RECIPES_AUTH')
        }

        return false
    }
}