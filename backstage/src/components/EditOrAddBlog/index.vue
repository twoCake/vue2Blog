<template>
  <div class="addBlog-container" v-loading="loading">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 30px">
      <el-input v-model="form.title" placeholder="请输入文章标题..."></el-input>
    </div>

    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      style="margin-bottom: 30px"
      :options="editorOptions"
    />

    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <div style="margin-bottom: 30px">
      <el-input
        type="textarea"
        v-model="form.description"
        placeholder="请输入文章描述..."
        rows="6"
      ></el-input>
    </div>

    <!-- 文章头图 -->
    <div class="block">文章头图</div>
    <div class="upload">
      <Upload v-model="form.thumb" />
    </div>

    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择分类等级"
      @change="changeHandle"
    >
      <el-option
        v-for="blogType in blogTypes"
        :key="blogType.id"
        :label="blogType.name"
        :value="blogType.id"
      ></el-option>
    </el-select>

    <!-- 发布/修改按钮 -->
    <div class="submit">
      <!-- 发布/修改 -->
      <el-button type="primary" @click="submitArticleHandle">{{
        btnContent
      }}</el-button>
      <!-- 取消 -->
      <el-button
        type="danger"
        v-if="mode === 'edit'"
        @click="cancelSubmitArticleHandle"
        >取消</el-button
      >
    </div>
  </div>
</template>
  
  <script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/upload/index.vue";
import { getBlogType } from "@/api/blogType";
import { addBlog, findOneBlog, editBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  components: {
    Editor,
    Upload,
  },
  props: ["mode"],
  data() {
    return {
      loading: false,
      form: {
        title: "",
        editorText: "", //用户编辑的内容
        thumb: "", //文章头图
        select: "", //选择分类
      },
      blogTypes: [], //存放博客分类
      imageUrl: "", //图片在服务器上的地址
      editorOptions: {
        language: "zh-CN",
      },
      btnContent: "发布文章",
    };
  },
  mounted() {
    this.loading = true;
    this.getBlogTypeHandle();
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      // 将内容回填至页面
      findOneBlog(this.id).then((res) => {
        this.form = res.data;
        this.form.select =
          res.data.category === null ? "" : res.data.category.id;
        // 填充文本编辑器带来的html内容
        this.$refs.toastuiEditor.invoke("setHTML", res.data.htmlContent);
      });
      this.btnContent = "确认修改";
    }
  },
  methods: {
    // 获取文章分类
    getBlogTypeHandle() {
      getBlogType().then((resp) => {
        this.loading = false;
        this.blogTypes = resp.data;
      });
    },
    // 点击发布文章
    submitArticleHandle() {
      this.loading = true;
      // 1.获取表单的内容
      // 获取文本编辑器的html内容和markdown内容（toast-ui）
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      const articleInfo = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };

      // 2.发送请求
      if (
        articleInfo.title &&
        articleInfo.description &&
        articleInfo.htmlContent &&
        articleInfo.categoryId
      ) {
        if (this.mode === "add") {
          // 说明是要新增文章
          addBlog(articleInfo).then(() => {
            // 发布文章完成后，跳转至blogList页面
            this.$router.push("/blogList");
            this.$message({
              message: "文章添加成功！",
              type: "success",
            });
          });
        }
        // 说明是要修改文章
        if (this.mode === "edit") {
          editBlog({ id: this.form.id, data: articleInfo }).then(() => {
            // 发布文章完成后，跳转至blogList页面
            this.$router.push("/blogList");
            this.$message({
              message: "文章修改成功！",
              type: "success",
            });
          });
        }
        this.loading = false;
      } else {
        this.$message({
          message: "请填写相关内容！",
          type: "error",
        });
      }
    },
    // 强制更新一下，使得下拉列表更新
    changeHandle() {
      this.$forceUpdate();
    },
    // 取消修改
    cancelSubmitArticleHandle() {
      this.$router.go(-1);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.addBlog-container {
  padding: 20px;
  .block {
    margin: 15px 0;
    font-weight: 100;
  }
  .upload {
    width: 200px;
    height: 200px;
  }
  .submit {
    margin-top: 30px;
  }
}
</style>