import recipesAPI from '../../api/recipe.js'

const state = {
    recipes: null
}

const getters = {
    list: state => state.recipes
}

const actions = {
    fetch ({commit}) {
        recipesAPI.list({
            success: response => {
                commit('UPDATE_RECIPES', response.data.data)
            },
            fail: err => {
                console.log(err)
                // TODO
            }
        })
    }
}

const mutations = {
    UPDATE_RECIPES (state, recipes) {
        state.recipes = recipes
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
