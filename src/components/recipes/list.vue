<template>
    <div class="">
        <h1> Recipes </h1>

        <table class="table table-responsive">
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

            <recipe-table v-for="recipe in recipeList" :key="recipe.id"
                :id="recipe.id"
                :name="recipe.name"
                :source="recipe.source"
                :ingredients="recipe.ingredients"
                :instructions="recipe.instructions"
                :preparation="recipe.preparation">

            </recipe-table>

        </table>
  
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import recipeTable from './table'

export default {

    components: {
        'recipe-table': recipeTable
    },

    methods: {
        ...mapActions({
            fetchRecipes: 'recipes/fetch'
        })
    },

    computed: {
        ...mapGetters({
            recipeList: 'recipes/list'
        })
    },
    
    mounted() {
        this.fetchRecipes()
    }
    
}
</script>

<style lang="scss">

</style>
