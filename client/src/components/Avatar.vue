<template>
  <div class="avatar-container" v-if="avatar">
    <img class="avatar" :src="avatar" alt="" />
  </div>
</template>


<script>
import { getSetting } from "@/api/setting.js";
export default {  
data() {
    return {
        avatar:"",
    }
},
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getSetting().then((res) => {
        this.avatar = res.avatar;
        // console.log(this.avatar);
      });
    },
  },
  // computed: {
  //   imageUrl() {
  //     if (this.avatar.search("http") != -1) {
  //       return this.avatar
  //     } else {
  //       return "http://127.0.0.1:7001" + this.avatar
  //     }
  //   },
  // },
};
</script>

<style lang="less" scoped>
.avatar-container {
  width: 120px;
  height: 120px;
  position: relative;
  // background: red;
  border-radius: 50%;
  overflow: hidden;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 120px;
    background: #fff;
    transform: skew(-45deg) translateX(-50px);
  }
  &:hover::after {
    animation: flash 0.6s;
  }
  @keyframes flash {
    0% {
      transform: skew(-45deg) translateX(-50px);
    }
    100% {
      transform: skew(-45deg) translateX(150px);
    }
  }
}
</style>