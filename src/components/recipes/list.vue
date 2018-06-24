<template>
    <div class="container">
        <h1> Recipes </h1>

        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Source</th>
                <th>No. Ingredients</th>
                <th>Ingredient list</th>
                <th>Instructions</th>
                <th>Preparation Time</th>
                <th>Actions</th>
            </tr>

            <recipe-table v-for="recipe in recipes" :key="recipe.id"
                :id="recipe.id"
                :name="recipe.name"
                :source="recipe.source"
                :ingredients="recipe.ingredients"
                :instructions="recipe.instructions"
                :preparation="recipe.preparation">

            </recipe-table>

        </table>

        <recipe-table :recipes="recipes"></recipe-table>
    </div>
    
</template>

<script>
import recipeAPI from '../../api/recipe'
import recipeTable from './table'

export default {

    components: {
        'recipe-table': recipeTable
    },

    data() {
        return {
            recipes: []
        }
    },
    
    mounted() {
        recipeAPI.list({
            success: (response) => {
                console.log(response)
                this.recipes = response.data.data
            },
            fail: (error) => {
                console.log(error)
            }
        })
    }
    
}
</script>

<style lang="scss">

</style>
