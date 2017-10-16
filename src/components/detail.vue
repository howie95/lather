<template>
    <main>
        <article>
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
        </article>
    </main>  
</template>
<script>
export default {
      data(){
          return{
              item:{}
          }
      },
      mounted(){
          let param = {postId:this.$route.params.id}
          this.$http.get('/api/getPosts',{params:param}).then(
              //待办：if response.data.length == 0 404
            response => this.item = response.data[0],
            response => console.error(response)
            )
      }
}
</script>

