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
                    <a @click="checkNav('tag')" @mouseenter="hoverNav('tag')" @mouseout="unhoverNav">标签索引</a>
                    <span>/</span>
                    <a @click="checkNav('date')" @mouseenter="hoverNav('date')" @mouseout="unhoverNav">日期索引</a>
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
            <div class="barcontent">
                <div class="howie">
                    <a href="http://howie95.com/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150"><g><path class="hh" d="M36.58,56.22c7.22-10,14.66-20.62,16.16-32.87.49-4,.24-8.37-1.93-11.81S44.08,6,40.32,7.52c-3.37,1.41-5.12,5.19-5.75,8.79-1,5.44.13,11.71,4.48,15.13,2.63,2.06,6.06,2.8,9.38,3.08A43,43,0,0,0,69,31.19C79.66,26.6,88,17.9,96,9.43L86.92,28.88C82.4,38.59,78.87,48,75,58c-4,10.24-8.24,21-12.69,31A141.52,141.52,0,0,1,42.1,121.61c-3.79,4.58-8,9-13.21,11.82s-11.73,3.83-17.17,1.43C7,132.8,3.71,128.55,1,124.2" transform="translate(-1.02 -7)"/><path class="hh" d="M63.52,87.57a120.22,120.22,0,0,0,80.3-49.31,53.85,53.85,0,0,0,7.68-14.53,13.07,13.07,0,0,0,.69-6.36,5.9,5.9,0,0,0-3.94-4.69,7,7,0,0,0-4.52.61C137.36,16.08,133,23,129,28c-10.58,15-16.67,32.07-24.19,48.44S90.36,106.07,92,124c1.79,11.61,9.16,20,35.66,8.15C130.83,130.74,142,124,146,120c3-3,7-8,8-13,.91-4.57,1.17-8.77-1.16-12.81a8.89,8.89,0,0,0-2.43-2.84,8.79,8.79,0,0,0-5.93-1.3,25.06,25.06,0,0,0-8.08,2.53,39.34,39.34,0,0,0-7.29,4.17,34.21,34.21,0,0,0-8.31,9.57c-4.39,7.16-7.06,15.64-6,24a10.34,10.34,0,0,0,1.15,4,7.92,7.92,0,0,0,5.12,3.51A49.11,49.11,0,0,0,144.76,136,43.12,43.12,0,0,0,161,126c8-8.22,16.34-15.07,17-29,.09-1.93,0-6-1.36-6.69a2.13,2.13,0,0,0-1.9,0c-4.27,2-6.83,6.41-8.71,10.73a63.56,63.56,0,0,0-5.63,26.76c.07,2.9.5,6.08,2.63,8.06,2.55,2.36,6.54,2.12,9.9,1.21a39.56,39.56,0,0,0,18.57-11.75,58.46,58.46,0,0,0,11.23-19.08,44.45,44.45,0,0,0,2.35-8.69c1.92-12.51-5.35-4.32-6.87-2a32.09,32.09,0,0,0-3.75,7.52,108.27,108.27,0,0,0-6,21c-.37,2.3-.59,4.8.54,6.84a8.13,8.13,0,0,0,3.47,3.13,13.65,13.65,0,0,0,7.06,1.51c5.5-.32,10.25-3.92,14.1-7.85,8-8.18,13.67-18.32,19.23-28.33,4.28-7.7,8.62-15.56,10.27-24.21.18-.94.26-2.06-.46-2.69a2.2,2.2,0,0,0-1.41-.44c-3.1-.06-6.92,3.19-8.23,6a16.78,16.78,0,0,0,0,15c1.31,2.53,6.79,9.45,9.78,10a7.5,7.5,0,0,0,1.34,0c2.88-.94,17.35-8.44,23.32-15.09A126.69,126.69,0,0,0,252,119.18a58.77,58.77,0,0,0-2.42,9.42c-.3,2-.41,4.1.68,5.74a6,6,0,0,0,6,2.21,14.9,14.9,0,0,0,6.07-2.78C282,120,292.08,117.36,303.38,107.33,315,97,307.63,92.51,307,92c-1.79-1.45-4.7-1.92-7-2a28.6,28.6,0,0,0-14,6,39.07,39.07,0,0,0-12,15,27.07,27.07,0,0,0-2,10,18,18,0,0,0,2,9c1.89,3.78,4.9,5.36,9.06,6.16s8.45.2,12.57-.73c7.23-1.64,7.68-2.2,14.37-5.42,2.92-1.4,9.53-5.61,18-13,5.9-5.15,13.93-13.47,16.69-15.91,7.39-6.53,15-13.15,19.53-21.89a22.37,22.37,0,0,0,3-10.08c0-3.54-1.48-7.23-4.45-9.14a5.09,5.09,0,0,0-4.12-.82c-1.61.49-2.65,2-3.48,3.46-1.86,3.27-3.32,6.94-3,10.69a20.72,20.72,0,0,0,3.22,8.53c3.42,5.84,7.64,11.25,10.31,17.47a39.29,39.29,0,0,1,3.16,16.4,19,19,0,0,1-1.85,8.45,17.93,17.93,0,0,1-4.85,5.49,31.91,31.91,0,0,1-22.74,6.69c-3.84-.38-8.38-1.71-9.68-5.35-.71-2-.71-4,1.29-5a11.9,11.9,0,0,1,9-1c3.15.91,6.93,4.84,10,6,8.71,3.3,24.12,3.25,36.53,1.3" transform="translate(-1.02 -7)"/></g><g class="hhdian"><path class="hh hhdian" d="M337.68,43.68a2.12,2.12,0,0,1,2.41,1.65,5.32,5.32,0,0,1-.45,3.18A25.87,25.87,0,0,1,334.31,57" transform="translate(-1.02 -7)"/><path class="hh hhdian" d="M270.5,74.45a.81.81,0,0,0,1.06.4,2.36,2.36,0,0,0,.94-.82c.39-.49.8-1.17.44-1.68s-1.27-.33-1.89,0" transform="translate(-1.02 -7)"/></g></svg>
                    </a>
                </div>
                <nav>
                    <router-link to="/blog/page/1">全部博文</router-link>
                    <span>/</span>
                    <router-link to="/blog/tags/">标签索引</router-link>
                    <span>/</span>
                    <router-link to="/blog/date/">日期索引</router-link>
                    <span>/</span>
                    <a href="javascript:;">关于我</a>
                </nav> 
            </div>
        </div>
        </transition>
    </header>
</template>
<script>
export default {
    data(){
        return{
            hover:false,
            box1c:"#243949",
            box2c:"#425d70",
            box3c:"#638196",
            box4c:"#8eacc0",
            box5c:"#bbd8eb",
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
}
</script>

