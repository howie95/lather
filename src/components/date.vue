<template>
    <main>
        <div class="maintitle date">
            <div class="maintitleh1">
                <h1>日期索引</h1>
            </div>
        </div>
        <div class="datecontent">
            <section v-for="item in lists" :key="item.year">
            <router-link :to='{ path: `/blog/date/${item.year}` }' class="yeara">{{item.year}}年：</router-link>
            <ul>
                <li v-for="item in item.months" :key="item.month">
                <router-link :to='{ path: `/blog/date/${item.year}/${item.month}` }'>{{item.yuefen}}</router-link><span>(共 {{item.article}} 篇)</span>
                </li>
            </ul>
            </section>
        </div>
        <main-footer></main-footer>
    </main>
</template>
<script>
import le from './loginevent'
import mainFooter from './footer'
export default {
      data(){
          return{
              lists:[]
          }
      },
    mounted(){
        this.$http.get('/api/getDates').then(
            response => {
                let month = ["","一月份","二月份","三月份","四月份","五月份","六月份","七月份","八月份","九月份","十月份","十一月份","十二月份"]
                let datas = response.data
                for(let item in datas){
                    let itemdata = datas[item].months
                    let i = itemdata.length
                    while(i--){
                        itemdata[i].month=this.$format("-"+itemdata[i].month,'M')
                        itemdata[i].yuefen=month[itemdata[i].month]
                        if(itemdata[i].article == 0){
                            itemdata.splice(i,1)
                        }
                    }
                }
                this.lists = datas
                setTimeout(()=>{le.$emit('loadend')},1000)
            },
            response => console.error(response)
        )
        document.title = "日期归档 - Howie's Blog."
    },
    components:{
        mainFooter
    },
}
</script>

