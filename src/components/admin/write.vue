<template>
    <main>
        <div class="maintitle write">
            <div class="maintitleh1">
                <h1 v-if="!isPage">撰写博文</h1>
                <h1 v-if="isPage">撰写单页</h1>
            </div>
        </div>
        <div class="upload" v-if="!isPage">
            <form>
                <h3>文章标题:</h3>
                <input class="titleinput" type="text" name="title" v-model="title">
                <h3>录入日期:</h3>
                <input class="dateinput" type="datetime-local" name="date" v-model="date"><input class="button1" type="button" value="获取当前时间" @click="this.getTime">
                <h3>博文分类:</h3>
                <select class="taginput" name="tag" v-model="tag" v-if="!newTag">
                    <option v-for="item in tags" :key="item._id" :value="item.tag">{{item.tag}}</option>
                </select>
                <input class="taginput" type="text" name="newtag" v-model="tag" v-if="newTag">
                <input class="button1" type="button" :value="newTagtext" @click="this.newTags">
                <h3>文章内容:</h3>
                <mavon-editor :subfield="false" v-model="content"/>
                <h3>简介:</h3>
                <textarea class="briefinput" name="brief" v-model="brief"></textarea>
            </form>
            <button class="savebutton" @click="savePost">保存</button>
            <h3>{{msg}}</h3>
        </div>
        <div class="upload" v-if="isPage">
            <form>
                <h3>单页标题:</h3>
                <input class="titleinput" type="text" name="title" v-model="title">
                <h3>单页内容:</h3>
                <mavon-editor :subfield="false" v-model="content"/>
                <h3>单页地址:</h3>
                <span class="linkspan">https://博客的地址/</span><input class="linkinput" type="text" name="link" v-model="link">
            </form>
            <button class="savebutton" @click="savePage">保存</button>
            <h3>{{msg}}</h3>
        </div>
        <main-footer></main-footer>
    </main>
</template>
<script>
import le from './../loginevent'
import mainFooter from './../footer'
import { mavonEditor } from 'mavon-editor'
export default {
    name:'wretePost',
    data(){
        return{
            dbid:'',
            title:'',
            date:'',
            tag:"未分类",
            content:'',
            brief:'',
            msg:'',
            newTag:false,
            newTagtext:"添加新分类",
            tags:[],
            isPage:false,
            link:'',
        }
    },
    methods:{
        newTags:function(){
            this.newTag = !this.newTag
            if(this.newTag==true){
                this.newTagtext = "使用已有分类"
            }else{this.newTagtext = "添加新分类"}
        },
        savePost:function(){
            let obj = {
                title: this.title,
                year:this.date.substring(0,4),
                month:this.date.substring(5,7),
                day:this.date.substring(8,10),
                time:this.date.substring(11,16),
                tag: this.tag,
                content: this.content,
                brief: this.brief,
            }
            if(this.$route.params.id){
                obj._id = this.dbid
                this.$http.post('/api/editPost',obj).then(
                    response => {
                    this.msg = "保存成功！"
                    },
                    response => {
                    this.msg = "保存失败！"
                    }
                )
            }else{
                this.$http.post('/api/savePost',obj).then(
                    response => {
                    this.msg = "保存成功！"
                    },
                    response => {
                    this.msg = "保存失败！"
                    }
                )
            }
        },
        savePage:function(){
            let obj = {
                title: this.title,
                content: this.content,
                link:this.link,
            }
            if(this.$route.params.pageid){
                obj._id = this.dbid
                this.$http.post('/api/savePage',obj).then(
                    response => {
                    this.msg = "保存成功！"
                    },
                    response => {
                    this.msg = "保存失败！"
                    }
                )
            }else{
                this.$http.post('/api/savePage',obj).then(
                    response => {
                    this.msg = "保存成功！"
                    },
                    response => {
                    this.msg = "保存失败！"
                    }
                )
            }
        },
        getTime:function(){
            let now = this.$format(new Date(),'YYYY-MM-DDTHH:mm')
            this.date = now
        },
        getTags:function(){
            this.$http.get('/api/getTags').then(
            response => this.tags = response.data,
            response => console.error(response)
            )
        }
    },
    mounted(){
        this.getTags()
        if(this.$route.params.id){
            let param = {postId:this.$route.params.id}
            this.$http.get('/api/getPosts',{params:param}).then(
            response => {
                let time = response.data[0].year + ',' + response.data[0].month + ',' + response.data[0].day + ',' + response.data[0].time
                this.title = response.data[0].title
                this.date = this.$format(time,'YYYY-MM-DDTHH:mm')
                this.tag = response.data[0].tag
                this.content = response.data[0].content
                this.brief = response.data[0].brief
                this.dbid = response.data[0]._id
            },
            response => console.error("服务器异常")
            )
            le.$emit('loadend')
            return
        }
        if(this.$route.params.pageid){
            this.isPage = true
            let param = {pageid:this.$route.params.pageid}
            this.$http.get('/api/getPages',{params:param}).then(
            response => {
                this.title = response.data[0].title
                this.content = response.data[0].content
                this.dbid = response.data[0]._id
                this.link = response.data[0].link
            },
            response => console.error("服务器异常")
            )
            le.$emit('loadend')
            return
        }
        if(this.$route.path.indexOf('newpage')!==-1){
            this.isPage = true
        }
        this.getTime()
        le.$emit('loadend')
    },
    components:{
        mainFooter,
        mavonEditor
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0)
        }
    },
}
</script>
<style src='mavon-editor/dist/css/index.css'>
</style>
