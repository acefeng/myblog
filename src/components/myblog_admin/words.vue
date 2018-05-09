<template>
    <div class="hello">
        <div class="row animated bounceInDown">
            <div class="col-xs-8 col-xs-offset-2">
                <div class="words_text">
                    Leave a Reply
                </div>
                <div class="user_word">
                    <textarea placeholder="反馈内容~~" v-model="reply_main"></textarea>
                    <input type="text" placeholder="反馈自我介绍~" v-model="reply_title">
                    <input type="text" placeholder="输入想要给反馈的邮箱~" v-model="reply_email">
                    <div>
                        <span v-if="reply_name">此时正在回复用户 {{reply_name}} <span v-if="!reply_email">该用户没有输入邮箱</span></span>
                        <button @click="send_reply">确认回复~</button>
                    </div>
                </div>
                <div class="words_show">
                    <article v-for="item in words" :key="item.id">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <div>
                            <p>{{item.name}}</p>
                            <p>{{item.date}}</p>
                            <p>{{item.main}}</p>
                        </div>
                        <div class="show_reply" v-if="item.my_reply">已回复</div>
                        <div class="show_reply" v-else @click="reply_this(item)" style="color:red;cursor: pointer;">
                            未回复
                        </div>
                        <i class="words_del" @click="delect_word(item.id)">删除该留言</i>
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
      words:{},
      reply_name:'',//反馈用户名
      reply_email:'',//反馈用户邮箱
      reply_id:0,
      reply_main:'',
      reply_title:'你好，我是acefeng。',
    }
  },
  mounted:function(){
      this.$http.post('api/user/getAllwords').then((response)=>{
          this.words=response.data;
      }).catch((err)=>{
          conosle.log(err);
      })
  },
  methods:{
      delect_word(id){
          this.$http.post('api/user/delect_words',{params:id}).then((response)=>{
                this.$http.post('api/user/getAllwords').then((response)=>{
                    this.words=response.data;
                }).catch((err)=>{
                    conosle.log(err);
                })
                alert(response.data);
          }).catch((err)=>{
                console.log(err);
          })
      },
      reply_this(item){
          this.reply_name=item.name;
          this.reply_email=item.email;
          this.reply_id=item.id;
          scrollTo(0,0);
      },
      send_reply(){
          this.$http.post('api/user/relply_email',{params:{
              r_email:this.reply_email,
              r_id:this.reply_id,
              r_title:this.reply_title,
              r_main:this.reply_main,
              }
            })
          .then((response)=>{
              this.words=response.data;
              alert('邮件已发送成功');
          }).catch((err)=>{
              console.log(err);
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.words_show article:hover .words_del{
    bottom: 13px;
}
.words_del{
    position: absolute;
    bottom: -20px;
    font-style: normal;
    right: 3px;
    color: red;
    transition: 0.5s;
    cursor: pointer;
}
.show_reply{
    position: absolute;
    right: 0px;
    font-size: 14px;
    color: rgb(0,255,0);
}
.words_show article>div>p:nth-child(1){
    font-size: 18px;
    color: #333;
    margin: 0px;
}
.words_show article>div>p:nth-child(2){
    font-size: 12px;
    color: #ccc;
}
.words_show article>div{
    display: inline-block;
    margin-left: 10px;
}
.words_show article{
    border-bottom:  1px solid #e5eaed;
    margin-top: 20px;
    padding-bottom: 20px;
    position: relative;
    overflow: hidden;
}
.words_show article span{
    vertical-align: top;
    display: inline-block;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: rgb(196,196,196);
    color: white;
    font-size: 40px;
    border-radius: 50%;
}
.user_word>div>span{
    vertical-align: bottom;
    font-size: 12px;
    color: red;
}
.user_word>div>span>span{
    vertical-align: bottom;
}
.user_word>div{
    text-align: right;
    margin: 20px 0px;
}
.user_word>div>button{
    background: #d9534f;
    border: #d43f3a;
    padding: 10px 20px;
    color: #fff;
    border-radius: 5px;
    outline: none;
}
.user_word>div>button:hover{
    background-color: #c9302c;
    border-color: #761c19;
}
.words_text{
    margin-top: 30px;
    font-size: 20px;
}
.hello{
    margin-top: 70px;
}
.user_word textarea{
    width: 100%;
    height: 250px;
    border: 1px solid #d9d9d9;
    background: #f4f6f7;
    outline: none;
    resize:none;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    font-size: 17px;
}
.user_word>input{
    margin-top: 10px;
    border: 1px solid #d9d9d9;
    outline: none;
    background: #f4f6f7;
    border-radius: 5px;
    width: 45%;
}
.user_word>input:nth-child(3){
    float: right;
    
}
</style>
