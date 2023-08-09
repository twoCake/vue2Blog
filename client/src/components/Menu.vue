<template>
    <div class="menu-container">
        <router-link 
        :exact="item.exact" 
        v-for="item in items" 
        :to="{name:item.name}" 
        :key="item.link"
        active-class="selected"
        exact-active-class=""
        >
            <div class="icon">
                <Icon :type="item.icon"/>
            </div>
            <span>{{item.title}}</span>
        </router-link>
    </div>
</template>

<script>
import Icon from "./Icon.vue"
    export default {
        components:{
            Icon
        },
        data() {
            return {
                items:[
                    {
                        name:"home",
                        title:"首页",
                        icon:"home",
                        exact:true,
                    },
                    {
                        name:"blog",
                        title:"文章",
                        icon:"blog",
                        exact:false,//激活状态是否要精确匹配
                    },
                    // {
                    //     name:"about",
                    //     title:"关于我",
                    //     icon:"about",
                    //     exact:true,
                    // },
                    {
                        name:"project",
                        title:"项目",
                        icon:"code",
                        exact:true,
                    },
                    {
                        name:"message",
                        title:"留言板",
                        icon:"Leaving",
                        exact:true,
                    },
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container{
    width: 200px;
    // height: 400px;
    // background: #000;
    color:@gray;
    margin: 0 auto;
    overflow: auto;
    a{
        text-decoration: none;
        padding: 0 50px;
        display: block;
        display: flex;
        align-items: center;
        height: 45px;
        &.selected{
        background-color: #2d2d2d;
    }
        .icon{
            margin-right: 10px;
        }
        &:hover{
            color:#fff
        }
    }
    
}
</style>