<template>
    <div id="app">
        <main-header :welcome="welcome" v-if="!index" @navcheck="navcheck"></main-header>
        <transition :name="routerv">
        <router-view :welcome="welcome" @routerchange="smoothTop"></router-view>
        </transition>
        <transition name="login">
        <login></login>
        </transition>
        <transition name="login">
        <span @click="smoothTop" class="totop" v-if="!istop">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve">
                <g>
                    <g>
                        <path style="fill:#9198a5;" d="M53,4.783v44.435C53,51.306,51.306,53,49.217,53H4.783C2.694,53,1,51.306,1,49.217V4.783
                            C1,2.694,2.694,1,4.783,1h44.435C51.306,1,53,2.694,53,4.783z"/>
                        <path style="fill:#9198a5;" d="M49.217,54H4.783C2.146,54,0,51.854,0,49.217V4.782C0,2.146,2.146,0,4.783,0h44.435
                            C51.854,0,54,2.146,54,4.783v44.435C54,51.854,51.854,54,49.217,54z M4.783,2C3.249,2,2,3.248,2,4.782v44.435
                            C2,50.751,3.249,52,4.783,52h44.435C50.751,52,52,50.752,52,49.218V4.783C52,3.249,50.751,2,49.217,2H4.783z"/>
                    </g>
                    <g>
                        <path style="fill:#FFFFFF;" d="M27.841,14.456l12.175,21.087C40.389,36.191,39.922,37,39.175,37H14.825
                            c-0.747,0-1.215-0.809-0.841-1.456l12.175-21.087C26.533,13.809,27.467,13.809,27.841,14.456z"/>
                        <path style="fill:#FFFFFF;" d="M39.175,38h-24.35c-0.712,0-1.351-0.368-1.707-0.985c-0.356-0.617-0.356-1.354,0-1.971
                            l12.174-21.088c0.356-0.617,0.995-0.985,1.707-0.985s1.351,0.368,1.707,0.985l12.175,21.088c0.356,0.616,0.356,1.354,0,1.971
                            C40.525,37.632,39.887,38,39.175,38z M39.175,36v1l0.001-1L26.975,14.956L14.851,36.044L39.175,36z"/>
                    </g>
                </g>
            </svg>
        </span>
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
            routerv:'routerright',
            istop:true,
            index:false,
            welcome:false,
        }
    },
    components:{
        login,
        mainHeader
    },
    methods:{
        isTop(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 200){
                this.istop=false
            }else{
                this.istop=true
            }
        },
        onScroll(){
            this.welcome=false
            this.$router.push({ name: 'page', params: { page:1 }})
            if(document.addEventListener){  
            document.removeEventListener('DOMMouseScroll',this.onScroll)
            document.addEventListener('DOMMouseScroll',this.isTop) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=this.isTop//Other
            setTimeout(()=>{this.toTop()}, 500)
        },
        toTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        smoothTop(){
            this.istop = true
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
            document.addEventListener('DOMMouseScroll',this.isTop)
            }//Firefox 
            window.onmousewheel=document.onmousewheel=this.isTop//Other
        },
    },
    mounted(){
        this.$nextTick(function () {
        if(this.$route.fullPath=="/blog"||this.$route.fullPath=="/blog/"){
            this.welcome=true
            if(document.addEventListener){  
            document.addEventListener('DOMMouseScroll',this.onScroll) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=this.onScroll
        }else{
            if(document.addEventListener){  
            document.addEventListener('DOMMouseScroll',this.isTop) 
            }//Firefox 
            window.onmousewheel=document.onmousewheel=this.isTop
        }
        if(this.$route.fullPath=="/"||this.$route.fullPath==""){
            this.index=true
        }
        if (document.cookie.match("admin")){
            this.$http.post('/api/checkLog').then(
                response => {
                    let res = response.data
                    if(res.status=="0"){
                        le.$emit('islogin')
                    }else if(res.status=="2"){
                        le.$emit('islogout')
                    }
                },
                response => {le.$emit('islogout')}
            )
        }
        })
    },
    watch: {
        '$route' (to, from) {
            this.toTop()
            let toname = to.path
            let fromname = from.path
            if(toname.indexOf('page')!==-1){toname=1}
            else if(toname.indexOf('tag')!==-1){toname=2}
            else if(toname.indexOf('date')!==-1){toname=3}
            else if(toname.indexOf('admin')!==-1){toname=4}
            if(fromname.indexOf('page')!==-1){fromname=1}
            else if(fromname.indexOf('tag')!==-1){fromname=2}
            else if(fromname.indexOf('date')!==-1){fromname=3}
            else if(fromname.indexOf('admin')!==-1){fromname=4}
            this.routerv = toname < fromname ? 'routerleft' : 'routerright'
            le.$emit('loading')
        }
    },
}
</script>
<style src="./assets/main.css">
</style>
