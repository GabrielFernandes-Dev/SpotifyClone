<script>
    export default {

        data() {
            return {
                searchValue: '',
                musicas: []
            }
        },
        methods: {
            clearSearch() {
                searchValue = ''
            }
        },
        async created() {
            const resp = await axios.get('http://localhost:3000/musicas')
            this.musicas = resp.data

        }, 
        computed: {
            listaMusicas() {
                if(this.searchValue.length > 0){
                    return this.musicas.filter((musica) => musica.nomeMusica
                    .includes(this.searchValue))
                }
                
            }

            /*listaMusicas() {
                if(this.searchValue.trim().length > 0){
                    return this.musicas.filter((musica) => musica.nomeMusica.toLowerCase()
                    .includes(this.searchValue.trim().toLowerCase()))
                }
                
            }*/
        }
    }
</script>
<template>
    <div class="mb-3">
        <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
            type="search"
            class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3" 
            v-model="searchValue"/>

            <!--Search button-->
            <button
            class="relative z-[2] rounded-r border-2 border-red-500 px-1 py-1"
            type="button"
            id="button-addon3"
            data-te-ripple-init
            onclick="clearSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
       </div>
    </div>

    <div v-for="musica in listaMusicas" v-bind:key="musica.idMusica"> 
        <table class="table-auto">
            <tbody>
                <tr>
                <td>{{ musica.nomeMusica }}</td>
                <td><button>Adicionar</button></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        {{ searchValue }}
        {{ musicas }}
    </div>

</template>
