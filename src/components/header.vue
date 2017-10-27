<template>
    <header>
        <transition name="logobg">
        <div class="logobg" v-show="welcome">
            <transition name="logo">
            <div class="logo" v-if="welcome">
                <div class="sublogo">
                    <p>Howie's Blog</p>
                    <div class="sublogocover"></div>
                </div>
                <div class="tianx5">
                    <h1>好的记事本</h1>
                    <svg class="tian tian1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <polyline class="cls-1" points="0.5 0.5 71.5 0.5 71.5 71.5 0.5 71.5 0.5 0.5"/>
                        <line class="cls-2" x1="0.5" y1="36" x2="71.5" y2="36"/>
                        <line class="cls-2" x1="36" y1="71" x2="36" y2="1"/>
                        <line class="cls-2" x1="1" y1="1" x2="71" y2="71"/>
                        <line class="cls-2" x1="71" y1="1" x2="1" y2="71"/>
                    </svg>
                    <svg class="tian tian2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <polyline class="cls-1" points="0.5 0.5 71.5 0.5 71.5 71.5 0.5 71.5 0.5 0.5"/>
                        <line class="cls-2" x1="0.5" y1="36" x2="71.5" y2="36"/>
                        <line class="cls-2" x1="36" y1="71" x2="36" y2="1"/>
                        <line class="cls-2" x1="1" y1="1" x2="71" y2="71"/>
                        <line class="cls-2" x1="71" y1="1" x2="1" y2="71"/>
                    </svg>
                    <svg class="tian tian3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <polyline class="cls-1" points="0.5 0.5 71.5 0.5 71.5 71.5 0.5 71.5 0.5 0.5"/>
                        <line class="cls-2" x1="0.5" y1="36" x2="71.5" y2="36"/>
                        <line class="cls-2" x1="36" y1="71" x2="36" y2="1"/>
                        <line class="cls-2" x1="1" y1="1" x2="71" y2="71"/>
                        <line class="cls-2" x1="71" y1="1" x2="1" y2="71"/>
                    </svg>
                    <svg class="tian tian4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <polyline class="cls-1" points="0.5 0.5 71.5 0.5 71.5 71.5 0.5 71.5 0.5 0.5"/>
                        <line class="cls-2" x1="0.5" y1="36" x2="71.5" y2="36"/>
                        <line class="cls-2" x1="36" y1="71" x2="36" y2="1"/>
                        <line class="cls-2" x1="1" y1="1" x2="71" y2="71"/>
                        <line class="cls-2" x1="71" y1="1" x2="1" y2="71"/>
                    </svg>
                    <svg class="tian tian5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                        <polyline class="cls-1" points="0.5 0.5 71.5 0.5 71.5 71.5 0.5 71.5 0.5 0.5"/>
                        <line class="cls-2" x1="0.5" y1="36" x2="71.5" y2="36"/>
                        <line class="cls-2" x1="36" y1="71" x2="36" y2="1"/>
                        <line class="cls-2" x1="1" y1="1" x2="71" y2="71"/>
                        <line class="cls-2" x1="71" y1="1" x2="1" y2="71"/>
                    </svg>
                </div>
                <nav>
                    <a @click="checkNav('tag')" @mouseenter="hoverNav('tag')" @mouseout="unhoverNav">分类索引</a>
                    <span>/</span>
                    <a @click="checkNav('date')" @mouseenter="hoverNav('date')" @mouseout="unhoverNav">日期归档</a>
                    <span>/</span>
                    <a href="javascript:;">关于我</a>
                </nav>  
            </div>
            </transition>
            <div class="mousedown" @click="checkNav('scroll')">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 128 128">
                    <path fill="#c88f6a" d="M64,20c-6.629,0-12,5.371-12,12v16c0,6.629,5.371,12,12,12s12-5.371,12-12V32C76,25.371,70.629,20,64,20z
                            M68,48c0,2.207-1.793,4-4,4s-4-1.793-4-4V32c0-2.207,1.793-4,4-4s4,1.793,4,4V48z"/>
                    <path fill="#ebc2a9" d="M64,0C39.699,0,20,19.699,20,44v40c0,24.301,19.699,44,44,44s44-19.699,44-44V44C108,19.699,88.301,0,64,0z
                    M100,84c0,19.852-16.148,36-36,36s-36-16.148-36-36V44C28,24.148,44.148,8,64,8s36,16.148,36,36V84z"/>
                </svg>
                <span>&or;</span>
            </div>
            <div class="boxes">
                <div :style="{backgroundColor: this.box1c}" :class="{ boxh: !welcome ,boxhalf: hover} " class="box box1"></div>
                <div :style="{backgroundColor: this.box2c}" :class="{ boxh: !welcome ,boxhalf: hover}" class="box box2"></div>
                <div :style="{backgroundColor: this.box3c}" :class="{ boxh: !welcome ,boxhalf: hover}" class="box box3"></div>
                <div :style="{backgroundColor: this.box4c}" :class="{ boxh: !welcome ,boxhalf: hover}" class="box box4"></div>
                <div :style="{backgroundColor: this.box5c}" :class="{ boxh: !welcome ,boxhalf: hover}" class="box box5"></div>
            </div>
        </div>
        </transition>
        <transition name="logobar">
        <div class="logobar" v-show="!welcome">
            <transition name="loading">
            <div class="loading" v-if="isLoading">加载中...</div>
            </transition>
            <transition name="loading">
            <div class="barcontent" v-if="!isLoading">
                <router-link to="/blog/page/1">全部博文</router-link>
                <span>/</span>
                <router-link to="/blog/tags/">分类索引</router-link>
                <span>/</span>
                <router-link to="/blog/date/">日期归档</router-link>
                <span>/</span>
                <a href="javascript:;">关于我</a>
                <span v-if="islogin">/</span>
                <router-link to="/blog/admin/newpost" v-if="islogin">撰写 &or;</router-link>
                <span v-if="islogin">/</span>
                <router-link to="/blog/admin/postlist" v-if="islogin">管理 &or;</router-link>
            </div>
            </transition>
        </div>
        </transition>
        <div class="extramenu">
            <div>
                <ul>
                    <li><router-link to="/blog/admin/newpost" v-if="islogin">撰写博文</router-link></li>
                    <li><router-link to="/blog/admin/newpage" v-if="islogin">撰写单页</router-link></li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><router-link to="/blog/admin/postlist" v-if="islogin">文章管理</router-link></li>
                    <li><router-link to="/blog/admin/pagelist" v-if="islogin">单页管理</router-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
