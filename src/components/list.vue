<template>
    <main>
        <article v-for="item in posts" :key="item._id">
            <div class="titleline">
                <h2>{{item.title}}</h2>
                <div class="column">
                    <ul>
                        <li>{{item.tag}}</li>
                    </ul>
                    <span>{{item.date}}</span>
                </div>
            </div>
            <div class="content">
                <p>{{item.content}}</p>
            </div>
            <div class="showmore">
                <span>查看更多</span>
            </div>
        </article>
    </main>
</template>
<script>
export default {
    name:'list',
    data(){
        return{
            posts:[],
        }
    },
    methods:{
        getPosts(){
            this.$http.get('/api/getPosts').then(
            response => this.posts = response.data.reverse(),
            response => console.error(response)
            )
        }
    },
    mounted(){
        this.getPosts()
    }
}
</script>

