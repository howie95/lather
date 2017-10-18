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
                    for(let item in itemdata){
                        itemdata[item].month=this.$format("-"+itemdata[item].month,'M')
                        itemdata[item].yuefen=month[itemdata[item].month]
                    }
                }
                this.lists = datas
            },
            response => console.error(response)
        )
    },
    components:{
        mainFooter
    },
}
</script>

