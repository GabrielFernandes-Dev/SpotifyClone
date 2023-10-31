<script>
import { playlistSelecionada } from '../stores/PlaylistAtual' 
import axios from 'axios'

export default {

    data() {
        return {
            playlists: []
        };
    },
    async created() {
        const res = await axios.get('http://localhost:3000/playlists')
        this.playlists = res.data.slice(0, 8)
    },
    methods: {
        getImageUrl(name) {
            
            return new URL(`${name}`,import.meta.url).href
        }
    }
}

</script>
<template>
    <div class="columns-4">
        <div v-for="playlist in playlists" class="pl-2 pb-2">
            <div class="block w-44 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-neutral-700 card-hover">
                <router-link :to="'/playlist?id=' + playlist.id" @click="playlistSelecionada = playlist.musicas">
                    <img class="rounded-t-lg w-full h-44 object-cover"
                    :src= "getImageUrl(playlist.capa)" 
                    alt="Capa da playlist"/>
                </router-link>
                <div class="p-4">
                    <p class="text-lg font-normal leading-tight text-neutral-50">
                        {{ playlist.nome }}	
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .card-hover :hover{
        box-shadow: 0 30px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
    }
</style>
