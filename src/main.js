import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Format from 'date-fns/format'
import App from './App'

import posts from './components/posts'
import list from './components/list'
import detail from './components/detail'
import date from './components/date'
import tags from './components/tags'
import write from './components/admin/write'

Vue.use(Router)
Vue.prototype.$http = Axios
Vue.prototype.$format = Format

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/blog/', component: posts},
    {path: '/blog/:page',name:'page', component: posts},
    {path: '/blog/post/:id', component: detail},
    {path: '/blog/date/', component: date},
    {path: '/blog/date/:year', component: list},
    {path: '/blog/date/:year/:month', component: list},
    {path: '/blog/tags/', component: tags},
    {path: '/blog/tags/:tag', component: list},
    {path: '/blog/admin/new', component: write}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
