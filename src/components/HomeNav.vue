<template>
  <div class="home-nav">
    <!-- <div>
      <router-link to="/recommend"> 推荐音乐 </router-link>
    </div>
    <div>
      <router-link to="/hot">热歌榜</router-link>
    </div>
    <div>
      <router-link to="/search"> 搜索 </router-link>
    </div> -->
    <div>
      <router-link to="/recommend"> 推荐音乐 </router-link>
    </div>
    <div>
      <router-link to="/hot">热歌榜</router-link>
    </div>
    <div>
      <router-link to="/search"> 搜索 </router-link>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  margin-top: 84px;
  z-index: 4;
  div {
    flex-grow: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    a {
      color: #333;
      font-size: 15px;
      height: 20px;
      padding: 12px 5px;
      text-decoration: none;
      &.active {
        color: #dd001b;
        border-bottom: 2px solid #dd001b;
      }
    }
    // a.router-link-exact-active {
    //   color: #dd001b;
    //   border-bottom: 2px solid #dd001b;
    // }
  }
  a.router-link-exact-active {
    color: red;
    border-bottom: 1px solid red;
  }
}
</style>