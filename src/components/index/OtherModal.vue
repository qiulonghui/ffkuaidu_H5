<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="modal" @click.stop="bubbleHack">
      <div class="header">
        <div class="m-title">{{content.mTitle}}</div>
        <div class="s-title">{{content.sTitle}}</div>
      </div>
      <div class="body">
        <img class="pic" :src="content.pic" alt="">
        <button class="btn" @click="showQRcode">去小程序体验</button>
      </div>
      <div class="close-btn" @click="close"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visiable: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
		showQRcode() {
			this.$emit('show-code');
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
    position: relative;
    left: 0;
    right: 0;
    top: 50%;
    padding-top: 42px;
    margin: 0 auto;
    width: 700px;
    min-height: 680px;
    border-radius: 12px;
    background-color: #fff;
    font-size: 32px;
    color: #333;
    transform: translateY(-50%);
    .header {
      margin-bottom: 26px;
      .m-title {
        font-size: 34px;
        font-weight: bold;
			}
			.s-title{
				font-size: 30px;
				color: #666666;
			}
    }
    .body {
      .pic {
        width: 600px;
        height: 400px;
        margin: 0 auto;
      }
      .btn {
        width: 500px;
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
  .close-btn {
    position: absolute;
    bottom: -75px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 60px;
    height: 60px;
    background-image: url("../../assets/btn_closed.png");
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>