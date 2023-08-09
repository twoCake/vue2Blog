<template>
  <div class="changePwd-container">
    <!-- 表单 -->
    <el-form
      :model="adminInfo"
      :rules="setRules"
      ref="ruleForm"
      label-width="100px"
      width="500px"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名">
        <el-input
          v-model="adminInfo.name"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <!-- 旧密码 -->
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input
          v-model="adminInfo.oldLoginPwd"
          placeholder="请输入旧密码"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item label="新密码" prop="loginPwd">
        <el-input
          v-model="adminInfo.loginPwd"
          placeholder="请输入新密码"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 新密码确认 -->
      <el-form-item label="确认新密码" prop="loginPwdConfirm">
        <el-input
          v-model="adminInfo.loginPwdConfirm"
          placeholder="请确认新密码"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 按钮 -->
    <div class="btn">
      <el-button type="primary" @click="confirmChangePwdHandle">确定</el-button>
      <el-button type="info" @click="emptyhandle">清空</el-button>
    </div>
  </div>
</template>

<script>
import { getInfo, setInfo } from "@/api/user.js";
export default {
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码！"));
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      adminInfo: {
        id: "",
        loginId: "",
        name: "", //用户名
        oldLoginPwd: "", //旧密码
        loginPwd: "", //新密码
        loginPwdConfirm: "", //确认的新密码
      },
      setRules: {
        oldLoginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入旧密码",
          },
        ],
        loginPwd: [
          {
            required: true,
            trigger: "blur",
            message: "请输入新密码",
          },
        ],
        loginPwdConfirm: [
          {
            required: true,
            trigger: "blur",
            message: "请确认新密码",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await getInfo();
      this.adminInfo.name = res.data.name;
    //   console.log(res);
    },
    // 确认修改密码
    async confirmChangePwdHandle() {
      // 确保所有输入框都填了内容
      if (
        this.adminInfo.name &&
        this.adminInfo.oldLoginPwd &&
        this.adminInfo.loginPwd &&
        this.adminInfo.loginPwdConfirm
      ) {
        let res = await setInfo(this.adminInfo);
        // 如果返回结果是字符串，说明密码不对或者其他文字
        if(typeof res === "string"){
            const resp = JSON.parse(res);
            this.$message.error(resp.msg);
        }else{
            // 说明修改成功
            this.$message.success("密码修改成功，新密码已生效");
            this.$store.dispatch("user/logout").then(()=>{
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            })
        }

      }else{
        this.$message.error("请填写相关内容！")
      }
    },
    // 清空
    emptyhandle() {
      this.adminInfo.oldLoginPwd = "";
      this.adminInfo.loginPwd = "";
      this.adminInfo.loginPwdConfirm = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.changePwd-container {
  padding: 20px;
  .btn {
    margin: 30px;
  }
}
</style>