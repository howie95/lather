<template>
    <main>
        <h1>{{this.h1}}:</h1>
        <h2>{{this.h2}}</h2>
        <p v-if="nolist">没有检索到文章，请检查检索条件是否正确。</p>
        <ul v-if="!nolist">
            <li v-for="item in list" :key="item._id">
                <router-link :to='{ path: `/blog/post/${item.postid}` }'>{{item.title}}</router-link>
                <span>{{item.year}}</span>
                <span>{{item.month}}</span>
                <span>{{item.day}}</span>
            </li>
        </ul>    
    </main>  
</template>
<script>
export default {
    data(){
        return{
            h1:"",
            h2:"",
            list:[],
            nolist:false,
        }
    },
    methods:{
        getList:function(year,month,tag){
            let param = {
                year:"",
                month:"",
                tag:""
            }
            if(year!==Number||month!==Number){
                this.h1="日期格式有错误"
                this.nolist = true
                return
            }
            if(tag!==undefined){param.tag=tag 
            this.h1=tag}
            if(year!==undefined){param.year=year
            this.h1=year+"年"}
            if(month!==undefined){param.month=month
            this.h2=month+"月"}
            this.$http.get('/api/getList',{params:param}).then(
            response => {this.list = response.data
            if(this.list.length ==0){this.nolist = true} },
            response => console.error(response)
            )
        }
    },
    mounted(){
        let year = this.$route.params.year
        let month = this.$route.params.month
        let tag = this.$route.params.tag
        this.getList(year,month,tag)
    }
}
</script>
