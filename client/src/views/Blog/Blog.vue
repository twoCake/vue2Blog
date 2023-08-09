<template>
    <div class="blog-container">
        <Layout>
            <template #default>
                <div class="main">
                    <BlogList/>
                </div>
            </template>
            <template #right>
                <div class="right">
                    <BlogCategory/>
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import BlogList from './components/BlogList.vue'
import BlogCategory from './components/BlogCategory.vue'
    export default {
        components:{
            Layout,
            BlogList,
            BlogCategory
        },
        data() {
            return {
                list:[
                    {name:"a",isSelect:false},
                    {name:"b",isSelect:false},
                    {name:"c",isSelect:true,
                        children:[
                            {name:"c-1",isSelect:true,
                                children:[
                                    {name:"c-1-1",isSelect:true},
                                    {name:"c-1-2",isSelect:false},
                    ]},
                            {name:"c-2",isSelect:false},
                    ]},
                    {name:"d",isSelect:false},
                ]
            }
        },
    }
</script>

<style lang="less" scoped>
.blog-container{
    width: 100%;
    height: 100%;
    .main{
        width: 100%;
        height: 100%;
    }
    .right{
        width: 170px;
        height: 100%;
    }
}
</style>