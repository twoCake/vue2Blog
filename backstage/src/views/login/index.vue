<template>
  <div class="login-container">
    <div class="bgImg">
      <img src="../../assets/sea.gif" alt="" >
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">天灯的个人空间后台管理系统</h3>
      </div>

      <!-- 管理员账号 -->
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号..."
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      
      <!-- 管理员密码 -->
      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入管理员密码..."
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <div class="captchaContainer">
        <el-form-item prop="captcha" class="captchaInputer">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码..."
            name="password"
            type="text"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <!-- 展示验证码 -->
        <div class="captchaImg" @click="getCaptchaFun" v-html="svg"></div>
      </div>

      <!-- 7天内免登录 -->
      <div style="margin-bottom: 25px; margin-left: 10px;">
        <el-checkbox v-model="loginForm.checked">7天内免登录</el-checkbox>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import {getCaptcha} from "@/api/captcha"

export default {
  name: 'Login',
  data() {
    return {
      // 验证码图像
      svg:"",
      loginForm:{
        loginId:"",
        loginPwd:"",
        captcha:"",
        checked:true,
      },
      // 书写各个字段的验证规则
      loginRules:{
        loginId:[
          {
            required:true,trigger:"blur",message:"请输入管理员账号"
          }
        ],
        loginPwd:[
          {
            required:true,trigger:"blur",message:"请输入管理员密码"
          }
        ],
        captcha:[
          {
            required:true,trigger:"blur",message:"请输入验证码"
          }
        ]
      },
      passwordType:"password",
      loading:false,
      isLoadingCaptcha:false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCaptchaFun();
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if(this.loginForm.checked){
            this.loginForm.remember = 7;
          }
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((res) => {
            if(typeof res === "string"){
              // 验证码如果正确，则返回的是对象；
              // 验证码如果错误，则返回的是字符串
              // 进入此if说明是验证码错误
              this.$message.error("验证码错误！")
              this.loginForm.captcha = ""
            }else{
              // 进入此else则说明是账号或密码错误
              this.$message.error("账号或密码错误！")
              this.loginForm.loginId = ""
              this.loginForm.loginPwd = ""
              this.loginForm.captcha = ""
            }
            // 在错误操作过后，需要重新请求二维码
            this.getCaptchaFun();
            this.loading = false;
            this.loginForm.captcha = ""
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取验证码
    async getCaptchaFun(){
      if(!this.isLoadingCaptcha){
        this.isLoadingCaptcha = true
        const resp = await getCaptcha()
        this.svg = resp
        this.isLoadingCaptcha = false
      }
      
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  position: relative;

  .bgImg{
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -99;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .login-form {
    background: #2d2d2d;
    opacity: 0.8;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px;
    margin: 0 auto;
    margin-top: 150px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 1px #000;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.captchaContainer{
  display: flex;

}
.captchaInputer{
  width: 70%;
}
.captchaImg{
  cursor: pointer;
  width: 150px;
  height: 55px;
  margin-left: 5px;
}
</style>
