<template>
    <div class="container">
        <div class="columns" v-if="!isLoading">
            <div class="column">
                <h1> {{ recipe.name }} </h1>
                <p> {{ recipe.source }} </p>
                <div class="columns">
                    <div class="column">
                        <h4> Ingredients: </h4>
                    </div>
                    <div class="column center-text">
                        <h4> Quantity: </h4>
                    </div>
                </div>
                <div v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                    <div class="columns">
                        <div class="column">
                            {{ ingredient.name }}
                        </div>
                        <div class="column center-text">
                             {{ ingredient.quantity }} 
                        </div>
                    </div>
                </div>
                <br />
                <p> <b> Preparation Time: </b> {{ preparationTime }} </p>

                <button class="button button-danger full-width" @click="confirmCustomDelete">Remove Recipe</button>

            </div>
            <div class="column">
                <h4> Instructions: </h4>
                <p class="recipe-instructions"> {{ recipe.instructions }} </p>
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
            this.$toast.open('Recipe deleted!')
            this.$router.push({ name: 'home' })
        },

        confirmCustomDelete() {
            this.$dialog.confirm({
                title: 'Deleting recipe',
                message: 'Are you sure you want to <b>delete</b> this recipe? This action cannot be undone.',
                confirmText: 'Delete Recipe',
                type: 'is-danger',
                onConfirm: () => this.removeRecipe()
            })
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

<style lang="scss">

</style>
