<script>
import { playlistSelecionada } from '../stores/PlaylistAtual'
import { watch } from 'vue';
import axios from 'axios';

export default {
    name: 'Playlist',
    components: {
        
    },
    data() {
        return {
            playlistId: this.$route.query.id,
            playlistSelecionada: [],
            imageUrl: './samuel.jpg'
        };
    },
    created() {
        this.getPlaylist()
    },
    watch: {
        $route(to, from) {
            if (to.query.id !== from.query.id) {
                this.getPlaylist();
            }
        }
    },
    methods: {
        async getPlaylist() {
            if (this.$route.query.id) {
                const res = await axios.get('http://localhost:3000/playlists?id=' + this.$route.query.id);
                this.playlistSelecionada = res.data[0];
            }
        },
        getImageUrl(name) {
            return new URL(`${name}`,import.meta.url).href
        }
    }
}
</script>
<template>
<div class="max-w-sm w-full lg:max-w-full bg-fixed">
    <div class="image-container">
        <img :src="getImageUrl(playlistSelecionada.capa)" alt="Playlist Image" class="playlist-image">
        <div class="content">
            <h1 class="pb-4 text-4xl">{{ playlistSelecionada.nome }}<br>Playlist</h1>
        </div>
    </div>
    <table class="w-full text-sm text-left text-gray-100 dark:text-gray-100">
        <thead class="text-xs text-black uppercase dark:text-gray-100">
            <tr>
                <th scope="col" class="px-4 py-3">
                    Titulo
                </th>
                <th scope="col" class="px-4 py-3">
                    Album
                </th>
                <th scope="col" class="px-4 py-3">
                    Adicionado em
                </th>
                <th scope="col" class="px-4 py-3">
                    Genero
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="n in playlistSelecionada" class="bg-white dark:bg-black">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" @click="btn = n.localMusica">
                    {{ n.nomeMusica }}
                </th>
                <td class="px-6 py-4">
                    {{ n.nome }}
                </td>
                <td class="px-6 py-4">
                    {{ n.nome }}
                </td>
                <td class="px-6 py-4">
                   {{ n.nome }}
                </td>
                <!-- <audio style="width:800px;height:32px" controls>
                    <source :src="n.localMusica" type="audio/ogg">
                </audio> -->
            </tr>
        </tbody>
    </table>
    <!-- <div> 
        <audio style="width:800px;height:32px" controls>
            <source :src="btn" type="audio/ogg">
        </audio> 
    </div> -->
</div>
</template>
<style>
.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.playlist-image {
  width: 100%;
  height: 23rem;
  object-fit: cover;
  filter: brightness(50%);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 2xl;
  text-align: center;
}
</style>
