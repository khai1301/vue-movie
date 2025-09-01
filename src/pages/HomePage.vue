<template>
    <!-- <swiper
        :modules="modules"
        :loop="true"
        :autoplay="{
            delay: 3000,
            disableOnInteraction: true
        }"
        direction="horizontal"
    >
        <swiper-slide v-for="img in listBanner" :key="img.id">
            <div class="flex items-center justify-center">
                <img :src="`${baseImageUrl}/${img}`" alt="">
            </div>
        </swiper-slide>
    </swiper> -->
    <div class="banner">
        <h1>{{ description }}</h1>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { getDataHome } from '@/services/home/HomeServices';
import { ref } from 'vue';
// import { Swiper, SwiperSlide} from 'swiper/vue';
// import {Autoplay} from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/autoplay'
// const modules = [Autoplay];

const dataHome = ref([])
const title = ref("")
const description = ref("")
const baseImageUrl = ref()
const listBanner = ref([])
onMounted(async() => {
    const resHome = await getDataHome()
    dataHome.value = resHome.data

    title.value = dataHome.value.seoOnPage.titleHead
    document.title = title.value

    description.value = dataHome.value.seoOnPage.descriptionHead

    baseImageUrl.value = dataHome.value.APP_DOMAIN_CDN_IMAGE;

    listBanner.value = dataHome.value.seoOnPage.og_image

    console.log(listBanner.value)
})

</script>
<style scoped>
.swiper {
    width: 100%;
    height: auto;
}
</style>