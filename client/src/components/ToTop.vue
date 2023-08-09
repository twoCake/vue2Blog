<template>
    <div class="toTop-container" v-show="show" @click="toTop">
        <div class="arrow"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 控制此按钮是否出现
                show:false

            }
        },
        created(){
            this.$bus.$on("mainScroll",this.handleScroll)
        },
        destroyed() {
            this.$bus.$off("mainScroll",this.handleScroll)
        },
        methods:{
            handleScroll(dom){
                if(!dom){
                    // 没有dom元素了
                    this.show = false;
                    return
                }
                const range = 500;
                if(dom.scrollTop >= range){
                    // 滚动距离大于等于500，则出现“回到顶部”按钮
                    this.show = true;
                }
                this.show = dom.scrollTop >= range;
            },
            // 回到顶部
            toTop(){
                this.$bus.$emit("setMainScroll",0)
            }
        }
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.toTop-container{
    width: 140px;
    height: 140px;
    border-radius: 50%;
    position: relative;
    z-index: 99;
    background: @primary;
    transform: scale(0.2);
    cursor: pointer;
    opacity: 0.5;
    transition: 1s;
    animation: float 3s infinite ease-in-out;
    &:hover{
        opacity: 1;
    }
    .arrow{
        width: 50px;
        height: 50px;
        border: 10px solid #fff;
        border-left: none;
        border-bottom: none;
        border-radius: 5px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: rotate(-45deg) translate(-20%,-50%); 
    }
}
@keyframes float {
    0%{
        transform: scale(0.3) translateY(-20px);
    }
    50%{
        transform: scale(0.3) translateY(20px);
    }
    100%{
        transform: scale(0.3) translateY(-20px);
    }
}
</style>