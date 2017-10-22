<template>
    <div class="login">
        <transition name="login">
        <div class="loginbox" v-if="!islogin">
            <div class="logintitle" :style="{backgroundColor: this.color}">
                <p>{{title}}</p>
                <span @click="islogin=true">x</span>
            </div>
            <form>
                <input type="text" placeholder="请输入用户名" name="name" v-model="name">
                <input type="password" placeholder="请输入密码" name="password" v-model="password">
            </form>
            <button @click="login">登入</button>
        </div>
        </transition>
        <transition name="login">
        <div class="logtip" v-if="success"><p>登陆成功</p></div>
        </transition>
        <transition name="login">
        <div class="logtip" v-if="islogout"><p>登出成功</p></div>
        </transition>
    </div>
</template>
<script>
import le from './loginevent'
export default {
    data(){
        return{
            title:"管理员登陆",
            color:"#a0adb7",
            name:'',
            password:'',
            islogin:true,
            success:false,
            islogout:false
        }
    },
    methods:{
        login:function(){
            let obj = {
                name:this.name,
                password:this.password
            }
            if(!obj.name&&!obj.password){
                this.title = "请输入账号和密码"
                return
            }
            this.$http.post('/api/logIn', obj).then(
                response => {
                    let res = response.data
                    if(res.status=="0"){
                        this.success = true
                        le.$emit('islogin')
                    }else if(res.status=="1"){
                        this.title="服务器错误"
                        this.color="#ED6261"
                    }else{
                        this.title="账号或密码错误"
                        this.color="#ED6261"
                    }
                },
                response => this.title = "网络错误"
            )
        },
        logout:function(){
            this.islogout = true
            setTimeout(()=>{this.islogout = false},2000)
        }
    },
    mounted(){
        le.$on('islogin',()=>{this.islogin=true})
        le.$on('islogout',()=>{this.logout()})
        le.$on('loginevent',()=>{this.islogin=false})
    }
}
</script>
