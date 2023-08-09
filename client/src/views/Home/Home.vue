<template>
    <div class="home-container" ref="container" @wheel="handleWheel">
        <ul class="carousel-container" :style="{ 'margin-top':marginTop }" @transitionend="handletransitionend">
            <li v-for="item in banners" :key="item.id">
                <CarouselItem :item="item"/>
            </li>
        </ul>
        <!-- 上箭头 -->
        <div class="icon icon-up" v-show="showImgIndex>=1" @click="switchTo(showImgIndex-1)">
            <Icon type="upArrow" />
        </div>
        <!-- 下箭头 -->
        <div class="icon icon-down" v-show="showImgIndex<banners.length-1" @click="switchTo(showImgIndex+1)">
            <Icon type="downArrow" />
        </div>
        <!-- 指示器 -->
        <ul class="indicator">
            <li v-for="(item,index) in banners" :key="item.id" :class="{
                active: index === showImgIndex
            }" @click="switchTo(index)"></li>
        </ul>
    </div>
</template>

<script>
import CarouselItem from "@/views/Home/CarouselItem.vue";
import Icon from "@/components/Icon.vue";
import * as bannersApi from "@/api/banner.js"
export default {
    components:{
        CarouselItem,
        Icon
    },
    data(){
        return {
        banners:[],
        showImgIndex:0,  //当前显示的是第几张轮播图
        containerHeight:0,  //显示的是整个容器的高度
        switching:false, //是否正在翻页中
        }
    },
    mounted() {
        this.fetchData();
        this.containerHeight = this.$refs.container.clientHeight;
        // 监听页面尺寸变化的监听事件
        addEventListener("resize",this.handleResize)
    },
    destroyed() {
        removeEventListener("resize",this.handleResize)
    },
    computed:{
        marginTop(){
            return -this.showImgIndex*this.containerHeight+"px";
        },
    },
    methods: {
        async fetchData(){
            const res = await bannersApi.getBanners()
            this.banners = res
        },
        switchTo(index){
            this.showImgIndex = index
        },
        // 鼠标滚轮的滚动事件
        handleWheel(e){
            if(this.switching || e.deltaY>=-5 && e.deltaY<=5){
                return
            }
            this.switching = true
            if(e.deltaY < -5 && this.showImgIndex>0){
                // 往上翻页
                this.showImgIndex--;
            }else if(e.deltaY >5 && this.showImgIndex<this.banners.length-1){
                // 往下翻页
                this.showImgIndex++;
            }
        },
        // 鼠标滚轮滚动结束事件
        handletransitionend(){
            this.switching = false;
        },
        // 监听页面尺寸变化的抽离函数
        handleResize(){
            this.containerHeight = this.$refs.container.clientHeight;
        }
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.home-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: @dark;
    .carousel-container{
        width: 100%;
        height: 100%;
        transition: 0.5s;
        li{
            width: 100%;
            height: 100%;
        }
    }
    .icon{
        @gap:25px;
        @jump:5px;
        position: fixed;
        left: 50%;
        transform: translateX(-50%) scale(1.5);
        color:@gray;
        cursor: pointer;
        &-up{
            top: @gap;
            animation: jump-up 2.5s infinite;
        }
        &-down{
            bottom: @gap;
            animation: jump-down 2.5s infinite;
        }
        @keyframes jump-up {
            0%{
                transform: translate(-50%,@jump) scale(1.5);
            }
            50%{
                transform: translate(-50%,-@jump) scale(1.5);
            }
            100%{
                transform: translate(-50%,@jump) scale(1.5);
            }
        }
        @keyframes jump-down {
            0%{
                transform: translate(-50%,-@jump) scale(1.5);
            }
            50%{
                transform: translate(-50%,@jump) scale(1.5);
            }
            100%{
                transform: translate(-50%,-@jump) scale(1.5);
            }
        }
    }
    ul{
        margin: 0;
        list-style: none;
        padding: 0;
    }
    .indicator{
        position: fixed;
        z-index: 99;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        li{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: @words;
            cursor: pointer;
            margin-bottom: 10px;
            border: 1px solid #fff;
            box-sizing: border-box;
            transition: 0.5s;
            &.active{
                background: #fff;
            }
        }
    }
}
</style>