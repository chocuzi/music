<template>
  <div class="current-song-list-content">
    <h3>当前播放</h3>
    <div @click="$emit('changeSongStates')">
      <img :src="banners[numLoop % 3]" alt="" />
      <span>{{ state[numLoop % 3] }}</span>
    </div>
    <ul>
      <li
        v-for="(item, index) in newSongList"
        :key="item.id"
        @click="$emit('current-play-sing', { item, id: item.id, index })"
      >
        <!-- <img src="../lib/current-song-list-icon.png" alt="" class="current-play" /> -->
        <span :class="{ 'current-play': item.id == currentMusic.id }"></span>
        <span>{{ item.name }}</span>
        <i @click.stop="$emit('remo-list', item.id)">×</i>
      </li>
      <!-- <li>
        <span></span>
        <span>abc歌</span>
        <i>×</i>
      </li>
      <li>
        <span></span>
        <span>abc歌</span>
        <i>×</i>
      </li> -->
    </ul>
    <span class="off" @click="$emit('show-song-list', false)">关闭</span>
  </div>
</template>

<script>
export default {
  props: ["newSongList", "currentMusic", "banners", "numLoop"],
  data() {
    return {
      data: [...this.newSongList],
      state: ["顺序播放", "单曲循环", "随机播放"],
    };
  },
  methods: {
    // remoList(id) {
    //   this.data = this.data.filter((ele) => {
    //     return ele.id != id;
    //   });
    // },
  },
};
</script>

<style lang="less">
.current-song-list-content {
  /* color: #333; */
  padding: 0 10px;
  div {
    width: 100%;
    display: flex;
    img {
      padding: 0 5px;
    }
  }
  ul {
    // width: 90%;
    height: 400px;
    margin: 0;
    padding: 0;
    padding: 0 5px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      display: flex;
      list-style-type: none;
      align-items: center;
      height: 40px;
      img {
        width: 14px;
        height: 14px;
        padding: 0 10px;
      }

      span:nth-child(2) {
        flex: 1;
        font-size: 14px;
        max-width: calc(100% - 40px);
        font-weight: 300;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i {
        font-size: 24px;
        padding-left: 20px;
        font-style: normal;
      }
      .current-play {
        width: 20px;
        height: 20px;
        // padding: 0 5px;
        background: url(../lib/current-song-list-icon.png) no-repeat center;
        // background-clip: ;
      }
      .current-play + span {
        display: block;
        font-size: 15px;
        color: #ff3a3a;
        font-weight: 400;
        max-width: calc(100% - 60px);
      }
      .current-play + span + i {
        color: #ff3a3a;
        font-size: 24px;
        // padding: 0 10px;
        padding-left: 20px;
        font-style: normal;
      }
    }
  }
  .off {
    position: absolute;
    left: 50%;
    bottom: 5px;
    margin-left: -16px;
    padding: 5px;
  }
}
</style>