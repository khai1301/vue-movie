<template>
    <div class="container">
        <Spinner v-if="loading"></Spinner>
        <div v-else class="home-block">
            <Heading :contentHeading="descriptionHead"></Heading>
            <BreadCrumb :breadcrumb="breadcrumb"></BreadCrumb>
            <Movie :dataMovie="dataMovie"></Movie>
            <Spinner v-if="loadingMore"></Spinner>
            <div ref="loadMoreTrigger" v-if="hasMore" class="loadMoreTrigger"></div>
        </div>
    </div>
</template>
<script setup>
import BreadCrumb from '@/components/BreadCrumb.vue';
import Movie from '@/components/Movie.vue';
import Spinner from '@/components/Spinner.vue';
import Heading from '@/components/Heading.vue';
import { getDataCountry } from '@/services/country/CountryServices'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { setBaseImageUrl } from '@/services/baseImageUrl';

const dataCountry = ref([])
const route = useRoute()
const breadcrumb = ref([])
const dataMovie = ref([])
const loading = ref(true)
const titleHead = ref()
const descriptionHead = ref()
const loadingMore = ref(false)
const page = ref(1)
const limit = 24
const hasMore = ref(true)
const loadMoreTrigger = ref(null)

const getDataByCountry = async (slug, pageNum = 1) => {
    try {
        const res = await getDataCountry(slug, pageNum, limit)
        dataCountry.value = res.data

        if (pageNum == 1) {
            titleHead.value = dataCountry.value.seoOnPage.titleHead
            document.title = titleHead.value
    
            descriptionHead.value = dataCountry.value.seoOnPage
            breadcrumb.value = dataCountry.value.breadCrumb
            dataMovie.value = dataCountry.value.items
            setBaseImageUrl(dataCountry.value.APP_DOMAIN_CDN_IMAGE)
            // return dataCategory.value
        } else {
            dataMovie.value.push(...dataCountry.value.items)
        }
        if (dataCountry.value.items.length < limit) {
            hasMore.value = false
        }
        console.log(dataCountry.value.items.length)
    } finally {
        loading.value = false
    }
}
onMounted(async() =>{
    await getDataByCountry(route.params.slug, page.value)

    const observer = new IntersectionObserver(
        async(entries) => {
            if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
                loadingMore.value = true;
                page.value++;
                await getDataByCountry(route.params.slug, page.value);
                loadingMore.value = false;
            }
        },
        { threshold: 0.1}
    )
    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
})
</script>