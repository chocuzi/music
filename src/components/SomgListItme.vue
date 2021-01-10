<template>
  <div class="somg-list-items">
    <slot></slot>
    <div class="sgchfl">
      <!-- 歌名 -->
      <div class="m-sgitem">
        {{ item.name }}
      </div>
      <div class="sginfo">
        <i v-if="isShowI"></i>
        <!-- 歌手-歌名 -->
        {{ forName() }} - {{ item.name }}
      </div>
    </div>
    <div class="sgchf2">
      <span
        v-if="currentMusic && currentMusic.id === item.id"
        :class="{ paused: paused }"
        class="bofang"
      ></span>
      <span class="u-hmsprt" v-else></span>

      <!-- v-if="!currentMusic" -->
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   item: Object,
  //   paused: Boolean,
  //   currentMusic: Object,
  // },
  props: ["item", "index", "paused", "currentMusic", "isShowI"],
  name: "SomgListItme",
  methods: {
    forName() {
      let strName = "";
      this.item.song.artists.forEach((element) => {
        strName += element.name + " / ";
      });
      return strName.slice(0, strName.length - 2);
    },
  },
};
</script>

<style  lang="less">
.somg-list-items:nth-of-type(-n + 3) > span {
  color: #df3436;
}
.somg-list-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  // max-width: calc(100vw - 40px);

  .hot-list-item-index {
    display: block;
    width: 30px;
    height: 55px;
    line-height: 55px;
    font-size: 17px;
    text-align: center;
    min-width: 30px;
  }
  .sgchfl {
    flex: 1 1 auto;
    padding: 6px 0;
    max-width: calc(100% - 84px);
    .m-sgitem {
      height: 25px;
      line-height: 25px;
      font-size: 17px;
      color: #333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: calc(100% - 70px);
      min-width: calc(100% - 70px);
    }
    .sginfo {
      font-size: 12px;
      color: #888;
      max-width: calc(100vw - 80px);
      min-width: calc(100vw - 80px);
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
    margin-right: 10px;
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
      background: url(../lib/loading.gif) no-repeat;
      background-position: center;
      background-size: 100%;
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
  &:before {
    position: absolute;
    z-index: 2;
    content: "";
    top: 0;
    left: 0;
    pointer-events: none;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    -webkit-transform-origin: top left;
    -ms-transform-origin: top left;
    transform-origin: top left;
    border: 0 solid rgba(0, 0, 0, 0.1);
  }
}
</style>