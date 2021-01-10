<template>
  <div class="m-song">
    <SongTop
      @show-play-bar="$emit('update:show-play-bar', $event)"
      :currentMusic="currentMusic"
    />
    <SongMain
      :currentMusic="currentMusic"
      :paused="$attrs.paused"
      :currentTime="$attrs.currentTime"
      @trans-current-index="$emit('trans-current-index', $event)"
    />
    <SongFoother
      :currentMusic="currentMusic"
      :duration="$attrs.duration"
      :currentTime="$attrs.currentTime"
      @updata:percentage="$emit('updata:percentage', $event)"
      @updata:down="$emit('updata:down', $event)"
      :paused="$attrs.paused"
      @foother-is-play="$emit('foother-is-play', $event)"
      :currentIndex="$attrs.currentIndex"
      @transmit-index="$emit('transmit-index', $event)"
      :newSongList="$attrs.newSongList"
      @transmit-isSingleCycle="$emit('transmit-isSingleCycle', $event)"
      @current-play-sing="$emit('current-play-sing', $event)"
      @remo-list="$emit('remo-list', $event)"
    />
  </div>
</template>

<script>
import SongTop from "@/components/SongTop.vue";
import SongMain from "@/components/SongMain.vue";
import SongFoother from "@/components/SongFoother.vue";

export default {
  name: "Song",
  props: ["currentMusic"],
  components: {
    SongTop,
    SongMain,
    SongFoother,
  },
  data() {
    return {};
  },
  methods: {
    // aaa($event) {
    //   this.percentage = $event;
    // },
  },
};
</script>

<style  lang="less">
.m-song {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 0, 0, 0.9);
  background-color: #131212;
  color: white;
  z-index: 5;
  user-select: none;
}
// .m-song {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100px;
//   height: 100px;
//   // background-color: rgba(255, 0, 0, 0.9);
//   background-color: #131212;
//   color: white;
//   z-index: 999;
//   user-select: none;
// }
</style>