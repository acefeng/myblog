<template>
  <div class="hello">
      <div class="showart_main">
          <h3>{{thistitle}}</h3>
          <div class="showart_title">
              <span class="glyphicon glyphicon-save"></span>
              <span>{{thisdate}}</span>
              <span class="glyphicon glyphicon-list-alt"></span>
              <span>{{thisfontNumber}}字</span>
          </div>
          <div class="showartical" v-html="thismain">
          </div>
          <div class="artical_foot">
              -------------本文结束感谢您的阅读-------------
          </div>
          <div class="artical_update">
              <div>
                  <span class="glyphicon glyphicon-hand-right"></span>
              </div>
              <div>
                    <router-link :to="{path:'/user/tagspus/simplemde',query:{id:thisid}}">
                        重新编辑
                    </router-link>
              </div>
          </div>
      </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      thisid:0,
      thistitle:'',
      thismain:'',
      thisfontNumber:0,
      thisdate:'',
    }
  },
  watch:{
    $route(to, from) {
      // 对路由变化作出响应...
      this.$http.post('api/user/showArtical',{params:{id:to.query.id}}).then((response)=>{
          this.thisid=to.query.id;
          this.thistitle=response.data.title;
          this.thismain=response.data.main;
          this.thisfontNumber=response.data.font_number;
          this.thisdate=response.data.date;
      }).catch((err)=>{
          console.log(err);
      })
    }
  },
  mounted:function(){
      //this.$route.query.id
      //获取首次加载页面的内容
      this.$http.post('api/user/showArtical',{params:{id:this.$route.query.id}}).then((response)=>{
          this.thisid=this.$route.query.id;
          this.thistitle=response.data.title;
          this.thismain=response.data.main;
          this.thisfontNumber=response.data.font_number;
          this.thisdate=response.data.date;
      }).catch((err)=>{
          console.log(err);
      })

     
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showart_main{
    margin: 10px;
    border: 1px solid #f1f1f1;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    text-align: center;
    color: #555;
    font-weight: 200;
    position: relative;
    overflow: hidden;
}
.showart_main h3{
    margin: 20px;
    margin-top: 30px;
}
.showart_title{
    font-size: 12px;
    color: #999;
}
.showart_title span:nth-child(3){
    padding-left: 10px;
}
.showartical{
    text-align: left;
    width: 80%;
    margin: 30px auto;
    margin-bottom: 30px;
    
}
.artical_update{
    position: absolute;
    bottom: 10px;
    right: -80px;
    width: 120px;
    height: 40px;
    transition: 1s;
}
.artical_update:hover{
    right: 0px;
}
.artical_update>div{
    float: left;
    line-height: 40px;
    text-align:center;
}
.artical_update>div:nth-child(1){
    width: 40px;
    height: 100%;
    border-radius: 8px 0px 0px 8px;
    background: #e7e7e7;
    font-size: 20px;
    color: #999;
}
.artical_update>div:nth-child(2){
    width: 80px;
    height: 100%;
    background: white;
    border: 1px solid #f1f1f1;
}
.artical_update>div:nth-child(2):hover{
    cursor: pointer;
}
.artical_update>div:nth-child(2)>a:hover{
    text-decoration: none;
    color: #f44336;
}
.artical_foot{
    text-align: center;
    color: #ccc;
    margin-bottom: 30px;
}
</style>
