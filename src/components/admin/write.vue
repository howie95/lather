<template>
    <main>
        <div class="maintitle write">
            <div class="maintitleh1">
                <h1>撰写博文</h1>
            </div>
        </div>
        <div class="upload">
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
        <main-footer></main-footer>
    </main>
</template>
<script>
import mainFooter from './../footer'
export default {
    name:'wretePost',
    data(){
        return{
            title:'',
            date:'',
            tag:"未分类",
            content:'',
            brief:'',
            msg:'',
            newTag:false,
            newTagtext:"添加新分类",
            tags:[],
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
            this.$http.post('/api/savePost',obj).then(
                response => {
                this.msg = "保存成功！"
                },
                response => {
                this.msg = "保存失败！"
                console.log(response)
                }
            )
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
        this.getTime()
        this.getTags()
    },
    components:{
        mainFooter
    },
}
</script>
<style src='mavon-editor/dist/css/index.css'>
</style>
