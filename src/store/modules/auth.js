import userAPI from '../../api/user.js'

const state = {
  user: null,
  jwt: null
}

const getters = {
  currentUser: (state) => state.user,
  currentJWT: (state) => state.jwt,
}

const actions = {
  syncCurrentUser ({ commit }) {
    userAPI.get({
      data: { id: state.user.id },
      success: (response) => {
        commit('SET_CURRENT_USER', response.data.data)
      },
      fail: (error) => {
        console.log(error)
        // TODO: implement
      }
    })
  },
  setCurrentJWT ({ commit }, payload) {
    commit('SET_CURRENT_JWT', payload)
  }
}

const mutations = {
  SET_CURRENT_USER (state, payload) {
    state.user = payload
  },
  SET_CURRENT_JWT (state, payload) {
    state.user = payload.data
    state.jwt = payload.token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}