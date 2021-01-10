<template>
  <div class="song-lyric">
    <div class="min-paly" v-show="!bool">
      <span></span>
      <div @click.stop="touchEndLyric"></div>
      <!-- <div></div> -->
    </div>
    <ul
      ref="ul"
      @touchstart.stop="touchStartLyric($event)"
      @touchmove.stop="touchMoveLyric($event)"
    >
      <li v-for="(item, index) in str" :key="index">{{ item.text }}</li>
      <!-- @touchend.stop="touchEndLyric($event)" -->
      <!-- <span v-if="!bool">正在加载...</span> -->
      正在加载...
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongLyric",
  props: [
    //   当前音乐
    "currentMusic",
    "currentTime",
    "paused",
  ],
  //   props: ["currentMusic", "currentTime"],
  data() {
    return {
      str: "",
      y: 0,
      bool: true,
      bool1: false,
      index: 0,
      timer: 0,
      isShowStr: false,
    };
  },
  created() {
    this.dispose();
  },
  watch: {
    currentMusic() {
      this.dispose();
    },
    currentTime() {
      if (!this.bool1) return;
      if (this.str.length <= 0 || this.str[0].text == "暂无歌词") {
        return;
      }
      // console.log(this.currentTime);
      let ul = this.$refs.ul;
      // ul.children[this.index].style.animationPlayState = "running";
      let index = 0;
      if (typeof this.str == "object") {
        index = this.str.findIndex((element) => {
          return element.time >= this.currentTime;
        });
      } else {
        index = 0;
        return;
      }
      if (index >= 1) {
        ul.children[0].className = "";
        //排他
        for (let j = 0; j < this.str.length; j++) {
          ul.children[j].className = "";
        }
        // if (index >= 1) {
        // ul.children[index - 1].className = "";
        ul.children[index - 1].className = "active-lyric";
        // }
        // console.log(this.str[index].time - this.str[index - 1].time);
        // console.log(ul.children[index - 1]);
        if (!this.paused) {
          ul.children[index - 1].style =
            "-webkit-animation: masked-animation " +
            (this.str[index].time - this.str[index - 1].time) +
            "s  linear forwards;";
        } else {
          ul.children[index - 1].style.animationPlayState = "paused";
        }
      } else if (index == -1) {
        for (let j = 0; j < this.str.length; j++) {
          ul.children[j].className = "";
        }
        ul.children[this.str.length - 1].className = "active-lyric";
      }
      //不存在就暂停
      if (index == -1) {
        return;
      }
      if (!this.bool) return;
      // ul.style.marginTop =
      //   -ul.children[index].offsetTop + ul.parentNode.offsetHeight / 2 + "px";

      ul.style.marginTop = -ul.children[index].offsetTop + 200 + "px";
    },
  },
  methods: {
    //渲染
    render() {
      let ul = this.$refs.ul;
      // console.log(typeof this.str);
      if (this.str == null) {
        this.str = [{ text: "暂无歌词" }];
        // ul.style.marginTop = "0";
        // ul.style.display = "flex";
        // ul.style.justifyContent = "center";
        // ul.style.alignItems = "center";
        ul.style.marginTop = "170px";
        // return;
      }
      // ul.innerHTML = "";
      // this.str.forEach((element) => {
      //   var li = document.createElement("li");
      //   li.innerHTML = element.text;
      //   ul.appendChild(li);
      // });
    },
    //处理全部歌词
    dispose() {
      this.axios
        .get("http://music.kele8.cn/lyric?id=" + this.currentMusic.id)
        .then((response) => {
          if (response.data.nolyric) {
            this.str = [{ text: "暂无歌词" }];
            this.str = this.paresLyric(this.str);
            this.render();
            return;
          } else if (response.data.lrc.lyric) {
            this.str = response.data.lrc.lyric;
            if (this.str) {
              this.str = this.paresLyric(this.str);
              this.str = this.str.filter((ele) => {
                return ele.text.trim() != "";
              });
            }
            this.render();
          }
        });
      //   .finally(() => {});
    },
    // 处理字符串
    paresLyric(arrStr) {
      // console.log(arrStr);
      // if (!arrStr) {
      //   return;
      // }
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      var reg = /\[\d{2}:\d{2}\]/gi;
      // patt.test(arrStr);
      // console.log(patt.test(arrStr));
      // console.log(reg.test(arrStr));
      if (patt.test(arrStr)) {
        this.bool1 = true;
        return arrStr
          .split("\n")
          .filter((e) => e)
          .map((str) => {
            var time = 0;
            if (patt.test(arrStr)) {
              time = str.match(patt)[0].replace(/(\[|\])/gi, "");
            } else {
              time = str.match(reg)[0].replace(/(\[|\])/gi, "");
            }
            //  time = str.match(patt)[0].replace(/(\[|\])/gi, "");
            var timeArr = time.split(":");
            time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
            var text = "";
            if (patt.test(arrStr)) {
              // var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
              text = str.replace(patt, "");
            } else {
              time = str.match(reg)[0].replace(/(\[|\])/gi, "");
              text = str.replace(reg, "");
            }
            // console.log({ time, text });
            return { time, text };
          });
      } else {
        this.bool1 = false;
        return arrStr
          .split("\n")
          .filter((e) => e)
          .map((str) => {
            let a = 0;
            return { text: str, time: a++ };
          });
      }
    },
    touchStartLyric($event) {
      console.log("touchStartLyric");
      let ul = this.$refs.ul;
      let a = parseInt(ul.style.marginTop) || 0;
      this.y = $event.touches[0].pageY - a;
    },
    touchMoveLyric($event) {
      this.bool = false;
      let ul = this.$refs.ul;
      ul.style.transition = "";
      let b = parseInt(ul.style.marginTop) || 0;
      let y = -(this.y - $event.touches[0].pageY);
      if (y >= 200) {
        y = 200;
      } else if (y < -this.str.length * 31) {
        y = -this.str.length * 31;
      }
      // console.log(y);
      // console.log(ul.offsetHeight);
      // console.log(y);
      ul.style.marginTop = y + "px";
      for (let i = 0; i < this.str.length; i++) {
        b += ul.children[i].offsetHeight;
        if (b >= 185 && b <= 215) {
          this.index = i;
          break;
        }
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.bool = true;
      }, 3000);
    },
    touchEndLyric() {
      let ul = this.$refs.ul;
      if (this.index == 0) {
        this.bool = false;
        ul.children[0].className = "active-lyric";
      }
      ul.children[this.index].className = "active-lyric";
      ul.style.transition = "all  0.5s linear";
      let songtime = this.str[this.index].time;
      if (songtime <= 0) {
        songtime = 0;
      }
      this.bool = true;
      this.$emit("trans-current-index", songtime + 0.3);
    },
  },
};
</script>

