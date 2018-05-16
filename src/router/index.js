import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'

// 模板引入
//管理员端
// import User from '@/components/myblog_admin/user.vue'
// import Show from '@/components/myblog_admin/show.vue'
// import Pustags from '@/components/myblog_admin/pustags.vue'
// import Tagspus from '@/components/myblog_admin/tagspus.vue'
// import Simplemde from '@/components/myblog_admin/simplemde.vue'
// import Show_artical from '@/components/myblog_admin/show_artical.vue'
// import Pustags_show from '@/components/myblog_admin/pustags_show.vue'
// import Words from '@/components/myblog_admin/words.vue'
//管理员端懒加载
var User = r => require.ensure([], () => r(require('@/components/myblog_admin/user.vue')), "User");
var Show = r => require.ensure([], () => r(require('@/components/myblog_admin/show.vue')), "show");
var Pustags = r => require.ensure([], () => r(require('@/components/myblog_admin/pustags.vue')), "pustags");
var Tagspus = r => require.ensure([], () => r(require('@/components/myblog_admin/tagspus.vue')), "tagspus");
var Simplemde = r => require.ensure([], () => r(require('@/components/myblog_admin/simplemde.vue')), "simplemde");
var Show_artical = r => require.ensure([], () => r(require('@/components/myblog_admin/show_artical.vue')), "show_artical");
var Pustags_show = r => require.ensure([], () => r(require('@/components/myblog_admin/pustags_show.vue')), "pustags_show");
var Words = r => require.ensure([], () => r(require('@/components/myblog_admin/words.vue')), "words");

//用户显示端
// import Main from '@/components/myblog_show/main.vue'
// import Index from '@/components/myblog_show/index.vue'
// import Archives from '@/components/myblog_show/archives.vue'
// import Messages from '@/components/myblog_show/messages.vue'
// import Resume from '@/components/myblog_show/resume.vue'
// import Tags from '@/components/myblog_show/tags.vue'
// import Article from '@/components/myblog_show/article.vue'
// import TagsShow from '@/components/myblog_show/tagsshow.vue'
var Main = r => require.ensure([], () => r(require('@/components/myblog_show/main.vue')), "main");
var Index = r => require.ensure([], () => r(require('@/components/myblog_show/index.vue')), "index");
var Archives = r => require.ensure([], () => r(require('@/components/myblog_show/archives.vue')), "archives");
var Messages = r => require.ensure([], () => r(require('@/components/myblog_show/messages.vue')), "messages");
var Resume = r => require.ensure([], () => r(require('@/components/myblog_show/resume.vue')), "resume");
var Tags = r => require.ensure([], () => r(require('@/components/myblog_show/tags.vue')), "tags");
var Article = r => require.ensure([], () => r(require('@/components/myblog_show/article.vue')), "article");
var TagsShow = r => require.ensure([], () => r(require('@/components/myblog_show/tagsshow.vue')), "tagsshow");

Vue.use(Router)

const router=new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        { 
          path: '/', 
          component: Show,
          children:[
            {path:'showartical',component:Show_artical}
          ]
        },
        { 
          path: 'show', 
          component: Show,
          children:[
            {path:'showartical',component:Show_artical}
          ]
        },
        { path: 'tagspus', 
          component: Tagspus,
          children:[
            {path:'simplemde',component:Simplemde}
          ]
        },
        { path: 'pustags', 
          component: Pustags,
          children:[
            {path:'pustagsshow',component:Pustags_show}
          ]
        },
        { path: 'words', 
          component: Words,
        }
      ],
      meta: { 
        requireAuth: true
      }
    },
    {
      path:'/',
      name:'Main',
      component:Main,
      children:[
        { 
          path: '', 
          component: Index
        },
        { 
          path: '/article', 
          component: Article
        },
        {
          path:'/archives',
          component:Archives
        },
        {
          path:'/messages',
          component:Messages
        },
        {
          path:'/resume',
          component:Resume
        },
        {
          path:'/tags',
          component:Tags,
          children:[
            {
              path:'tagsShow',
              component:TagsShow
            }
          ]
        }
      ]
    }
  ]
})
//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (sessionStorage.getItem('user_name')) {// 判断是否登录
      Axios.post('api/main/getUser_name').then((response)=>{
        if(response.data){
          next();
        }else{
          sessionStorage.removeItem('user_name');
          next({
            path: '/',
          })
          alert('登录异常，请重新登录');
          window.location.reload(); 
        }
      }).catch((err)=>{
        console.log(err);
      })
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
      })
      alert('请先登录~');
    }
  } else {
    next()
  }
})
export default router