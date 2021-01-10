<template>
  <div class="loading">
    <!-- this.localStorageValue -->
    <img src="@/lib/loading.gif" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style  lang="less">
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  // height: 100%;
  height: calc(100vh - 174px);
  min-height: calc(100vh - 174px);
  z-index: 102;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  background-color: rgba(255, 255, 255, 1);
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // min-width: 250px;
    // max-width: 320px;
  }
}
</style>