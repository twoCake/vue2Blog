import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制台', icon: 'dashboard', auth: true }
    }]
  },
  // 首页标语
  {
    path: '/banner',
    component: Layout,
    children: [
      {
        path: '/banner',
        name: 'Banner',
        component: () => import('@/views/banner/index.vue'),
        meta: { title: '首页标语', icon: 'el-icon-s-home', auth: true }
      }
    ]
  },
  // 文章管理
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog',
    name: 'Blog',
    meta: { title: '文章管理', icon: 'el-icon-edit-outline', auth: true },
    children: [
      {
        path: '/blogList',
        name: 'BlogList',
        component: () => import('@/views/blog/blogList/index.vue'),
        meta: { title: '文章列表', icon: 'table', auth: true }
      },
      {
        path: '/blogType',
        name: 'BlogType',
        component: () => import('@/views/blog/blogType/index.vue'),
        meta: { title: '文章分类', icon: 'tree', auth: true }
      },
      {
        path: '/addBlog',
        name: 'AddBlog',
        component: () => import('@/views/blog/addBlog/index.vue'),
        meta: { title: '添加文章', icon: 'el-icon-plus', auth: true }
      },
      {
        path: '/editBlog/:id',
        name: 'EditBlog',
        hidden: true, //使其不出现在侧边栏
        component: () => import('@/views/blog/editBlog/index.vue'),
        meta: { title: '编辑文章', icon: 'el-icon-plus', auth: true }
      }
    ]
  },
  // 项目管理
  {
    path: '/project',
    component: Layout,
    redirect: '/project',
    name: 'Project',
    meta: { title: '项目管理', icon: 'el-icon-suitcase', auth: true },
    children: [
      {
        path: '/projectList',
        name: 'ProjectList',
        component: () => import('@/views/project/projectList/index.vue'),
        meta: { title: '项目列表', icon: 'el-icon-notebook-1', auth: true }
      },
      {
        path: '/addProject',
        name: 'AddProject',
        component: () => import('@/views/project/addProject/index.vue'),
        meta: { title: '添加项目', icon: 'el-icon-plus', auth: true }
      },
    ]
  },
  // 评论管理
  // {
  //   path: '/comment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/comment',
  //       name: 'Comment',
  //       component: () => import('@/views/comment/index.vue'),
  //       meta: { title: '评论管理', icon: 'el-icon-chat-line-round', auth:true  }
  //     }
  //   ]
  // },
  // 留言板
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/index.vue'),
        meta: { title: '留言板', icon: 'el-icon-document', auth: true }
      }
    ]
  },
  // 设置
  {
    path: '/set',
    component: Layout,
    children: [
      {
        path: '/set',
        name: 'Set',
        component: () => import('@/views/set/index.vue'),
        meta: { title: '设置', icon: 'el-icon-setting', auth: true }
      }
    ]
  },
  // 修改密码
  {
    path: '/changePwd',
    component: Layout,
    children: [
      {
        path: '/changePwd',
        name: 'ChangePwd',
        component: () => import('@/views/changePwd/index.vue'),
        meta: { title: '修改', icon: 'el-icon-lock', auth: true }
      }
    ]
  },
  // 关于我
  // {
  //   path: '/about',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/about',
  //       name: 'About',
  //       component: () => import('@/views/about/index.vue'),
  //       meta: { title: '关于我', icon: 'el-icon-user', auth:true  }
  //     }
  //   ]
  // },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
