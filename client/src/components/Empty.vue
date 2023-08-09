<template>
    <div class="empty-container">
        <div class="empty-inner">
            <Icon type="empty" class="icon"/>
            <p>无数据</p>
        </div>
    </div>
</template>

<script>
import Icon from "./Icon.vue"
    export default {
        components:{
            Icon
        }
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.empty-container{
    width: 120px;
    height: 120px;
    color:@gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) scale(2);
    .empty-inner{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }   
}
// 设置图标大小
.icon-container{  
    box-sizing: border-box;
    transform: scale(4); 
    padding: 30px;
}
</style>