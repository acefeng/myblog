<template>
  <div class="hello">
    <div class="row show_row">
      <div class="col-xs-4 col-sm-3 show_main animated fadeInLeft">
        <div class="show_left">
          <span class="glyphicon glyphicon-menu-hamburger"></span>
          <span>文章列表</span>
          <router-link :to="'/user/tagspus/simplemde'">
            <span class="show_lright glyphicon glyphicon-plus"></span>
          </router-link>        
        </div>
        <ul class="show_leftul">
          <!-- <li>
            <h4>
              <router-link :to="'/user/tagspus/simplemde'">文章标题文章标题文章标题文章标题文章标题</router-link>
            </h4>
            <span>2018-03-02</span>
          </li> -->
          <li v-for="(item,index) in getAti" :key="index">
            <h4>
              <router-link :to="{path:'/user/tagspus/simplemde',query:{id:item.id}}">
                {{item.title}}
              </router-link>
            </h4>
            <span>{{item.date}}</span> <span>{{item.font_number}}字</span>
          </li>
        </ul>
      </div>
      <div class="col-xs-8 col-sm-9 show_right">
        <router-view class="animated fadeInRight"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:mapGetters([
    'getAti'
  ]),
  mounted:function(){
    this.$http.post('api/user/selartical').then((response)=>{
      this.$store.dispatch('updateAtshow',response.data);
      console.log('获取初始数据成功');
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show_right{
  position: fixed;
  top: 70px;
  right: 0px;
  padding: 0px!important;
}
.show_main{
  border-right:1px solid #f1f1f1;
  height: 100%;
  position: fixed;
  top: 70px;
  left: 0px;
  overflow: scroll;
}
.show_left{
  height: 64px;
  line-height: 64px;
  border-bottom: 3px solid #f1f1f1;
}
.show_lright{
  float: right;
  vertical-align: center;
  margin-top: 22px;
  transition: 0.5s;
  transform: rotate(0deg);
}
.show_lright:hover{
  cursor: pointer;
  transform: rotate(180deg);
}
.show_leftul{
  padding: 0px;
}
.show_leftul li{
  list-style: none;
  overflow: hidden;
  height: 100%;
  padding: 8px 0px;
  border-bottom: 1px solid #f1f1f1;
}
.show_leftul li h4{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.show_leftul li h4 a{
  text-decoration: none;
}
.show_leftul li h4 a:hover{
  color: red;
}
.show_leftul li:hover{
  cursor: pointer;
}
.show_leftul li span{
  font-size: 10px;
}
</style>
