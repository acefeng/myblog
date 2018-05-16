<template>
  <div class="hello">
    <div>
        <input type="text" class="simple_text" placeholder="请输入标题" v-model="simple_title">
    </div>
    <div class="row simple_row">
        <div class="col-xs-8">
            <div class="dropdown sim_drop">
                <button class="btn btn-default dropdown-toggle modo_par" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                    <span class="caret"></span>
                    <transition
                        name="custom-classes-transition"
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                    >
                        <div class="user_modo" v-show="mode_show">
                            {{mode_ushow}}
                        </div>
                    </transition> 
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li v-for="(item,index) in tag" :key="index"><a href="javascript:;" @click="simple_but($event,item)">{{item.name}}</a></li>
                </ul>
            </div>
            <span id="simple_IN">
                <span v-for="(item,index) in simple_in" :key="index">{{item}}<span class="glyphicon glyphicon-remove" @click="simple_move($event,index)"></span></span>
            </span>
        </div>
        <div class="col-xs-4">
            <button type="button" class="btn btn-warning simple_button" @click="delete_article">
                删除该文章
            </button>
            <button type="button" class="btn btn-success simple_push simple_button" @click="push_article">发布文章</button>
        </div>
    </div>
    <editor id="editor_id" height="500px" width="100%" 
        :content="editorText"
        :loadStyleMode="false"
        :resizeType="0"
        :allowFileManager='true'
        :allowImageUpload="true"
        uploadJson='api/user/uploadImg'
        :afterUpload="upload_json"
        :filterMode="false"
        :cssData= this.pre_style
        @on-content-change="onContentChange" 
        ></editor>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
        isId:0,
        simple_title:'',
        editorText: '',//HTML编辑器内部数据
        tag:{},
        simple_in:[],//标签数据
        jsontag:{},//用来文章上传的id和数据
        mode_show:false,
        timer:null,
        mode_ushow:'请勿输入重复标签',
        main_si:'',
        count:0,
        pre_style:`
        .pln{color:#000}@media screen{.str{color:#080}.kwd{color:#008}.com{color:#800}.typ{color:#606}.lit{color:#066}.pun,.opn,.clo{color:#660}.tag{color:#008}.atn{color:#606}.atv{color:#080}.dec,.var{color:#606}.fun{color:red}}@media print,projection{.str{color:#060}.kwd{color:#006;font-weight:bold}.com{color:#600;font-style:italic}.typ{color:#404;font-weight:bold}.lit{color:#044}.pun,.opn,.clo{color:#440}.tag{color:#006;font-weight:bold}.atn{color:#404}.atv{color:#060}}pre.prettyprint{padding:2px;border:1px solid #888}ol.linenums{margin-top:0;margin-bottom:0}li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8{list-style-type:none}li.L1,li.L3,li.L5,li.L7,li.L9{background:#eee}
        pre.prettyprint {
            border: 1px solid rgb(204, 204, 204);  
            background-color:#F8F8F8;  
            margin-left: 2em;  
            padding: 0.5em;  
            font-size: 110%;  
            display: block;  
            font-family: "Consolas", "Monaco", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace;  
            margin: 1em 0px;  
            white-space: pre-wrap;  
        }
        `
    }
  }, 
  computed:mapGetters([
    	'getserver'
  ]),
  watch:{
      $route(to,from){
            if(!this.$route.query.id){
                this.isId=0;
                this.simple_title='';
                this.editorText='';//HTML编辑器内部数据
                this.simple_in=[];//标签数据
                this.jsontag={};//用来文章上传的id和数据
                this.mode_show=false
                this.timer=null;
                this.mode_ushow='请勿输入重复标签';
                this.main_si='';
                this.count=0;
            }else{
                this.isId=0;
                this.simple_title='';
                this.editorText='';//HTML编辑器内部数据
                this.simple_in=[];//标签数据
                this.jsontag={};//用来文章上传的id和数据
                this.mode_show=false
                this.timer=null;
                this.mode_ushow='请勿输入重复标签';
                this.main_si='';
                this.count=0;
                this.$http.post('api/user/showArtical',{params:{id:this.$route.query.id}}).then((response)=>{
                    this.isId=this.$route.query.id;
                    this.simple_title=response.data.title;
                    this.editorText=response.data.main;
                    for(let i in response.data.tags){
                        this.simple_in.push(response.data.tags[i]);
                        this.jsontag[response.data.tags[i]]=i;
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
            this.$http.post('api/user/gettag').then((response)=>{
                this.tag = response.data;
            }).catch((err)=>{
                console.log(err)
            })
      }
  },
  mounted:function(){
      if(this.$route.query.id){
        this.$http.post('api/user/showArtical',{params:{id:this.$route.query.id}}).then((response)=>{
            this.isId=this.$route.query.id;
            this.simple_title=response.data.title;
            this.editorText=response.data.main;
            for(let i in response.data.tags){
                this.simple_in.push(response.data.tags[i]);
                this.jsontag[response.data.tags[i]]=i;
            }
        }).catch((err)=>{
            console.log(err);
        })
      }
      this.$http.post('api/user/gettag').then((response)=>{
          this.tag = response.data;
      }).catch((err)=>{
          console.log(err)
      })
  },
  methods: {
    delete_article(){
        if(this.isId==0){
            alert('此时无法删除');
        }else{
            this.$http.post('api/user/deleteArtical',{params:{id:this.isId}}).then((response)=>{
                this.$http.post('api/user/selartical').then((response)=>{
                    this.$store.dispatch('updateAtshow',response.data);
                    console.log('获取初始数据成功');
                }).catch((err)=>{
                    console.log(err);
                })
                this.$router.push('/user/tagspus/simplemde');
                alert(response.data);
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    push_article(){
        if(this.simple_title==''){
            alert('标题不能为空');
        }else if(this.editorText==''){
            alert('内容不可为空');
        }else if(this.simple_in.length==0){
            alert('请选择一个标签');
        }else{
            const nowD = this.getDate();
            this.$http.post('api/user/add',{
                params:{
                        id:this.isId,
                        title:this.simple_title,
                        main:this.editorText,
                        font_number:this.editorText.replace(/<[^>]+>/g,"").length,
                        date:nowD,
                        tag:this.jsontag
                    }}).then((response)=>{
                        this.$http.post('api/user/selartical').then((response)=>{
                            this.$store.dispatch('updateAtshow',response.data);
                            this.$router.push('/user/tagspus/simplemde?id='+response.data[response.data.length-1].id);
                            console.log('获取初始数据成功');
                        }).catch((err)=>{
                            console.log(err);
                        })
                        alert(response.data);
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
    upload_json(url){//发送请求获取图片
        // console.log(url);
        // this.$http.post('api/user/public/images',{params:{theurl:url}}).then((response)=>{
        //     console.log(response)
        // }).catch((err)=>{
        //     console.log(err);
        // })
        let reg=/^.+public/;
        let inurl = url.replace(reg,'');
        this.editorText = this.editorText+
        `<img src="${this.getserver+inurl}" alt="" width="200"/>`;
    },
    onContentChange (val) {//此处为编辑器输出部分
        this.editorText = val
    },
    simple_but(ev,item){
        //此处注意要保存一下外部的this 否则在使用settimeout改变变量的时候不好使
        var self=this;
        if(this.simple_in.indexOf(ev.target.innerHTML)>=0){
            this.mode_ushow='请勿输入重复标签';
            this.mode_show=true;
            clearTimeout(this.timer);
            this.timer=setTimeout(function(){
                self.mode_show=false;
            },3000)
        }else{
            if(this.simple_in.length==3){
                this.mode_ushow='最多可以添加三个'
                this.mode_show=true;
                clearTimeout(this.timer);
                this.timer=setTimeout(function(){
                    self.mode_show=false;
                },3000)
            }else{
                this.simple_in.push(ev.target.innerHTML);
            }
        } 
        //保存标签的数据库id和数据
        this.jsontag[item.name]=item.id;
    },
    simple_move(ev,index){
        var in_simple=this.simple_in;
        delete  this.jsontag[this.simple_in[index]];
        console.log(this.jsontag)
        in_simple.splice(index,1);
        this.simple_in=in_simple;
        
    }
  }
}
</script>
<style>
.ke-toolbar{
    background-color:#f1f1f1!important;
    border: 1px solid #e7e7e7;
    margin-top: 2px;
}
.ke-container{
    border: 1px solid #e7e7e7;
    border-top:none;
}
.ke-statusbar{
    border: 1px solid #e7e7e7;
    background: #e7e7e7;
    height: 1px;
    border-color: transparent
}
</style>
<style scoped>
.modo_par{
    position: relative;
    outline:none;
}
.modo_par:focus{
    outline:none;
}
.user_modo{
    position: absolute;
    height: 35px;
    line-height:35px;
    text-align:center;
    width:130px;
    right: -140px;
    top:-25px;
    background:rgba(1,1,1,0.1);
    border-radius:6px 6px 6px 0px;
}
.user_modo::before{
    content:'';
    display: block;
    width:0px;
    height: 0px;
    border:7px solid black;
    border-left-color:transparent;
    border-bottom-color:transparent;
    border-top-color:transparent;
    opacity: 0.1;
    position: absolute;
    left: -14px;
    bottom:0px;
}
.sim_drop{
    vertical-align: top;
    display:inline-block;
}
#simple_IN{
    display: inline-block;
    height: 100%;
    width:80%;
    overflow: scroll;
}
#simple_IN>span{
    background:rgba(18,206,102,.1);
    border:1px solid rgba(18,206,102,.2);
    color:#13ce66;
    padding:6px;
    border-radius: 5px;
    margin-left:5px;
}
#simple_IN>span>span:hover{
    cursor: pointer;
}
.simple_text{
    outline:none;
    width:100%;
    border: 1px solid #e7e7e7;        
    font-size:20px;
    padding:10px 15px;
}
.simple_row{
    margin: 0px;
    height: 60px;
    line-height:60px;
    border: 1px solid #e7e7e7; 
    transition:0.5s;
}
.simple_row>div{
    height: 60px;
}
.simple_push{
    margin-left:10px;
    transition:0.5s;
}
.simple_button{
    font-size:10px;
}
@media screen and (max-width: 800px) {
    .simple_row{
        height: 120px;
    }
    .simple_push{
        margin:0px;
    }
}
</style>

