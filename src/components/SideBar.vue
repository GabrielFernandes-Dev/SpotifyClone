<script>
import PlaylistCard from './PlaylistCard.vue'

export default {
    name:'SideBar',
    components: {'PlaylistCard' : PlaylistCard}
}
</script>

<template>
    <div class="relative flex min-h-screen bg-black ">
        <div >
            <h1 class="text-white font-bold text-xl mb-8 place-content-center">SideBar</h1>
            <PlaylistCard></PlaylistCard>
        </div>
    </div>

</template>