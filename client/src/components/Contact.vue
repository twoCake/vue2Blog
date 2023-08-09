<template>
  <div class="contact-container">
    <ul>
      <!-- QQ -->
      <li v-if="form.qq">
        <a>
          <div class="icon">
            <Icon type="qq" />
          </div>
          <span>{{ form.qq }}</span>
        </a>
        <div class="pop">
          <img :src="form.qqQrCode" />
        </div>
      </li>
      <!-- 微信 -->
      <li v-if="form.weixin">
        <a>
          <div class="icon">
            <Icon type="wechat" />
          </div>
          <span>{{ form.weixin }}</span>
        </a>
        <div class="pop">
          <img :src="form.weixinQrCode" />
        </div>
      </li>
      <!-- Gitee -->
      <li v-if="form.github">
        <a target="_blank" :href="form.githubName">
          <div class="icon">
            <Icon type="gitee" />
          </div>
          <span>{{ form.github }}</span>
        </a>
      </li>
      <!-- github
      <li>
        <a target="_blank" href="https://www.github.com/twoCake">
          <div class="icon">
            <Icon type="github" />
          </div>
          <span>twoCake</span>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<script>
import Icon from "./Icon.vue";
import { getSetting } from "@/api/setting.js";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      form: {
        avatar: "",
        favicon: "",
        github: "",
        githubName: "",
        icp: "",
        id: "",
        mail: "",
        qq: "",
        qqQrCode: "",
        siteTitle: "",
        weixin: "",
        weixinQrCode: "",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        // console.log("Contact/res", res);
        // res.qqQrCode = "http://127.0.0.1:7001" + res.qqQrCode;
        // res.weixinQrCode = "http://127.0.0.1:7001" + res.weixinQrCode;
        this.form = {...res};
        // console.log("Contact/this.form", this.form);
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  width: 200px;
  // height: 400px;
  // background: #000;
  color: #fff;
  margin: 0 auto;
  // overflow: auto;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      height: 30px;
      line-height: 30px;
      margin: 14px 0;
      position: relative;
      cursor: pointer;
      display: block;
      &:hover {
        .pop {
          transform: translate(-50%) scaleY(1);
          transition: 0.3s;
        }
      }
      a {
        margin: 0 auto;
        display: flex;
        align-items: center;
        color: @gray;
        position: relative;
        &:hover {
          color: #fff;
        }
        .icon {
          position: relative;
          left: 35px;
          margin-right: 50px;
          transform: scale(1.2);
        }
      }
      .pop {
        position: absolute;
        z-index: 99;
        left: 50%;
        top: 30px;
        transform: translate(-50%) scaleY(0);
        transform-origin: top center;
        cursor: default;
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -4px;
          transform: translateX(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 1px;
        }
        img {
          width: 120px;
          height: 120px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>