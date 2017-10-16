import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import App from './App'

import list from './components/list'
import detail from './components/detail'
import date from './components/date'
import write from './components/admin/write'

Vue.use(Router)
Vue.prototype.$http = Axios

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/blog/', component: list},
    {path: '/blog/post/:id', component: detail},
    {path: '/blog/date/', component: date},
    {path: '/admin/new', component: write}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
