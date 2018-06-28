<template>
  <form id="loginForm" class="centered">
    <div class="message info" v-if="!formError && !authError && this.$route.query.redirect">
      Please log in to continue.
    </div>

    <div class="message error" v-if="formError">
      <li v-for="error in formError" :key="error[0]['key']">
          {{ error[0]['key'] }}
      </li>
    </div>

    <div class="auth error" v-if="authError">
        {{ authError }}
    </div>

    <div class="input-container">
      <input type="text" class="input full-width" v-model="username" name="username" :disabled="formDisable" placeholder="Username" v-validate="'required'" data-vv-as="username" :class="{'input-error': errors.has('username')}">
      <span v-show="errors.has('username')" class="input-error-msg">
        {{ errors.first('username') }}
      </span>
    </div>

    <div class="input-container">
      <input type="password" class="input full-width" v-model="password" name="password" :disabled="formDisable" placeholder="Password" v-validate="'required'" data-vv-as="password" :class="{'input-error': errors.has('password')}">
      <span v-show="errors.has('password')" class="input-error-msg">
        {{ errors.first('password') }}
      </span>
    </div>

    <button class="button button-success full-width" @click.prevent="submit" @keyup.enter="submit" :disabled="formDisable">{{ formDisable ? 'Please Wait' : 'Log In' }}</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import auth from '@/api/auth.js'

  export default {
    data () {
      return {
        username: null,
        password: null,
        formError: null,
        authError: null,
        formDisable: false
      }
    },
    methods: {
      ...mapActions({
      }),
      submit () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            this.formError = null
          } else {
            // Disable form while HTTP request being made
            this.formDisable = true

            auth.login({
              data: {
                username: this.username,
                password: this.password
              },
              loginSuccess: msg => {
                // Pre-load user-related data
                this.setup()
                

                // Move to the front page
                this.dealWithSuccess(msg)
              },
              loginFailed: err => {
                this.dealWithError(err)
              }
            })
          }
        })
      },
      async setup () {
        // Add anything that needs preloading here
        
      },
      dealWithSuccess (msg) {
        this.formError = null

        if (this.$route.query.redirect) {
          this.$router.push({ path: this.$route.query.redirect })
        } else {
          this.$router.push({ name: '/' })
        }
      },
      dealWithError (err) {
        this.formDisable = false

        // Get first error key to display main error msg
        for (var errorKey in err.errors) {
          if (err.errors.hasOwnProperty(errorKey)) {
            this.formError = err.errors
            this.authError = null
            break
          }
        }

        if (typeof err.errors === 'string') {
            this.authError = err.errors
            this.formError = null
        }

        // Inject errors into form fields
        for (let inputName in err.fields) {
          if (err.fields.hasOwnProperty(inputName)) {
            let inputErrors = err.fields[inputName]

            for (let errorKey in inputErrors) {
              if (inputErrors.hasOwnProperty(errorKey)) {
                this.$validator.errors.add(inputName, err.errors[errorKey], null, { x: inputErrors[errorKey] })
              }
            }
          }
        }
      }
    }
  }
</script>
