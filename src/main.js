import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VeeValidate)
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
