<template>
  <div class="blogType-container">
    <!-- 搜索框 -->
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要添加的分类，选择左边以设置level"
        v-model="input"
        class="input-with-select blogAddInput"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 5px"
        @click="addBlogTypehandle"
        >添加</el-button
      >
    </div>

    <!-- 数据表 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
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
              @click="editBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除按钮 -->
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
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出的编辑文章分类对话框 -->
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  deleteBlogType,
  findOneBlogType,
  updateOneBlogType,
} from "@/api/blogType";
export default {
  data() {
    return {
      input: "",
      select: "1",
      loading: false,
      data: [],
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    fetchData() {
      this.loading = true;
      getBlogType().then((res) => {
        this.loading = false;
        this.data = res.data;
      });
    },
    // 添加文章分类
    addBlogTypehandle() {
      if (this.input) {
        const name = this.input;
        const order = this.select;
        const obj = { name, order };
        this.loading = true;
        addBlogType(obj).then((res) => {
          this.loading = false;
          this.fetchData();
          this.$message({
            message: "添加成功^_^",
            type: "success",
          });
        });
      } else {
        this.$message({
          message: "分类名称不能为空！",
          type: "error",
        });
      }
    },
    // 编辑文章分类
    editBlogTypeHandle({ id }) {
      this.loading = true;
      // 1.回填到表单
      findOneBlogType(id).then((res) => {
        this.loading = false;
        this.form = res.data;
        // 2.打开dialog
        this.dialogFormVisible = true;
      });
    },
    // 确定编辑分类
    confirmEditBlogTypeHandle() {
        const editInfo = {
            id:this.form.id,
            data:this.form
        }
        this.loading = true;
        updateOneBlogType(editInfo).then(()=>{
          this.loading = false;
            this.fetchData();
            this.$message({
                message:"更新分类成功！",
                type:"success"
            })
            this.dialogFormVisible = false;
        })
    },
    // 删除文章分类
    deleteBlogTypeHandle({ id }) {
      // 删除之前询问是否确认删除(element-ui)
      this.$confirm(
        "删除分类后，分类下的所有文章将变为无分类状态, 是否继续?",
        "删除此文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          deleteBlogType(id).then(() => {
            this.loading = false;
            // 删除之后，重新获取数据
            this.fetchData();
            // 并且提示删除成功
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.blogType-container {
  padding: 20px;
}
.blogAddInput {
  width: 400px;
  margin-bottom: 20px;
}
</style>