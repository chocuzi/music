<template>
  <div class="song-foother">
    <!-- 背景 -->
    <div
      class="song-foother-bg"
      :style="{
        'background-image': 'url(' + currentMusic.picUrl + ')',
        opacity: '1',
        transform: 'scale(1.5)',
        filter: 'blur(30px)',
      }"
    ></div>
    <!-- 播放进度条模块 -->
    <div class="song-range">
      <!-- 正在播放时间 -->
      <span
        >{{ getParseInt(parseInt(currentTime / 60)) }}:{{
          getParseInt(parseInt(currentTime % 60))
        }}</span
      >
      <!-- <input type="range" /> -->
      <!-- 正在播放进度条 -->
      <div class="div-range" @click="range">
        <div ref="activeRange">
          <div
            class="active-range"
            @touchmove.self.stop="moveH"
            @touchend.self.stop="moveEnd"
          ></div>
        </div>
      </div>
      <!-- 播放总时长 -->
      <span
        >{{ getParseInt(parseInt(duration / 60)) }}:{{
          getParseInt(parseInt(duration % 60))
        }}</span
      >
    </div>
    <!-- 底部播放控件 -->
    <div class="song-foother-control">
      <div class="loop-ctrl" @click="changeLoop" :class="status">
        <!-- <img :src="'../lib/' + status + '.png'" /> -->
        <img :src="banners[numLoop % 3]" />
        <!-- <img src="../lib/orderCycle.png" /> -->
      </div>
      <div class="pre-song-ctrl">
        <img src="../lib/pre-song.png" @click.self="preSong" />
      </div>
      <!-- 播放暂停 -->
      <div
        class="paly-song-ctrl"
        @click.self="$emit('foother-is-play', !paused)"
        :class="{ 'paly-stop-ctrl': paused }"
      ></div>
      <!-- 下一首 -->
      <div class="next-song-ctrl">
        <img src="../lib/next-song.png" @click.self="nextSong" />
      </div>
      <div class="list-song-ctrl">
        <img src="../lib/songList.png" @click="isShowSongList = true" />
      </div>
    </div>
    <div class="current-song-list" v-show="isShowSongList">
      <CurrentSongList
        :newSongList="newSongList"
        :currentMusic="currentMusic"
        @show-song-list="isShowSongList = false"
        @remo-list="$emit('remo-list', $event)"
        @current-play-sing="currentSingIndex"
        :banners="banners"
        :numLoop="numLoop"
        @changeSongStates="changeLoop"
      />
      <!-- @current-play-sing="$emit('current-play-sing', $event)" -->
    </div>
  </div>
</template>

