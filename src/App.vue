<template>
  <div id="app">
    <Copyright v-show="$parent.isShowCopyright" />

    <div class="app-content">
      <!-- @click.native="ccc" -->
      <router-view
        @play-song-id="playSongId"
        :paused="paused"
        :currentMusic="currentMusic"
        @new-song-list="newSongList = $event"
        @hot-current-music="hotCurrentMiuse"
      >
      </router-view>

      <PlayAudio
        v-if="currentMusic"
        :currentMusic="currentMusic"
        :bool="bool"
        :paused.sync="paused"
        @updata-isShowSong="bool = $event"
        :currentIndex="currentIndex"
        :newSongList="newSongList"
        @transmit-index="transmitIndex"
        @current-play-sing="showSongList"
        @remo-list="remoList"
      ></PlayAudio>
      <!-- :currentId="currentId" -->
      <!-- @updata-isShowSong="updateBool" -->
    </div>
  </div>
</template>
<script>
// import Home from "@/views/Home.vue";
import PlayAudio from "@/components/PlayAudio.vue";
import Copyright from "@/components/Copyright.vue";

export default {
  name: "App",
  // props: ["paused"],
  components: {
    // Home,
    PlayAudio,
    Copyright,
  },
  data() {
    return {
      currentMusic: null,
      paused: null,
      currentIndex: 0,
      bool: false,
      newSongList: Array,
    };
  },

  watch: {
    $route(to, from) {
      const fname = from.name;
      const tname = to.name;
      // console.log(fname, fname);
      if (
        from.meta.isRefresh ||
        (fname != "PlayList" && tname == "Recommend")
      ) {
        // 在这里重新请求数据
        from.meta.isRefresh = false;
      }
    },
  },
  methods: {
    // 当前播放歌曲-id
    playSongId(obj) {
      // console.log(obj.index);
      this.currentIndex = obj.index;
      if (this.currentMusic) {
        if (this.currentMusic.id == obj.item.id) {
          this.bool = true;
        } else {
          this.bool = false;
        }
      }
      this.currentMusic = obj.item;
    },
    showSongList(obj) {
      this.currentIndex = obj.index;
      this.currentMusic = obj.item;
    },
    remoList(id) {
      // console.log(id);
      if (id == this.currentMusic.id) {
        console.log("下一首");
        let i = 0;
        this.newSongList.forEach((ele, index) => {
          if (ele.id == id) {
            // return index;
            i = index;
          }
        });
        // console.log(i);
        this.transmitIndex(i + 1);
      }
      // console.log(this.newSongList.filter((ele) => ele.id != id));
      this.newSongList = this.newSongList.filter((ele) => ele.id != id);
    },
    transmitIndex(index) {
      if (index >= this.newSongList.length - 1) {
        index = 0;
      } else if (index < 0) {
        index = this.newSongList.length - 1;
      }
      if (this.currentIndex == index) {
        this.currentIndex++;
      }
      this.currentMusic = this.newSongList[index];
      this.currentIndex = index;
    },
    hotCurrentMiuse(res) {
      this.currentMusic = res;
    },
  },
};
</script>

<style lang="less">
.app-content {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
