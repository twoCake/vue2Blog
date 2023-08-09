<template>
    <ul class="rightList-container">
        <li v-for="(item,index) in list" :key="index" :class="{active:item.isSelect}"  @click="handleClick(item)">
            <div class="isSelectCategory">
                <span :class="{active:item.isSelect}" >{{item.name}}</span>
                <span v-if="item.aside" class="aside" :class="{active:item.isSelect}" >{{item.aside}}</span>
            </div>
            <!-- 显示自身组件的递归（显示组件内部的递归） -->
            <RightList :list="item.children" @select="handleClick"/>
        </li>
    </ul>
</template>

<script>
    export default {
        name:"RightList",
        props:{
            list:{
                type:Array,
                // 默认值为空数组，但是这里要写成函数的形式
                default:()=>[]
            }
        },
        methods: {
            handleClick(item){
                if(!item.isSelect){
                    this.$emit("select",item)
                }
            }
        },
    }
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.rightList-container{
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    .rightList-container{
        margin-left: 1.5em;
    }
    li{
        min-height: 40px;
        line-height: 40px;
        cursor: pointer;
        color:@gray;
        padding: 0 0 0 30px;
        &.active{
            color:@warn;
            // font-weight: bold;
        }
    }
}
.aside{
    font-size: 10px;
    margin-left: 1em;
}
</style>