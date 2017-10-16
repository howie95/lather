<template>
    <main>
        <section v-for="item in lists" :key="item.year">
            <h1>{{item.year}}</h1>
            <ul>
                <li v-for="item in item.months" :key="item.month">{{item.month}}<span>({{item.article}})</span></li>
            </ul>
        </section>
    </main>
</template>
<script>
export default {
      data(){
          return{
              lists:[]
          }
      },
    mounted(){
        this.$http.get('/api/getDates').then(
            response => this.lists = response.data.reverse(),
            response => console.error(response)
        )
    }
}
</script>

