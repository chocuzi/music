<template>
  <div id="home">
    <div class="home-header">
      <Download></Download>
      <HomeNav></HomeNav>
    </div>
    <div class="main">
      <keep-alive>
        <router-view
          @new-song-list="$emit('new-song-list', $event)"
          @play-song-id="$emit('play-song-id', $event)"
          :paused="$attrs.paused"
          :currentMusic="$attrs.currentMusic"
        />
      </keep-alive>
      <Loading v-show="$root.isShowLoading" />

      <!-- @hot-current-music="$emit('hot-current-music', $event)" -->
    </div>
  </div>
</template>

<script>
import Download from "@/components/Download.vue";
import HomeNav from "@/components/HomeNav.vue";
import Loading from "@/components/Loading.vue";
export default {
  name: "Home",
  components: {
    Download,
    HomeNav,
    Loading,
  },
  methods: {},
};
</script>
<style lang="less">
#home {
  .home-header {
    height: 124px;
  }
  .main {
    position: relative;
    // height: 700px;
    height: calc(100% - 124px);
    min-height: calc(100% - 124px);
  }
}
</style>
