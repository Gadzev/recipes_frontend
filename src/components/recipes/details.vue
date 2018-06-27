<template>
    <h1> {{ recipe.name }} </h1>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Details',

    data() {
        return {
            id: this.$route.query.recipeId
        }
    },

    methods: {
        ...mapActions({
            getRecipe: 'recipes/getRecipe'
        })
    },

    computed: {
        ...mapGetters({
            recipe: 'recipes/get'
        })
    },

    mounted() {
        this.getRecipe({
            data: {
                id: this.id
            }
        })
    }
}
</script>
