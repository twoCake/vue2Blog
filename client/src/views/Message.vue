<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${allItems.total})`"
      :isListLoading="isLoading"
      :list="allItems.rows"
      @submit="handleSubmit"
    />
    <!-- 没有更多啦 -->
    <div class="noMore">
      <Icon type="windmill" class="icon" />
      <span class="words">没 有 更 多 啦</span>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/views/Blog/components/MessageArea/MessageArea.vue";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
import Icon from "@/components/Icon.vue";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  components: {
    MessageArea,
    Icon,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    // 检测是否已经到达了最后一页评论
    hasMoreComment() {
      return this.allItems.rows.length < this.allItems.total;
    },
  },
  methods: {
    async fetchData() {
      return await msgApi.getMessages(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.allItems.rows.unshift(resp);
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 表示目前正在加载评论，就不必多次重复加载，节流
        return;
      }
      // 定义一个距离，只要可视屏幕距离底部还有range的距离，就会加载更多评论
      const range = 100;
      // scrollTop已经滚动的距离；clientHeight屏幕的高度；scrollHeight dom的总长度
      // Math.abs()取绝对值，避免负数
      const dec = Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight);
      if (dec <= range) {
        // 表示即将到达底部
        this.fetchMore();
      }
    },
    // 加载更多（下一页）
    async fetchMore() {
      if (!this.hasMoreComment) {
        // 说明已经没有更多的了，无法加载评论，直接返回
        return;
      }
      this.isLoading = true;
      this.page++;
      // 再次调用下一页数据
      const resp = await this.fetchData();
      // 重新为之前已经获取到的数据赋值
      this.allItems.total = resp.total;
      // 将resp.rows中的内容加入到this.allItems.rows中
      this.allItems.rows = this.allItems.rows.concat(resp.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.message-container {
  background: @bg3;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 50px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  .messageArea-container {
    background: #fff;
    padding: 20px;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 8px 8px 3px #a7a7a7;
    transition: 1s;
    margin-bottom: 300px;
    &:hover {
      box-shadow: 13px 13px 9px #a7a7a7;
      width: 92%;
      transform: translateY(-10px);
    }
  }
  .noMore {
    // background: yellow;
    position: relative;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    display: flex;
    align-items: end;
    justify-content: center;
    margin-bottom: 30px;
    color: @gray;
    .icon {
      position: relative;
      bottom: 8px;
      transform: scale(3);
      animation: rotate 4s linear infinite;
    }
    .words {
      margin-left: 50px;
      font-size: 30px;
    }
  }
}
// 风车旋转
@keyframes rotate {
  0% {
    transform: rotate(0) scale(3);
  }
  100% {
    transform: rotate(360deg) scale(3);
  }
}
</style>