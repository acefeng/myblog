<template>
  <div class="hello">
    <div class="animated jackInTheBox">
      <div class="tags_main">
        <h3>tags</h3>
        <h6>此时共计{{tags.length}}个标签</h6>
        <div class="tagsshow" id="inshow">
          <div class="a_show" v-for="(item,index) in tags" :key="index">
            <router-link :to="{path:'/tags/tagsShow',query:{id:item.id,name:item.name}}" :style="{fontSize:item.font_size,opacity:item.opacity}">{{item.name}}</router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      tags:[],
    }
  },
  methods:{
  },
  mounted:function(){
    this.$http.post('api/main/gettags').then((response)=>{
      this.tags=response.data;
    }).catch((err)=>{
      console.log(err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tags_main{
  text-align: center;
  padding: 0px 20px;
  margin-top: 18%;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
}
.tags_main>h3{
  color: #555;
  font-weight: 400;
}
.tags_main>h6{
  margin-top: 20px;
}
.tagsshow{
  margin-top: 20px;
}
.tagsshow>.a_show{
  display: inline-block;
  padding: 15px;
  position: relative;
}
.tagsshow>.a_show>a{
  color: #303030;
  text-decoration: none;
  border-bottom: 1px solid #999;
}
.tagsshow>.a_show>a:hover{
  text-decoration: none;
  border-bottom-color: #111111;
  
}
.tagsshow>.a_show>span{
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  display: none;
  z-index: 100;
  user-select:none;
}
.tagsshow>.a_show>span:hover{
  color: red;
}
.a_show:hover span{
  display: inline;
  cursor: pointer;
}

</style>
