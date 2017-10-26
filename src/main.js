import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
//DATE-FNS
import Format from 'date-fns/format'
import zhcn from 'date-fns/locale/zh_cn'
//markdown
import mavonEditor from 'mavon-editor'
import markdown from 'markdown-it'
import hljs from 'highlight.js'
//
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
Vue.prototype.$md = new markdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><span class="hltitle">'+ lang +'</span><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + Vue.prototype.$md.utils.escapeHtml(str) + '</code></pre>';
  }
})

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
    {path: '/blog/admin/newpost', component: write ,meta: { requiresAuth: true }},
    {path: '/blog/admin/newpage', component: write ,meta: { requiresAuth: true }},
    {path: '/blog/admin/edit/:id', component: write ,meta: { requiresAuth: true }},
    {path: '/blog/admin/edit/page/:pageid', component: write ,meta: { requiresAuth: true }},
    {path: '/blog/admin/postlist', component: adminlist ,meta: { requiresAuth: true }},
    {path: '/blog/admin/postlist/:page', component: adminlist ,meta: { requiresAuth: true }},
    {path: '/blog/admin/pagelist', component: adminlist ,meta: { requiresAuth: true }},
    {path: '/blog/:pagelink', component: detail},
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    Axios.post('/api/checkLog').then(
      response => {
          let res = response.data
          if(res.status=="0"){
            next()
          }else if(res.status=="2"){
            next({
              path: '/blog/page/1',
            })
          }
      },
      response => {
        next({
          path: '/blog/page/1',
        })
      }
    )
  }else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
