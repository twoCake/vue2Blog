<template>
  <div class="comment" v-loading="loading">
    数据表格
    <el-table
      :data="data"
      element-loading-text="加载数据中"
      border
      fit
      highlight-current-row
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <!-- 头像 -->
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>

      <!-- 昵称 -->
      <el-table-column align="center" label="昵称" width="150px">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>

      <!-- 内容 -->
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>

      <!-- 创建日期 -->
      <el-table-column align="center" label="评论日期" width="230px">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="150px">
        <template slot-scope="scope">
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
              @click="deleteCommentHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        style="margin-top: 30px"
        background
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="prev,pager,next,total,sizes,jumper"
        :total="count"
        :current-page.sync="pagerCurrentPage"
        @pre-click="preClickHandle"
        @next-click="nextClickHandle"
        @current-change="currentChangeHandle"
        @size-change="sizeChangeHandle"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
import { getMessage, deleteMessage,addMessage } from "@/api/message.js";
import { formatDate } from "@/utils/tools";
export default {
  data() {
    return {
      loading: false,
      data: [],
      currentPage: 1, //当前页码
      eachPage: 5, // 每页显示条数
      count: 0, //数据总条数
      totalPage: 0, //总页数
      pagerCurrentPage: 1, //分页栏当前页码
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      getMessage(this.currentPage,this.eachPage).then((res) => {
        this.loading = false;
        this.data = res.data.rows;
        for (const item of this.data) {
          item.createDate = formatDate(item.createDate);
        }
        this.count = res.data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 删除
    deleteCommentHandle(messageInfo) {
      // 删除之前询问是否确认删除(element-ui)
      this.$confirm(
        "删除文章后，该文章下的所有评论将会被一同删除, 是否继续?",
        "删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          deleteMessage(messageInfo.id).then(() => {
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

    // 以下是与分页组件有关的方法
    sizeChangeHandle(pageNumber) {
      this.eachPage = parseInt(pageNumber);
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    preClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.comment {
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