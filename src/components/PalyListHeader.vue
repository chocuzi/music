<template>
  <div class="paly-list-header">
    <section class="u-plhead pylst_header">
      <div
        class="plhead_bg"
        :style="{
          'background-image': 'url(' + playlist.coverImgUrl + ')',
        }"
      ></div>

      <div class="plhead_wrap">
        <div class="plhead_fl lsthd_fl">
          <img
            class="u-img"
            :src="playlist.coverImgUrl + '?param=145y145'"
          /><span class="lsthd_icon">歌单</span
          ><i class="u-earp lsthd_num">{{ getRound() }}</i>
        </div>
        <div class="plhead_fr">
          <h2 class="f-thide2 f-brk lsthd_title">
            {{ playlist.name }}
          </h2>
          <div class="lsthd_auth f-thide">
            <a class="lsthd_link" href="//music.163.com/m/user?id=1343591360"
              ><div class="u-avatar lsthd_ava">
                <img
                  class="u-img"
                  :src="playlist.creator.avatarUrl + '?param=145y145'"
                />
              </div>
              {{ playlist.creator.nickname }}</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  methods: {
    getRound() {
      let remainder = 0;
      if (this.playlist.playCount > 10000 * 10000) {
        remainder = (this.playlist.playCount / 10000 / 10000).toFixed(1) + "亿";
      } else if (this.playlist.playCount > 10000) {
        remainder = (this.playlist.playCount / 10000).toFixed(1) + "万";
      }
      return remainder;
    },
  },
};
</script>

<style lang="less">
.u-plhead {
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
  display: block;
  .plhead_bg,
  .plhead_bg:after {
    position: absolute;
    content: " ";
    background-color: rgba(0, 0, 0, 0.25);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    z-index: 1;
  }
  .plhead_bg {
    background-image: url(//music.163.com/api/img/blur/109951165048722919?param=170y170);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;

    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
  }
  .plhead_bg:after {
    content: " ";
    background-color: rgba(0, 0, 0, 0.25);
  }
  .plhead_wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    z-index: 2;
    .plhead_fl {
      position: relative;
      width: 145px;
      height: 145px;
      background-color: #e2e2e3;
      .u-img {
        width: 100%;
        vertical-align: middle;
        order: 0;
      }
      .lsthd_icon {
        position: absolute;
        z-index: 3;
        top: 10px;
        left: 0;
        padding: 0 8px;
        height: 17px;
        color: #fff;
        font-size: 9px;
        text-align: center;
        line-height: 17px;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }
      .lsthd_num {
        position: absolute;
        right: 2px;
        top: 0;
        z-index: 3;
        padding-left: 15px;
        color: #fff;
        font-size: 12px;
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
        font-style: normal;
      }
      .lsthd_fl:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 18px;
        z-index: 2;
        background-image: -webkit-linear-gradient(
          left,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.2)
        );
        background-image: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.2)
        );
      }
    }
    .plhead_fr {
      -webkit-box-flex: 1;
      -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      width: 1%;
      margin-left: 16px;
      .lsthd_title {
        padding-top: 1px;
        font-size: 17px;
        line-height: 1.3;
        color: #fefefe;
        height: 44px;
        display: -webkit-box;
        -webkit-box-pack: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 0;
        font-weight: 400;
      }
      .f-thide2,
      .f-thide3,
      .f-thide4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .f-brk {
        word-wrap: break-word;
        white-space: normal;
      }
      .f-thide {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }
      .lsthd_auth {
        display: block;
        position: relative;
        margin-top: 20px;
        .lsthd_link {
          display: inline-block;
          color: hsla(0, 0%, 100%, 0.7);
          text-decoration: none;
          .lsthd_ava {
            position: relative;
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 5px;
            .u-img {
              border-radius: 50%;
              width: 100%;
              vertical-align: middle;
              border: 0;
            }
          }
        }
      }
    }
  }
}
</style>