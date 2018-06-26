<template>
    <div class="container">
        <h1> Create A New Post </h1>

        <div class="message error" v-if="formError">
            <li v-for="error in formError" :key="error[0]['key']">
                {{ error[0]['key'] }}
            </li>
        </div>

        <form id="create_recipe_form">
            <div class="input-container">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="name" v-validate="'required|min:2'" data-vv-as="name">
                <span v-show="errors.has('name')" class="input-error-msg">
                    {{ errors.first('name') }}
                </span>
            </div>

            <div class="input-container">
                <label for="name">Source</label>
                <input type="text" name="source" v-model="source" v-validate="'url'" data-vv-as="source">
                <span v-show="errors.has('source')" class="input-error-msg">
                    {{ errors.first('source') }}
                </span>
            </div>

            <div class="input-container">
                <div v-for="(ingredient, index) in ingredients" :key="index">
                    <label for="name">Ingredient</label>
                    <multiselect v-model="ingredient.name" :options="ingredientsUnique"></multiselect>
                    <label for="name">Quantity</label>
                    <input type="number" name="quantity" v-model="ingredient.quantity" v-validate="'required|min_value:1'">
                    <button @click.stop.prevent="removeIngredient(index)">Remove</button>
                    <span v-show="errors.has('quantity')" class="input-error-msg">
                        {{ errors.first('quantity') }}
                    </span>
                </div>
                <button @click.stop.prevent="addIngredient"> Add Ingredient </button>
            </div>

            <div class="input-container">
                <label for="name">Prep Time</label>
                <vue-timepicker v-model="preparationTime" format="HH:mm"></vue-timepicker>
            </div>

            <div class="input-container">
                <label for="name">Instructions</label>
                <textarea name="instructions" v-model="instructions" v-validate="'required|min:6|max:128'" data-vv-as="instructions">

                </textarea>
                <span v-show="errors.has('instructions')" class="input-error-msg">
                        {{ errors.first('instructions') }}
                </span>
            </div>

            <button class="button button-success" @click.prevent="submit" @keyup.enter="submit">Submit</button>

        </form>
    </div>
</template>

<script>
import recipesAPI from '../../api/recipe'
import Multiselect from 'vue-multiselect'
import VueTimepicker from 'vue2-timepicker'
import { getCookie } from 'tiny-cookie'
import utils from '../../modules/utils.js'

export default {

    components: {
        Multiselect,
        VueTimepicker
    },

    data() {
        return {
            formError: null,
            name: '',
            source: '',
            ingredients: [
                {
                    name: 'FLOUR',
                    quantity: 1
                }
            ],
            ingredientValues: [],
            instructions: '',
            preparationTime: {
                HH: "00",
                mm: "00"
            },
            ingredientOptions: ['FLOUR', 'MILK', 'OIL', 'SALT', 'SUGAR',
                                'EGGS', 'TOMATOES', 'PEPPERS', 'CHEESE',
                                'POTATOES', 'MEAT']
        }
    },

    methods: {

        submit() {
            this.$validator.validateAll().then((result) => {
                if (!result) {
                    this.formError = "VALIDATION ERROR"
                } else {
                    this.create()
                }
            })
        },

        create() {
            recipesAPI.create({
                data: {
                    name: this.name,
                    source: this.source,
                    ingredients: this.ingredients,
                    instructions: this.instructions,
                    preparation: this.formatPrepTime
                },
                success: (response) => {
                    this.formError = null

                    this.$router.push({name: 'home'})
                },
                fail: (err) => {
                    for (var errorKey in err.errors) {
                        if (err.errors.hasOwnProperty(errorKey)) {
                            this.formError = err.errors
                            break
                        }
                    }
                }
            })
        },

        addIngredient() {
            this.ingredients.push({
                name: 'FLOUR',
                quantity: 1
                })
        },

        removeIngredient(index) {
            this.ingredients.splice(index, 1)
        }
    },

    computed: {
        formatPrepTime: function() {
            return this.preparationTime.HH + ":" + this.preparationTime.mm
        },

        ingredientsUnique: function() {
            var tempArr = []
            this.ingredients.forEach(function (item) {
                tempArr.push(item.name)
            })
            return utils.arr_diff(tempArr, this.ingredientOptions)
        }
    }
}
</script>