<template>
    <main>
        <div class="maintitle tags">
            <div class="maintitleh1">
                <h1>分类索引</h1>
            </div>
        </div>
        <div class="tagscontent">
                <ul>
                <li v-for="item in list" :key="item._id">
                    <router-link :to='{ path: `/blog/tags/${item.tag}` }'>{{item.tag}}</router-link>
                    <span>(共 {{item.article}} 篇)</span>
                </li>
                </ul>
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
            list:[]
        }
    },
    mounted(){
        this.$http.get('/api/getTags').then(
            response => this.list = response.data,
            response => console.error(response),
            setTimeout(()=>{le.$emit('loadend')},1000)
        )
        document.title = "分类索引 - Howie's Blog."
    },
    components:{
        mainFooter
    },
}
</script>
