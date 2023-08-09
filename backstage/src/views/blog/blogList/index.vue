<template>
  <div class="blogList-container" v-loading="loading">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage-1)*eachPage +1 }}</template>
      </el-table-column>

      <!-- 文章名称 -->
      <el-table-column prop="title" label="文章名称" width="180" align="center">
        <template slot-scope="scope"
          ><el-popover
            placement="top-start"
            title="预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover></template
        >
      </el-table-column>

      <!-- 文章描述 -->
      <el-table-column
        prop="description"
        label="文章描述"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <!-- 浏览数 -->
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <!-- 评论量 -->
      <el-table-column
        prop="commentNumber"
        label="评论量"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <!-- 所属分类 -->
      <el-table-column prop="title" label="所属分类" width="180" align="center">
        <template slot-scope="scope">{{ scope.row.category?scope.row.category.name:"未分类"}}</template>
      </el-table-column>

      <!-- 创建日期 -->
      <el-table-column prop="title" label="创建日期" width="250" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <!-- 编辑 -->
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
              @click="editBlogHandle(scope.row)"
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager,next,total,sizes,jumper"
        :total="count"
        :page-size="eachPage"
        :page-sizes="[5, 10, 15, 20]"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        @prev-click="preClickHandle"
        @next-click="nextClickHandle"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { findBlog, deleteOneBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig";
export default {
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      loading:false,
      // 通过分页获取到的文章信息
      data: [],
      //   预览图链接数组
      srcList: [],
      eachPage: 10, //每页显示的条数
      currentPage: 1, // 当前的页码数，默认为第一页
      totalPage: 0, // 总页码数
      count: 0, // 数据总条数
      pagerCurrentPage: 1, //分页栏的当前页码
      
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      findBlog(this.currentPage, this.eachPage).then((res) => {
        this.loading = false;
        this.data = res.data.rows;
        // 将时间戳替换成正确的日期格式
        for (const item of this.data) {
          item.createDate = formatDate(item.createDate);
          // item.thumb = server_URL + item.thumb;
          this.srcList.push(item.thumb);
        }

        this.count = res.data.total; // 更新总条数
        this.totalPage = Math.ceil(this.count / this.eachPage); // 更新总页码数
        // 删除文章的时候可能会触发
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    // 通过点击标题的形式，可以进入博客查看详情
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
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
          deleteOneBlog(blogInfo.id).then(() => {
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
    // 编辑文章
    editBlogHandle(blogInfo){
      this.$router.push(`/editBlog/${blogInfo.id}`)
    },

    // 以下是与分页组件有关的方法
    sizeChangeHandle(pageNumber) {
        this.eachPage = parseInt(pageNumber);
        this.currentPage = 1;
        this.pagerCurrentPage = 1;
        this.fetchData()
    },
    currentChangeHandle(pageNumber) {
        this.currentPage = parseInt(pageNumber);
        this.fetchData();
    },
    preClickHandle() {
        this.currentPage -=1;
    },
    nextClickHandle() {
        this.currentPage +=1;
    },
  },
};
</script>

<style lang="scss" scoped>
.blogList-container {
  padding: 20px;
}
// 分页
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>