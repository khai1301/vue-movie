<template>
    <div class="card-movie d-flex" v-for="item in dataMovieItems" :key="item.id">
        <a :href="item.slug" class="card-content-link d-flex">
        <div class="thumb">
            <img :src="`${getBaseImageUrl()}/uploads/movies/${item.thumbnail}`" alt="" class="thumb-img">
        </div>
        <div class="card-content">
                <div class="card-content-top d-flex">
                    <div class="card-content-name">
                        <p>{{ item.name }} ({{ item.episode }})</p>
                    </div>
                    <div class="card-content-year">
                        <span>{{ item.year }}</span>
                    </div>
                </div>
                <div class="card-content-mid d-flex">
                    <div class="quality d-flex">
                        <p>HD <p v-if="item.lang"> - {{ item.lang }}</p></p>
                    </div>
                    <div class="time">
                        <FontAwesomeIcon icon="clock" />
                        {{ item.time }}
                    </div>
                    <div class="rate d-flex">
                        <FontAwesomeIcon icon="star" />
                        <p>{{ item.rate.vote_average }}</p>
                    </div>
                </div>
                <div class="card-content-bot d-flex" v-if="item.country">
                    <a v-for="country in item.country" :key="country.id" :href="`/quoc-gia/${country.slug}`" class="card-content-category">
                        {{ country.name }}
                    </a>
                </div>
                <div class="card-content-bot d-flex" v-if="item.category">
                    <a v-for="cat in item.category" :key="cat.id" :href="`/the-loai/${cat.slug}`" class="card-content-category">
                        {{ cat.name }}
                    </a>
                </div>
            </div>
        </a>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { getBaseImageUrl } from '@/services/baseImageUrl';

const props = defineProps({
    dataMovieItems: {
        type: Array,
        required: true
    },
})
</script>
<style scoped>
.card-movie {
    gap: 10px;
    flex-direction: column;
    font-weight: 300;
    flex: 1 1 calc(25% - 80px);
    box-sizing: border-box;
}
.card-content-link {
    flex-direction: column;
    gap: 5px;
}
.card-content-top, .card-content-mid {
    justify-content: space-between;
    align-items: center;
    color: var(--primary-color);
}
.card-content-bot {
    align-items: center;
    color: var(--primary-color);
    flex-wrap: wrap;
    gap: 5px;
    flex: 1;
}
.card-movie span, .card-movie svg {
    color: var(--third-color);
}
.card-content-category {
    background: #2e2e2e;
    padding: 10px 10px;
    border-radius: 5px;
    border: none;
    color: var(--primary-color);
    font-size: 12px;
    line-height: 1;
}
.card-content-category:hover {
    background: #727171;
    transition: all 0.6s ease; 
}
.thumb {
    width: 100%;
    aspect-ratio: 2/3;
    overflow: hidden;
}

.thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.card-content-mid {
    font-size: 12px;
    flex: 1;
}
.card-content-top {
    font-size: 14px;
    gap: 5px;
    min-height: 70px;
    flex: 1;
}

.card-movie .quality p, .card-movie .rate {
    flex-direction: row;
    align-items: center;
    display: flex;
}
.card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}
</style>