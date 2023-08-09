<template>
    <div class="loading-container">
        <img src="../assets/loading.gif" alt="">
    </div>
</template>

<script>
import Icon from "@/components/Icon"
    export default {
        components:{
            Icon
        }
    }
</script>

<style lang="less" scoped>
.loading-container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 0.7;
    img{
        width: 140px;
        height: 140px;
    }
}
</style>