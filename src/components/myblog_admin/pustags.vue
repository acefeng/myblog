<template>
  <div class="hello">
    <div class="row animated jackInTheBox">
      <div class="col-md-8 col-md-offset-2 col-xs-12 tags_main">
        <h3>tags</h3>
        <h6>此时共计{{tags_length}}个标签</h6>
        <div class="tagsshow" id="inshow">
          <div class="a_show" v-for="item in tags_show" :key="item.id">
            <router-link :to="{path:'/user/pustags/pustagsshow',query:{id:item.id}}" :style="{fontSize:item.font_size,opacity:item.opacity}">{{item.name}}</router-link>
            <span @click="getTagname(item)" data-toggle="modal" data-target="#myModal">×</span>
          </div>
        </div>
        <div class="setgats">
          <div>
            <input type="text" id="tags" placeholder="请在此输入想添加的标签">
          </div>
          <div>
            <span></span>
            <button class="btn_focus" @click="setTags">Submit</button>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <!-- 弹出模态框 -->
    <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">确认删除？</h4>
          </div>
          <div class="modal-body">
            <p>确认删除 <span>{{this_cltagname}}</span> 标签?</p>
            <p><span>注：</span>操作无法返回！</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"  @click="delect">确认</button>
          </div>
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
      tags_length:0,
      tags_show:[],
      this_cltagid:0,
      this_cltagname:'',
      changeFont:'',
      changeOpcity:'',
    }
  },
  mounted:function(){
    this.$http.post('/api/user/gettag').then((response)=>{
      this.tags_length=response.data.length;
      this.tags_show=response.data;
    }).catch((err)=>{
      console.log(err);
    })
  },
  computed:{
  },
  methods:{
    setTags(){
      let thetags = document.getElementById('tags').value;
      this.$http.post('api/user/settags',{params:{tags:thetags}}).then((response)=>{
        this.tags_length=response.data.length;
        this.tags_show=response.data;
        document.getElementById('tags').value='';
      }).catch((err)=>{
        console.log(err);
      })
    },
    getTagname(item){
      this.this_cltagid=item.id;
      this.this_cltagname=item.name;
    },
    delect(){
      $('#myModal').modal('hide');
      this.$http.post('api/user/delet_tag',{params:{delect_id:this.this_cltagid}}).then((response)=>{
          this.tags_length=response.data.length;
          this.tags_show=response.data;
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_focus{
  color: #333;
  background: #fff;
  border:1px solid #ccc;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
}
.btn_focus:hover{
  background: #ccc;
  color: white;
}
.setgats{
  width: 70%;
  margin: 0 auto;
  margin-top: 70px;
  
  height: 80px;
  border: 2px solid rgba(117,116,111,0.3);
}
.setgats>div:nth-child(1){
  height: 40px;
  border-bottom: 1px solid rgba(221,221,219,0.6);
  margin: 0px 10px;  
}
.setgats>div:nth-child(1)>input{
  height: 100%;
  width: 70%;
  border: none;
  outline: none;
}
.modal-body>p>span{
  color: red;
}
.tags_main{
  text-align: center;
  margin-top: 10%;
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
