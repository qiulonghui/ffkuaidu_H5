<template>
  <div class="index">
    <div class="banner">
      <van-swipe id="vswipe" :autoplay="3000" indicator-color="#2CCEC4">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img class="pic" :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="container">
      <div class="tit">—— 选择转语音的方式即可朗读 ——</div>
      <div class="features">
        <div class="item" @click="showTransModal">
          <span class="icon img1"></span>
          <span class="txt">输入或粘贴文字</span>
        </div>
        <div class="item" @click="showOtherModal('传图取字')">
          <span class="icon img2"></span>
          <span class="txt">传图取字转语音</span>
        </div>
        <div class="item" @click="showOtherModal('文档朗读')">
          <span class="icon img3"></span>
          <span class="txt">PDF/Word/PPT朗读</span>
        </div>
        <div class="item" @click="showOtherModal('网页链接')">
          <span class="icon img4"></span>
          <span class="txt">网页链接文章朗读</span>
        </div>
      </div>
    </div>
    <div class="open-btn" @click="showQRcodeModal">打开小程序</div>
    <div class="s-tip">前往微信小程序可体验更多朗读员和功能</div>
    <transform-modal ref="transfModal"></transform-modal>
    <other-modal ref="otherModal" :content="modalData" @show-code="showQRcodeModal"></other-modal>
    <qrcode-modal ref="qrcodeModal"></qrcode-modal>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
import modalData from "../utils/modalData";

export default {
  props: {},
  components: {
    TransformModal: () => import("../components/index/TransformModal"),
    QrcodeModal: () => import("../components/index/QRcodeModal.vue"),
    OtherModal: () => import("../components/index/OtherModal.vue"),
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      bannerList: [
        require("../assets/banner2.png"),
        require("../assets/banner3.png"),
        require("../assets/banner4.png")
      ],
      otherModalType: "传图取字"
    };
  },
  computed: {
    modalData() {
      return modalData[this.otherModalType];
    }
  },
  created() {},
  mounted() {},
  methods: {
    showTransModal() {
      this.$refs.transfModal.show();
    },
    showOtherModal(type) {
      this.otherModalType = type;
      this.$refs.otherModal.show();
    },
    showQRcodeModal() {
      this.$refs.otherModal.close();
      this.$refs.qrcodeModal.show();
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
#vswipe {
  height: 100%;
  .pic {
    width: 100%;
    height: 100%;
  }
}
.index {
  font-size: 28px;
  color: #666;
  .banner {
    width: 100%;
    height: 200px;
    background-color: #3ba7f2;
  }
  .container {
    margin-top: 48px;
    .tit {
      margin-bottom: 35px;
    }
    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 25px;
      margin-bottom: 42px;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 340px;
        height: 200px;
        box-shadow: 0px 5px 6px 0px rgba(204, 204, 204, 0.2);
        border-radius: 12px;
        background-color: #fff;
        margin-bottom: 16px;
        .txt {
          font-size: 30px;
          color: #333333;
        }
        .icon {
          display: inline-block;
          width: 80px;
          height: 80px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          margin-top: 36px;
          margin-bottom: 25px;
        }
        .img1 {
          background-image: url("../assets/ic_shuru.png");
        }
        .img2 {
          background-image: url("../assets/ic_chuantu.png");
        }
        .img3 {
          background-image: url("../assets/ic_PDF.png");
        }
        .img4 {
          background-image: url("../assets/ic_lianjie.png");
        }
      }
    }
  }
  .open-btn {
    @include childCenterXY;
    user-select: none;
    width: 640px;
    height: 88px;
    background: #1a99f6;
    font-size: 32px;
    font-weight: bold;
    border-radius: 12px;
    color: #fff;
    margin: 0 auto;
  }
  .s-tip {
    font-size: 30px;
    color: #9c9fa2;
    margin-top: 22px;
  }
}
.modal-header {
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 32px;
}
</style>