<template>
  <div id="recommend" v-show="!this.$root.isShowLoading">
    <!-- 推荐歌单 -->
    <RecommendSong> 推荐歌单 </RecommendSong>
    <!-- 推荐歌单列表 -->
    <keep-alive>
      <RecommendPlayList :recommends="recommends" />
    </keep-alive>
    <!-- 最新歌曲 -->
    <RecommendSongNew> 最新歌曲 </RecommendSongNew>
    <SomgList
      :playlists="playlists"
      @play-song-id="$emit('play-song-id', $event)"
      :paused="$attrs.paused"
      :currentMusic="$attrs.currentMusic"
    ></SomgList>
  </div>
</template>

<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import RecommendSong from "@/components/RecommendSong.vue";
import RecommendSongNew from "@/components/RecommendSongNew.vue";
import SomgList from "@/components/SomgList.vue";
export default {
  name: "Recommend",
  components: {
    RecommendPlayList,
    RecommendSong,
    RecommendSongNew,
    SomgList,
  },
  data() {
    return {
      recommends: null,
      playlists: null,
    };
  },

  created: function () {
    this.$root.isShowLoading = true;

    this.axios
      .get("http://music.kele8.cn/personalized?limit=6")
      .then((response) => {
        this.recommends = response.data.result;
      });
    this.axios
      .get("http://music.kele8.cn/personalized/newsong")
      .then((response) => {
        this.playlists = response.data.result;
        this.$emit("new-song-list", this.playlists);
        this.$root.isShowLoading = false;
      });
  },
};
</script>

<style scoped lang="less">
#recommend {
  padding-bottom: 50px;
}
</style>