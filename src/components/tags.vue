<template>
    <main>
        <ul>
            <li v-for="item in list" :key="item._id">
                <router-link :to='{ path: `/blog/tags/${item.tag}` }'>{{item.tag}}</router-link>
                <span>({{item.article}})</span>
            </li>
        </ul>
    </main>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.$http.get('/api/getTags').then(
            response => this.list = response.data,
            response => console.error(response)
        )
    }
}
</script>
