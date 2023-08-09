<template>
  <div class="blogSelect-container" ref="mainContainer">
    <!-- 返回按钮 -->
    <div class="previous" @click="previous">
      <Icon type="return" />
    </div>
    <!-- 最上面的标题 -->
    <div class="topTitle" v-if="arr.length">
      <span class="title">{{ name }}</span>
    </div>
    <!-- 标题下面的小图标总和 -->
    <div class="total" v-if="arr.length">
      <!-- 鸡汤 -->
      <div class="words">
        <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!暂放，以后放毒鸡汤 -->
      </div>
      <!-- 图标和总数 -->
      <div class="iconAndWord">
        <Icon type="total" class="icon" />
        <span v-if="arr.length">{{ articleCount }}</span>
      </div>
    </div>
    <!-- 将所有博客内容集成于ul，一个li就是一个博客内容 -->
    <ul>
      <li v-for="item in arr" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img
              v-lazy="item.thumb"
              :alt="item.title"
              :title="item.title"
            />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'blogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <div class="littleIcon">
              <Icon type="date" class="icon" />
              <span class="word">{{ formatDate(item.createDate) }}</span>
            </div>
            <div class="littleIcon">
              <Icon type="eye" class="icon" />
              <span class="word">{{ item.scanNumber }}</span>
            </div>
            <!-- <span>浏览次数：{{ item.scanNumber }}</span> -->
            <!-- <span>评论：{{item.commentNumber}}</span> -->
          </div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <div class="noMore" v-if="arr.length">
      <Icon type="windmill" class="icon" />
      <span class="words">没 有 更 多 啦</span>
    </div>
    <Empty v-if="arr.length === 0 && !isLoading" />
  </div>
</template>

<script>
import { getBlogs, getOneCategory, getBlogCategories } from "@/api/blog.js";
import Loading from "@/components/Loading";
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Icon from "@/components/Icon.vue";
export default {
  mixins: [mainScroll("mainContainer")],
  components: {
    Pager,
    Loading,
    Empty,
    Icon,
  },
  data() {
    return {
      isLoading: false,
      id: "",
      arr: [],
      name: "",
      articleCount: 0,
      allArticleCount: 0,
    };
  },
  mounted() {
    // this.id = this.$route.params.categoryId;
    this.id = this.$route.params.categoryId.toString();
    // console.log(this.id);
    // console.log(this.$route.params.item.name);
    this.fetchData();
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      // -1表示获取所有的分类
      const categoryId = +this.$route.params.categoryId || -1;
      // 默认获取第一页
      const page = +this.$route.query.page || 1;
      // 默认获取第十页
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    fetchData() {
      this.isLoading = true;
      // 获取每个文章单独的文章数
      getOneCategory(this.id).then((res) => {
        this.articleCount = res.articleCount;
        // 获取所有文章的总数
        getBlogCategories().then((res) => {
          for (const everyCategory of res) {
            this.allArticleCount += everyCategory.articleCount;
          }
          const count = Math.ceil(this.allArticleCount / 10);
          for (let i = 1; i <= count; i++) {
            getBlogs(i, 10, -1).then((res) => {
              this.isLoading = false;
              let arr1 = res.rows.filter((item) => {
                return item.category.id.toString() === this.id.toString();
              });
              this.arr.push(...arr1);
              this.name = this.arr[0].category.name;
            });
          }
        });
      });
    },
    // 返回上一级按钮
    previous() {
      this.$router.push({
        name: "blog",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogSelect-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: @bg2;
  overflow-x: hidden;
  // 返回上一级按钮
  .previous {
    position: fixed;
    left: 290px;
    top: 80px;
    opacity: 0.5;
    transform: scale(3);
    transition: 1s;
    z-index: 1;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  //   总标题
  .topTitle {
    position: relative;
    left: 33%;
    width: 30%;
    height: 15%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 5px 5px 5px #a7a7a7;
    margin-top: 50px;
    margin-bottom: 40px;
    border-radius: 10px;
    transition: 1s;
    &:hover{
      box-shadow: 10px 10px 10px @shadow;
    }
    .title {
      position: relative;
      top: -5px;
      font-size: 50px;
      font-weight: 100px;
    }
  }
  // 篇数
  .total {
    position: relative;
    top: -2%;
    left: 60%;
    margin-left: -30px;
    display: flex;
    .iconAndWord {
      display: flex;
      .icon {
        margin-right: 5px;
      }
    }
  }
  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    margin-bottom: 380px;
    li {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      position: relative;
      display: flex;
      padding: 30px 20px;
      border-top: 1px solid @gray;
      border-bottom: 1px solid @gray;
      margin-top: 20px;
      margin-bottom: 30px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 5px 5px 5px #a7a7a7;
      transition: 1s;
      &:hover {
        box-shadow: 10px 10px 9px #a7a7a7;
        width: 92%;
      }
      .thumb {
        flex: 0 0 auto;
        margin-right: 10px;
        img {
          display: block;
          width: 200px;
          height: 150px;
          border-radius: 10px;
        }
      }
      .main {
        flex: 1 1 auto;
        h2 {
          margin: 0;
        }
      }
      .aside {
        font-size: 12px;
        color: @gray;
        display: flex;
        align-items: center;

        .littleIcon {
          margin: 0 20px;
          display: flex;
          align-items: center;
          .icon {
            margin-right: 3px;
          }
          .word {
            margin-left: 3px;
          }
          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
      .description {
        margin: 15px 0;
        font-size: 14px;
      }
    }
  }
  // 风车
  .noMore {
    // background: yellow;
    position: relative;
    left: 49%;
    bottom: -20px;
    transform: translateX(-50%);
    display: flex;
    align-items: end;
    justify-content: center;
    margin-bottom: 30px;
    color: @gray;
    .icon {
      position: relative;
      bottom: 12px;
      transform: scale(3);
      animation: rotate 4s linear infinite;
    }
    .words {
      margin-left: 50px;
      font-size: 30px;
    }
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0) scale(3);
  }
  100% {
    transform: rotate(360deg) scale(3);
  }
}
</style>