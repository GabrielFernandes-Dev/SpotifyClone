<script>
    import axios from 'axios'
    import { musicaSelecionada } from '../stores/MusicaAtual'

    export default {

        data() {
            return {
                searchValue: '',
                open: false,
                musicas: [],
            }
        },
        methods: {
            clearSearch() {
                this.searchValue = ''
                this.open = !this.open
            }
        },
        async created() {
            const resp = await axios.get('http://localhost:3000/musicas')
            this.musicas = resp.data.slice(0, 9)

        }, 
        computed: {
            listaMusicas() {
                if(this.searchValue.trim().length > 0){
                    return this.musicas.filter((musica) => musica.nomeMusica.toLowerCase()
                    .includes(this.searchValue.trim().toLowerCase()))
                }
                
            },
            adicionarMusica(){

            }
        }
    }
</script>
<template>
    <div class="mb-3">
        <div class="relative flex w-full flex-wrap items-stretch">
            <input
            type="search"
            class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-gray-100 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3" 
            v-model="searchValue"
            @click="open = !open"
            v-on:blur="clearSearch()"
            />

            <!--Search button-->
            <button
            class="relative z-[2] rounded-r border-2 border-red-500 px-1 py-1"
            type="button"
            id="button-addon3"
            data-te-ripple-init
            @click="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
       </div>
    </div>

    <div class="bg-zinc-900 border-gray-950 rounded-md ml-44 p-2 flex flex-col justify-between leading-normal mr-1 mb-2 w-52" v-show="open"> 
        <table class="columns-2 text-gray-100 text-left">
            <tbody v-for="musica in listaMusicas" v-bind:key="musica.idMusica">
                <tr>
                <td><button @click="musicaSelecionada = musica">{{ musica.nomeMusica }}</button></td>
                <td>
                    <button
                        class="relative z-[2] rounded-full px-1 py-1 bg-purple-600"
                        type="button"
                        id="button-addon4"
                        data-te-ripple-init
                        @click="adicionarMusica()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>
