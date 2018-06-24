import api from './index.js'

export default {

  list (options) {
    return api('GET', `/user`, options)
  },

  get (options) {
    return api('GET', `/user/${options.data.id}`, options)
  },

  create (options) {
    return api('POST', `/user`, options)
  },

  edit (options) {
    return api('PUT', `/user/${options.data.id}`, options)
  },

  delete (options) {
    return api('DELETE', `/user/${options.data.id}`, options)
  }
}