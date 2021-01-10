<template>
  <div class="search-record">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in record"
        :key="index"
        @click="$emit('record-search-item', item)"
      >
        <i class="u-svg u-svg-histy"></i>
        <div class="histyr f-bd f-bd-btm">
          <span class="link f-thide">{{ item }}</span>
          <figure class="close" @click.stop="$emit('remove-local-item', item)">
            <i class="u-svg u-svg-close"></i>
          </figure>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    record: Array,
  },
};
</script>

<style scoped lang="less">
.search-record {
  .list {
    .item {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      height: 45px;
      .u-svg {
        margin: 0 10px;
        width: 15px;
        height: 15px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
        display: inline-block;
        vertical-align: middle;
        background-position: 0 0;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .f-bd:after {
        border-bottom-width: 1px;
        position: absolute;
        z-index: 2;
        content: "";
        top: 0;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        -webkit-transform-origin: top left;
        -ms-transform-origin: top left;
        transform-origin: top left;
        border: 0 solid rgba(0, 0, 0, 0.1);
      }
      .histyr {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 1%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        height: 45px;
        position: relative;
        .link {
          margin-right: 10px;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          width: 1%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
        .close {
          -webkit-box-flex: 0;
          -webkit-flex: 0 0 auto;
          -ms-flex: 0 0 auto;
          flex: 0 0 auto;
          width: 32px;
          height: 32px;
          line-height: 32px;
          margin: 0;
          .u-svg-close {
            margin-left: 2px;
            width: 12px;
            height: 12px;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
            display: inline-block;
            vertical-align: middle;
            background-position: 0 0;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>