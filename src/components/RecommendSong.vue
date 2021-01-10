<template>
  <div class="recommend-song">
    <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {
  name: "RecommendSong",
};
</script>

<style lang="less">
.recommend-song {
  width: 100%;
  h2 {
    border-left: 2px solid red;
    padding-left: 9px;
    margin: 20px 0 14px;
  }
}
</style>