<template>
  <div id="app">
    <Layout>
      <template #left>
        <div class="left">
          <SiteAside></SiteAside>
        </div>
      </template>
      <template #default>
        <div class="main">
          <router-view></router-view>
        </div>
      </template>
    </Layout>
    <!-- 灯笼 -->
    <div class="lantern">
      <Lantern />
    </div>
    <!-- 回到顶部按钮 -->
    <div class="toTop">
      <ToTop />
    </div>
    <!-- 顶部的链接 -->
    <div class="topLinks">
      <!-- 每一个链接项 -->
      <div class="moreLinks">
        <div class="friendlyLink">
          <Icon type="friends" class="icon" />
        </div>
        <div class="content">
          <a class="user" href="https://juanwang212.tech/" target="_blank">
            <Icon type="bear1" class="user-icon" />
            <span>阿星</span>
          </a>
          <a class="user" href="https://xxecho.gitee.io/xecho/" target="_blank">
            <Icon type="bear2" class="user-icon" />
            <span>阿宇</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteAside from "@/components/siteAside.vue";
import Layout from "@/components/Layout.vue";
import Lantern from "@/components/Lantern.vue";
import ToTop from "@/components/ToTop.vue";
import Icon from "@/components/Icon.vue";
export default {
  name: "App",
  components: {
    SiteAside,
    Layout,
    Lantern,
    ToTop,
    Icon,
  },
  created() {
    if(this.isMobile()){
      // 手机端
      window.location.href="http://h5.skylamp.top"
    }else{
      // pc端
      this.$router.push("/")
    }
  },
  data() {
    return {
      current: 1,
      total: 300,
    };
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
    // 判断是否是移动端
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      localStorage.setItem("ismobile", flag ? 1 : 0);
      return flag;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 100vw;
  height: 100vh;
  .left {
    position: absolute;
    z-index: 10;
    width: 200px;
    height: 100%;
    box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
  .main {
    position: absolute;
    // z-index: 5;
    left: 200px;
    // left: 200;
    width: calc(100% - 200px);
    height: 100%;
  }
  .right {
    position: relative;
    width: 200px;
    height: 100%;
  }
  // 灯笼样式
  .lantern {
    position: absolute;
    top: 3%;
    left: 90%;
    z-index: 99;
  }
  // “回到顶部”样式
  .toTop {
    position: absolute;
    z-index: 100;
    left: 53%;
    top: 5%;
    transform: translate(-50%, -50%);
  }
  .topLinks {
    position: fixed;
    top: 0;
    left: 380px;
    // width: 15%;
    height: 70px;
    // background: red;
    display: flex;
    align-items: center;
    .moreLinks {
      position: relative;
      top: 12px;
      opacity: 0.7;
      transition: 1s;
      &:hover{
        opacity: 1;
      }
      // 友情链接
      .friendlyLink {
        width: 50px;
        height: 50px;
        .icon {
          color: @moreLinksIconShow;
          transform: scale(2);
          position: absolute;
          cursor: pointer;
          transition: 1s;
          &:hover{
            color:@friends;
          }
        }
        &:hover ~ .content {
          position: absolute;
          left: -5px;
          top: 40px;
        }
      }
      .content {
        position: absolute;
        left: -999999px;
        top: -999999px;
        z-index: 99;
        width: 500px;
        height: 80px;
        background: @bg4;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        &:hover {
          position: absolute;
          left: -5px;
          top: 40px;
        }
        .user {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: @friends;
          cursor: pointer;
          padding: 5px;
          transition: 0.5s;
          &:hover {
            background: #fff;
            padding: 5px;
            border-radius: 5px;
          }
          .user-icon {
            color: @friends;
            transform: scale(1.5);
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
