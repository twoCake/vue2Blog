<template>
  <div class="banner-container" v-loading="loading">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="图片预览" align="center">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.bigImg" fit="fit">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标语 -->
        <el-form-item label="标语">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="图片" class="pic">
          <Upload v-model="form.bigImg" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
// import { server_URL } from "@/urlConfig";
import Upload from "@/components/upload/index.vue";
export default {
  components: {
    Upload,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      loading:false,
      data: [],
      dialogFormVisible: false, //“编辑”对话框是否显示
      form: {
        id: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      getBanner().then((res) => {
        this.loading = false;
        this.data = res.data;
      });
    },
    editBannerHandle(bannerInfo) {
      this.form = { ...bannerInfo };
      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      // 拿到用户已经编辑的表单数据，发送给服务器
      // 由于api文档要求三个首页标语的编辑需要一起发送给服务器
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == this.form.id) {
          arr[i] = this.form;
        }
      }
      this.loading = true;
      setBanner(arr).then(() => {
        this.loading = false;
        // 已经把所有首页标语提交给服务器了
        this.dialogFormVisible = false;
        this.$message({
          message: "提交成功^_^",
          type: "success",
        });
        // 重新获取数据
        this.fetchData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-container {
  padding: 20px;
}
</style>