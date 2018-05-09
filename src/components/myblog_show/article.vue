<template>
  <div class="hello">
      <div :class="{showart_main:true,my_transtion:this_transtion}">
          <h3>{{this_artical.title}}</h3>
          <div class="showart_title">
              <span class="glyphicon glyphicon-save"></span>
              <span>{{this_artical.date}}</span>
              <span class="glyphicon glyphicon-list-alt"></span>
              <span>{{this_artical.font_number}}字</span>
          </div>
          <div class="showartical" v-html="this_artical.main">
            
          </div>
          <div class="artical_foot">
              -------------本文结束感谢您的阅读-------------
          </div>
          <div class="my_like">
            <span>限制你的永远都是你的想象力！</span>
          </div>
          <div class="my_message">
            <router-link :to="{path:'/messages'}" tag="button">
              <button style="margin-bottom:0px;">Message~</button>
            </router-link>
          </div>
          <div class="tags">
            <router-link :to="{path:'/tags/tagsShow',query:{id:item.id,name:item.name}}" v-for="item in tags" :key="item.id">
              <span class="glyphicon glyphicon-tag"></span>
              {{item.name}}
            </router-link>
          </div>
          <div class="pre_after">
            <div>
              <router-link :to="{path:'/article',query:{id:pre_artical.id}}" v-if="pre_artical.id">
                <span class="glyphicon glyphicon-menu-left"></span>
                {{pre_artical.title}}
              </router-link>
            </div>
            <div>
              <router-link :to="{path:'/article',query:{id:after_artical.id}}" v-if="after_artical.id">
                {{after_artical.title}}
                <span class="glyphicon glyphicon-menu-right"></span>
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
      pre_artical:{},
      this_artical:{},
      after_artical:{},
      tags:{},
      this_transtion:true,
    }
  },
  methods:{

  },
  watch:{
    $route(to,from){
      this.$http.post('api/main/getIndexArtical',{params:{indexId:to.query.id}})
      .then((response)=>{
        this.this_artical=response.data[0][0];
        if(response.data[1][0]){
          this.pre_artical=response.data[1][0];  
        }else{
          this.pre_artical={};
        }
        if(response.data[2][0]){
          this.after_artical=response.data[2][0]; 
        }else{
          this.after_artical={};
        }
        this.tags=response.data[3];
        this.this_transtion=true;
      }).catch((err)=>{
        console.log(err);
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
  // just use `this`
    this.this_transtion=false;
    next();
  },
  mounted:function(){
      this.$http.post('api/main/getIndexArtical',{params:{indexId:this.$route.query.id}})
      .then((response)=>{
        this.this_artical=response.data[0][0];
        if(response.data[1][0]){
          this.pre_artical=response.data[1][0];  
        }else{
          this.pre_artical={};
        }
        if(response.data[2][0]){
          this.after_artical=response.data[2][0]; 
        }else{
          this.after_artical={};
        }
        this.tags=response.data[3];
      }).catch((err)=>{
        console.log(err);
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pre_after>div:nth-child(2){
  text-align: right;
}
.pre_after>div:nth-child(1){
  text-align: left;
}
.pre_after>div>a>span{
  font-size: 12px;
}
.pre_after>div>a:hover{
  color: #222;
}
.pre_after>div>a{
  font-size: 14px;
  color: #555;
  text-decoration: none;
}
.pre_after>div{
  width: 49%;
  display: inline-block;
}
.pre_after{
  width: 85%;
  margin: 0 auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
  margin-bottom: 25px;
}
.tags>a>span{
  vertical-align: center;
}
.tags>a:hover{
  color: white;
  background: #ccc;
}
.tags>a{
  display: inline-block;
  background: #f5f5f5;
  text-decoration: none;
  color: #555;
  padding: 4px 8px;
  margin-right: 10px;
}
.tags{
  text-align: left;
  width: 85%;
  margin: 0 auto;
  margin-bottom: 40px;
}
.my_message button{
  border-radius: 5px;
  background: #f44336;
  border: none;
  color: white;
  padding: 5px 10px;
  font-size: 15px;
  margin-bottom: 50px;
  font-family: "Microsoft Yahei";
  font-weight: 400;
}
.my_like{
  color: #555;
  margin-bottom: 10px;
}
.artical_foot{
  color:#ccc;
  font-size: 14px;
  margin-bottom: 50px;
}
.showart_main{
    margin: 10px;
    margin-top: 50px;
    margin-bottom: 100px;
    border: 1px solid #f1f1f1;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    text-align: center;
    color: #555;
    font-weight: 200;
    position: relative;
    overflow: hidden;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    
}
.my_transtion{
    animation: article_show 1s infinite;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
    -webkit-animation-fill-mode:forwards;
}
@keyframes article_show {
    from{
        transform: translateY(-15px);
        opacity: 0;
    }
    to{
        transform: translateY(0px);
        opacity: 1;
    }
}
.showart_main h3{
    margin: 20px;
    margin-top: 50px;
}
.showart_title{
    font-size: 12px;
    margin-bottom: 50px;
    color: #999;
}
.showart_title span:nth-child(3){
    padding-left: 10px;
}
.showartical{
    text-align: left;
    width: 85%;
    margin: 30px auto;
    margin-bottom: 30px;
    
}
</style>
