<script>
import SideCard from './SideCard.vue';

export default {
    name:'SideBar',
    components: {'SideCard' : SideCard}
}
</script>

<template>
    <div class="relative flex min-h-screen bg-black ">
        <div >
            <h1 class="text-white font-bold text-xl mb-8 place-content-center">SideBar</h1>
            <SideCard></SideCard>
        </div>
    </div>

</template>