import api from './index.js'

export default {
    list (options) {
        return api('GET', '/recipes', options)
    },

    create (options) {
        return api('POST', '/recipes/create', options)
    },

    delete (options) {
        return api('DELETE', `/recipes/${options.data.id}`, options)
    },

    get (options) {
        return api('GET', `/recipes/${options.id}`, options)
    }
}
