<template>
    <div class="container">
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <div v-else class="home-block">
            <div class="banner">
                <h1>{{ description }}</h1>
            </div>
            <Heading :contentHeading="contentHeading"></Heading>
            <BreadCrumb></BreadCrumb>
            <Movie :dataMovie="dataMovie" :baseImageUrl="baseImageUrl"></Movie>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { getDataHome } from '@/services/home/HomeServices';
import { ref } from 'vue';
import Heading from '@/components/Heading.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';
import Movie from '@/components/Movie.vue';

const dataHome = ref([])
const title = ref("")
const description = ref("")
const baseImageUrl = ref()
const dataMovie = ref([])
const contentHeading = ref(
{
    heading: "Phim mới",
})
const loading = ref(true)

onMounted(async() => {
    try {
        const resHome = await getDataHome()
        dataHome.value = resHome.data

        title.value = dataHome.value.seoOnPage.titleHead
        document.title = title.value

        description.value = dataHome.value.seoOnPage.descriptionHead

        baseImageUrl.value = dataHome.value.APP_DOMAIN_CDN_IMAGE;

        dataMovie.value = dataHome.value.items
    } finally {
        loading.value = false
    }
    

    // console.log(baseImageUrl.value)
})

</script>
<style scoped>
.swiper {
    width: 100%;
    height: auto;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); /* nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #ddd;
  border-top: 6px solid #3498db; /* màu xoay */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>