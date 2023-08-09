<template>
    <div class="notFoundContainer">
        <img src="@/assets/cry.gif" alt="" class="cry">
        <img src="@/assets/404.png" alt="" class="bg">
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.notFoundContainer{
    background: #90cbc0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .cry{
        position: absolute;
        transform: scale(2);
    }
    .bg{
        width: 100%;
        height: 100%; 
    }
}
</style>