<template>
    <main>
        <div class="maintitle list">
            <div class="maintitleh1">
                <h1>索引列表</h1>
            </div>
        </div>
        <div class="listcontent">
            <section>
                <h1>{{this.h1}}:</h1>
                <h2>{{this.h2}}</h2>
                <p v-if="nolist">没有检索到文章，请检查检索条件是否正确。</p>
                <ul v-if="!nolist">
                    <li v-for="item in list" :key="item._id">
                        <router-link :to='{ path: `/blog/post/${item.postid}` }'>{{item.title}}</router-link>
                        <span>{{item.year}}年{{item.month}}月{{item.day}}日</span>
                    </li>
                </ul>
            </section>
        </div>
        <main-footer></main-footer>   
    </main>  
</template>
<script>
import mainFooter from './footer'
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
            //if(!isNum(year)){
            //    this.h1="日期格式有错误"
            //    this.nolist = true
            //    return
            //    }
            if(tag!==undefined){param.tag=tag 
            this.h1=tag}
            if(year){param.year=year
            this.h1=year+"年"}
            if(month){param.month=month
            this.h2=month+"月"}
            this.$http.get('/api/getList',{params:param}).then(
            response => {this.list = response.data
            if(this.list.length ==0){this.nolist = true} },
            response => console.error(response)
            )
        }
    },
    mounted(){
        let year = parseInt(this.$route.params.year)
        let month = parseInt(this.$route.params.month)
        let tag = this.$route.params.tag
        this.getList(year,month,tag)
    },
    components:{
        mainFooter
    },
}
</script>
