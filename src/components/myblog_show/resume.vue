<template>
  <div class="hello">
      <div class="main">
        <h1>尚国睿</h1>
        <h1>目标岗位：前端开发工程师</h1>
        <h2>联系方式：</h2>
        <ul>
          <li>手机：18846420881</li>
          <li>QQ/微信：741234139</li>
          <li>e-mail：741234139@qq.com</li>
        </ul>
        <h2>个人信息：</h2>
        <ul>
          <li>尚国睿/男/1996</li>
          <li>哈尔滨理工大学/软件工程/本科(2015-2019)</li>
          <li>技术博客：http://www.acefeng.com</li>
          <li>github：https://github.com/acefeng</li>
          <li>专业技能：掌握计算机网络、数据结构、算法等基础知识</li>
          <li style="line-height:1.7;">职业技能：掌握w3c标准以及HTML，CSS，JavaScript等前端开发基础，
              以及HTML5，CSS3，ECMAScript6新特性，
              了解前端工程化，熟悉前端开发框架vue.js，
              熟悉前后端Ajax交互，
              了解node.js的基本使用，
              能够使用node.js搭建服务端程序。具有独立建站能力。
          </li>
        </ul>
        <h2>自我评价：</h2>
        <ul>
          <li>热爱技术，喜欢研究技术，热衷于接受新知识，并且快速接受、使用、理解。</li>
          <li>为人乐观，并且具有较强的适应能力，能快速融入新环境。</li>
          <li>与人交流能力较强，不怯场。勇于承担，勇于接触新鲜事物。</li>
        </ul>
        <h2>项目经验：</h2>
        <h3>个人博客(http://www.acefeng.com)</h3>
        <ul style="margin-left:10px;">
          <li>项目简介：个人搭建博客系统，包括管理员端数据管理和客户端显示界面。</li>
          <li>
            主要技术：vue+vuex+vue-router vue全家桶实现该项目客户端，
            使用kindeditor作为博客的内部html编辑器，实现图片上传、html自动转码等功能。
            node.js中express框架实现后端编写。mysql用来存储数据。是一个SPA项目。
          </li>
          <li>
            承担任务：前端编写和服务端编写(完全个人完成)。
          </li>
        </ul>
        <h2>致谢：</h2>
        <footer>
          感谢您阅读我的简历，期望有与您共事的机会。
        </footer>
      </div>
      <div id="lv-container" data-id="city" data-uid="MTAyMC8zNjIxNC8xMjc0OQ==">
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{
  },
  mounted:function(){
    (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];

       if (typeof LivereTower === 'function') { return; }

       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
    })(document, 'script');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
  text-indent: 20px;
}
.main ul{
  margin-top: 20px;
}
.main ul li{
  list-style: circle;
  font-size: 14px;
  margin-top: 10px;
}
.main h3{
  font-size: 20px;
  margin-top: 30px;
  margin-left: 5px;
}
.main h2{
  font-size: 22px;
  margin-top: 30px;
  padding-top: 10px;
}
.main h1{
  font-size: 24px;
  margin-top: 30px;
}
.main{
  width: 90%;
  margin: 0 auto;
  margin-top: 70px;
  color: #555;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  animation: article_show 1s infinite;
  animation-iteration-count: 1;
  animation-fill-mode:forwards;
  -webkit-animation-fill-mode:forwards;
  margin-bottom: 80px;
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
</style>
