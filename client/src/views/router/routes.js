import NotFound from "@/views/NotFound"

const routes = [
    // 首页
    {
        name:"home",
        path: "/",
        // 页面分包，路由懒加载
        component: ()=>import(/* webpackChunkName:"home" */ "@/views/Home/Home.vue"),
        meta:{
            pageTitle:"天灯-首页"
        }
    },
    // 关于我
    {
        name: "about",
        path: "/about",
        component: ()=>import(/* webpackChunkName:"about" */ "@/views/About.vue"),
        meta:{
            pageTitle:"天灯-关于我"
        }
    },
    // 博客
    {
        name: "blog",
        path: "/article",
        component: ()=>import(/* webpackChunkName:"blog" */ "@/views/Blog/Blog.vue"),
        meta:{
            pageTitle:"天灯-文章"
        }
    },
    // 博客分类
    {
        name: "blogSelect",
        path: "/article/category/:categoryId",
        component: ()=>import(/* webpackChunkName:"blog" */ "@/views/Blog/components/BlogSelect.vue"),
        meta:{
            pageTitle:"天灯-文章"
        }
    },
    // 博客详情
    {
        name: "blogDetail",
        path: "/article/:id",
        component: ()=>import(/* webpackChunkName:"detail" */ "@/views/Blog/Detail.vue"),
        meta:{
            pageTitle:"天灯-文章"
        }
    },
    // 效果
    {
        name: "project",
        path: "/project",
        component: ()=>import(/* webpackChunkName:"project" */ "@/views/Project.vue"),
        meta:{
            pageTitle:"天灯-效果"
        }
    },
    // 留言板
    {
        name: "message",
        path: "/message",
        component: ()=>import(/* webpackChunkName:"message" */ "@/views/Message.vue"),
        meta:{
            pageTitle:"天灯-留言板"
        }
    },
    // 404页面
    {
        name:"NotFound",
        // 前面都没被匹配的，就被这个匹配，起兜底作用
        path:"*",
        component: NotFound
    }
]
export default routes