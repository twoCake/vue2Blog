<template>
    <div class="blogCategory-container">
        <h2>文章分类</h2>
        <RightList :list="list" @select="handleSelect"/>
    </div>
</template>

<script>
import RightList from "./RightList.vue";
import fetchData from "@/mixins/fetchData.js"
import {getBlogCategories} from "@/api/blog.js"
    export default {
        mixins:[fetchData([])],
        components:{
            RightList
        },
        computed:{
            categoryId(){
                return +this.$route.params.categoryId || -1;
            },
            limit(){
                return +this.$route.query.limit || 10; 
            },
            list(){
                const totalArticleCount = this.allItems.reduce( (a,b) => a + b.articleCount,0);
                const result = [
                    {name:"全部" , id:-1 , articleCount:totalArticleCount},
                    ...this.allItems
                ];
                return result.map(item=>({
                    ...item,
                    isSelect:item.id === this.categoryId,
                    aside:`${item.articleCount}篇`
                }))
            }
        },
        methods: {
            async fetchData(){
                return await getBlogCategories();
            },
            handleSelect(item){
                const query = {
                    page:1,
                    limit:this.limit
                }
                if(item.id === -1){
                    // 说明当前无分类
                    /*
                        $route   提供路由信息
                        $router  用于控制页面跳转
                    */
                   this.$router.push({
                    name:"blog",
                    query,
                   })
                }else{
                    // 说明有分类
                    this.$router.push({
                    name:"blogSelect",
                    query,
                    params:{
                        categoryId:item.id
                    }
                   })
                }
            }
        },
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogCategory-container{
    width: 100%;
    // height: 100%;
    // box-sizing: border-box;
    padding: 20px;
    position: relative;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background: @dark;
    h2{
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 1.5em;
        margin: 20px 0;
        color:@gray;
        padding: 0 0 0 30px;
    }
}
</style>