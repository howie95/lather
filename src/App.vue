<template>
    <div id="app">
        <main-header :welcome="welcome" v-if="!index" @navcheck="navcheck"></main-header>
        <transition name="routerv">
        <router-view :welcome="welcome" @routerchange="smoothTop"></router-view>
        </transition>
        <transition name="login">
        <login></login>
        </transition>
    </div>
</template>

<script>
import le from './components/loginevent'
import login from './components/login'
import mainHeader from './components/header'
export default {
    name: 'app',
    data () {
        return {
            index:false,
            welcome:false,
        }
    },
    components:{
        login,
        mainHeader
    },
    methods:{
        onScroll:function(){
            this.welcome=false
            this.$router.push({ name: 'page', params: { page:1 }})
            if(document.addEventListener){  
            document.removeEventListener('DOMMouseScroll',this.onScroll) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=null//Other
            setTimeout(()=>{this.toTop()}, 500)
        },
        toTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        smoothTop(){
            let distance = document.documentElement.scrollTop || document.body.scrollTop
            let step = distance / 50
            function scrollUp(){
                if (distance > 0){
                    distance -= step
                    document.body.scrollTop = distance
                    document.documentElement.scrollTop = distance
                    setTimeout(scrollUp, 10)
                } else {
                    return
                }
            }
            scrollUp()
        },
        navcheck(e){
            this.welcome=false
            if(e=='tag'){this.$router.push('/blog/tags/')}
            if(e=='date'){this.$router.push('/blog/date/')}
            if(e=='scroll'){this.onScroll()
            return}
            if(document.addEventListener){  
            document.removeEventListener('DOMMouseScroll',this.onScroll) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=null//Other
        },
    },
    mounted(){
        this.$nextTick(function () {
        if(this.$route.fullPath=="/blog"||this.$route.fullPath=="/blog/"){
            this.welcome=true
            if(document.addEventListener){  
            document.addEventListener('DOMMouseScroll',this.onScroll) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=this.onScroll//Other
        }
        if(this.$route.fullPath=="/"||this.$route.fullPath==""){
            this.index=true
        }
        if (document.cookie.match("admin")){
            le.$emit('islogin')
        }
        })
    }
}
</script>
<style src="./assets/main.css">
</style>
