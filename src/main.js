// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import Meta from 'vue-meta'
import ElementUI from 'element-ui'
import VueSimplemde from 'vue-simplemde'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'simplemde/dist/simplemde.min.css'
import '../static/icon/iconfont.css'
import { getCookie } from './utils/cookie'

Vue.use(Meta)
Vue.use(ElementUI)
Vue.use(VueSimplemde)
// Vue.use(hljs)
Vue.http = axios

// set axios defaults
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('session_token')}`

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
