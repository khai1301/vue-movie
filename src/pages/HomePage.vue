<template>
    <div class="container">
        <Spinner v-if="loading"></Spinner>
        <div v-else class="home-block">
            <div class="banner">
                <h1>{{ description }}</h1>
            </div>
            <Heading :contentHeading="contentHeading"></Heading>
            <BreadCrumb :breadcrumb="breadCrumb"></BreadCrumb>
            <Movie :dataMovie="dataMovie"></Movie>
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
import Spinner from '@/components/Spinner.vue';
import { setBaseImageUrl } from '@/services/baseImageUrl';

const dataHome = ref([])
const title = ref("")
const description = ref("")
const dataMovie = ref([])
const breadCrumb = ref([])
const contentHeading = ref(
{
    descriptionHead: "Phim mới",
})
const loading = ref(true)

onMounted(async() => {
    try {
        const resHome = await getDataHome()
        dataHome.value = resHome.data

        title.value = dataHome.value.seoOnPage.titleHead
        document.title = title.value

        description.value = dataHome.value.seoOnPage.descriptionHead

        setBaseImageUrl(dataHome.value.APP_DOMAIN_CDN_IMAGE);

        dataMovie.value = dataHome.value.items
    } finally {
        loading.value = false
    }
    

})

</script>
<style scoped>

</style>