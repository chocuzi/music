<template>
  <div class="somg-top">
    <!-- -->
    <div @click="$emit('show-play-bar', false)" class="goback"></div>
    <div class="song-top-name">
      <!-- 歌名 -->
      <span class="song-top-song-name">{{ currentMusic.name }}</span>
      <!-- 歌手 -->
      <span class="song-top-singer">{{ forName() }}></span>
    </div>
    <div class="song-top-fr">
      <div class="song-top-pic">
        <img :src="currentMusic.picUrl + '?param=30y30'" alt="" />
      </div>
      <span class="attention">关注</span>
      <div class="share"><img src="../lib/share.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongTop",
  props: ["currentMusic"],
  methods: {
    forName() {
      let strName = "";
      this.currentMusic.song.artists.forEach((element) => {
        strName += element.name + " / ";
      });
      return strName.slice(0, strName.length - 2);
    },
  },
};
</script>

<style lang="less">
.somg-top {
  display: flex;
  height: 60px;
  // border-bottom: 1px solid #363534;
  position: relative;
  z-index: 4;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  .goback {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    background: url(../lib/goback.png) no-repeat;
  }
  .song-top-name {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 100px);
    overflow: hidden;
    .song-top-song-name {
      width: 100%;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .song-top-singer {
      // justify-self: self-start;
      width: 100%;
      vertical-align: top;
      font-size: 12px;
      // color: #777;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .song-top-fr {
    display: flex;
    align-items: center;
    .song-top-pic {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      z-index: 1;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .attention {
      display: block;
      padding-left: 10px;
      font-size: 12px;
      margin-left: -5px;
      width: 30px;
      height: 25px;
      line-height: 25px;
      background-color: #2a2929;
      border-bottom-right-radius: 12px;
      border-top-right-radius: 12px;
    }
    .share {
      display: flex;
      align-items: center;
      margin: 0 17px 0 12px;
    }
  }
}
</style>