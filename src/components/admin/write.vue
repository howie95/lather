<template>
    <main>
        <div class="upload">
            <form>
                <h3>标题:</h3>
                <input type="text" name="title" v-model="title"><br>
                <h3>日期:</h3>
                <input type="datetime-local" name="date" v-model="date"><input type="button" value="获取当前时间" @click="this.getTime"><br>
                <h3>分类:</h3>
                <select name="tag" v-model="tag" v-if="!newTag">
                    <option v-for="item in tags" :key="item._id" :value="item.tag">{{item.tag}}</option>
                </select>
                <input type="text" name="newtag" v-model="tag" v-if="newTag">
                <input type="button" :value="newTagtext" @click="this.newTags"><br>
                <h3>内容:</h3>
                <input type="text" name="content" v-model="content"><br>
                <h3>简介:</h3>
                <input type="text" name="brief" v-model="brief"><br>
            </form>
            <button @click="savePost">保存</button>
            <h3>{{msg}}</h3>
        </div>
    </main>
</template>
<script>
export default {
    name:'wretePost',
    data(){
        return{
            title:'',
            date:'',
            tag:'',
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
                date: this.date,
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
            //待办 MOMENT.JS
            let now = new Date()
            function zero(obj){
                if(obj<10) return "0"+obj
                else return obj
            }
            let month = now.getMonth() + 1
            let day = now.getDate()
            this.date = now.getFullYear() + "-" + zero(month) + "-" + zero(day) + "T" + now.getHours() + ":" + now.getMinutes()
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
    }
}
</script>

