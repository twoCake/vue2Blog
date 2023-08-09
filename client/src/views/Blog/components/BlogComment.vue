<template>
    <div class="blogComment-container">
        <MessageArea title="评论列表" 
        :subTitle="`(${allItems.total})`" 
        :list="allItems.rows" 
        :isListLoading="isLoading"
        @submit="handleSubmit"
        />
    </div>
</template>

<script>
import MessageArea from "./MessageArea/MessageArea.vue"
import fetchData from "@/mixins/fetchData.js";
import {getComments,postComment} from "@/api/blog.js"
    export default {
        mixins:[fetchData({total:0,rows:[]})],
        components:{
            MessageArea
        },
        data() {
            return {
                page:1,
                limit:10
            }
        },
        created() {
            this.$bus.$on("mainScroll",this.handleScroll)
        },
        destroyed() {
            this.$bus.$off("mainScroll",this.handleScroll)
        },
        computed:{
            // 检测是否已经到达了最后一页评论
            hasMoreComment(){
                return this.allItems.rows.length < this.allItems.total;
            }
        },
        methods:{
            async fetchData(){
                return await getComments(this.$route.params.id,this.page,this.limit)
            },
            // 加载更多（下一页）
            async fetchMore(){
                if(!this.hasMoreComment){
                    // 说明已经没有更多的了，无法加载评论，直接返回
                    return
                }
                this.isLoading = true;
                this.page++;
                // 再次调用下一页数据
                const resp =  await this.fetchData();
                // 重新为之前已经获取到的数据赋值
                this.allItems.total = resp.total;
                // 将resp.rows中的内容加入到this.allItems.rows中
                this.allItems.rows = this.allItems.rows.concat(resp.rows)
                this.isLoading = false;
            },
            async handleSubmit(formData,callback){
                // 获得了新评论
                const resp = await postComment({
                    blogId:this.$route.params.id,
                    ...formData
                })
                // 将新评论增加至所有评论的开头
                this.allItems.rows.unshift(resp);
                this.allItems.total++;
                // 所有事情做完了，调用callback
                callback("评论成功")
            },
            // 在即将到达底部时，加载更多评论
            handleScroll(dom){
                if(this.isLoading || !dom){
                    // 表示目前正在加载评论，就不必多次重复加载，节流
                    return 
                }
                // 定义一个距离，只要可视屏幕距离底部还有range的距离，就会加载更多评论
                const range = 100;
                // scrollTop已经滚动的距离；clientHeight屏幕的高度；scrollHeight dom的总长度
                // Math.abs()取绝对值，避免负数
                const dec = Math.abs((dom.clientHeight+dom.scrollTop) - dom.scrollHeight);
                if(dec<=range){
                    // 表示即将到达底部
                    this.fetchMore();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.blogComment-container{
    margin: 30px 0;
    overflow: auto;
}
</style>