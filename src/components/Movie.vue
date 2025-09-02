<template>
    <div class="movie-section">
        <CardMovie :dataMovieItems="dataMovieItems" :baseImageUrl="baseImageUrl"></CardMovie>
    </div>
</template>
<script setup>
const dataMovieItems = ref([])
const baseImageUrls = ref()
import CardMovie from '@/components/CardMovie.vue';
import { ref } from 'vue';
import { watchEffect } from 'vue';

const props = defineProps({
    dataMovie: {
        type: Array,
        required: true,
    },
    baseImageUrl: {
        type: String,
        required: true
    }
})
baseImageUrls.value = props.baseImageUrl
watchEffect(() => {
    dataMovieItems.value = props.dataMovie.map(movie => ({
        "thumbnail": movie.thumb_url,
        "name": movie.name,
        "year": movie.year,
        "quality": movie.quality,
        "lang": movie.lang,
        "time": movie.time,
        "country": movie.country,
        "rate": movie.tmdb,
        "category": movie.category,
        "episode": movie.episode_current,
        "type": movie.type,
        "slug": movie.slug,
    }))
})
</script>
<style scoped>
.movie-section {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    justify-content: center;
}
</style>