<style  lang="less">
.song-lyric {
  position: relative;
  color: white;
  z-index: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90%;
  overflow: hidden;
  margin: 10px 0;
  // background-color: #fff;
  .min-paly {
    position: absolute;
    top: 173px;
    left: 0;
    width: 100%;
    height: 20px;
    z-index: 5;
    // background-color: rgba(255, 0, 0, 0.1);
    span {
      position: absolute;
      left: 20px;
      top: 10px;
      // float: left;
      width: 100%;
      height: 1px;
      background-color: #fff;
      z-index: -1;
      opacity: 0.3;
    }
    div {
      width: 20px;
      height: 20px;
      background: url(../lib/min-play-icon.png) no-repeat center;
    }
  }
  ul {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    // height: 230px;
    opacity: 1;

    // transition: all 0.5s;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    li {
      list-style: none;
      padding: 5px;
      letter-spacing: 1px;
      // transition: all 0.5s linear;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    li.active-lyric {
      color: #ff3a3a;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      // transition: all 0.5s;
      // background: rgba(255, 0, 0, 0.1);
      background-image: -webkit-linear-gradient(
        left,
        #fff,
        #fff 25%,
        #fff 50%,
        #ff3a3a 75%,
        #ff3a3a
      );
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      -webkit-background-size: 200% 100%;
      -webkit-animation: masked-animation 3s linear forwards;
    }
  }
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: -10% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>