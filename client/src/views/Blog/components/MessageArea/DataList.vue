<template>
  <ul class="datalist-container">
    <li v-for="item in list" :key="item.id">
      <img
        :src="item.avatar"
        alt="用户头像"
      />
      <div class="data">
        <div class="nickname">{{ item.nickname }}</div>
        <div class="time">{{ formatDate(item.createDate, true) }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { formatDate } from "@/utils/index";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.datalist-container {
  list-style: none;
  margin: 0;
  padding: 30px 40px;
  li {
    width: 100%;
    height: 130px;
    // background: steelblue;
    display: flex;
    border-top: 1px solid lightblue;
    border-left: none;
    border-right: none;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    &:first-of-type {
      border: none;
    }
    img {
      width: 100px;
      height: 100px;
      position: relative;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);

      border-radius: 50%;
    }
    .data {
      width: 100%;
      padding: 20px 20px 20px 40px;
      position: relative;
      .nickname {
        position: absolute;
        left: 40px;
        top: 20px;
        // background: red;
        font-size: 15px;
        font-weight: bold;
      }
      .time {
        position: absolute;
        right: 0;
        top: 20px;
        color: #afafafdd;
        // background: greenyellow;
      }
      .content {
        position: relative;
        top: 30px;
        text-indent: 2em;
      }
    }
  }
}
</style>