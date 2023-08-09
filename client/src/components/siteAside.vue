<template>
  <div class="siteAside-container">
    <!-- 信息 -->
    <div class="info">
      <div class="avatar">
        <Avatar />
        <!-- 如果有data值，才渲染data中的name属性 -->
      </div>
      <div class="username" v-if="data">
        <p>{{ siteTitle }}</p>
      </div>
      <!-- 位置 -->
      <div class="location">
        <Icon type="position" class="position"/>
        <span class="word">江西 南昌</span>
      </div>
    </div>
    <div class="menu">
      <Menu />
    </div>
    <div class="contact">
      <Contact />
    </div>
    <template v-if="data">
      <a href="https://beian.miit.gov.cn/" target="_blank" class="footer">{{
        icp
      }}</a>
    </template>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import Menu from "./Menu.vue";
import Contact from "./Contact.vue";
import { mapState } from "vuex";
import { getSetting } from "@/api/setting.js";
import Icon from "@/components/Icon.vue";
export default {
  components: {
    Avatar,
    Contact,
    Menu,
    Icon,
  },
  data() {
    return {
      siteTitle: "",
      icp: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        this.siteTitle = res.siteTitle;
        this.icp = res.icp;
      });
    },
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.siteAside-container {
  width: 200px;
  height: 100%;
  background: @dark;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-sizing: border-box;

  .info {
    position: relative;
    .avatar {
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 25px;
    }
    .username {
      color: #fff;
      font-size: 25px;
      text-align: center;
    }
    .location {
      display: flex;
      justify-content:space-evenly;
      .position{
        color:red;
        transform: scale(1.2);
      }
      .word{
        color: #fff;
        font-size: 15px;
      }
    }
  }

  .footer {
    font-size: 15px;
    color: #6d6d6d;
    &:hover {
      color: #fff;
    }
  }
}
</style>