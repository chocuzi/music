<template>
  <div id="Search" v-show="!$root.isShowLoading">
    <!-- <form class="m-input f-bd f-bd-btm" method="get" action=""> -->
    <div class="m-input f-bd f-bd-btm">
      <div class="inputcover">
        <i class="u-svg u-svg-srch"></i
        ><input
          type="search"
          name="search"
          class="input"
          placeholder=""
          autocomplete="off"
          value=""
          @input="search"
          @focus="focusH"
          @blur="blurH"
          ref="inp"
          @keydown.enter="getRecommendText"
        /><label class="holder" v-show="!isSearch">搜索歌曲、歌手、专辑</label>
        <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
      </div>
    </div>
    <!-- </form> -->
    <!-- 热门搜索 -->
    <SearchHot
      :hotList="hotList"
      v-show="!isSearch"
      @hot-first="hotFirst"
    ></SearchHot>
    <!-- 搜索历史 -->
    <SearchRecord
      :record="localStorageValue"
      v-show="!isSearch"
      @remove-local-item="remoLocalItem($event)"
      @record-search-item="recordHandler"
    ></SearchRecord>
    <!-- 搜索提示 -->
    <!-- <h3 class="title f-bd f-bd-btm f-thide" v-show="!bool">搜索“搜索”</h3> -->
    <h3
      class="mytitle f-bd f-bd-btm f-thide"
      v-if="!isShowH3"
      @click="getRecommendText(text)"
    >
      搜索“{{ text }}”
    </h3>
    <ul v-show="!bool">
      <li
        class="recomitem"
        v-for="(data, index) in sugDatas"
        :key="index"
        @click="getRecommendText(data.keyword)"
      >
        <i class="u-svg u-svg-search"></i
        ><span class="f-bd f-bd-btm f-thide"> {{ data.keyword }}</span>
      </li>
    </ul>
    <SomgListItme
      v-show="bool"
      v-for="(item, index) in newData"
      :key="item.id"
      :item="item"
      :index="index"
      @click.native="success({ item, index, id: item.id })"
      :paused="$attrs.paused"
      :currentMusic="$attrs.currentMusic"
      :isShowI="isShowI"
    >
    </SomgListItme>
    <!-- <ul v-show="bool">
      <li v-for="item in getDatas" :key="item.id">
        {{ item.name }}<img :src="item.artists[0].img1v1Url" alt="" />
      </li>
    </ul> -->
  </div>
</template>

