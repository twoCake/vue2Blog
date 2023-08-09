<template>
  <div class="set-container" v-loading="loading">
    <div class="webInfo">网站信息</div>
    <!-- 网站标题 -->
    <div class="block">网站标题</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.siteTitle" disabled></el-input>
    </div>

    <!-- 邮箱 -->
    <div class="block">邮箱</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.mail" disabled></el-input>
    </div>

    <!-- 备案号 -->
    <div class="block">备案号</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.icp" disabled></el-input>
    </div>

    <!-- 网址图标信息 -->
    <el-divider></el-divider>
    <div class="webInfo">网址图标信息</div>
    <div class="block">网站头像</div>
    <div style="margin-bottom: 30px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.avatar"
      ></el-image>
    </div>

    <div class="block">网址图标</div>
    <div style="margin-bottom: 30px; width: 500px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.favicon"
      ></el-image>
    </div>

    <el-divider></el-divider>
    <div class="webInfo">github信息</div>
    <div class="block">github名字</div>
    <div style="margin-bottom: 30px; width: 500px">
      <el-input v-model="form.github" disabled></el-input>
    </div>
    <div class="block">github地址</div>
    <div style="margin-bottom: 30px; width: 500px">
      <el-input v-model="form.githubName" disabled></el-input>
    </div>

    <!-- qq信息 -->
    <el-divider></el-divider>
    <div class="webInfo">QQ信息</div>
    <div class="block">QQ号码</div>
    <div style="margin-bottom: 30px; width: 500px">
      <el-input v-model="form.qq" disabled></el-input>
    </div>
    <div class="block">QQ二维码图片</div>
    <div style="margin-bottom: 30px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.qqQrCode"
      ></el-image>
    </div>

    <!-- 微信信息 -->
    <el-divider></el-divider>
    <div class="webInfo">微信信息</div>
    <div class="block">微信号码</div>
    <div style="margin-bottom: 30px; width: 500px">
      <el-input v-model="form.weixin" disabled></el-input>
    </div>
    <div class="block">微信二维码图片</div>
    <div style="margin-bottom: 30px">
      <el-image
        style="width: 100px; height: 100px"
        :src="form.weixinQrCode"
      ></el-image>
    </div>

    <!-- 编辑 -->
    <el-divider></el-divider>
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>

    <!-- 弹出层 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      width="50%"
      top="5vh"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.mail"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form2.icp"></el-input>
        </el-form-item>
        <el-form-item label="网站头像">
          <Upload v-model="form2.avatar" />
        </el-form-item>
        <el-form-item label="网址图标">
          <Upload v-model="form2.favicon" />
        </el-form-item>
        <el-form-item label="github名字">
          <el-input v-model="form2.github"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form2.githubName"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码">
          <el-input v-model="form2.qq"></el-input>
        </el-form-item>
        <el-form-item label="QQ二维码">
          <Upload v-model="form2.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号码">
          <el-input v-model="form2.weixin"></el-input>
        </el-form-item>
        <el-form-item label="微信二维码">
          <Upload v-model="form2.weixinQrCode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEditSettingHandle"
          >确定</el-button
        >
        <el-button type="danger" @click="dialogFormVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as settingApi from "@/api/set";
import Upload from "@/components/upload/index.vue";
// import { server_URL } from "@/urlConfig";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      loading: false,
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      form2: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      settingApi.getSetting().then((res) => {
        this.loading = false;
        this.form = res.data;
        this.form2 = { ...this.form };
      });
    },
    // 进入编辑模式，弹出对话框
    openEditPanel() {
      this.dialogFormVisible = true;
    },
    // 确认修改
    confirmEditSettingHandle() {
      this.loading = true;
      settingApi.toSetting(this.form2).then(() => {
        this.loading = false;
        this.$message.success("修改成功！");
        this.fetchData();
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.set-container {
  padding: 20px;
  .webInfo {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .block {
    margin-bottom: 15px;
  }
}
</style>