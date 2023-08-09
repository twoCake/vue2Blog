<template>
  <div class="about-container">
    <div class="block">关于我</div>
    <el-input
      v-model="url"
      placeholder="请输入内容..."
      :disabled="isDisabled"
    ></el-input>
    <el-button type="primary" style="margin-top: 15px" @click="clickHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import * as aboutApi from "@/api/about";
export default {
  data() {
    return {
      url: "",
      isDisabled: true,
      btnContent: "编辑",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      aboutApi.getAbout().then((res) => {
        this.url = res.data;
      });
    },
    clickHandle() {
      if (this.btnContent === "编辑") {
        this.isDisabled = !this.isDisabled;
        this.btnContent = "完成";
      } else {
        if (this.url) {
          // 填写了url地址
          let url = this.url;
          aboutApi.setAbout({url}).then(() => {
            this.isDisabled = !this.isDisabled;
            // 用户编辑完了，要更新内容
            this.btnContent = "编辑";
          });
        } else {
          // 未填写url地址
          this.$message.warning("输入框内不能为空！");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.about-container {
  padding: 20px;
  .block {
    margin-bottom: 15px;
  }
}
</style>