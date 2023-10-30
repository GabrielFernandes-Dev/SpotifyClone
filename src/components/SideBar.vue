<script>
import PlaylistCard from './PlaylistCard.vue'
import SideBarSearch from './SideBarSearch.vue'
import axios from 'axios';

export default {
    name:'SideBar',
    components: {
        'PlaylistCard' : PlaylistCard,
        'SideBarSearch' : SideBarSearch
    },
    data() {
        return {
            playlists: [],
            userId: 1 //Id do usuário colocado temporariamente
        };
    },
    async created() {
        const res = await axios.get('http://localhost:3000/users?id=' + this.userId)
        let playlistsIds = res.data[0].playlists
        playlistsIds.forEach(id => {
            axios.get('http://localhost:3000/playlists?id=' + id)
            .then(res => {
                this.playlists.push(res.data[0])
            })
        });
    },
    methods: {
        async getLastPlaylistId() {
            const res = await axios.get('http://localhost:3000/playlists')
            let playlists = res.data
            console.log(playlists);
            return playlists.at(-1).id;
        },
        async addNewPlaylist() {
            try {
                let id = await this.getLastPlaylistId() + 1;
                const newPlaylist = {
                    id: id,
                    nome: "Nova Playlist",
                    capa: "../images/defaultCover.jpeg",
                    musicas: []
                };
                
                const response = await axios.post('http://localhost:3000/playlists', newPlaylist);
                await this.updateUserPlaylists(id);
                this.playlists.push(newPlaylist);
                console.log('Playlist adicionada com sucesso!', response.data);
            } catch (error) {
                console.error('Erro ao adicionar a playlist', error);
            }
        },
        async updateUserPlaylists(newPlaylistId) {
            try {
                const response = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                const user = response.data;

                if (!user[0].playlists.includes(newPlaylistId)) {
                    user[0].playlists.push(newPlaylistId);
                } else {
                    console.log('Playlist já existe na lista do usuário');
                    return;
                }

                await axios.put(`http://localhost:3000/users/${this.userId}`, user[0]);
                console.log('Playlist adicionada com sucesso!');
            } catch (error) {
                console.error('Erro ao adicionar a playlist', error);
            }
        }
    }
}

</script>

<template>
    <div class="relative w-96 bg-black">
        <div>
            <div class="grid grid-cols-2">
                <h1 class="text-white font-bold text-2xl ml-5">Lista Playlists</h1>
                <SideBarSearch class="mx-2"/>
            </div>

            <button @click="addNewPlaylist()" class="bg-white text-black hover:bg-gray-200 font-bold py-2 px-3 ml-4 mb-3 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Nova Playlist</span>
            </button>
            <div>
                <PlaylistCard v-for="playlist in playlists" :name="playlist.nome" :src="playlist.capa" :id="playlist.id"/>
            </div>
        </div>
    </div>
</template>
