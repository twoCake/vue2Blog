<template>
  <div class="blogDetail-container">
    <div class="previous" @click="previous">
      <Icon type="return" />
    </div>
    <!-- 标题 -->
    <div class="topTitle">{{ blog.title }}</div>
    <!-- 小信息 -->
    <div class="aside">
      <div class="littleIcon">
        <Icon type="date" class="icon" />
        <span class="word">{{ formatDate(blog.createDate) }}</span>
      </div>
      <div class="littleIcon">
        <Icon type="eye" class="icon" />
        <span class="word">{{ blog.scanNumber }}</span>
      </div>
      <!-- <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览次数：{{ blog.scanNumber }}</span> -->
      <!-- <span>
        <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      </span> -->
      <span>
        <RouterLink
          :to="{
            name: 'blogSelect',
            params: {
              categoryId: blog.category.id,
            },
          }"
          >{{ blog.category.name }}</RouterLink
        >
      </span>
    </div>
    <!-- 转载提示信息 -->
    <div class="makeFootnote">
      <p>转载或引用请注明原文地址：{{ articleLocation }}</p>
      <p>如若转载，请保留原文地址，谢谢合作。</p>
      <p>桃李不言，下自成蹊</p>
    </div>
    <!-- 文章的图片 -->
    <div class="image">
      <img
      
        v-if="blog.thumb"
        class="img"
        :src="blog.thumb"
        alt="o.0"
      />
      <!-- <img v-else class="img" src="../../../assets/favicon.png" alt="" /> -->
    </div>
    <!-- 内容 -->
    <div class="content" v-html="blog.htmlContent"></div>
    <!-- <BlogComment/> -->
    <!-- 没有更多啦 -->
    <div class="noMore">
      <Icon type="windmill" class="icon" />
      <span class="words">没 有 更 多 啦</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import Icon from "@/components/Icon.vue";
import "highlight.js/styles/github.css";
// import BlogComment from "./BlogComment.vue";
export default {
  data() {
    return {
      articleLocation:"",
    }
  },
  components: {
    // BlogComment,
    Icon,
  },
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate,
    previous() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.articleLocation = window.location.href;
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blogDetail-container {
  padding: 0 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .previous {
    position: fixed;
    left: 290px;
    top: 80px;
    opacity: 0.5;
    transform: scale(3);
    transition: 1s;
    // z-index: 99;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
  // 文章标题
  .topTitle {
    position: relative;
    padding: 40px;
    left: 0;
    // width: 30%;
    height: 15%;
    // background: #51be4f;
    background: @bg;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 5px 5px 5px @shadow;
    margin-top: 50px;
    margin-bottom: 20px;
    border-radius: 10px;
    font-size: 1.5em;
    transition: 1s;
    &:hover{
      box-shadow: 10px 10px 10px @shadow;
    }
  }
  // 转载提示信息
  .makeFootnote{
    padding:5px 20px;
    background: @projectBg;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    font-size: 0.9em;
    opacity: 0.3;
    transition: 1s;
    box-shadow: 5px 5px 5px @shadow;
    margin-bottom: 50px;
    &:hover{
      box-shadow: 10px 10px 10px @shadow;
      opacity: 1;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    display: flex;
    align-items: center;
    margin-bottom: 40px;

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
  .image {
    overflow: hidden;
    // width: 800px;
    // height: 600px;
    // background: lightcoral;
    margin: 30px 0 40px 0;
    position: relative;
    border-radius: 15px;
    object-fit: cover;
    box-shadow: 5px 5px 5px @shadow;
    background: @shadow;
    transition: 1s;
    &:hover {
      box-shadow: 13px 13px 13px @shadow;
    }
    .img {
      width: 1000px;
      height: 600px;
      border-radius: 10px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 100vh;
      background: #fff;
      transform: skew(-45deg) translateX(-600px);
    }
    &:hover::after {
      animation: flash 1.5s;
    }
  }
  // 内容区域
  .content {
    width: 100%;
    font-size: 1.2em;
    line-height: 1.3em;
    margin-bottom: 300px;
  }
  .noMore {
    // background: yellow;
    position: relative;
    left: 8%;
    bottom: -20px;
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
// 玻璃特效
@keyframes flash {
  0% {
    transform: skew(-45deg) translateX(-600px);
  }
  100% {
    transform: skew(-45deg) translateX(1500px);
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