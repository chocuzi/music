<template>
  <div class="m-buywin">
    <div class="buywin_wrap">
      <b class="buywin_close" @click="isShowHandler"></b>
      <div class="buywin_iner">
        <div class="buywin_pic">
          <img
            class="buywin_img"
            src="//p3.music.126.net/OUEo6RfRkAqrFPP3CKDWIQ==/18876415625966423.jpg"
          />
        </div>
        <div class="buywin_cont">
          <p class="buywin_p">
            唱片公司要求该歌曲须付费，购买数字专辑后即可畅听~
          </p>
          <div class="buywin_bottom">立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isShowHandler() {
      this.$root.isShowCopyright = false;
    },
  },
};
</script>

<style scoped lang="less" >
.m-buywin {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 102;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  .buywin_wrap {
    position: relative;
    width: 67.63%;
    min-width: 250px;
    max-width: 320px;
    .buywin_close {
      position: absolute;
      width: 27px;
      height: 27px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAMAAACdUboEAAAAjVBMVEUAAADDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8rDx8p3d3eSlJWSk5SanJ2FhoZ7fHy0uLq0t7qwrdfzAAAAJnRSTlMABciy8q2FKCD679+3MANFpjX2zLuLgHx2P9hxXlbRTxsJ7J1iwi3Q3nAAAAJhSURBVFjDrdjpUtswFIbhz/u+ZScbBNrPkATu//LKdKa4YMtHsvX8zeSdOFKcI0NQFqdN7Wbpgmm2d+vNqSgxQ3TwUv7ke4diWu7pcKbK+fBk3GuChGOSoDHqPeSUrR70rzegnjzS6jk7n7qSrSMHY5cm3FgKPj7TTPo4HtzQXAi18oVTvJSq4CXgNN5Fscgep8qHl7zmdPVQMGTHyvI8cp5Tb2M/c55F9GNVXM61/L46W863/T8YLThfEqET0AavCz7Qjuqr+Jt2uGMf8f12v3LE9X57Z8+//wmPfbe2bV+p9Pr58k35TT4l7Lu3XXI42N7ZF6v34rXtksPB9sq+zd/ifuRdr4Yv7fEpIoWkfpAsAOwoJE2CPABYUUjqBbvVLn1KSYMg/RIFKSblYKfBkQZJOchfWFMnqR3kGjW1krpBBnCpl9QMcok9NZN6QWZIqZnUCzKFT4OkHGQCUifZBUXwLRcTpJavOkVmeWUyuJZ3zxK15R0eYG35V7jG0fKd4hcKy3ezBo6vHyTfpKTvACuDoJzMAezkoEFyB6AQgybJAp/2QtAkmXWnSzEoJ7tjTSxMUqrkVTmbwTOe9t4U014+MuPeuqAqeRsZxF32fMhT84d6DkdFOyp88WjDCp0o4XxJZPtcuLF9dj07+CZOOc8isv0M4Gj/OcWAF05XY0jpcSrPwaBLzmlWFyg4AacIHCiVa5pblxhzSmnGP0EQL2liGUHkbBfUlYQOdMQe9eQRdFUuZW4FE1Uu7cEKpuIwo0oWxpik2OV+r+bnuwYzOM0xDM6ZTy6es2UQHhtpdf8ALaT5DMW2Z+QAAAAASUVORK5CYII=)
        no-repeat;
      background-size: contain;
      right: -13px;
      top: -13px;
      z-index: 10;
    }
    .buywin_iner {
      border-radius: 2px;
      background-color: #fff;
      overflow: hidden;
      .buywin_pic {
        position: relative;
        padding-bottom: 48.2%;
        overflow: hidden;
        .buywin_img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
      .buywin_cont {
        padding: 5.35% 7.14%;
        .buywin_p {
          font-size: 14px;
          color: #666;
          line-height: 1.3;
        }
        .buywin_bottom {
          background-color: #e94339;
          color: #fff;
          text-align: center;
          line-height: 40px;
          border-radius: 40px;
          font-size: 17px;
          margin-top: 18px;
        }
      }
    }
  }
}
</style>