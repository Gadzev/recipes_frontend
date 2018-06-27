import recipesAPI from '../../api/recipe.js'

const state = {
    recipes: null,
    currentRecipe: null
}

const getters = {
    list: state => state.recipes,
    get: state => state.currentRecipe
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
    },

    getRecipe ({commit}, options) {
        recipesAPI.get({
            id: options.data.id,
            success: response => {
                commit('SET_CURRENT_RECIPE', response.data.data)
            },
            fail: err => {
                console.log(err)
            }
        })
    },

    removeRecipe ({commit, dispatch}, options) {
        recipesAPI.delete({
            id: options.id,
            success: (response) => {
                dispatch('fetch')
            },
            fail: (err) => {
                console.log(err)
            }
        })
    }
}

const mutations = {
    UPDATE_RECIPES (state, recipes) {
        state.recipes = recipes
    },

    SET_CURRENT_RECIPE (state, recipe) {
        state.currentRecipe = recipe
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
