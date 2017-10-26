import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
//DATE-FNS
import Format from 'date-fns/format'
import zhcn from 'date-fns/locale/zh_cn'
//markdown
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
    {
      path: '/', 
      component: function(resolve){
        require(['./components/index'],resolve)
      }
    },
    {
      path: '/blog/', 
      component: function(resolve){
        require(['./components/posts'],resolve)
      }
    },
    {
      path: '/blog/page/:page',name:'page', 
      component: function(resolve){
        require(['./components/posts'],resolve)
      }
    },
    {
      path: '/blog/post/:id', 
      component: function(resolve){
        require(['./components/detail'],resolve)
      }
    },
    {
      path: '/blog/date/', 
      component: function(resolve){
        require(['./components/date'],resolve)
      }
    },
    {
      path: '/blog/date/:year', 
      component: function(resolve){
        require(['./components/list'],resolve)
      }
    },
    {
      path: '/blog/date/:year/:month', 
      component: function(resolve){
        require(['./components/list'],resolve)
      }
    },
    {
      path: '/blog/tags/', 
      component: function(resolve){
        require(['./components/tags'],resolve)
      }
    },
    {
      path: '/blog/tags/:tag', 
      component: function(resolve){
        require(['./components/list'],resolve)
      }
    },
    {
      path: '/blog/admin/newpost', 
      component: function(resolve){
        require(['./components/admin/write'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/newpage', 
      component: function(resolve){
        require(['./components/admin/write'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/edit/:id', 
      component: function(resolve){
        require(['./components/admin/write'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/edit/page/:pageid', 
      component: function(resolve){
        require(['./components/admin/write'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/postlist', 
      component: function(resolve){
        require(['./components/admin/list'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/postlist/:page', 
      component: function(resolve){
        require(['./components/admin/list'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/admin/pagelist', 
      component: function(resolve){
        require(['./components/admin/list'],resolve)
      } ,
      meta: { requiresAuth: true }},
    {
      path: '/blog/:pagelink', 
      component: function(resolve){
        require(['./components/detail'],resolve)
      }
    },
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
