<template>
  <div class="blogToc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "./RightList.vue"
// 导入防抖函数
import { debounce } from "@/utils/index.js"
export default {
    components:{
        RightList
    },
    props:{
        toc:{
            type:Array
        }
    },
    data() {
        return {
            activeAnchor:"article-md-title-1"
        }
    },
    computed:{
        // 根据toc属性以及activeAnchor得到带有isSelect属性的toc数组
        tocWithSelect(){
            // 递归
            // 如果toc为undefined，则初始化toc为[]
            const getToc = (toc=[])=>{
                return toc.map(t=>({
                    ...t,
                    isSelect:t.anchor === this.activeAnchor,
                    children:getToc(t.children)
                }))
            }
            return getToc(this.toc)
        },
        // 根据toc得到它们对应的元素数组
        doms(){
            const doms  = [];
            const addToDoms = toc =>{
                for (const item of toc) {
                    doms.push(document.getElementById(item.anchor))
                    if(item.children && item.children.length){
                        // 说明有子代
                        addToDoms(item.children)
                    }
                }
            }
            addToDoms(this.toc);
            return doms;
        }
    },
    methods:{
        handleSelect(item){
            location.hash = item.anchor;
        },
        // 设置activeAnchor为正确的值
        setSelect(scrollDom){
            if(!scrollDom){
                // 如果没有这个元素了，就不做任何处理
                return 
            }
            // 由于后续要重新设置，先清空之前的状态
            this.activeAnchor = "";
            const range = 200;
            for (const dom of this.doms) {
                // 观察当前的dom元素是不是应该被选中
                if(!dom){
                    // 如果不存在dom，则跳过此次循环，进入下一次循环
                    continue;
                }
                //  如果存在dom，则获取该dom距离视口顶部的距离
                const top = dom.getBoundingClientRect().top;
                if(top>=0 && top<=range){
                    // 在规定的范围内，是激活状态
                    this.activeAnchor = dom.id;
                    return;
                }else if(top >range){
                    // 在规定的范围下方，非激活状态
                    return ;
                }else{
                    // 在规定的范围上方
                    this.activeAnchor = dom.id;  // 先假设自己是激活的，然后继续看后面的
                }
            }
        }
    },
    created() {
        // 将setSelectDebounce暂时放于vue的实例对象上，以便销毁阶段能够移除。
        this.setSelectDebounce = debounce(this.setSelect,50)
        this.$bus.$on("mainScroll",this.setSelectDebounce)
    },
    destroyed() {
        this.$bus.$off("mainScroll" ,this.setSelectDebounce)
    },
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogToc-container{
    width: 200px;
    padding: 50px 30px 15px 15px;
    position: relative;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background: @dark;
    h2{
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 1.5em;
        margin: 20px 0;
        color:@gray;
        padding: 0 0 0 30px;
    }
}
</style>