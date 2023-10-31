<template>
    <div v-show="modalActive" class="absolute w-full bg-black bg-opacity-30 h-screen 
    top-0 left-0 flex justify-content px-8">

        <div v-show="modalActive" class="p4 bg-black self-start mt-32 max-width max-w-screen-md">
            <slot/>

            <button class="text-white mt-8 bg-purple-500 hover:bg-purple-700">Fechar</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modalActive: {
        type:Boolean,
        default: false
    }
})
</script>

<style></style>

