import Vue from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css';
import router from "./router"
import store from './store'
import axios from 'axios'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueFormulate from '@braid/vue-formulate'
import './assets/css/formulate.css'
import i18n from '@/plugins/i18n'
import messages from '@/plugins/i18n'
import FlagIcon from 'vue-flag-icon'
import JwPagination from 'jw-vue-pagination'

Vue.use(FlagIcon)
Vue.use(VueFormulate)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.component('jw-pagination', JwPagination)

Vue.config.productionTip = false
Vue.prototype.$http = axios

window.axios = axios
axios.defaults.baseURL = 'http://localhost:8000'

new Vue({
  i18n,
  messages,
  render: h => h(App),
  router,
  axios,
  store
}).$mount('#app')
