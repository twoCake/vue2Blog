<template>
  <div class="project-container" ref="projectContainer">
    <template v-if="loading">
      <Loading />
    </template>
    <template v-else>
      <a
        v-for="item in data"
        :key="item.id"
        :target="item.url ? '_blank' : '_self'"
        class="project-item"
        :href="item.url ? item.url : `javascript:alert('该项目无法访问')`"
      >
        <div class="img">
          <img v-lazy="item.thumb" alt="" class="thumb" />
        </div>
        <div class="info">
          <div :href="item.url ? item.url : `javascript:alert('该项目无法访问')`">{{ item.name }}</div>
          <div class="github">github</div>
          <p v-for="(desc, index) in item.description" :key="index">
            {{ desc }}
          </p>
        </div>
      </a>
      <Empty v-if="data.length === 0 && !loading" />
    </template>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Empty from "@/components/Empty.vue";
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  mixins: [mainScroll("projectContainer")],
  components: {
    Loading,
    Empty,
  },
  computed: {
    ...mapState("project", ["data", "loading"]),
  },
  mounted() {
    this.$store.dispatch("project/fetchProject");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  line-height: 1.7;
  position: relative;
  padding: 90px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: @projectBg;
  .project-item {
    cursor: pointer;
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
      .img{
        margin-right: 15px;
      }
    &:hover {
      box-shadow: 10px 10px 9px #a7a7a7;
      width: 92%;
    }
    .thumb {
      width: 250px;
      min-height: 150px;
      flex: 0 0 auto;
      object-fit: cover;
      border-radius: 5px;
      margin-left: 15px;
    }
    .info {
      line-height: 1.7;
      flex: 1 1 auto;
      h2 {
        margin: 0;
      }
      .github {
        font-size: 14px;
        color: @primary;
      }
    }
  }
}
</style>