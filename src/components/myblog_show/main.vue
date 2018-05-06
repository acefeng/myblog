<template>
  <div class="hello">
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
                    <a class="navbar-brand animated rotateInDownLeft nav_title" href="#" style="margin-left:-30px;">
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
    <div class="row">
        <div class="col-md-8 col-md-offset-2 col-sm-9 col-sm-offset-1 col-xs-12">
            <!-- 网页头部 -->
            <router-view/>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      rub:false,
    }
  },
  methods:{
    user_addnav(){
      this.rub=true;
    },
    user_movenav(){
      this.rub=false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav_title{
    position: relative;
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
