<template>
  <div class="main" style="position:relative;">
    <div class="row">
        <div class="back">
            <nav class="navbar navbar-default col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 col-xs-12">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand animated rotateInDownLeft nav_title" href="#">
                        <span></span>
                        Acefeng
                        <span>
                            <span></span>
                        </span>
                    </a>
                    </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <router-link :to="'/'" class="animated lightSpeedIn">
                                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
                                <span class="u_nav">首页</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="'/resume'" class="animated lightSpeedIn">
                                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                <span class="u_nav">简历</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="'/archives'" class="animated lightSpeedIn">
                                <span class="glyphicon glyphicon-indent-left" aria-hidden="true"></span>
                                <span class="u_nav">归档</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="'/tags'" class="animated lightSpeedIn">
                                <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                                <span class="u_nav">标签</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="'/messages'" class="animated lightSpeedIn">
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                <span class="u_nav">留言</span>
                            </router-link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>         
    <div class="row main" style="min-height:770px;">
        <div class="col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 col-xs-12">
            <router-view></router-view>
        </div>
    </div>
    <div class="footer">
        <div class="col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 col-xs-12">
            <div class="author">@2018 <span class="glyphicon glyphicon-star"></span> 作者：Acefeng</div>
            <div class="blog_message">
                <span>本站由vue、node、mysql制作。</span>
                <span>有问题请联系~741234139@qq.com</span>
            </div>
        </div>
    </div>
    
    <!-- 点击出现登录界面 -->
    <div :class="{user_login:this_login,user_out:!this_login}"  @click="login_sn">
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div :class="{login:true,login_sn:!this_login}">
        <div :class="{start:!this_login}">
            <div v-if="!user_name">
                <div class="form-group">
                    <label for="exampleInputEmail1">Admin</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Admin" v-model="myuser_name">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="user_password">
                </div>
                <button class="btn btn-default" @click="login()">Login</button>
            </div>
            <div class="else_show" v-else>
                <p style="margin-bottom:25px;">{{user_name}}你好~</p>
                <p style="margin-bottom:25px;">您可以在此处进行页面跳转~</p>
                <div class="clear_float">
                    <p class="admin_p1">
                        <router-link :to="{path:'/'}">客户端页面</router-link>
                    </p>
                </div>
                <div class="clear_float">
                    <p class="admin_p1">
                        <router-link :to="{path:'/user'}">管理端页面</router-link>
                    </p>
                </div>
                <div class="clear_float">
                    <p class="admin_p1">
                        <span @click="login_out()">退出登录</span>
                    </p>
                </div>
            </div>
        </div> 
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
        myuser_name:'',
        user_password:'',
        this_login:true,
    }
  },
  computed:mapGetters([
    	'user_name'
  ]),
  watch:{
  },
  mounted:function(){
  },
  methods:{
    login_out(){
        this.$http.post('api/main/login_out')
        .then((response)=>{
            alert(response.data.success);
            this.$store.dispatch('set_user_name','');
        }).catch((err)=>{
            console.log(err);
        })
    },
    login_sn(){
        this.this_login=!this.this_login;
    },
    login(){
        this.$http.post('api/main/login',{params:{user_name:this.myuser_name,user_password:this.user_password}})
                .then((response)=>{
                    const result = response.data;
                    if(result.err){
                        alert(result.err);
                    }else if(result.success){
                        this.$store.dispatch('set_user_name',result.user_name);
                        alert(result.success);
                    }
                    // console.log(response.data.err);
                }).catch((err)=>{
                    console.log(err);
                })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.else_show{
    padding: 20px;
}
.clear_float{
    overflow: hidden;
}
.admin_p1{
    border-bottom: 1px solid #555;
    float: left;
}
.admin_p1 a,.admin_p1 span{
    cursor: pointer;
    color: #999;
    font-size: 14px;
    text-decoration: none;
    position: relative;
    padding-left: 15px;
}
.admin_p1 a::before,.admin_p1 span::before{
    content: '';
    display: block;
    position: absolute;
    top: 5px;
    width: 4px;
    height: 4px;
    background: #87daff;
    border-radius: 50%;
}
.login_sn{
    right: 0%!important;
}
.start{
    margin-left: 0px!important;
    opacity: 1!important;
}
.login>div{
    margin-left: 50%;
    transition: 0.5s linear 0.1s;
    opacity: 0;
}
.login{
    overflow: scroll;
    position: fixed;
    color: #87daff;
    bottom: 2%;
    right: -35%;
    width: 35%;
    height: 30%;
    border-radius: 5% 0px 0px 5%;
    background: black;
    z-index: 10;
    padding: 2%;
    opacity: 0.8;
    transition: 0.5s;
}
.user_login:hover div:nth-child(1){
    transform: rotate(-38deg) translate3d(-5px,0px,0);
    width: 10px;
}
.user_login:hover div:nth-child(3){
    transform: rotate(38deg) translate3d(-5px,0px,0);
    width: 10px;
}
.user_login div:nth-child(1){
    margin-top: 5px;
}
.user_login div{
    width: 15px;
    height: 2px;
    background: #87daff;
    margin: 0 auto;
    margin-top: 4px;
    transition: 0.3s;
}
.user_login{
    width: 25px;
    height: 25px;
    background: black;
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 100;
}
.user_out div:nth-child(1){
    transform: rotate(-45deg) translate3d(-6px,5px,0px);
}
.user_out div:nth-child(2){
    transform: rotate(45deg) translate3d(1px,1px,0px);
}
.user_out div:nth-child(3){
    display: none;
}
.user_out div{
    width: 20px;
    height: 2px;
    background: #87daff;
    margin: 0 auto;
    margin-top: 4px;
    transition: 0.3s;
}
.user_out{
    width: 25px;
    height: 25px;
    background: black;
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 100;
    cursor: pointer;
}
.user_login:hover{
    cursor: pointer;
}
.main{
    padding-bottom: 50px;
}
.blog_message span:nth-child(2){
    padding-left: 10px;
}
.blog_message span:nth-child(1){
    padding-right: 10px;
    border-right: 2px solid #666
}
.author span{
    padding-left: 10px;
}
.author,.blog_message{
    margin-top: 10px;
    color: #666;
    font-size: 14px;
}
.footer{
    height: 70px;
    background: #f8f8f8;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
}
.nav_title{
    position: relative;
    margin-left:-30px;
}
.nav_title>span:nth-child(2)>span{
    display: block;
    background: #777;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    right:-100%;
    animation: span_two 1s infinite 1s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
}
@keyframes span_two{
    from{
        right: -100%;
    }
    to{
        right:0%;
    }
}
.nav_title>span:nth-child(2){
    display: block;
    overflow: hidden;
    width: 50%;
    height: 2px;
    position: absolute;
    bottom: 7px;
    left: 23px; 
}
.nav_title>span:nth-child(1){
    display: block;
    width: 0%;
    height: 2px;
    background: #777;
    position: absolute;
    top: 7px;
    left: 23px; 
    animation: span_one 1s infinite 1s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
}
@keyframes span_one{
    from{
        width:0%;
    }
    to{
        width: 50%;
    }
}
.back{
    background: #f8f8f8;
    height: 70px;
}
.u_nav{
  padding-left: 5px;
}
.container-fluid{
  padding: 10px 0px;
}
.navbar-nav li{
  margin-left: 10px;
}
.navbar-nav li:last-child{
  margin-right: 10px;
}
.navbar-header{
  margin-left: 15px;
}
.lightSpeedIn{
  animation-duration:1.5s;
}
.navbar-default{
  border:none;
}
.navbar-default .navbar-nav>li>a{
  position: relative;
  padding: 10px 10px;
  top: 0px;
  left: 0px;
  transition: 0.5s;
}
.navbar-default .navbar-nav>li>a:hover{
  top: -3px;
  left: -3px;
}
</style>
