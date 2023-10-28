<script>
export default {
    props: {
        name: String,
        src: String,
        id: Number
    },
    methods: {
        getImageUrl(name) {
            return new URL(`${name}`,import.meta.url).href
        }
    }
}
</script>
<template>
    <router-link to="/playlist" @click="playlistSelecionada = playlist.musicas">
        <div class="max-w-sm w-full lg:max-w-md lg:flex">
            <div class="border-r border-b border-l bg-zinc-900 hover:bg-zinc-800 border-gray-950 lg:border-l-0 lg:border-t lg:border-gray-1000 rounded-b lg:rounded-b-none lg:rounded-r p-2 flex flex-col justify-between leading-normal mx-2 mb-2 w-96">
                <div class="flex items-center space-x-4">
                    <img class="rounded-lg w-20 h-20 object-cover" :src= "getImageUrl(src)" alt="Capa da playlist"/>
                    <p class="text-gray-100 text-base max-w-xs">{{ name }}</p>
                    
                    <a href="#" class="bg-purple-600 hover:text-gray-200 text-white py-2 px-4 h-11 w-11 flex items-center justify-center overflow-hidden rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11 transform scale-150">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </router-link>
</template>
