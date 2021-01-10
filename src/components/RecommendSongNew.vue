<template>
  <div class="recommend-song-new">
    <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {
  name: "RecommendSongNew",
};
</script>

<style lang="less">
.recommend-song-new {
  width: 100%;
  h2 {
    border-left: 2px solid red;
    padding-left: 9px;
    margin: 20px 0 14px;
  }
}
</style>