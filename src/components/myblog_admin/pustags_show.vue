<template>
    <div class="hello">
        <div class="row">
            <div class="col-xs-8 col-xs-offset-2">
                <div class="words_text">
                    <h4><span>js</span> 标签</h4>
                    <article v-for="(item,index) in tags_art" :key="index">
                        <h3>
                            <span>{{item.date}}</span>
                            <router-link :to="{path:'/user/show/showartical',query:{id:item.id}}">{{item.title}}</router-link>
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
    }
  },
  mounted:function(){
      let tId=this.$route.query.id;
      this.getThetag_artical(tId);
  },
  watch:{
      $route(to,from){
          this.getThetag_artical(to.query.id);
      }
  },
  methods:{
      getThetag_artical(id){
          this.$http.post('/api/user/tag_artical',{params:{tid:id}}).then((response)=>{
              this.tags_art=response.data;
          }).catch((err)=>{
              console.log(err);
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    top: 7px;
    left: 0px;
}
.words_text>article{
    height: 113px;
    width: 100%;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
    margin-left: 3px;
    margin-bottom: 20px;
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
    margin-bottom: 40px;
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
