<template>
  <div class="addProject-container" v-loading="loading">
    <!-- 项目名称 -->
    <div class="block">项目名称</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.name" placeholder="请输入项目名称..."></el-input>
    </div>

    <!-- 项目描述 -->
    <div class="block">项目描述（每一项描述以英文分号分隔）</div>
    <div style="margin-bottom: 30px">
      <el-input type="textarea" rows="5" v-model="form.description" placeholder="请输入项目描述...">
      </el-input>
    </div>

    <!-- 项目链接 -->
    <div class="block">项目链接</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.url" placeholder="请输入项目链接..."> </el-input>
    </div>

    <!-- github/gitee地址 -->
    <div class="block">项目的github/gitee地址</div>
    <div style="margin-bottom: 30px">
      <el-input
        v-model="form.github"
        placeholder="请输入项目的github/gitee地址..."
      >
      </el-input>
    </div>

    <!-- 项目图片 -->
    <div class="block">项目图片</div>
    <div class="upload">
      <Upload v-model="form.thumb" />
    </div>

    <!-- 项目等级 -->
    <div class="block">项目等级</div>
    <div style="margin-bottom: 30px">
      <el-select v-model="form.order" placeholder="请输入项目等级...">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
    </div>

    <!-- 发布按钮 -->
    <el-button type="primary" @click="submitProjectHandle">发布项目</el-button>
  </div>
</template>

<script>
import Upload from "@/components/upload/index.vue";
import {addProject } from "@/api/project"
export default {
  components: {
    Upload,
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: "1",
      },
    };
  },
  methods: {
    submitProjectHandle() {
        let newProjectInfo = {...this.form}
        newProjectInfo.description = newProjectInfo.description.split(";")
        newProjectInfo.order = parseInt(newProjectInfo.order)
        this.loading = true;
        addProject(newProjectInfo).then(()=>{
          this.loading = false;
            this.$router.push("/projectList");
            this.$message({
                message:"添加成功！",
                type:"success"
            })
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.addProject-container {
  padding: 20px;
  .block {
    margin: 15px 0;
    font-weight: 100;
  }
  .upload {
    margin-top: 20px;
    margin-bottom: 30px;
    width: 178px;
    height: 178px;
  }
}
</style>