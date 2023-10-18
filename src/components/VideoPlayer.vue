<template>
  <div class="video-container">
    <video class="w-2/4 rounded-sm shadow-2xl shadow-zinc-300 p-1 my-3"
      :src="src"
      :muted="muted"
      :autoplay="autoplay"
      :controls="controls"
      :loop="loop"
      :width="width"
      :height="height"
      :poster="poster"
      :preload="preload"
      :playsinline="true"
      ref="player"
    />
  </div>
</template>

<script>
  export default {
    name: "VideoPlayer",
    props: {
      src: { type: String, required: true },
      controls: { type: Boolean, required: false, default: false },
      loop: { type: Boolean, required: false, default: false },
      width: { type: Number, required: false, default: 500 },
      height: { type: Number, required: false, default: 281 },
      autoplay: { type: Boolean, required: false, default: false },
      muted: { type: Boolean, required: false, default: false },
      poster: { type: String, required: false },
      preload: { type: String, required: false, default: "auto" },
    },
  }
</script>

<style scoped>
  .video-conteiner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  video {
    background-color: black;
  }
</style>
