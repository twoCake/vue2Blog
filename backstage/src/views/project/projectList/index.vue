<template>
  <div class="projectList" v-loading="loading">
    <!-- 数据表格 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      element-loading-text="加载数据中"
      border
      fit
      highlight-current-row
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column align="center" label="项目名称" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="proName">{{
            scope.row.name
          }}</a>
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column align="center" label="项目描述">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column align="center" label="预览图" width="150px">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.thumb"
            style="width: 120px"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
          <!-- gitee地址 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="项目地址"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="success"
              icon="el-icon-paperclip"
              circle
              size="mini"
              @click="projectUrlHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 编辑 -->
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
              @click="editProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1500"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog
      title="请编辑该项目信息"
      :visible.sync="dialogFormVisbile"
      width="70%"
    >
      <el-form :mode="form">
        <!-- 名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="项目描述（每一项描述以英文分号分隔）">
          <el-input
            type="textarea"
            v-model="form.description"
            rows="4"
          ></el-input>
        </el-form-item>
        <!-- url地址 -->
        <el-form-item label="url地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <!-- github/gitee地址 -->
        <el-form-item label="github/gitee地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <!-- thumb缩略图 -->
        <el-form-item label="项目图片">
          <div class="upload">
            <Upload v-model="form.thumb" />
          </div>
        </el-form-item>
        <!-- level -->
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择分类等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 确认和取消按钮 -->
      <div class="btn">
        <el-button type="primary" @click="sure">确认</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as projectApi from "@/api/project";
// import { server_URL } from "@/urlConfig";
import Upload from "@/components/upload/index.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      loading: false,
      data: [],
      listLoading: false,
      srcList: [],
      dialogFormVisbile: false, //控制编辑项目的对话框是否显示
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
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      projectApi.getProject().then((res) => {
        this.listLoading = false;
        this.data = res.data;
        // 把每个url地址都加前缀
        for (const item of this.data) {
          // if (item.thumb.search("http") != -1) {
          //   continue;
          // }
          // item.thumb = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        }
      });
    },
    // 项目的地址
    projectUrlHandle(projectInfo) {
      window.open(projectInfo.github)
    },
    // 编辑项目
    editProjectHandle(projectInfo) {
      this.dialogFormVisbile = true;
      // 回调内容
      // 将描述（服务器传来的描述数据数组形式）转换为字符串形式，否则在input内会报错
      this.form = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
    },
    // 删除项目
    deleteProjectHandle(projectInfo) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          projectApi.deleteProject(projectInfo.id).then(() => {
            this.loading = false;
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 确认修改
    sure() {
      let projectInfo = { ...this.form };
      // 将描述重新变为数组形式
      projectInfo.description = this.form.description.split(";");
      // 将order类型从字符串类型转为数值类型
      projectInfo.order = parseInt(this.form.order);
      this.loading = true;
      projectApi.setProject(projectInfo.id, projectInfo).then((res) => {
        this.loading = false;
        this.dialogFormVisbile = false;
        this.fetchData();
        this.$message({
          message:"修改成功！",
          type:"success"
        })
      });
    },
    // 取消修改
    cancel() {
      this.dialogFormVisbile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.projectList {
  padding: 20px;
  .proName:hover {
    color: rgb(163, 163, 163);
  }
  .upload {
    margin-top: 20px;
    margin-bottom: 30px;
    width: 178px;
    height: 178px;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>