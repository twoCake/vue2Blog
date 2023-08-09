<template>
    <div class="messageArea-container">
        <DataForm v-on="$listeners"/>
        <h3 class="h3">{{ title }}
            <span>{{ subTitle }}</span>
        </h3>
        <DataList :list="list"/>
        <div class="loading" v-if="isListLoading">
            <Loading/>
        </div>  
    </div>
</template>

<script>
import DataForm from "./DataForm.vue"
import DataList from "./DataList.vue"
import Loading from "@/components/Loading.vue"
    export default {
        components:{
            DataForm,
            DataList,
            Loading
        },
        props:{
            title:{
                type:String,
                default:""
            },
            subTitle:{
                type:String,
                default:""
            },
            list:{
                type:Array,
                default:()=>[]
            },
            isListLoading:{
                type:Boolean,
                default:true
            }
        },
    }
</script>

<style lang="less" scoped>
.messageArea-container{
    width: 100%;
    overflow-y: auto;
    .h3{
        margin-left: 50px;
        margin-top: 50px;
        font-size: 25px;
    }
    .loading{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}
</style>