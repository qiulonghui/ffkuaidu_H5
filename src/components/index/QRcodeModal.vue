<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="modal" @click.stop="bubbleHack">
      <div class="body">
        <img class="pic" src="../../assets/pic_QRcode.png" alt="">
        <button class="btn" 
					v-clipboard:copy="'讯飞快读'" v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制小程序名字</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      visiable: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
		onCopy() {
			window._hmt.push(['_trackEvent', '复制小程序名字', '复制小程序名字', '复制小程序名字'])
			this.$toast.success('复制成功')
		},
		onError() {
			this.$toast.fail('复制失败')
		},
    close() {
      this.visiable = false;
    },
    show() {
      this.visiable = true;
    },
    bubbleHack() {
      return false;
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .modal {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin: 0 auto;
    width: 660px;
    height: 680px;
    border-radius: 12px;
    background-color: #fff;
    font-size: 32px;
    color: #333;
    transform: translateY(-50%);
    .body {
      position: relative;
      .pic {
        width: 100%;
        height: 100%;
      }
      .btn {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        margin: 0 auto;
        width: 360px;
        height: 80px;
        background: #1a99f6;
        border-radius: 12px;
        outline: none;
        border: none;
        color: #fff;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>