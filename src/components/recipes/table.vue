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
            <th>Actions</th>
        </tr>

</template>

<script>
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
            this.prepStr = this.preparation.split(':')

            if (parseInt(this.prepStr[0]) <= 0) {
                return this.prepStr[1] + " Minutes"
            }

            return this.prepStr[0] + " Hours " + this.prepStr[1] + " Minutes"
        }
    }
}
</script>

<style lang="scss">

</style>
