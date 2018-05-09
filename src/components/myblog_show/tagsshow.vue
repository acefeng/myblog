<template>
    <div class="hello">
        <div :class="{row:true,my_transtion:this_transtion}">
            <div class="col-xs-10 col-xs-offset-1">
                <div class="words_text">
                    <h4><span>{{this_name}}</span> 标签</h4>
                    <article v-for="(item,index) in tags_art" :key="index">
                        <h3>
                            <span>{{item.date | changedate}}</span>
                            <router-link :to="{path:'/article',query:{id:item.id}}">{{item.title}}</router-link>
                        </h3>
                    </article>
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
        tags_art:{},
        this_name:'',
        this_transtion:true,
    }
  },
  mounted:function(){
      let tId=this.$route.query.id;
      this.this_name=this.$route.query.name;
      this.getThetag_artical(tId);
  },
  beforeRouteUpdate (to, from, next) {
  // just use `this`
    this.this_transtion=false;
    next();
  },
  watch:{
      $route(to,from){
          this.this_name=this.$route.query.name;
          this.getThetag_artical(to.query.id);
      }
  },
  filters: {
    changedate(value) {
        if (!value) return ''
        return value.split(' ')[0];
    }
  },
  methods:{
      getThetag_artical(id){
          this.$http.post('/api/main/tag_artical',{params:{tid:id}}).then((response)=>{
              this.tags_art=response.data;
              this.this_transtion=true;
          }).catch((err)=>{
              console.log(err);
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.words_text>article>h3>span{
    color: #555;
    font-size: 12px;
    font-weight: 200;
    margin-right: 10px;
}
.words_text>article>h3>a{
    color: #666;
    text-decoration: none;
}
.words_text>article>h3{
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
.words_text>article>h3::before{
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background: #bbb;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 0px;
}
.words_text>article{
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
}
.words_text h4{
    color: #bbb;
    font-size: 16px;
    margin-left: 30px;
    margin-bottom: 70px;
}
.words_text h4 span{
    color: #555;
    font-size: 23px;
}
.words_text::before{
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    top: 13px;
    left: 0px;;
    background: #f5f5f5;
}
.words_text h4::before{
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #bbb;
    position: absolute;
    top: 10px;
    left: -2px;
}
.hello{
    margin-top: 70px;
}
</style>
