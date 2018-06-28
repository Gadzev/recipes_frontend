<template>

        <tr>
            <th>{{ id }}</th>
            <th>{{ name }}</th>
            <th>{{ source }}</th>
            <th>{{ ingredients.length }}</th>
            <th>
                <span v-for="(ingredient, index) in ingredientList" :key="ingredient.id">
                    <span v-if="index !== ingredientList.length - 1"> {{ ingredient.name }}, </span>
                    <span v-else> {{ ingredient.name }} </span>
                </span>
            </th>
            <th>{{ truncatedInstructions }}</th>
            <th>{{ preparationTime }}</th>
            <th>
                <img class="icon" src="../../assets/images/x-button.svg" @click="removeRecipe" />
                <router-link :to="{name: 'recipe', query: { recipeId: id }}"><span class="details-ico icon"></span></router-link>
            </th>
        </tr>

</template>

<script>
import { mapActions } from 'vuex'
import recipesAPI from '../../api/recipe'
import utils from '../../modules/utils'

export default {
    name: 'recipe-table',

    props: ['id', 'name', 'source', 'ingredients', 'instructions', 'preparation'],

    data() {
        return {
            tempIngredientList: this.ingredients,
            instructionsStr: '',
            prepStr: this.preparation
        }
    },

    methods: {
        ...mapActions({
            fetchRecipes: 'recipes/fetch',
            remove: 'recipes/removeRecipe'
        }),

        removeRecipe() {
            this.remove({
                id: this.id
            })
        }
       
    },

    computed: {
        truncatedInstructions: function() {
            if (this.instructions.length > 50) {
                this.instructionsStr = this.instructions.substr(0, 50)

                return this.instructionsStr.substr(0, Math.min(this.instructionsStr.length, this.instructionsStr.lastIndexOf(" "))) + "..."
            }

            return this.instructions
        },

        ingredientList: function() {
            if (this.ingredients.length >= 4) {
                this.tempIngredientList = this.ingredients.slice(0, 3)
                this.tempIngredientList.push({
                    'name': '...'
                })

                return this.tempIngredientList
            }

            return this.ingredients
        },

        preparationTime: function() {
            return utils.preparationTime(this.preparation)
        }
    }
}
</script>

<style lang="scss">
    .details-ico {
        background: url('../../assets/images/loupe.svg');
        background-size: 20px 20px;
        display: inline-block;
        margin-left: 5px;
    }
</style>
