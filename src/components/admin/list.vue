<template>
    <main>
        <div class="maintitle admin">
            <div class="maintitleh1">
                <h1 v-if="!isPage">文章管理</h1>
                <h1 v-if="isPage">单页管理</h1>
            </div>
        </div>
        <div class="admincontent">
            <h2 v-if="!isPage">文章列表</h2>
            <h2 v-if="isPage">单页列表</h2>
            <ul>
                <li v-for="item in list" :key="item._id">
                    <h3>{{item.title}}</h3>
                    <span v-if="!isPage" class="tag">{{item.tag}}</span>
                    <span v-if="!isPage">{{item.year}}年</span>
                    <span v-if="!isPage">{{item.month}}月</span>
                    <span v-if="!isPage">{{item.day}}日</span>
                    <span v-if="!isPage">{{item.time}}</span>
                    <div>
                        <a @click="editIt(item.id)">编辑</a>
                        <a @click="deleteIt(item.id)">删除</a>
                    </div>
                </li>
            </ul>
        </div>
        <main-footer></main-footer>
    </main>
</template>
<script>
import le from './../loginevent'
import mainFooter from './../footer'
export default {
    data(){
        return{
            page:1,
            pieces:20,
            list:[],
            start:true,
            end:false,
            isPage:false,
        }
    },
    components:{
        mainFooter
    },
    methods:{
        editIt:function(id){
            if(this.$route.path.indexOf('pagelist')!==-1){
                this.$router.push('/blog/admin/edit/page/' + id)
            }else{
                this.$router.push('/blog/admin/edit/' + id)
            }
        },
        deleteIt:function(id){
            if(this.$route.path.indexOf('pagelist')!==-1){
                this.$http.post('/api/delPage',{id:id}).then(
                    response => {
                    console.log("成功")
                    },
                    response => {
                    console.log("失败")
                    }
                )
            }else{
                this.$http.post('/api/delPost',{id:id}).then(
                    response => {
                    console.log("成功")
                    },
                    response => {
                    console.log("失败")
                    }
                )
            }
        },
        getList:function(){
            let param = {
                page:this.page,
                pieces:this.pieces
            }
            this.$http.get('/api/getPostslist',{params:param}).then(
            response => {this.list = response.data
                if(response.data.length==20){this.end = false}
                if(response.data.length<20){this.end = true}
                for (let item in this.list){
                    this.list[item].time = this.$format("1111-11-11T"+this.list[item].time,'Ahh:mm',{locale: this.$zhcn})
                    this.list[item].id = this.list[item].postid
                }
                },
            response => console.error("服务器异常")
            )
            le.$emit('loadend')
        }
    },
    mounted(){
        if(this.$route.path.indexOf('pagelist')!==-1){
            this.isPage = true
            this.$http.get('/api/getPageslist').then(
                response => {
                    this.list = response.data
                    for (let item in this.list){
                        this.list[item].id = this.list[item].spageid
                    }
                },
                response => console.error("服务器异常")
            )
            le.$emit('loadend')
            return
        }
        if(this.$route.params.page){this.page=parseInt(this.$route.params.page)}
        this.start = (this.page==1)?true:false
        this.end = (this.list.length==20)?false:true
        this.getList()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0)
        }
    },
}
</script>

