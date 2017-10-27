<template>
    <div>
        <transition name="posts">
        <main v-if="!welcome">
            <div class="maintitle posts">
                <div class="maintitleh1">
                    <h1>全部博文</h1>
                    <span>第 {{this.$route.params.page}} 页</span>
                </div>
            </div>
            <div class="maincontent">
                <article v-for="(item,index) in posts" :key="item._id">
                    <div class="titleline">
                        <h2>{{item.title}}</h2>
                        <div class="column">
                            <span>{{item.tag}}</span>
                            <span>{{item.year}}年</span>
                            <span>{{item.month}}月</span>
                            <span>{{item.day}}日</span>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div class="content" v-html="item.brief">
                    </div>
                    <div class="showmore">
                        <span class="showmoreb" @click="more(index)" v-if="item.nobrief=='collapse'">阅读全文&or;</span>
                        <span class="showmoreb" @click="more(index)" v-if="item.nobrief=='extend'">收起&and;</span>
                        <span v-if="item.nobrief == 'true'">- 以上是全部内容 -</span>
                    </div>
                </article>
                <div class="flicker">
                    <router-link class="flickbefore" :to="{ name: 'page', params: { page: page-1 }}" v-if="!start">前一页</router-link>
                    <router-link class="flicknext" :to="{ name: 'page', params: { page: page+1 }}" v-if="!end">后一页</router-link>
                </div>
            </div>
            <main-footer></main-footer>
        </main>
        </transition>
        <div></div>
    </div>
</template>
<script>
import le from './loginevent'
import mainFooter from './footer'
export default {
    name:'blog',
    data(){
        return{
            posts:[],
            page:1,
            pieces:6,
            start:true,
            end:false,
        }
    },
    props: ['welcome'],
    methods:{
        getPosts(){
            let param = {
                page:this.page,
                pieces:this.pieces,
                id:""
            }
            this.$http.get('/api/getPosts',{params:param}).then(
            response => {this.posts = response.data
            if(response.data.length==6){this.end = false}
            if(response.data.length<6){this.end = true}
            for (let item in this.posts){
                this.posts[item].brief = this.$md.render(this.posts[item].brief)
                this.posts[item].content = this.$md.render(this.posts[item].content)
                this.posts[item].time = this.$format("1111-11-11T"+this.posts[item].time,'Ahh:mm',{locale: this.$zhcn})
                if(this.posts[item].brief==""){
                    this.posts[item].brief = this.posts[item].content
                    this.posts[item].nobrief = "true"
                }else{this.posts[item].nobrief = "collapse"}
            }
            setTimeout(()=>{le.$emit('loadend')},1000)
            },
            response => console.error(response)
            )
        },
        switchPage(e){
            this.start = (e==1)?true:false
            this.end = (this.posts.length==6)?false:true
            this.page = e
            this.getPosts()
        },
        more(e){
            if(this.posts[e].nobrief == "collapse"){
                this.posts[e].briefcopy = this.posts[e].brief
                this.posts[e].brief = this.posts[e].content
                this.posts[e].nobrief = "extend"
            }else{
                this.posts[e].brief = this.posts[e].briefcopy
                this.posts[e].nobrief = "collapse"
                this.hideMore(e)
            }
        },
        hideMore(e){
            let target = document.getElementsByTagName('article')[e]
            document.body.scrollTop = target.offsetTop + 200
            document.documentElement.scrollTop = target.offsetTop + 200
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
    },
    mounted(){
        if(this.$route.params.page){this.page=parseInt(this.$route.params.page)}
        this.start = (this.page==1)?true:false
        this.end = (this.posts.length==6)?false:true
        this.getPosts()
    },
    watch: {
        '$route' (to, from) {
            this.switchPage(to.params.page)
        }
    },
    components:{
        mainFooter
    },
}
</script>
<style src="./../assets/highlight.css">
</style>
