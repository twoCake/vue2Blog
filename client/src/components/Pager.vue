<template>
    <div class="pager-container" v-if="true">
        <!-- 首页 -->
        <a @click="handleClick(1)" :class="{disabled:current ===1?true:false}">|&lt;</a>
        <!-- 上一页 -->
        <a @click="handleClick(current-1)">&lt;&lt;</a>
        <a v-for="(item,index) in numbers" :key="index" @click="handleClick(item)" :class="{active:item === current}">{{item}}</a>
        <!-- 下一页 -->
        <a @click="handleClick(current+1)" :class="{disabled:current ===pageNumber?true:false}">&gt;&gt;</a>
        <!-- 尾页 -->
        <a @click="handleClick(pageNumber)" :class="{disabled:current ===pageNumber?true:false}">&gt;|</a>
    </div>
</template>

<script>
// 在js代码中，@代表src目录
    export default {
        props:{
            // 当前页数，默认为第一页
            current:{
                type:Number,
                default:1
            },
            // 总数据量
            total:{
                type:Number,
                default:0
            },
            // 页容量
            limit:{
                type:Number,
                default:10
            },
            // 可见页码数
            visibleNumber:{
                type:Number,
                default:10
            }
        },
        computed:{
            pageNumber(){
                // Math.ceil向上取整
                return Math.ceil(this.total/this.limit)
            },
            // 得到显示的最小数字
            visibleMin(){
                let min = this.current - Math.floor(this.visibleNumber/2)
                if(min < 1){
                    min =1
                }
                return min
            },
            // 得到显示的最大数字
            visibleMax(){
                let max = this.visibleMin + this.visibleNumber-1
                if(max > this.pageNumber){
                    max = this.pageNumber
                }
                return max
            },
            numbers(){
                let nums = [];
                for(let i = this.visibleMin; i<=this.visibleMax;i++){
                    nums.push(i);
                }
                return nums
            }
        },
        methods: {
            handleClick(newPage){
                if(newPage<1){
                    newPage = 1;
                }
                if(newPage>this.pageNumber){
                    newPage = this.pageNumber
                }
                if(newPage === this.current){
                    return 
                }
                this.$emit("pageChange",newPage)
            }
        },
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
// 在样式中，~@代表src目录
.pager-container{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    a{
        color:@primary;
        margin:0 3px;
        cursor: pointer;
        &.disabled{
            color:@lightwords;
            cursor: not-allowed;
        }
        &.active{
            color:@words;
            cursor: text;
        }
    }
}
</style>