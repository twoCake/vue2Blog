<template>
  <div class="blogList-container" ref="mainContainer">
    <!-- 将所有博客内容集成于ul，一个li就是一个博客内容 -->
    <ul>
      <li v-for="item in allItems.rows" :key="item.id">
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
            <RouterLink
              :to="{
                name: 'blogSelect',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="allItems.rows.length === 0 && !isLoading" />
    <!-- 分页组件 -->
    <Pager
      v-if="allItems.total"
      :current="routeInfo.page"
      :total="allItems.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />
    <div class="loading" v-if="isLoading">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Pager from "@/components/Pager";
import Empty from "@/components/Empty";
import { getBlogs } from "@/api/blog.js";
import fetchData from "@/mixins/fetchData.js";
import { formatDate } from "@/utils";
import mainScroll from "@/mixins/mainScroll.js";
import Icon from "@/components/Icon.vue"
export default {
  // mixins组件混入（在混入的那个组件中，定义了一些初始时的数据和方法）
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Loading,
    Empty,
    Icon
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
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    // 点击之后，处理页码变化
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        // 说明当前无分类
        /*
                        $route   提供路由信息
                        $router  用于控制页面跳转
                    */
        this.$router.push({
          name: "blog",
          query,
        });
      } else {
        // 说明有分类
        this.$router.push({
          name: "blogSelect",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
      console.log(this.allItems);
    },
  },
  watch: {
    // 这里的$route是指this.$route
    async $route() {
      this.isLoading = true;
      //点击分页后，将滚动高度设置为0（将页面置顶）
      this.$refs.mainContainer.scrollTop = 0;
      // 监测到路由变化，就重新调用fetchData函数，并且重新为allItems赋值（fetchData和allItems都在mixins中）
      this.allItems = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogList-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: @bg;
  ul {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    li {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      position: relative;
      display: flex;
      padding: 30px 20px;
      // border-top: 1px solid @gray;
      border-bottom: 1px solid @gray;
      margin-top: 20px;
      margin-bottom: 30px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 3px 3px 3px #a7a7a7;
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
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>