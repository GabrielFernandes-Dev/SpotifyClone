<template>
    <main>
        <h1 class="text-white font-bold text-center mt-2 text-4xl">
            ESTOU TESTANDO MIDDLEWARE
        </h1>

        <button class="bg-white text-black flex m-auto p-4 my-20" @click="logout">LOGOUT</button>
    </main>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push('/login');
        },
    },
};
</script>