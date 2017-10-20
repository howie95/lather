<template>
    <main>
        <div class="maintitle admin">
            <div class="maintitleh1">
                <h1>文章管理</h1>
            </div>
        </div>
        <div class="admincontent">
            <h2>文章列表</h2>
            <ul>
                <li v-for="item in list" :key="item._id">
                    <h3>{{item.title}}</h3>
                    <span class="tag">{{item.tag}}</span>
                    <span>{{item.year}}年</span>
                    <span>{{item.month}}月</span>
                    <span>{{item.day}}日</span>
                    <span>{{item.time}}</span>
                    <div>
                        <a @click="editIt(item.postid)">编辑</a>
                        <a @click="deleteIt(item.postid)">删除</a>
                    </div>
                </li>
            </ul>
        </div>
        <main-footer></main-footer>
    </main>
</template>
<script>
import mainFooter from './../footer'
export default {
    data(){
        return{
            page:1,
            pieces:20,
            list:[],
            start:true,
            end:false,
        }
    },
    components:{
        mainFooter
    },
    methods:{
        editIt:function(postid){
            this.$router.push('/blog/admin/edit/' + postid)
        },
        deleteIt:function(postid){
            
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
                }
                },
            response => console.error("服务器异常")
            )
        }
    },
    mounted(){
        if(this.$route.params.page){this.page=parseInt(this.$route.params.page)}
        this.start = (this.page==1)?true:false
        this.end = (this.list.length==20)?false:true
        this.getList()
    }
}
</script>

