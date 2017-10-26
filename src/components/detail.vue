<template>
    <main>
        <div class="maintitle detail">
            <div class="maintitleh1">
                <h1 class="detailh1">{{item.title}}</h1>
            </div>
        </div>
        <article class="detailcontent">
            <div class="titleline" v-if="!isPage">
                <h2>发表于 {{item.year}}年{{item.month}}月{{item.day}}日{{item.time}}</h2>
                <div class="column">
                    <span>{{item.tag}}</span>
                </div>
            </div>
            <div class="content" v-html="item.content"></div>
        </article>
        <main-footer></main-footer>
    </main>  
</template>
<script>
import le from './loginevent'
import mainFooter from './footer'
export default {
    data(){
        return{
            item:{},
            isPage:false,
        }
    },
    mounted(){
        if(this.$route.params.pagelink){
            this.isPage = true
            let param = {link:this.$route.params.pagelink}
            this.$http.get('/api/getPages',{params:param}).then(
            //待办：if response.data.length == 0 404
            response => {
                this.item = response.data[0]
                this.item.content = this.$md.render(this.item.content)
            },
            response => console.error(response)
            )
        }else{
            let param = {postId:this.$route.params.id}
            this.$http.get('/api/getPosts',{params:param}).then(
                //待办：if response.data.length == 0 404
            response => {
                this.item = response.data[0]
                this.item.content = this.$md.render(this.item.content)
                this.item.time = this.$format("1111-11-11T"+this.item.time,'Ahh:mm',{locale: this.$zhcn})
            },
            response => console.error(response)
            )
        }
        le.$emit('loadend')
    },
    components:{
        mainFooter
    },
}
</script>
<style src="./../assets/highlight.css">
</style>
