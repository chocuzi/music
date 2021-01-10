<template>
  <!-- v-show="playlist"  -->
  <div @touchstart="startHandler" @touchmove="abcdHandler">
    <div class="playlist" v-if="!$root.isShowLoading">
      <keep-alive>
        <PalyListHeader :playlist="playlist" />
      </keep-alive>
      <h3 class="u-smtitle">歌曲列表</h3>
      <SomgListItme
        v-for="(item, index) in songsList"
        :key="item.id"
        :item="item"
        :index="index"
        :paused="$attrs.paused"
        :currentMusic="$attrs.currentMusic"
        @click.native="success({ item, index, id: item.id })"
        :isShowI="isShowI"
      >
        <span class="hot-list-item-index">
          {{ index + 1 }}
        </span>
        <!-- @click.native="$emit('play-song-id', { item, index })" -->
        <!-- @play-song-id="$emit('play-song-id', $event)" -->
      </SomgListItme>
      <div class="playlist-bootom"></div>
    </div>
    <Loading v-show="$root.isShowLoading" />
  </div>
</template>

<script>
import PalyListHeader from "@/components/PalyListHeader.vue";
import SomgListItme from "@/components/SomgListItme.vue";
import Loading from "@/components/Loading.vue";
export default {
  props: {},
  data() {
    return {
      id: "",
      idList: [],
      idStr: "",
      songsList: Array,
      playlist: Object,
      isShowI: false,
      x: 0,
    };
  },
  components: {
    PalyListHeader,
    SomgListItme,
    Loading,
  },
  created() {
    this.$root.isShowLoading = true;
    this.id = this.$route.query.id;
    // 请求数据
    this.asyncPro(this.id);
  },
  watch: {
    // id() {
    //   this.asyncPro(this.id);
    // },
  },
  methods: {
    success(options) {
      this.$emit("play-song-id", options);
    },
    //简单封装promise为解决异步
    getData(url) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(url)
          .then((response) => {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
            // console.log(error);
          });
      });
    },
    // 处理字段
    disposeData(data) {
      return data.map((ele) => {
        let arr = ele.ar.map((item) => {
          return { name: item.name };
        });
        return {
          ...ele.al,
          id: ele.id,
          ...ele,
          song: { artists: arr },
        };
      });
    },
    //promise处理异步
    asyncPro(id) {
      this.getData("http://music.kele8.cn/playlist/detail?id=" + id)
        .then((res) => {
          // console.log(res);
          this.playlist = res.data.playlist;
          this.idList = res.data.playlist.trackIds.slice(0, 20);
          this.idList.forEach((element) => {
            this.idStr += element.id + ",";
          });
          this.idStr = this.idStr.slice(0, this.idStr.length - 1);
          // console.log(this.idStr);
          return this.idStr;
        })
        .then((res) => {
          // console.log(res);
          this.getData("http://music.kele8.cn/song/detail?ids=" + res).then(
            (response) => {
              // console.log("req");
              // console.log(this.disposeData);
              // console.log(this.disposeData(response.data.songs));
              this.songsList = this.disposeData(response.data.songs);
              this.$root.isShowLoading = false;
              this.$emit("new-song-list", this.songsList);
            }
          );
        });
    },
    startHandler($event) {
      this.x = $event.touches[0].pageX;
    },
    abcdHandler: function ($event) {
      // if($event.target)
      console.log($event);
      let cx = $event.touches[0].pageX - this.x;
      console.log(cx);
      if (cx >= 100) {
        this.$router.go(-1);
      }
      // this.$route.meta.isShowNav = true;
    },
  },
};
</script>

<style scoped lang="less">
.playlist-bootom {
  height: 50px;
}
.hot-list-item-index {
  color: #333 !important;
}
.sgchfl {
  flex: 1 1 auto;
  padding: 6px 0;
  max-width: calc(100vw - 84px) !important;
}
.u-smtitle {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
  margin: 0;
}
</style>