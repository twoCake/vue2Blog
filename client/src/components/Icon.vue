<template>
    <div class="icon-container">
        <i class="iconfont" :class="fontClass"></i>
    </div>
</template>

<script>
const classMap = {
    warn:"icon-jinggao",
    error:"icon-cuowu",
    info:"icon-xinxi",
    close:"icon-guanbi",
    wechat:"icon-weixin-copy",
    blog:"icon-blog",
    Leaving:"icon-liuyan",
    success:"icon-zhengque",
    upArrow:"icon-shangjiantou",
    downArrow:"icon-xiajiantou",
    code:"icon-code",
    qq:"icon-QQ-circle-fill",
    empty:"icon-empty1",
    about:"icon-about",
    home:"icon-zhuye",
    email:"icon-email",
    github:"icon-github",
    gitee:"icon-gitee-fill-round",
    loading:"icon-jiazaizhong",
    rabbit:"icon-tuzi",
    return:"icon-fanhui",
    bear1:"icon--wanjuxiong",
    bear2:"icon--xiaoxiong",
    friends:"icon-hezuohuoban",
    position:"icon-weizhi",
    links:"icon-lianjie",
    university:"icon-daxue",
    vue:"icon-Vue",
    translate:"icon-weibiaoti556",
    star:"icon-xingxing",
    category:"icon-leixing",
    date:"icon-riqi",
    eye:"icon-yanjing",
    total:"icon-zongshu",
    windmill:"icon-fengche1",
}
    export default {
        props:{
            type:{
                type:String,
                required:true
            }
        },
        computed:{
            // 图标类样式
         fontClass(){
            return classMap[this.type]
         }   
        }
    }
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/c/font_3847690_kib1lg03599.css";
</style>