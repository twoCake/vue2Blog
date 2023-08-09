<template>
  <div class="upload-container">
    <!-- “上传”组件的标题 -->
    <div class="uploadTitle">{{ uploadTitle }}</div>
    <!-- “上传”组件的控件-->
    <div>
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headers"
      >
        <img v-if="value" :src="value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: ["uploadTitle", "value"],
  computed: {
    headers() {
      return {
        // 从本地获取token，添加到headers中
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (!res.code && res.data) {
        // 说明上传成功，服务器返回了图片上传成功后的服务器地址
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-container {
  .uploadTitle {
    margin: 15px 0;
    font-weight: 100;
  }
}
.avatar-uploader .el-upload {

  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>