<template>
  <div class="paly-audio" :class="{ paused: paused }">
    <audio
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      controls
      autoplay
      style="width: 100%; height: 40px; display: none"
      ref="audio"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <!-- v-show="currentMusic" -->
      <div class="play-audio-img" v-show="!isShowSong">
        <!-- 播放控件左侧部分 -->
        <div class="paly-audio-model" @click="isShowSong = true">
          <img :src="currentMusic.picUrl + '?param=40y40'" alt="" />
          <div class="paly-audio-name">
            <span>{{ currentMusic.name }}</span>
            <span>点击查看歌词</span>
          </div>
        </div>
        <!-- 播放控件右侧部分 -->
        <div class="circle" @click="togglePlayState">
          <canvas ref="circle" width="50" height="50"></canvas>
          <span class="icon"></span>
        </div>
        <div class="list-song"></div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <Song
        v-show="bool"
        :paused="paused"
        :currentMusic="currentMusic"
        :show-play-bar.sync="isShowSong"
        :duration.sync="duration"
        :currentTime.sync="currentTime"
        @updata:percentage="percentageRange"
        @foother-is-play="paused = $event"
        @updata:down="paused = $event"
        :currentIndex="$attrs.currentIndex"
        :newSongList="newSongList"
        @transmit-index="$emit('transmit-index', $event)"
        @transmit-isSingleCycle="isSingleCycle"
        @current-play-sing="$emit('current-play-sing', $event)"
        @remo-list="$emit('remo-list', $event)"
        @trans-current-index="abcd"
      ></Song>
    </transition>

    <!-- @click.native="isShowSong = false" -->
  </div>
</template>

<script>
import Song from "@/views/Song.vue";
export default {
  name: "PlayAudio",
  components: {
    Song,
  },
  props: ["currentMusic", "bool", "newSongList"],
  data() {
    return {
      paused: null,
      isShowSong: false,
      duration: 0,
      currentTime: 0,
      percentage: 0,
      down: false,
    };
  },
  mounted() {
    let audio = this.$refs.audio;
    this.$refs.audio.addEventListener("pause", () => {
      this.paused = true;
    });
    this.$refs.audio.addEventListener("play", () => {
      this.paused = false;
    });
    this.$refs.audio.addEventListener("durationchange", () => {
      // console.log("当前歌曲时长", this.duration);
      this.duration = audio.duration;
    });

    this.$refs.audio.addEventListener("timeupdate", () => {
      // console.log("当前播放到", this.currentTime);
      this.currentTime = audio.currentTime;

      this.drawCircle(this.currentTime, this.duration);
    });
    this.$refs.audio.addEventListener("ended", () => {
      // console.log("播放完成", this.currentTime);
      this.currentTime = audio.currentTime;
      this.paused = false;
      // this.drawCircle(this.currentTime, this.duration);
    });
  },
  watch: {
    paused: function () {
      // if(this.paused){}
      // paesed更新就暂停或者播放
      let audio = this.$refs.audio;
      if (!audio) {
        return;
      }
      this.paused ? audio.pause() : audio.play();
      this.$emit("update:paused", this.paused);
    },
    bool: function (n) {
      this.isShowSong = n;
    },
    isShowSong: function (n) {
      this.$emit("updata-isShowSong", n);
      // console.log(document.documentElement);
      if (this.isShowSong) {
        document.documentElement.style.overflowY = "hidden";
        document.documentElement.style.overflowX = "hidden";
      } else {
        document.documentElement.style.overflowY = "";
        document.documentElement.style.overflowX = "";
      }
    },
  },
  methods: {
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;

      let ctx = canvas.getContext("2d");
      ctx.lineWidth = 3;
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.arc(
        25,
        25,
        20,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
    togglePlayState: function () {
      let audio = this.$refs.audio;
      if (this.paused) {
        audio.pause();
        this.paused = false;
      } else {
        audio.play();
        this.paused = true;
      }
    },
    percentageRange(e) {
      let audio = this.$refs.audio;
      this.percentage = e;
      if (this.percentage == 1) {
        this.paused = false;
      }
      audio.currentTime = this.percentage * this.duration;
    },
    isSingleCycle(n) {
      this.paused = n;
      let audio = this.$refs.audio;
      audio.currentTime = 0;
    },
    abcd(res) {
      let audio = this.$refs.audio;
      audio.currentTime = res;
    },
  },
};
</script>

<style scoped lang="less">
// 播放音乐
.paly-audio.paused {
  .play-audio-img {
    .circle {
      .icon {
        background: url("../lib/playbar.png") no-repeat -41px -205px;
      }
    }
  }
}
.paly-audio {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 5;
  background-color: #333;
  // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);

  .play-audio-img {
    display: flex;
    .paly-audio-model {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 10px;
      img {
        width: 40px;
        height: 40px;
      }
      .paly-audio-name {
        flex: 1;
        display: flex;
        // align-items: center;
        flex-direction: column;
        color: white;
        padding-left: 10px;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: calc(100vw - 120px);
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-last-of-type(1) {
          font-size: 10px;
          font-weight: 200;
          color: #ccc;
        }
      }
    }
    .circle {
      position: relative;
      canvas {
        vertical-align: middle;
      }
      // 暂停音乐
      .icon {
        position: absolute;
        top: 8px;
        left: 8px;
        // display: block;
        width: 34px;
        height: 34px;
        background: url("../lib/playbar.png") no-repeat -41px -166px;
      }
    }
  }
}
</style>