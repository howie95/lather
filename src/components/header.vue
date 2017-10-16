<template>
    <header>
        <div class="headerbg" v-if="welcomepage">
            <div class="logobg"></div>
        </div>
        <div class="logoarea">
            <div class="logo">
                <p>Howie's Blog</p>
                <h1>- H's 记事本 -</h1>
                <nav>
                    <a href="javascript:;">标签索引</a>
                    <span>/</span>
                    <a href="javascript:;">日期索引</a>
                    <span>/</span>
                    <a href="javascript:;">关于我</a>
                </nav>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return{
            welcomepage:false,
        }
    }
}
</script>

