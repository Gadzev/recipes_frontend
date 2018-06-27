<template>
    <div class="container">
        <div class="columns" v-if="!isLoading">
            <div class="column">
                <h1> {{ recipe.name }} </h1>
                <p> {{ recipe.source }} </p>
                <div v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                    <div class="columns">
                        <div class="column">
                            {{ ingredient.name }}
                        </div>
                        <div class="column">
                            {{ ingredient.quantity }}
                        </div>
                    </div>
                </div>
                <p> {{ preparationTime }} </p>

                <button @click="removeRecipe">Remove</button>

            </div>
            <div class="column">
                <p> {{ recipe.instructions }} </p>
            </div>
        </div>

        <b-loading :is-full-page="true" :active="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>
import recipesAPI from '../../api/recipe'
import utils from '../../modules/utils'
import { mapActions } from 'vuex'

export default {
    name: 'Details',

    data() {
        return {
            id: this.$route.query.recipeId,
            isLoading: true,
            recipe: null,
        }
    },

    methods: {
        ...mapActions({
            remove: 'recipes/removeRecipe'
        }),

        removeRecipe() {
            this.remove({
                id: this.id
            })
            this.$router.push({ name: 'home' })
        }
    },

    created() {

        recipesAPI.get({
            id: this.id,
            success: response => {
                this.recipe = response.data.data
                this.isLoading = false
            },
            fail: err => {
                console.log(err)
                // TODO
            }
        })
    },

    computed: {
        preparationTime: function() {
            return utils.preparationTime(this.recipe.preparation)
        }
    }
}
</script>
