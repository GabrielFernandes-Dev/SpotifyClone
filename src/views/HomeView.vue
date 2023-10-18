<script setup>
import VideoPlayer from '../components/VideoPlayer.vue'
</script>

<template>
  <main>
    <h1 class="text-white font-bold text-center mt-2 text-4xl">
      Ouça musicas e veja clipes em qualquer lugar
    </h1>
    <VideoPlayer class="flex justify-center" src="/video.mp4" controls="true"/>
  </main>
</template>
