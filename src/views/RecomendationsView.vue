<script setup>
import Recomendations from '../components/Recomendations.vue';
import SideBar from '../components/SideBar.vue';
import Audio from '../components/Audio.vue';
</script>

<template>
    <div class="flex min-h-screen">
        <SideBar/>
        <div class="flex flex-col items-center mt-12 ml-14 min-h-screen">
            <p class="text-black text-4xl font-bold mb-4">Playlists recomendadas</p>
            <Recomendations />
        </div> 
    </div> 
    <Audio />
</template>
