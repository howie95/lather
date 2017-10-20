import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import Format from 'date-fns/format'
import zhcn from 'date-fns/locale/zh_cn'
import mavonEditor from 'mavon-editor'
import App from './App'
//import ti from'./components/typingit'

//import index from './components/index'
import posts from './components/posts'
import list from './components/list'
import detail from './components/detail'
import date from './components/date'
import tags from './components/tags'
import write from './components/admin/write'
import adminlist from './components/admin/list'

//Vue.use(ti)
Vue.use(Router)
Vue.use(mavonEditor)
Vue.prototype.$http = Axios
Vue.prototype.$format = Format
Vue.prototype.$zhcn = zhcn

const router = new Router({
  mode: 'history',
  routes: [
    //{path: '/', component: index},
    {path: '/blog/', component: posts},
    {path: '/blog/page/:page',name:'page', component: posts},
    {path: '/blog/post/:id', component: detail},
    {path: '/blog/date/', component: date},
    {path: '/blog/date/:year', component: list},
    {path: '/blog/date/:year/:month', component: list},
    {path: '/blog/tags/', component: tags},
    {path: '/blog/tags/:tag', component: list},
    {path: '/blog/admin/new', component: write},
    {path: '/blog/admin/edit/:id', component: write},
    {path: '/blog/admin/list', component: adminlist}
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
