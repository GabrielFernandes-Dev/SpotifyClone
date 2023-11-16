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
    },
    watch: {
        $route(to, from) {
            if (to.query.id !== from.query.id) {
                this.getPlaylist();
            }
        },
        playlistSelecionada: {
            handler() {
                this.getMusicas();
            },
            deep: true
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
        },
        async getMusicas() {
            this.musicasPlaylist = [];
            this.playlistSelecionada.musicas.forEach(async musicaId => {
                try {
                    const res = await axios.get('http://localhost:3000/musicas?idMusica=' + musicaId);
                    this.musicasPlaylist.push(res.data[0]);
                } catch (error) {
                    console.error('Erro ao buscar a música:', error);
                }
            });
        },
        async removeSong(songID){
            console.log(this.playlistSelecionada)
            console.log(this.musicasPlaylist)
            try {
                const i = this.playlistSelecionada.musicas.indexOf(songID);
                this.playlistSelecionada.musicas.splice(i, 1);
                console.log(`removendo musica com ID: ${songID}`)
                await axios.patch('http://localhost:3000/playlists/' + this.playlistId, this.playlistSelecionada)
            }
            catch(error) {
                console.log("Não pode remover musica")
            }
        },
        estadoModal(){
            this.modalOpen = !this.modalOpen;
        },
        async addMusica(){

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
            <tr  v-for="n in musicasPlaylist" class="bg-white dark:bg-black">
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
                <!-- <audio style="width:800px;height:32px" controls>
                    <source :src="n.localMusica" type="audio/ogg">
                </audio> -->
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
</div>

<div v-show="modalOpen" class="absolute w-full bg-black bg-opacity-30 h-screen 
    top-0 left-0 flex justify-content px-8">

    <form class="bg-white">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
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
