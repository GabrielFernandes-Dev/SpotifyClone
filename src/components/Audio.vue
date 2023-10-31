<template>
    <audio style="width:800px;height:32px" controls>
        <source :src="musicaSelecionada.localMusica" type="audio/ogg">
    </audio>
</template>

<script>
import { musicaSelecionada } from '../stores/MusicaAtual';

export default {
    
}
</script>
