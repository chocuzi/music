<template>
  <div class="play-list">
    <!-- play-list -->
    <div class="recommend-play-item">
      <ul>
        <RecommendPlayItem
          v-for="item in recommends"
          :key="item.id"
          :item="item"
          @play-song-for-id="getPlayId"
          @click.native="navigateToPlayList(item.id)"
        >
        </RecommendPlayItem>
      </ul>
    </div>
  </div>
</template>

<script>
import RecommendPlayItem from "@/components/RecommendPlayItem.vue";
export default {
  props: {
    recommends: Array,
  },
  name: "RecommendPlayList",
  components: {
    RecommendPlayItem,
  },
  methods: {
    getPlayId(id) {
      console.log(id);
    },
    navigateToPlayList: function (id) {
      // this.$route.meta.isShowNav = true;
      this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less">
.recommend-play-item {
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
}
</style>