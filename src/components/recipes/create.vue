<template>
    <div class="container">
        <h1> Create A New Recipe </h1>

        <div class="message error" v-if="formError">
            <li v-for="error in formError" :key="error[0]['key']">
                {{ error[0]['key'] }}
            </li>
        </div>

        <form id="create_recipe_form">
            <div class="input-container">
                <input type="text" placeholder="Name" class="input full-width" name="name" v-model="name" v-validate="'required|min:2'" data-vv-as="name">
                <span v-show="errors.has('name')" class="input-error-msg">
                    {{ errors.first('name') }}
                </span>
            </div>

            <div class="input-container">
                <input type="text" placeholder="Source" class="input full-width" name="source" v-model="source" v-validate="'url'" data-vv-as="source">
                <span v-show="errors.has('source')" class="input-error-msg">
                    {{ errors.first('source') }}
                </span>
            </div>

            <div class="input-container">
                <div v-for="(ingredient, index) in ingredients" :key="index">
                    <label name="ingredients">Ingredients</label>
                    <multiselect class="ingredient" v-validate="'required'" data-vv-as="ingredient" name="ingredient" v-model="ingredient.name" :options="ingredientsUnique"></multiselect>
                    <span v-show="errors.has('ingredient')" class="input-error-msg">
                        {{ errors.first('ingredient') }}
                     </span>
                    <input type="number" placeholder="Quantity" class="input ingredient" name="quantity" v-model="ingredient.quantity" v-validate="'required|min_value:1'">
                    <img class="icon ingredient-delete-ico" src="../../assets/images/x-button.svg" @click.stop.prevent="removeIngredient(index)" />
                    <span v-show="errors.has('quantity')" class="input-error-msg">
                        {{ errors.first('quantity') }}
                    </span>
                </div>
                <img class="icon add-ingredient-ico" src="../../assets/images/plus.svg" @click.stop.prevent="addIngredient" />
            </div>

            <div class="input-container">
                <label for="name">Prep Time</label>
                <vue-timepicker v-model="preparationTime" format="HH:mm"></vue-timepicker>
            </div>

            <div class="input-container">
                <textarea placeholder="Instructions here..." class="textarea full-width" name="instructions" v-model="instructions" v-validate="'required|min:6|max:1024'" data-vv-as="instructions">

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
                    name: '',
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
                    this.$toast.open('Recipe created!')

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
                name: '',
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

<style lang="scss">
    .ingredient {
        width: 90%;
    }

    .input .ingredient {
        display: inline-block;
    }

    .ingredient-delete-ico {
        margin-left: 20px;
    }

    .add-ingredient-ico {
        margin: 10px;
        width: 40px;
        height: 40px;
    }
</style>
