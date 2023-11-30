<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  import ModalPlaylist from "./components/ModalPlaylist.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar/>
    </header>

    <RouterView />
    <ModalPlaylist>
      <p>
        Hi from modal
      </p>
    </ModalPlaylist>
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

</style>
