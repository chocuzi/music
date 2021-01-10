<template>
  <div class="hot-list-item">
    <div class="hot-list-item-index">
      {{ disposeIndex() }}
    </div>
    <div class="item-text">
      <div class="hot-song-name">{{ item.name }}</div>
      <div class="sginfo">
        <i></i>
        <!-- 歌手-歌名 -->
        {{ forName() }} - {{ item.name }}
      </div>
    </div>
    <div class="sgchf2">
      <!-- v-if="currentMusic && currentMusic.id === item.id" -->
      <!-- :class="{ paused: paused }" -->
      <!-- <span class="bofang"></span> -->
      <span class="u-hmsprt"></span>

      <!-- v-if="!currentMusic" -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    disposeIndex() {
      return this.index < 9 ? "0" + (this.index + 1) : this.index + 1;
    },
    forName() {
      let strName = "";
      this.item.ar.forEach((element) => {
        strName += element.name + " / ";
      });
      return strName.slice(0, strName.length - 2);
    },
    colorFont() {
      // this.index<
    },
  },
};
</script>

<style scoped lang="less">
.hot-list-item:nth-of-type(-n + 3) > div:nth-child(1) {
  color: #df3436;
}
.hot-list-item {
  display: flex;
  //   align-items: center;
  //   justify-content: center;
  height: 55px;

  .hot-list-item-index {
    width: 40px;
    height: 55px;
    line-height: 55px;
    font-size: 17px;
    text-align: center;
  }

  .item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .hot-song-name {
      font-size: 18px;
    }
    .sginfo {
      font-size: 12px;
      color: #888;
      max-width: calc(100vw - 70px);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      i {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url(../lib/index_icon_2x.png) no-repeat;
        background-size: 166px 97px;
      }
    }
  }
  .sgchf2 {
    display: flex;
    align-items: center;
    .u-hmsprt,
    .paused,
    .bofang {
      display: block;
      width: 22px;
      height: 22px;
      background: url(../lib/index_icon.png);
      background-position: 3px -101px;
      margin: 0 10px;
    }
    .bofang {
      // width: 22px;
      // height: 22px;
      background: url(../lib/music-icon.gif) no-repeat;
      background-position: center;
      background-size: 250%;
      // margin: 0 10px;
    }
    .paused {
      // width: 22px;
      // height: 22px;
      background: url(../lib/index_icon.png);
      background-position: 3px -101px;
      background-position: -17px -126px;
      // margin: 0 10px;
    }
  }
}
</style>