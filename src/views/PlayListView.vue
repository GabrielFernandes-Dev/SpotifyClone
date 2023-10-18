<script setup>
import { reactive } from 'vue';
import SideBar from '../components/SideBar.vue';
import { playlistSelecionada } from '../stores/PlaylistAtual'

let btn = 0
</script>

<template>
<main class="flex flex-row">

    <SideBar></SideBar>

    <div class="max-w-sm w-full lg:max-w-full bg-fixed">
    <div style="background:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/samuel.jpg) no-repeat center;background-size:cover"
        class="py-52 px-1 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto">
        <h1 class="pb-4">Samuel<br>Playlist</h1>
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
                <audio style="width:800px;height:32px" controls>
                    <source :src="n.localMusica" type="audio/ogg">
                </audio>
            </tr>
        </tbody>
    </table>
    <!-- <div> 
        <audio style="width:800px;height:32px" controls>
            <source :src="btn" type="audio/ogg">
        </audio> 
    </div> -->
</div>
</main>
</template>