<template>
    <div id="app">
        <main-header></main-header>
        <router-view></router-view>
    </div>
</template>

<script>
import mainHeader from './components/header'
export default {
    name: 'app',
    data () {
        return {
        
        }
    },
    components:{
        mainHeader
    }
}
</script>
<style src="./assets/main.css">
</style>
