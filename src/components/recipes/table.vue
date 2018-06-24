<template>
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

        <tr v-for="recipe in recipes" :key="recipe.id">
            <th>{{ recipe.id }}</th>
            <th>{{ recipe.name }}</th>
            <th>{{ recipe.source }}</th>
            <th>{{ recipe.ingredients.length }}</th>
            <th>
                <span v-for="(ingredient, index) in ingredientList(recipe.ingredients)" :key="ingredient.id">
                    <span v-if="index !== ingredientList(recipe.ingredients).length - 1"> {{ ingredient.name }}, </span>
                    <span v-else> {{ ingredient.name }} </span>
                </span>
            </th>
            <th>{{ recipe.instructions }}</th>
            <th>{{ recipe.preparation}}</th>
            <th>Actions</th>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'recipe-table',

    props: ['recipes'],

    data() {
        return {
            tempList: []
        }
    },

    methods: {
        ingredientList(ingredients) {
            if (ingredients.length >= 4) {
                this.tempList = ingredients.slice(0, 4)
                this.tempList.push({
                    'name': '...'
                })
                return this.tempList
            }

            return ingredients
        }
    },

    computed: {
        truncatedInstructions: function() {
            
        }
    }
}
</script>

<style lang="scss">

</style>
