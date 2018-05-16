<template>
  <div class="hello">
    <!-- 网页头部 -->
    <nav class="navbar navbar-default" style="overfolw:hidden;">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand animated rotateInDownLeft" href="#">Acefeng</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link :to="'/user/show'" class="animated lightSpeedIn">
                <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                <span class="u_nav">所有文章</span>
              </router-link>
            </li>
            <li>
              <router-link :to="'/user/tagspus'" class="animated lightSpeedIn">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                <span class="u_nav">上传修改</span>
              </router-link>
            </li>
            <li>
              <router-link :to="'/user/pustags'" class="animated lightSpeedIn">
                <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                <span class="u_nav">标签</span>
              </router-link>
            </li>
            <li>
              <router-link :to="'/user/words'" class="animated lightSpeedIn">
                <span class="glyphicon glyphicon-leaf" aria-hidden="true"></span>
                <span class="u_nav">管理留言</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view/>
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
  mounted:function(){

    // this.$http.post('api/main/getUser_name').then()
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
  top: 0px;
  left: 0px;
  transition: 0.5s;
}
.navbar-default .navbar-nav>li>a:hover{
  top: -3px;
  left: -3px;
}
</style>
