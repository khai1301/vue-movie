<template>
    <div class="container">
        <div class="home-block">
            <div class="banner">
                <h1>{{ description }}</h1>
            </div>
            <Heading :contentHeading="contentHeading"></Heading>
            <BreadCrumb></BreadCrumb>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { getDataHome } from '@/services/home/HomeServices';
import { ref } from 'vue';
import Heading from '@/components/heading.vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

const dataHome = ref([])
const title = ref("")
const description = ref("")
const baseImageUrl = ref()
const listBanner = ref([])
const contentHeading = ref(
{
    heading: "Phim mới",
})

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