<template>
    <div class="hello">
        <div class="row animated bounceInDown">
            <div class="col-xs-10 col-xs-offset-1">
                <div class="words_text">
                    Leave a Reply
                </div>
                <div class="user_word">
                    <textarea placeholder="路过留点评论吧~~" v-model="reply_main"></textarea>
                    <input type="text" placeholder="请输入您的昵称~" v-model="reply_name">
                    <input type="text" placeholder="请输入您的邮箱~" v-model="reply_email">
                    <div>
                        <button @click="push()">
                          确认回复~
                          <div class="email_not animated fadeIn" v-if="email_not==1&&reply_email==''">
                            <span>确认不填写邮箱请再次提交~</span>
                          </div>
                        </button>
                    </div>
                </div>
                <div class="words_show">
                    <article v-for="(item,index) in words" :key="index">
                        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                        <div>
                            <p>{{item.name}}</p>
                            <p>{{item.date}}</p>
                            <p>{{item.main}}</p>
                        </div>
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
      reply_email:'',//用户邮箱
      reply_main:'',
      reply_name:'',
      email_not:0,
    }
  },
  mounted:function(){
      this.$http.post('api/main/getAllwords').then((response)=>{
          this.words=response.data;
      }).catch((err)=>{
          conosle.log(err);
      })
  },
  methods:{
    push(){
      if(this.reply_main==''){
        alert('请输入留言内容');
      }else if(this.reply_name==''){
        alert('请输入用户名');
      }else if(this.email_not==0&&this.reply_email==''){
        this.email_not=1;
      }else{
        this.$http.post('api/main/setWords',{params:{email:this.reply_email,main:this.reply_main,name:this.reply_name,date:this.getDate()}})
        .then((responses)=>{
          this.$http.post('api/main/getAllwords').then((response)=>{
              this.words=response.data;
              this.email_not=0;
              this.reply_email='';
              this.reply_main='';
              this.reply_name='';
              alert(responses.data);
          }).catch((err)=>{
              conosle.log(err);
          })
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    getDate(){
        let nowDate = new Date();
        let y = nowDate.getFullYear();
        let mo = nowDate.getMonth()+1;
        if(mo<10){
            mo='0'+mo;
        }
        let d = nowDate.getDate();
        if(d<10){
            d='0'+d;
        }    

        let h = nowDate.getHours();
        if(h<10){
            h='0'+h;
        }   
        let m = nowDate.getMinutes();
        if(m<10){
            m='0'+m;
        }  
        let s = nowDate.getSeconds();
        if(s<10){
            s='0'+s;
        }  

        return y+'-'+mo+'-'+d+' '+h+':'+m+':'+s;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email_not span::before{
  content: '';
  width: 0px;
  height: 0px;
  border: 8px solid;
  border-color: white white white rgb(186,255,111);
  position: absolute;
  top: -1px;
  right: -38px;
}
.email_not>span{
  position: relative
}
.email_not{
  position: absolute;
  top:10px;
  left: -140px;
  color: red;
  font-size: 14px;
  background: rgb(186,255,111);
  padding: 5px 10px;
  opacity: 0.8;
  width: 120%;
  border-radius: 10px;
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
    position: relative;
}
.user_word>div>button:hover{
    background-color: #c9302c;
    border-color: #761c19;
}
.words_text{
    margin-top: 40px;
    font-size: 20px;
}
.hello{
    margin-top: 10px;
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
