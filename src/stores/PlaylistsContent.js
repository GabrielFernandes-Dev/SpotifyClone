import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const playlistsContent = ref([
        {
            id: 1,
            nome: 'Sunset Lofi',
            capa: "../images/sunset_lofi.jpg",
            musicas: [
                {
                    id: 10,
                    nomeMusica: 'Lofi Study',
                    localMusica: 'src/songs/lofi-study-112191.mp3',
                    data: 20/10/2023
                },
                {
                    id: 11,
                    nomeMusica: 'Good Night',
                    localMusica: 'src/songs/good-night-160166.mp3',
                    data: 21/10/2023
                }
            ]
        },
        {
            id: 2,
            nome: 'Lazy Day Lofi',
            capa: "../images/lazy_lofi.jpg"
        },
        {
            id: 3,
            nome: 'Lofi Beats',
            capa: "../images/aesthetic_lofi.png"
        },
        {
            id: 4,
            nome: 'Lofi',
            capa: "../images/new_york.jpg"
        },
        {
            id: 5,
            nome: 'Chill Study Beats',
            capa: "../images/lofi_girl.jpg"
        },
        {
            id: 6,
            nome: 'Study Lofi',
            capa: "../images/study_lofi.jpg"
        },
        {
            id: 7,
            nome: 'Lofi Rain',
            capa: "../images/R.jpeg"
        },
        {
            id: 8,
            nome: 'Relaxing Music',
            capa: "../images/capa-lofi.jpeg"
        },
    ])