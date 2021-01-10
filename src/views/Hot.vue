<template>
  <div id="hot" v-show="!$root.isShowCopyright">
    <div class="hot-top">
      <div class="hot-top-index_icon_2x"></div>
      <div class="top-update">更新日期: 12月29日</div>
      <!-- <img src="../lib/index_icon_2x.png" alt="" /> -->
    </div>
    <!-- <Loading /> -->
    <div class="hot-list">
      <SomgListItme
        v-for="(item, index) in data"
        :key="item.id"
        :item="item"
        :index="index"
        @click.native="success({ item, index, id: item.id })"
        :paused="$attrs.paused"
        :currentMusic="$attrs.currentMusic"
        :isShowI="isShowI"
      >
        <span class="hot-list-item-index">
          {{ disposeIndex(index) }}
        </span>
      </SomgListItme>
    </div>
    <!-- <div class="hotdn"><span class="hotview">查看完整榜单</span></div> -->
  </div>
</template>

<script>
import SomgListItme from "@/components/SomgListItme.vue";
// import Loading from "@/components/Loading.vue";
export default {
  name: "Hot",
  components: {
    SomgListItme,
    // Loading,
  },
  data() {
    return { hotList: Array, data: Array, isShowI: true };
  },
  created() {
    this.$root.isShowLoading = true;
    this.axios.get("http://music.kele8.cn/top/list?idx=1").then((resolve) => {
      let data = resolve.data.playlist.trackIds;
      this.hotList = data.slice(0, 20);
      this.getDate();
    });
  },
  methods: {
    success(options) {
      // 请求验证是否付费
      // this.axios
      //   .get("http://music.kele8.cn/check/music?id=" + options.id)
      //   .then((resolve) => {
      //     console.log(resolve);
      //     this.isPlayMusic = resolve.data.success;
      //     if (this.isPlayMusic) {
      //       this.$emit("play-song-id", options);
      //     }
      //   })
      //   .catch((reject) => {
      //     console.error("请求失败" + reject);
      //     this.$root.isShowCopyright = true;
      //   });
      this.$emit("play-song-id", options);
    },
    getDate() {
      if (!this.hotList) {
        return;
      }
      let strUrl = "";
      this.hotList.forEach((element) => {
        strUrl += element.id + ",";
      });
      strUrl = strUrl.slice(0, strUrl.length - 1);
      this.axios
        .get("http://music.kele8.cn/song/detail?ids=" + strUrl)
        .then((res) => {
          this.data = res.data.songs;
          let name = null;
          this.data = this.data.map((ele) => {
            name = ele.ar.map((ele) => {
              return { name: ele.name };
            });
            return { ...ele.al, id: ele.id, song: { artists: name } };
          });
          // this.$emit("new-song-list", this.data);
          this.$emit("new-song-list", this.data);
          this.$root.isShowLoading = false;
        });
    },
    disposeIndex(index) {
      return index < 9 ? "0" + (index + 1) : index + 1;
    },
  },
};
</script>

<style lang="less">
#hot {
  padding-bottom: 50px;
  .hot-top {
    box-sizing: border-box;
    padding: 33px 0 0 25px;
    width: 100%;
    height: 160px;
    background: url(../lib/hot_music_bg_3x.jpg);
    background-size: 100%;
    .hot-top-index_icon_2x {
      background: url(../lib/index_icon_2x.png) no-repeat center;
      background-size: 166px 97px;
      width: 142px;
      height: 67px;
      background-position: -24px -30px;
    }
    .top-update {
      color: white;
      font-size: 12px;
      margin: 10px 0 0 5px;
    }
  }
  .hotdn {
    height: 55px;
    line-height: 55px;
    text-align: center;
    .hotview {
      display: inline-block;
      color: #999;
      padding-right: 14px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNCAyMiI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTEgMWwxMCAxMEwxIDIxIi8+PC9zdmc+)
        100% no-repeat;
      background-size: 7px 12px;
    }
  }
}
</style>