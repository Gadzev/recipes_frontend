<template>
    <div class="container">
        <h1> Main View </h1>

        <recipes></recipes>
    </div>
</template>

<script>
import Recipes from '@/components/recipes/list'

export default {

    components: {
        'recipes': Recipes
    },
    
    name: 'home',

    mounted() {

    }
}
</script>