<template>
  <div class="some-list">
    <!-- 最新歌曲列表 -->
    <SomgListItme
      v-for="(item, index) in playlists"
      :key="item.id"
      :item="item"
      :index="index"
      :paused="$attrs.paused"
      :currentMusic="$attrs.currentMusic"
      @click.native="success({ item, index, id: item.id })"
      :isShowI="isShowI"
    >
      <!-- @click.native="$emit('play-song-id', { item, index })" -->
      <!-- @play-song-id="$emit('play-song-id', $event)" -->
    </SomgListItme>
  </div>
</template>

<script>
import SomgListItme from "@/components/SomgListItme.vue";

export default {
  props: {
    playlists: Array,
  },
  data() {
    return {
      isPlayMusic: true,
      isShowI: true,
    };
  },
  name: "SomgList",
  components: {
    SomgListItme,
  },
  methods: {
    success(options) {
      // 请求验证是否付费;
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
  },
};
</script>

<style>
</style>