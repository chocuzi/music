<template>
  <div class="song-main">
    <!-- 背景 -->
    <div
      class="m-song-bg"
      :style="{
        'background-image': 'url(' + currentMusic.picUrl + '?param=200y200)',
        opacity: '1',
        transform: 'scale(7)',
        filter: 'blur(30px)',
        'background-color': 'rgb(0, 0, 0)',
      }"
    ></div>
    <keep-alive>
      <div
        class="pho-circle-box"
        @click="isShowLyric = true"
        v-show="!isShowLyric"
      >
        <!-- v-show="!isShowLyric" -->
        <!-- 'transform-origin': 'center center', -->
        <!-- 中间区域 -->
        <div>
          <div class="pho-circle" :class="{ rotate: paused }">
            <!-- :style="{ 'animation-play-state': paused }" -->
            <div class="circle-mask">
              <img src="../lib/disc_light-plus.png" alt="" />
              <img src="../lib/disc-plus.png" alt="" />
            </div>
            <div class="pic-header-circle-box">
              <img
                class="pic-header-circle"
                :src="currentMusic.picUrl + '?param=200y200'"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
    <!-- 底部小功能 -->
    <div class="song-main-control" v-show="!isShowLyric">
      <div class="song-main-heart">
        <img src="../lib/heart-dark.png" />
      </div>
      <div class="song-main-download">
        <img src="../lib/download-icon.png" />
      </div>
      <div class="song-main-sing">
        <img src="../lib/sing-icon.png" />
      </div>
      <div class="song-main-comment">
        <img src="../lib/comment.png" />
      </div>
      <div class="song-main-more-icon">
        <img src="../lib/more-icon.png" />
      </div>
    </div>
    <!-- 歌词 -->
    <!-- @click.native="isShowLyric = false" -->
    <keep-alive>
      <SongLyric
        v-if="isShowLyric"
        @click.native="isShowLyric = false"
        :currentMusic="currentMusic"
        :currentTime="$attrs.currentTime"
        @trans-current-index="$emit('trans-current-index', $event)"
        :paused="paused"
      ></SongLyric>
    </keep-alive>
  </div>
</template>

<script>
import SongLyric from "@/components/SongLyric.vue";
export default {
  props: {
    currentMusic: Object,
    paused: Boolean,
  },
  components: {
    SongLyric,
  },
  data() {
    return {
      isShowLyric: false,
    };
  },
};
</script>

<style scoped lang="less">
@keyframes divrotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.song-main {
  width: 100%;
  height: calc(100% - 48px - 140px);
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  // background-color: #454140;
  position: relative;
  z-index: 3;
  .m-song-bg {
    // background-color: #161824;
    background-position: 40%;
    background-repeat: no-repeat;
    background-size: auto 43%;
    // -webkit-transform: scale(1.5);
    // -ms-transform: scale(1.5);
    // transform: scale(1.2);
    // -webkit-transform-origin: center;
    // -ms-transform-origin: center;
    transform-origin: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 20%;
    height: 80%;
    overflow: hidden;
    z-index: 1;
  }

  .song-main-control {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 3;
    display: flex;
    box-sizing: border-box;
    padding: 0 50px;
    justify-content: space-around;
  }
  .pho-circle-box {
    // margin-top: 40px;

    // width: 100/2vw;
    // height: 100/2vw;
    // width: 342px;
    // height: 342px;
    // max-width: 500px;
    // max-height: 500px;

    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    max-width: 500px;
    max-height: 500px;
    transform: translate(-50%, -50%);
    z-index: 2;

    div {
      width: 100%;
      height: 100%;

      .pho-circle {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // border-radius: 50%;
        // overflow: hidden;
        animation: divrotate 20s linear infinite;
        &.rotate {
          animation-play-state: paused;
          // font-size: 10px;
        }
        .pic-header-circle-box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          // width: 100/3vw;
          // height: 100/3vw;
          width: 200px;
          height: 200px;
          max-width: 400px;
          max-height: 400px;
          border-radius: 50%;
          overflow: hidden;
          .pic-header-circle {
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
          }
        }
        .circle-mask {
          position: absolute;
          img {
            position: absolute;
            top: 0;
            left: 0;
            // width: 100/2vw;
            // height: 100/2vw;
            width: 300px;
            height: 300px;
            max-width: 500px;
            max-height: 500px;
          }
          img:nth-child(1) {
            z-index: 1;
          }
        }
      }
    }
  }
}
</style>