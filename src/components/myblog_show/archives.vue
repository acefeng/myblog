<template>
  <div class="hello" style="position:relative;">
      <div :class="{words_text:true,my_transtion:this_transtion}">
          <h4 v-if="this_index_archives==1">共有{{articel_count}}篇文章~</h4>
          <div v-for="(item,index) in this_artical" :key="index">
            <h2 v-if="check(index)">{{this_year[index]}}</h2>
            <article>
                <h3>
                    <span>{{item.date}}</span>
                    <router-link :to="{path:'/article',query:{id:item.id}}">{{item.title}}</router-link>
                </h3>
            </article>
          </div>
      </div>
      <div class="paging">
          <ul>
              <li v-if="this_index_archives!=1">
                  <router-link :to="{path:'/archives',query:{id:(this_index_archives-1)}}">
                      <span class="glyphicon glyphicon-menu-left"></span>
                  </router-link>
              </li>
              <li v-for="(item,index) in pags" :key="index" :class="{this_class:this_index_archives==item}">
                  <router-link :to="{path:'/archives',query:{id:item}}" >
                      <span>{{item}}</span>
                  </router-link>
              </li>
              <li v-if="this_index_archives!=pags">
                  <router-link :to="{path:'/archives',query:{id:(this_index_archives+1)}}">
                      <span class="glyphicon glyphicon-menu-right"></span>
                  </router-link>
              </li>
          </ul>
      </div>
       
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      this_artical:[],
      this_year:[],
      pags:0,
      articel_count:0,
      this_transtion:true,
    }
  },
  computed:mapGetters([
    	'this_index_archives'
  ]),
  watch:{
      $route(to,from){
            if(to.query.id){
                this.$store.dispatch('set_this_index_archives',to.query.id);
            }else{
                this.$store.dispatch('set_this_index_archives',1);
            }
            this.this_artical=[];
            this.this_year = [];
            this.$http.post('api/main/getDescArticel',{params:{pag:this.this_index_archives}}).then((response)=>{
              let datas = response.data[0];
              for(let i=0;i<datas.length;i++){
                this.this_year.push(datas[i].date.split("-")[0]);
                datas[i].date=datas[i].date.split(" ")[0];
              }
              console.log(this.this_year);
              this.this_artical=datas;
              this.pags = Math.ceil(response.data[1][0]['COUNT(*)']/10);
              this.this_transtion=true;
            }).catch((err)=>{
              console.log(response);
            })
      }
  },
  beforeRouteUpdate (to, from, next) {
  // just use `this`
    this.this_transtion=false;
    next();
  },
  mounted:function(){
    this.$store.dispatch('set_this_index_archives',1);
    this.$http.post('api/main/getDescArticel',{params:{pag:this.this_index_archives}}).then((response)=>{
      let datas = response.data[0];
      for(let i=0;i<datas.length;i++){
        this.this_year.push(datas[i].date.split("-")[0]);
        datas[i].date=datas[i].date.split(" ")[0];
      }
      this.this_artical=datas;
      this.pags = Math.ceil(response.data[1][0]['COUNT(*)']/10);
      this.articel_count = response.data[1][0]['COUNT(*)'];
    }).catch((err)=>{
      console.log(response);
    })
  },
  methods:{
    check(index){
      if(this.this_year[index]==this.this_year[index-1]){
        return false;
      }else{
        return true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    position: absolute;
    bottom:0px;
    width: 100%;
    left: 0px;
    height: 70px;
    background: #f8f8f8;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
}
.this_class a{
    background: #ccc;
    color: #fff!important;
}
.paging ul{
    border-top: 1px solid #eee;
    padding: 0px;
}
.paging ul li:hover a{
    border-top:1px solid #555;
}
.paging ul li a{
    color:#555;
    display: block;
    border-top:1px solid rgba(255,255,255,0);
    height: 100%;
    width: 100%;
    text-decoration: none;
    transition: 0.3s;
}
.paging ul li{
    display: inline-block;
    width: 31px;
    height: 31px;
    text-align: center;
    line-height: 31px;
    margin: 0px 10px;
}
.paging{
    text-align: left;
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
.words_text>div{
  position: relative;
}
.words_text>div>h2::before{
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: -2px;
}
.words_text>div>h2{
  font-size: 20px;
  margin-left: 30px;
  font-weight: 500;
  margin-bottom: 80px;
  margin-top: 65px;
}
.words_text>div>article>h3>span{
    color: #555;
    font-size: 12px;
    font-weight: 200;
    margin-right: 10px;
}
.words_text>div>article>h3>a{
    color: #666;
    text-decoration: none;
}
.words_text>div>article>h3{
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 19px;
    position: relative;
    padding-left: 20px;
    margin-bottom: 0px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
}
.words_text>div>article>h3::before{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background: #bbb;
    border-radius: 50%;
    position: absolute;
    top: 11px;
    left: 0px;
}
.words_text>div>article{
    height: 113px;
    width: 100%;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    margin-left: 3px;
    margin-bottom: 40px;
    padding: 20px;
}
.words_text{
    margin-top: 50px;
    position: relative;
    padding: 0px 10px;
}
.words_text h4{
    color: #555;
    font-size: 16px;
    margin-left: 30px;
    margin-bottom: 60px;
}
.words_text::before{
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    top: 13px;
    left: 10px;
    background: #f5f5f5;
}
.words_text h4::before{
    content: '';
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #bbb;
    position: absolute;
    top: 4px;
    left: 6px;
}
.hello{
    margin-top: 70px;
}

</style>
