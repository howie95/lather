<template>
    <main>
        <article v-for="(item,index) in posts" :key="item._id">
            <div class="titleline">
                <h2>{{item.title}}</h2>
                <div class="column">
                    <ul>
                        <li>{{item.tag}}</li>
                    </ul>
                    <span>{{item.year}}</span>
                    <span>{{item.month}}</span>
                    <span>{{item.day}}</span>
                </div>
            </div>
            <div class="content">
                <p>{{item.brief}}</p>
            </div>
            <div class="showmore">
                <span @click="more(index)" v-if="item.nobrief=='collapse'">阅读全文</span>
                <span @click="more(index)" v-if="item.nobrief=='extend'">收起</span>
                <span v-if="item.nobrief == 'true'">- 以上是全部内容 -</span>
            </div>
        </article>
        <div>
            <router-link :to="{ name: 'page', params: { page: page-1 }}" v-if="!start">前一页</router-link>
            <router-link :to="{ name: 'page', params: { page: page+1 }}" v-if="!end">后一页</router-link>
        </div>
    </main>
</template>
<script>
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
                if(this.posts[item].brief == this.posts[item].content ||this.posts[item].brief==""){
                    this.posts[item].brief = this.posts[item].content
                    this.posts[item].nobrief = "true"
                }else{this.posts[item].nobrief = "collapse"}
            }
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
            }
        }
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
    }
}
</script>

