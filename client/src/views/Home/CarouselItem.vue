<template>
  <div
    class="carousel-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="image_outer" :style="imagePosition" ref="image_outer">
      <img class="img" :src="item.bigImg" alt="" />
    </div>
    <div class="from" ref="from" tran>{{ item.title }}</div>
    <div class="title1" ref="title1" tran>{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      title1Width: 0,
      title2Width: 0,
      fromWidth: 0,
      progressiveEnd: false,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, //里层图片的尺寸
      mouseX: 0, //鼠标的x坐标
      mouseY: 0, //鼠标的y坐标
    };
  },
  mounted() {
    // 显示渐进式文字
    this.title1Width = this.$refs.title1.clientWidth;
    this.fromWidth = this.$refs.from.clientWidth;
    this.showWords();

    // 刚开始挂载时，获取外层容器的尺寸和里层图片的尺寸
    this.setSize();

    // 初始化鼠标的位置（即使真实的鼠标不在中间，此处只是想让图片一开始处于正中间）
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;

    // 挂载时为全局添加事件监听器
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  computed: {
    // 得到图片坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      // 多出的宽度
      const extraWidth = this.innerSize.width - this.containerSize.width;
      // 多出的高度
      const extraheight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraheight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
    // imageUrl(){
    //     if(this.item.bigImg.search("http")!= -1){
    //         return this.item.bigImg
    //     }else{
    //         return "http://127.0.0.1:7001" + this.item.bigImg
    //     }
    // }
  },
  methods: {
    // 调用该方法，渐进式显示文字
    showWords() {
      // title1
      this.$refs.title1.style.opacity = 1;
      this.$refs.title1.style.width = 0;

      // from
      this.$refs.from.style.opacity = 1;
      this.$refs.from.style.width = 0;
      // 强制让浏览器渲染一次(reflow)
      this.$refs.title1.clientWidth;
      // 实现过渡
      this.$refs.title1.style.transition = "1s";
      this.$refs.title1.style.width = this.title1Width + "px";
      this.$refs.from.style.transition = "4s 1s";
      this.$refs.from.style.width = this.title1Width + "px";
    },
    // 尺寸变化时，调用此方法
    setSize() {
      // 实时更新外层容器的尺寸
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      // 实时更新里层图片的尺寸
      this.innerSize = {
        width: this.$refs.image_outer.clientWidth,
        height: this.$refs.image_outer.clientHeight,
      };
    },
    // 鼠标的移动事件
    handleMouseMove(e) {
      // 获取容器本体的矩形属性
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .image_outer {
    // 为了实现鼠标移动，图片的偏移量发生改变的情况，这里将宽高设置大一些
    width: 110%;
    height: 110%;
    position: relative;
    left: 0;
    top: 0;
    transition: 0.5s;
    .img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  .title1 {
    position: absolute;
    left: 20%;
    top: 35%;
    z-index: 20;
    letter-spacing: 3px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    font-size: 4em;
    font-family: "FangSong";
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }

  .from {
    position: absolute;
    left: 65%;
    top: 60%;
    z-index: 20;
    letter-spacing: 3px;
    color: #fff;
    // text-shadow: 1px 0 0 rgba(0,0,0,0.5),-1px 0 0 rgba(0,0,0,0.5),
    // 0 1px 0 rgba(0,0,0,0.5),0 -1px 0 rgba(0,0,0,0.5);
    font-size: 3em;
    font-family: "FangSong";
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }
}
</style>