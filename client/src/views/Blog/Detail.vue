<template>
    <div class="detail-container">
        <Layout>
            <div class="main-container" ref="mainContainer">
                <BlogDetail :blog="allItems" v-if="allItems"/>
            </div>
            <!-- <template #right>
                <BlogToc :toc="allItems.toc" v-if="allItems"/>
            </template> -->
        </Layout>
        <div class="loading" v-if="isLoading" >
            <Loading/>
        </div>
    </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import {getBlog} from "@/api/blog"
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
// import BlogToc from "./components/BlogToc";
import BlogComment from "./components/BlogComment.vue";
import Loading from "@/components/Loading";
import mainScroll from "@/mixins/mainScroll.js"
export default {
    mixins:[fetchData(null),mainScroll("mainContainer")],
    components:{
        Layout,
        BlogDetail,
        // BlogToc,
        Loading,
        BlogComment
    },
    methods: {
        async fetchData(){
            let resp = await getBlog(this.$route.params.id)
            if(!resp){
                // 如果文章不存在，则跳转至404页面
                this.$router.push({name:"NotFound"})
                return
            }  
            return resp
        },
    },
    updated() {
        // 先临时保存下浏览器的hash值
        const hash = location.hash;
        location.hash = "";
        setTimeout(()=>{
            const hash = location.hash;
        },50)
    },
}
</script>

<style lang="less" scoped>
.main-container{
    overflow-y: scroll;
    scroll-behavior: smooth;
    min-height: 100%;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 100vh;
}
.loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%); 
}
</style>