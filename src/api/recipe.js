import api from './index.js'

export default {
    list (options) {
        return api('GET', '/recipes', options)
    },

    create (options) {
        return api('POST', '/recipes/create', options)
    }
}
