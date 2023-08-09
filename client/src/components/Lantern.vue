<template>
    <div class="lantern-container">
        <!-- 顶部线条 -->
        <div class="head-line"></div>
        <!-- 灯笼的中间 -->
        <div class="center">
            <div class="center-line">
                <span class="blessings">
                    <Icon type="rabbit" />
                </span>
            </div>
            <!-- 灯笼的底部线条 -->
            <div class="footer-line"></div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon.vue"
    export default {
        components:{
            Icon
        }
    }
</script>

<style lang="less" scoped>
.lantern-container{
    width: 200px;
    height: 150px;
    position: absolute;
    // 将总体缩放
    transform: scale(0.5);
    top: -50px;
    right: -50px;
    // 灯笼的顶部线条样式
    .head-line{
        position: absolute;
        width: 4px;
        height: 60px;
        background: #ecaa2f;
        left: calc(50% - 2px);
        top: -60px;
    }
    // 灯笼的中间主体样式
    .center{
        width: 100%;
        height: 100%;
        background: #f00;
        border-radius: 120px;
        box-shadow: 0 0 80px -10px #f00;
        animation: rotate 2s infinite ease-in-out;
        transform-origin: top center;
        .center-line{
            width: 100%;
            height: 100%;
            position: relative;
            &::before,&::after{
                content: "";
                position: absolute;
                height: 100%;
                border: 3px solid yellow;
                border-radius: 50%;
                top: 0;
            }
            &::before{
                width: 150px;
                left: calc(50% - 75px);
            }
            &::after{
                width: 70px;
                left: calc(50% - 35px);
            }
            .blessings{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) scale(2.5);
                width: 18px;
                color: yellow;
                font-size: 18px;
                font-weight: bold;
            }
        }
        &::before,&::after{
            content: "";
            position: absolute;
            width: 80px;
            height: 10px;
            background: #ecaa2f;
            left: calc(50% - 40px);
        }
        &::before{
            border-radius: 5px 0;
            
            top: -8px;
        }
        &::after{
            border-radius: 0 5px;
            bottom: -8px;
        }
    }
    // 灯笼的底部内容
    .footer-line{
        position: absolute;
        width: 4px;
        height: 40px;
        background: #ecaa2f;
        left: calc(50% - 2px);
        bottom: -40px;
        animation: rotate 2s infinite ease-in-out;
        &::before{
            content: "";
            position: absolute;
            width: 16px;
            height: 80px;
            background: linear-gradient(
                #f00,
                #e36d00 3px,
                #fbd342 5px,
                #e36d00 8px,
                #e36d00 12px,
                #f00 16px,
                rgba(255,0,0,0.8) 26px,
                rgba(255,0,0,0.6)
            );
            border-radius: 5px 0;
            left: calc(50% - 8px);
            bottom: -75px;
        }
    }
    // 让灯笼动起来的动画
    @keyframes rotate {
        0%,
        100%{
            transform: rotate(-15deg);
        }
        50%{
            transform: rotate(15deg);
        }
    }
    // 让灯笼停下来的动画
    @keyframes nothing {
        0%,
        100%{
            transform: rotate(0deg);
        }
        50%{
            transform: rotate(0deg);
        }
    }
}
</style>