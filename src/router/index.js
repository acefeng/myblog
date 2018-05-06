import Vue from 'vue'
import Router from 'vue-router'

// 模板引入
//管理员端
import User from '@/components/myblog_admin/user.vue'
import Show from '@/components/myblog_admin/show.vue'
import Pustags from '@/components/myblog_admin/pustags.vue'
import Tagspus from '@/components/myblog_admin/tagspus.vue'
import Simplemde from '@/components/myblog_admin/simplemde.vue'
import Show_artical from '@/components/myblog_admin/show_artical.vue'
import Pustags_show from '@/components/myblog_admin/pustags_show.vue'
import Words from '@/components/myblog_admin/words.vue'


//用户显示端
import Main from '@/components/myblog_show/main.vue'
import Index from '@/components/myblog_show/index.vue'
import Archives from '@/components/myblog_show/archives.vue'
import Messages from '@/components/myblog_show/messages.vue'
import Resume from '@/components/myblog_show/resume.vue'
import Tags from '@/components/myblog_show/tags.vue'
Vue.use(Router)

export default new Router({
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
      ]
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
          component:Tags
        }
      ]
    }
  ]
})
