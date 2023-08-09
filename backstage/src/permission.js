import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in

  // 获取本地用户信息
  const hasGetUserInfo = store.getters.user;

  if(to.meta.auth){
    // 说明页面需要鉴权
    if(hasGetUserInfo){
      // 有用户信息，那么直接放行
      next();
    }else{
      // 没有用户信息，检查是否有token
      const hasToken = localStorage.getItem("adminToken");
      if(hasToken){
        // 有token，验证token有效性
        try {
          // 检查到token仍然有效
          await store.dispatch("user/getInfo")
          next();
        } catch (error) {
          // token无效
          await store.dispatch("user/resetToken")
          Message.error("登录过期，请重新登录~")
          next(`/login?redirect=${to.path}`)
          NProgress.done();
        }
      }else{
        // 没有token，所以需要重新登录
        next(`/login?redirect=${to.path}`)
        NProgress.done();
      }
    }
  }else{
    // 说明页面不需要鉴权
    if(to.path === "/login" && hasGetUserInfo){
      // 说明已在登录的状态下要去login页面，但是已经有用户信息了，所以将其导航到首页
      next({path:"/"})
    }else{
      // 既不需要鉴权。又不是去login页面，就直接放行
      next()
    }
    NProgress.done();
  }

  // vue-element-admin的原始鉴权流程
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
