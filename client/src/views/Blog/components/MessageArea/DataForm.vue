<template>
    <form id="data-form-container" class="dataForm-container" @submit.prevent="handleSubmit">
        <div class="form-item">
            <div class="input-area">
                <input type="text" maxlength="10" placeholder="用户昵称" v-model.trim="formData.nickname">
                <span class="tip">{{formData.nickname.length}}/10</span>
            </div>
            <div class="error">{{error.nickname}}</div>
        </div>
        <div class="form-item">
            <div class="text-area">
                <textarea maxlength="1000" placeholder="输入内容" v-model.trim="formData.content"></textarea>
                <span class="tip">{{formData.content.length}}/1000</span>
            </div>
            <div class="error">{{error.content}}</div>
        </div>
        <div class="form-item">
            <div class="button-area">
                <button :disabled="isSubmiting">{{isSubmiting?"提交中...":"提交"}}</button>
                <span class="submitSuccess">{{submitSuccess}}</span>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            formData:{
                nickname:"",
                content:"",
            },
            error:{
                nickname:"",
                content:"",
            },
            isSubmiting:false,
            submitSuccess:""
        }
    },
    methods:{
        handleSubmit(){
            this.error.nickname = this.formData.nickname?"":"请填写用户昵称";
            this.error.content = this.formData.content?"":"请填写内容";
            if( this.error.nickname || this.error.content ){
                //说明存在错误，不能提交
                return
            }
            // 绕过了上面的条件判断，说明不存在错误，可以提交
            this.isSubmiting = true;
            // 利用$emit抛出事件，让父组件来处理事件
            this.$emit("submit",this.formData, (successMsg)=>{
                // 利用之前全局定义的$showMessage
                this.$showMessage({
                    content:successMsg,
                    type:"success",
                    duration:1500,
                })
                this.isSubmiting = false;
                this.formData.nickname = "";
                this.formData.content = "";
            })
            
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.dataForm-container{
    margin-bottom: 20px;
    overflow: hidden;
    // background: lighten(#bfa , 10%);
    position: relative;
}
.form-item{
    margin-bottom: 8px;
}
.input-area{
    width: 220px;
    position: relative;
    input{
        width: 100%;
        box-sizing: border-box;
    }
}
.text-area{
    position: relative;
}
.tip{
    position: absolute;
    right: 5px;
    bottom: 5px;
    color:@words;
    font-size: 14px;
    border-radius: 4px;
    &:focus{
        border-color: @primary;
    }
}
input{
    padding: 0 15px;
    height: 40px;
}
textarea{
    width: 100%;
    resize: none;
    padding: 8px 15px;
    height: 120px;
    box-sizing: border-box;
}
.error{
    margin-top: 6px;
    color:@danger;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
button{
    position: relative;
    cursor: pointer;
    border: none;
    outline: none;
    width: 100px;
    height: 34px;
    color:#fff;
    border-radius: 4px;
    background: @primary;
    transition: 0.5s;
    &:hover{
        background: darken(@primary, 10%);
    }
    &:disabled{
        background: lighten(@primary, 20%);
        cursor: not-allowed;
    }
}
.submitSuccess{
    margin-left: 10px;
    color:blue
}
// 设置文本框和文本域的边框样式
input,textarea{
    list-style: none;
    border-radius: 5px;
    border: 1px solid #000;
    transition: 1s;
    &:hover{
        border: 1px solid @primary;
    }
}
</style>