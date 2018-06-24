<template>
    <div class="container">
        <h1> Recipes </h1>

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
