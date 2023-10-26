<script>
import PlaylistCard from './PlaylistCard.vue'
import SideBarSearch from './SideBarSearch.vue'

export default {
    name:'SideBar',
    components: {
        'PlaylistCard' : PlaylistCard,
        'SideBarSearch' : SideBarSearch
    }
}
</script>

<template>
    <div class="relative flex min-h-screen bg-black ">
        <div >
            <div class="grid grid-cols-2">
                <h1 class="text-white font-bold text-xl mb-6">Lista Playlists</h1>
                <SideBarSearch/>
            </div>
            <PlaylistCard/>
        </div>
    </div>

</template>