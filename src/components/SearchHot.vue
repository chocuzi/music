<template>
  <div class="search-hot">
    <h3 class="title">热门搜索</h3>
    <ul>
      <li
        v-for="(hot, index) in hotList"
        :key="index"
        @click="$emit('hot-first', hot.first)"
      >
        {{ hot.first }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    hotList: Array,
  },
};
</script>

<style lang="less">
.search-hot {
  padding: 0 10px;
  h3 {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    font-weight: 400;
  }
  ul {
    li {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
      position: relative;
      &:after {
        position: absolute;
        z-index: 2;
        content: "";
        top: 0;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        border-radius: 60px;
        width: 100%;
        height: 100%;
        transform-origin: top left;
        border: 0 solid rgba(0, 0, 0, 0.1);
        border-width: 1px;
      }
      a {
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}
</style>