<script>
import SomgListItme from "@/components/SomgListItme.vue";
import SearchHot from "@/components/SearchHot.vue";
import SearchRecord from "@/components/SearchRecord.vue";
export default {
  name: "Search",
  components: {
    SomgListItme,
    SearchHot,
    SearchRecord,
  },
  data() {
    return {
      isSearch: false,
      timer: false,
      sugDatas: Array,
      getDatas: Array,
      isShowH3: true,
      bool: false,
      text: "搜索",
      newData: "",
      hotList: [],
      record: [],
      localStorageValue: [],
      isShowI: true,
      // isSearch
    };
  },
  created() {
    this.$root.isShowLoading = true;
    this.getHotList();
    this.localRecord();
  },
  watch: {
    // data() {},
    isSearch(n) {
      if (!n) {
        this.isShowH3 = true;
      }
    },
  },
  methods: {
    success(options) {
      this.axios
        .get("http://music.kele8.cn/check/music?id=" + options.id)
        .then((resolve) => {
          // console.log(resolve);
          if (!resolve) {
            console.error("歌曲需要版权" + resolve);
          }
          this.isPlayMusic = resolve.data.success;
          if (this.isPlayMusic) {
            this.$emit("play-song-id", options);
          }
        })
        .catch((reject) => {
          console.error("歌曲需要版权" + reject);
          this.$root.isShowCopyright = true;
          // alert("付费歌曲");
        });
    },
    search(e) {
      if (e.target.value.length == 0 || e.target.value.trim() == "") {
        this.sugDatas = "";
        this.isSearch = false;
        this.isShowH3 = true;
        this.bool = false;
      } else {
        this.isSearch = true;
        this.isShowH3 = false;
        this.text = e.target.value;
        this.bool = false;
      }
      // console.log(this.isShowH3);
      this.isShowH3 = false;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.isSearch) {
          return;
        }
        this.axios
          .get(
            "http://music.kele8.cn/search/suggest?keywords=" +
              e.target.value +
              "&type=mobile"
          )
          .then((res) => {
            this.sugDatas = res.data.result.allMatch;
            // this.bool = false;
          })
          .catch((reject) => {
            console.error("歌曲需要版权" + reject);
          });
      }, 400);
    },
    recordHandler(res) {
      // console.log(e.target == "div");
      // console.log(e);
      this.getRecommendText(res);
    },
    getRecommendText(reskey) {
      this.$root.isShowLoading = true;
      let inp = this.$refs.inp;
      let key = "";
      if (typeof reskey == "string") {
        inp.value = reskey.trim();
        key = reskey;
      } else {
        key = inp.value;
      }
      // console.log(reskey);
      if (!reskey) {
        // alert("内容为空");
        return;
      }
      this.isSearch = true;
      // 过滤不重复的
      this.localStorageValue = this.localStorageValue.filter((ele) => {
        return ele !== key;
      });
      // 把当前搜索的放在开头
      this.localStorageValue.unshift(key);
      window.localStorage.setItem("key", this.localStorageValue);
      this.bool = true;
      this.axios
        .get("http://music.kele8.cn/search?keywords=" + key)
        .then((res) => {
          // console.log(res);
          this.getDatas = res.data.result.songs;
          let str = "";
          this.getDatas.forEach((element) => {
            str += element.id + ",";
          });
          str = str.slice(0, str.length - 1);
          this.axios
            .get("http://music.kele8.cn/song/detail?ids=" + str)
            .then((res) => {
              this.newData = res.data.songs;
              let arr = null;
              this.newData = this.newData.map((ele) => {
                arr = ele.ar.map((item) => {
                  return { name: item.name };
                });
                return {
                  ...ele.al,
                  id: ele.id,
                  ...ele,
                  song: { artists: arr },
                };
              });
              // console.log(this.newData);
              this.$emit("new-song-list", this.newData);
              this.$root.isShowLoading = false;
              this.isShowH3 = true;
            });
        });
    },
    getHotList() {
      this.axios.get("http://music.kele8.cn/search/hot").then((resolve) => {
        this.hotList = resolve.data.result.hots;
      });
      this.$root.isShowLoading = false;
    },
    hotFirst(res) {
      this.getRecommendText(res);
    },
    // 获取本地缓存
    localRecord() {
      if (!window.localStorage.getItem("key")) {
        return;
      }
      this.localStorageValue = window.localStorage.getItem("key").split(",");
    },
    // 点击删除本地缓存本地缓存
    remoLocalItem(remoItem) {
      this.localStorageValue = this.localStorageValue.filter((ele) => {
        return ele !== remoItem;
      });
      // this.localStorageValue.shift(remoItem);
      window.localStorage.setItem("key", this.localStorageValue);
    },
    focusH() {},
    blurH() {
      // this.bool = false;
    },
  },
};
</script>

<style  lang="less">
#Search {
  padding-bottom: 50px;
  .sgchfl {
    flex: 1 1 auto;
    padding: 6px 0;
    max-width: calc(100vw - 84px) !important;
  }
  margin-bottom: 56px;
  .mytitle {
    height: 50px;
    margin: 0 10px;
    font-size: 15px;
    // line-height: 50px;
    color: #507daf;
    max-width: 100%;
  }
  ul {
    margin: 0;
    padding: 0;

    .recomitem {
      display: flex;
      list-style: none;
      align-items: center;
      height: 45px;
      padding-left: 10px;
      i {
        flex: 0 0 auto;
        margin-right: 7px;
        width: 15px;
        height: 15px;
        background-image: url(../lib/search.svg);
        display: inline-block;
        vertical-align: middle;
        background-position: 0 0;
        background-size: contain;
        background-repeat: no-repeat;
      }
      span {
        display: inline-block;
        flex: 1;
        width: 1%;
        padding-right: 10px;
        font-size: 15px;
        line-height: 45px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        position: relative;
      }
    }
  }
}
.m-input {
  padding: 15px 10px;
  position: relative;
  .inputcover {
    position: relative;
    width: 100%;
    // max-width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    .u-svg-srch {
      position: absolute;
      left: 0;
      top: 9px;
      margin: 0 8px;
      vertical-align: middle;
      width: 13px;
      height: 13px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    }
    input {
      width: 100%;
      height: 30px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
      border-radius: 0;
      border: 0;
      outline: 0;
    }
    label {
      position: absolute;
      left: 30px;
      top: 5px;
      font-size: 14px;
      color: #c9c9c9;
      background: rgba(0, 0, 0, 0);
      pointer-events: none;
      cursor: default;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      .u-svg-empty {
        display: none;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
      }
    }
  }
}
</style>