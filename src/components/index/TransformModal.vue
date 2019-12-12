<template>
  <div v-show="visiable" class="mask" @click="close" @touchmove.prevent @mousewheel.prevent>
    <div class="modal" @click.stop="bubbleHack">
      <div class="title">输入或粘贴文字</div>
      <div class="body">
        <textarea ref="textArea" class="input" v-model="txt" maxlength="150"
          placeholder="请输入需要转语音的文字 (使用小程序可实现6万字转成语音哦! )" @input="inputTxt" @change="inputChange"
          @click.stop="handleTextArea"></textarea>
        <div class="text-length">{{txtLen}}/150</div>
        <div class="start-btn" v-show="status===0" @click="speechSynth">朗读文字</div>
        <div class="play-control" v-show="status>0" @click="playAudio">{{status===1||status===3?'播放文字':'暂停播放'}}</div>
        <div class="reader-list">
          <div class="reader" v-for="reader in readerList" :key="reader.id" :class="{'actived': readerID===reader.id}"
            @click="selectReader(reader.id)">
            <div class="r-pic" :class="[reader.avatarClass]"></div>
            <div class="r-name">{{reader.name}}</div>
          </div>
        </div>
      </div>
      <div class="close-btn" @click="close"></div>
    </div>
    <audio ref="audio" :src="audioUrl" @ended="playAudio"></audio>
  </div>
</template>

<script>
import { speechSynth, getSynthResult, queryProcess } from "../../api/index";
import { Dialog, Toast } from "vant";

export default {
  props: {},
  data() {
    return {
      txt: "",
      txtLen: 0,
      status: 0, // 0音频合成前; 1合成成功,可播放; 2播放中; 3暂停;
      process: 0, // 合成进度
      readerID: 8,
      audioUrl: "",
      readerList: [
        {
          id: 8,
          name: "小媛朗读员",
          avatarClass: "p1"
        },
        {
          id: 40,
          name: "小丸子朗读员",
          avatarClass: "p2"
        },
        {
          id: 35,
          name: "原野-评书朗读员",
          avatarClass: "p3"
        }
      ],
      visiable: false
    };
  },
  computed: {},
  created() {
    console.log(returnCitySN["cip"]);
  },
  mounted() {
    this.audio = this.$refs.audio;
  },
  methods: {
    async speechSynth() {
      if (!this.txt) {
        Toast.fail('请输入或粘贴文字');
        return;
      }
      const { data, code } = await speechSynth({
        bgVoxId: "",
        bgVoxPath: "",
        readerID: this.readerID,
        duration: "",
        isStatistics: 1,
        openId: "",
        speed: 50,
        title: "",
        ttsContent: this.txt,
        unionId: "",
        volume: 0,
        way: 3,
        readerVolume: 5,
        pitch: 50,
        bgVoxType: 0,
        ipAddress: returnCitySN["cip"]
      });
      if (code === 0) {
        this.pollingProcess(data.serialId, 2);
			}
			window._hmt.push(['_trackEvent', '朗读文字', '朗读文字', '朗读文字'])
    },
    async pollingProcess(id, type) {
			// 轮询查询语音合成进度
			Toast.loading({
        message: "合成中...",
        forbidClick: true
      });
      const { data, code } = await queryProcess({ serialId: id, type });
      if (code === 0) {
        const { process } = data;
        this.process = process;
        if (this.process < 100) {
          setTimeout(() => {
            this.pollingProcess(id, type);
          }, 1000);
        } else {
					Toast.clear();
          const { data, code } = await getSynthResult({ serialId: id }); //获取合成后音频
          if (code === 0) {
            this.status = 1;
            this.audioUrl = data.vsriDownurl;
          }
        }
      }
    },
    playAudio() {
      if (this.status === 1 || this.status === 3) {
        this.status = 2;
        this.audio.play();
      } else if (this.status === 2) {
        this.status = 3;
        this.audio.pause();
      }
    },
    inputTxt() {
      this.txtLen = this.txt.length;
    },
    inputChange() {
      // 内容改变，需要重新合成
      console.log("change");
      this.status = 0;
    },
    handleTextArea() {
      if (this.status === 2) {
        this.$refs.textArea.blur();
        Dialog({ message: "播放中,请暂停后修改" });
      }
    },
    selectReader(id) {
      this.readerID = id;
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
  watch: {
    readerID() {
      // 朗读员改变，需要重新合成
			this.status = 0;
			this.audio.pause();
    }
  }
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
    top: 180px;
    padding-top: 42px;
    margin: 0 auto;
    width: 700px;
    height: 780px;
    border-radius: 12px;
    background-color: #fff;
    font-size: 32px;
    color: #333;
    .title {
      font-size: 34px;
      font-weight: bold;
      margin-bottom: 22px;
    }
    .input {
      width: 646px;
      height: 360px;
      padding: 25px;
      font-size: 30px;
      line-height: 44px;
      margin-bottom: 8px;
      border: 1px solid #dcdcdc;
      outline: none;
      resize: none;
    }
    .text-length {
      width: 646px;
      margin: 0 auto;
      text-align: right;
      color: #999999;
      font-size: 26px;
    }
    .start-btn,
    .play-control {
      @include childCenterXY;
      width: 500px;
      height: 80px;
      background: #1a99f6;
      border-radius: 12px;
      margin: 0 auto;
      margin-bottom: 30px;
      font-weight: bold;
      font-size: 30px;
      color: #fff;
      background-image: url("../../assets/ic_shengyin.png");
      background-repeat: no-repeat;
      background-size: 42px;
      background-position: 160px center;
      text-indent: 38px;
    }
    .reader-list {
      width: 646px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      .reader {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24px;
        .r-pic {
          position: relative;
          width: 90px;
          height: 90px;
          background-repeat: no-repeat;
          background-size: contain;
          margin-bottom: 10px;
          &:after {
            content: " ";
            position: absolute;
            top: 0;
            right: -15px;
            display: inline-block;
            width: 31px;
            height: 31px;
            background-image: url("../../assets/btn_check2.png");
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        .p1 {
          background-image: url("../../assets/pic-ldy.png");
        }
        .p2 {
          background-image: url("../../assets/pic-ldy2.png");
        }
        .p3 {
          background-image: url("../../assets/pic-ldy3.png");
        }
        &.actived {
          .r-pic {
            &:after {
              right: -20px;
              width: 40px;
              height: 40px;
              background-image: url("../../assets/btn_check.png");
            }
          }
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
}
</style>