<script>
import CurrentSongList from "@/components/CurrentSongList.vue";
export default {
  props: {
    currentMusic: Object,
    duration: Number,
    currentTime: Number,
    paused: Boolean,
    currentIndex: Number,
    newSongList: Array,
  },
  components: {
    CurrentSongList,
  },
  data() {
    return {
      isDown: false,
      x: 100,
      percentage: 0,
      status: "orderCycle",
      numLoop: 0,
      isShowSongList: false,
      banners: [
        require("../lib/orderCycle.png"),
        require("../lib/singleCycle.png"),
        require("../lib/randomCycle.png"),
      ],
    };
  },
  watch: {
    currentTime: function () {
      let activeRange = this.$refs.activeRange;
      activeRange.style.width = this.getRange() * 100 + "%";
      if (this.currentTime >= this.duration) {
        this.nextSong();
        // this.preSong();
        this.$emit("updata:down", false);
      }
    },
  },
  methods: {
    //计算进度条
    getRange() {
      this.percentage = this.percentage = this.currentTime / this.duration;
      return this.percentage;
    },
    //点击
    range(e) {
      let activeRange = this.$refs.activeRange;
      this.x = e.pageX;
      if (this.x - 71 > activeRange.parentNode.offsetWidth) {
        this.x = activeRange.parentNode.offsetWidth + 71;
      }
      activeRange.style.width = this.x - 71 + "px";
      this.percentage = (this.x - 71) / activeRange.parentNode.offsetWidth;
      this.$emit("updata:percentage", this.percentage);
    },
    // 移动
    moveH(e) {
      this.isDown = true;
      this.$emit("updata:down", this.isDown);
      let activeRange = this.$refs.activeRange;
      let cx = e.touches[0].pageX - 71;
      if (cx > activeRange.parentNode.offsetWidth) {
        cx = activeRange.parentNode.offsetWidth;
      }
      activeRange.style.width = cx + "px";
      // console.log(cx);
      this.percentage = cx / activeRange.parentNode.offsetWidth;
      this.$emit("updata:percentage", this.percentage);
      // this.isDown = false;
    },
    // 移动结束
    moveEnd() {
      this.isDown = false;
      this.$emit("updata:down", this.isDown);
    },
    // 处理播放时间
    getParseInt(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    },
    runningStatus(i, isTrue) {
      //单曲循环
      if (this.numLoop % 3 == 1) {
        this.$emit("transmit-isSingleCycle", true);
      }
      if (this.status === "orderCycle") {
        if (isTrue) {
          i++;
        } else {
          i--;
        }
        return i;
      } else if (this.status === "singleCycle") {
        return i;
      } else if (this.status === "randomCycle") {
        return Math.floor(Math.random() * this.newSongList.length);
      }
    },
    // 下一首
    nextSong() {
      //下一首的索引
      let index = this.runningStatus(this.currentIndex, true);
      this.$emit("transmit-index", index);
      this.$emit("updata:down", false);
    },
    preSong() {
      let index = this.runningStatus(this.currentIndex, false);
      this.$emit("transmit-index", index);
      this.$emit("updata:down", false);
    },
    changeLoop() {
      this.numLoop++;
      if (this.numLoop % 3 == 0) {
        // 顺序播放
        this.status = "orderCycle";
      } else if (this.numLoop % 3 == 1) {
        // 单曲播放
        this.status = "singleCycle";
      } else if (this.numLoop % 3 == 2) {
        // 随机播放
        this.status = "randomCycle";
      }
    },
    currentSingIndex(obj) {
      // console.log(obj);

      this.$emit("current-play-sing", obj);
    },
    // currentPlaySing(id) {
    //   console.log(id);
    // },
  },
};
</script>

<style scoped lang="less">
.song-foother {
  position: relative;
  width: 100%;
  height: 130px;
  // background-color: #050606;
  // z-index: 2;
  z-index: 3;
  .current-song-list {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: calc(100% - 40px);
    height: 500px;
    margin: 0 20px;
    background-color: #333;
    // opacity: 1;
    box-sizing: border-box;
    border-radius: 15px;
    z-index: 4;
    overflow: hidden;
    // display: none;
  }
  .song-foother-bg {
    background-color: #161824;
    background-position: 40%;
    background-repeat: no-repeat;
    background-size: auto 20%;
    // background-size: 100%;
    transform-origin: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 90%;
    height: 100px;
    overflow: hidden;
    z-index: 1;
  }
  .song-range {
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    span {
      margin: 0 20px;
      white-space: nowrap;
    }
    .div-range {
      flex: 1;
      // margin: 0 20px;
      width: 90%;
      height: 3px;
      background-color: white;
      border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
      div {
        position: relative;
        width: 0;
        height: 100%;
        // margin-left: 1px;
        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
        background-color: #ff3a3a;
        .active-range {
          position: absolute;
          left: calc(100% - 8px);
          top: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #ff3a3a;
          &::after {
            // content: "";
            // display: block;
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            // width: 4px;
            // height: 4px;
            // border-radius: 50%;
            // background-color: red;
          }
        }
      }
    }
  }
  .song-foother-control {
    position: relative;
    z-index: 1;
    display: flex;
    // flex-direction:;
    // flex-direction: center;
    justify-content: space-around;
    align-items: center;
    margin: 0 50px;
    height: 89px;
    // .loop-ctrl {
    // }

    // .pre-song-ctrl {
    // }
    .paly-song-ctrl {
      //       position: absolute;
      // top: 8px;
      // left: 8px;
      width: 34px;
      height: 34px;
      background: url(../lib/playbar.png) no-repeat -41px -166px;
      &.paly-stop-ctrl {
        background: url(../lib/playbar.png) no-repeat -41px -205px;
      }
    }

    // .next-song-ctrl {
    // }
    // .list-song-ctrl {
    // }
  }
}
</style>