import le from './loginevent'
export default {
    data(){
        return{
            isLoading:false,
            hover:false,
            box1c:"#243949",
            box2c:"#425d70",
            box3c:"#638196",
            box4c:"#8eacc0",
            box5c:"#bbd8eb",
            islogin:false,
        }
    },
    methods:{
        checkNav:function(e){
            if(e=='tag'){
                this.box1c="#3ab5b0"
                this.box2c="#3c9dbb"
                this.box3c="#437fad"
                this.box4c="#4d5390"
                this.box5c="#55327b"
            }
            if(e=='date'){
                this.box1c="#d7d2cc"
                this.box2c="#acaead"
                this.box3c="#898f93"
                this.box4c="#5f6b74"
                this.box5c="#344755"
            }
            this.hover = false
            this.$emit('navcheck',e)
        },
        hoverNav:function(e){
            if(e=='tag'){
                this.box1c="#3ab5b0"
                this.box2c="#3c9dbb"
                this.box3c="#437fad"
                this.box4c="#4d5390"
                this.box5c="#55327b"
            }
            if(e=='date'){
                this.box1c="#d7d2cc"
                this.box2c="#acaead"
                this.box3c="#898f93"
                this.box4c="#5f6b74"
                this.box5c="#344755"
            }
            this.hover = true
        },
        unhoverNav:function(){
            this.hover = false
        }
    },
    props: ['welcome'],
    mounted(){
        le.$on('islogin',()=>{this.islogin=true})
        le.$on('islogout',()=>{this.islogin=false})
        le.$on('loading',()=>{this.isLoading=true})
        le.$on('loadend',()=>{this.isLoading=false})
    }
}
</script>

