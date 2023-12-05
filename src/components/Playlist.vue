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
            imageUrl: './samuel.jpg',
            musicasPlaylist: [],
            musicas: [],
            modalOpen: false,
        };
    },
    
    async created() {
        await this.getPlaylist()
        await this.getMusicas()
        await this.getAllSongs()
    },
    watch: {
        $route(to, from) {
            if (to.query.id !== from.query.id) {
                this.getPlaylist();
            }
        },
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
        },
        async getMusicas() {
            this.musicasPlaylist = [];
            this.playlistSelecionada.musicas.forEach(async musicaId => {
                try {
                    const res = await axios.get('http://localhost:3000/musicas?id=' + musicaId);
                    console.log(musicaId);
                    this.musicasPlaylist.push(res.data[0]);
                } catch (error) {
                    console.error('Erro ao buscar a música:', error);
                }
            });
        },
        async removeSong(songID){
            try {
                const i = this.playlistSelecionada.musicas.indexOf(songID);
                this.playlistSelecionada.musicas.splice(i, 1);
                await axios.patch('http://localhost:3000/playlists?id=' + this.playlistId, this.playlistSelecionada)
                location.reload()
            }
            catch(error) {
                console.log("Não pode remover musica! ERRO:" + error)
            }
        },
        async getAllSongs(){
            try
            {
                const res = await axios.get('http://localhost:3000/musicas')
                this.musicas = res.data
            }
            catch(error)
            {
                console.log("Não pode pegar as musicas! ERRO:" + error)
            }
        },
        estadoModal(){
            this.modalOpen = !this.modalOpen;
        },
        async addMusica(musicaID){
            try {
                this.playlistSelecionada.musicas.push(musicaID);
                console.log(`adicioanando musica com id: ${musicaID}`)
                await axios.patch('http://localhost:3000/playlists/' + this.playlistId, this.playlistSelecionada)
            }
            catch(error) {
                console.log("Não pode remover musica! ERRO:" + error)
            }
        }
    },
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
                    Duração
                </th>
                <th scope="col" class="px-4 py-3">
                    <button @click="estadoModal" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Adicionar musica
                    </button>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="n in musicasPlaylist" class="bg-white dark:bg-black">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" @click="btn = n.localMusica">
                    {{ n.nomeMusica }}
                </th>
                <td class="px-6 py-4">
                    {{ n.nome }}
                </td>
                <td class="px-6 py-4">
                    {{ n.dataCriacao }}
                </td>
                <td class="px-6 py-4">
                   {{ n.duracao }}
                </td>
                <audio style="width:800px;height:32px" controls>
                    <source :src="n.localMusica" type="audio/ogg">
                </audio>
                <td>
                    <button @click="removeSong(n.idMusica)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Remover
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- <div> 
        <audio style="width:800px;height:32px" controls>
            <source :src="btn" type="audio/ogg">
        </audio> 
    </div> -->
</div >

<div v-show="modalOpen" class="absolute w-full bg-black bg-opacity-30 h-screen 
    top-0 left-0 flex justify-content justify-center  px-8  place-items-center">

    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <button @click="estadoModal" type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            X
        </button>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <tbody>
            <tr v-for="n in musicas" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ n.nomeMusica }}
                </th>
                <td class="px-6 py-4">
                    <button @click="addMusica(n.idMusica)" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Adicionar
                    </button>
                </td>
            </tr>
        </tbody>
    </table>

    </div>
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
