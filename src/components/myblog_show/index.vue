<template>
    <div class="index">
        <div>
            <article v-for="item in this_articels" :key="item.id">
                <h3>
                    <router-link :to="{path:'/article',query:{id:item.id}}">
                        {{item.title}}
                    </router-link>
                </h3>
                <p> 
                    <span class="glyphicon glyphicon-save"></span>
                    <span>{{item.date}}</span>
                    <span class="glyphicon glyphicon-list-alt"></span>
                    <span>{{item.font_number}}字</span>
                </p>
                <div>
                    {{item.main | change_main}}
                </div>
                <div>
                    <router-link :to="{path:'/article',query:{id:item.id}}">
                        阅读全文 »
                    </router-link>
                </div>
            </article>
        </div>
        <div class="paging">
            <ul>
                <li v-if="this_index!=1">
                    <router-link :to="{path:'/',query:{id:(this_index-1)}}">
                        <span class="glyphicon glyphicon-menu-left"></span>
                    </router-link>
                </li>
                <li v-for="(item,index) in pags" :key="index" :class="{this_class:this_index==item}">
                    <router-link :to="{path:'/',query:{id:item}}" >
                        <span>{{item}}</span>
                    </router-link>
                </li>
                <li v-if="this_index!=pags">
                    <router-link :to="{path:'/',query:{id:(this_index+1)}}">
                        <span class="glyphicon glyphicon-menu-right"></span>
                    </router-link>
                </li>
            </ul>
        </div>   
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
        this_articels:{},
        pags:0,
    }
  },
  computed:mapGetters([
    	'this_index'
  ]),
  watch:{
      $route(to,from){
            if(to.query.id){
                this.$store.dispatch('set_this_index',to.query.id);
            }else{
                this.$store.dispatch('set_this_index',1);
            }
            this.$http.post('api/main/getAllArticel',{params:{pag:this.this_index}})
            .then((response)=>{
                this.this_articels=response.data[0];
                this.pags = Math.ceil(response.data[1][0]['COUNT(*)']/5);
            }).catch((err)=>{
                console.log(err);
            })
      }
  },
  filters: {
    change_main(value) {
        if (!value) return ''
        value = value.toString().replace(/<[^>]+>/g,"");
        if(value.length>=150){
            return value.slice(0,150)+' ...';
        }else{
            return value;
        }
    }
  },
  created:function(){
  },
  mounted:function(){
      this.$store.dispatch('set_this_index',1);
      this.$http.post('api/main/getAllArticel',{params:{pag:this.this_index}})
      .then((response)=>{
          this.this_articels=response.data[0];
          this.pags = Math.ceil(response.data[1][0]['COUNT(*)']/5);
      }).catch((err)=>{
          console.log(err);
      })
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.glyphicon-menu-left,.glyphicon-menu-right{
    font-size: 12px;
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
@media (max-width: 767px){
    .paging{
        text-align: center;
    }
}
.index>div>article>div>a{
    font-size: 14px;
    color: #555;
    text-decoration: none;
    padding-bottom: 3px;
}
.index>div>article>div>a:hover{
    border-bottom: 2px solid #666;
}
.index>div>article{
    opacity: 0;
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
.index>div>article>div{
    line-height: 2;
    margin-top: 15px;
    font-size: 14px;
    color: #555;
}
.index>div>article>h3:hover a::after{
    width: 100%;
}
.index>div>article>h3>a::after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 0px;
    height: 2px;
    background: #555;
    transition: 0.5s;
}
.index>div>article>h3>a{
    position: relative;
    color: #555; 
    text-decoration: none;
}
.index>div>article>h3{
    margin-bottom: 20px;
    display: inline-block;
}
.index>div>article>p>span{
    color: #999;
    font-size: 12px;
}
.index>div{
    margin-top: 50px;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
}
.index>div>article{
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    width: 95%;
    padding: 35px;
    margin: 0px auto;
    margin-bottom: 60px;
}
</style>
