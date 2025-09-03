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
import {getDataCategory} from '@/services/category/CategoryServices'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { setBaseImageUrl } from '@/services/baseImageUrl';

const dataCategory = ref([])
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
// let observer = null

const getDataByCategory = async (slug, pageNum = 1) => {
    try {
        const res = await getDataCategory(slug, pageNum, limit)
        dataCategory.value = res.data

        if (pageNum == 1) {
            titleHead.value = dataCategory.value.seoOnPage.titleHead
            document.title = titleHead.value
    
            descriptionHead.value = dataCategory.value.seoOnPage
            breadcrumb.value = dataCategory.value.breadCrumb
            dataMovie.value = dataCategory.value.items
            setBaseImageUrl(dataCategory.value.APP_DOMAIN_CDN_IMAGE)
            // return dataCategory.value
        } else {
            dataMovie.value.push(...dataCategory.value.items)
        }
        if (dataCategory.value.items.length < limit) {
            hasMore.value = false
        }
        console.log(dataCategory.value.items.length)
    } finally {
        loading.value = false
    }
}
onMounted(async() =>{
    await getDataByCategory(route.params.slug, page.value)

    const observer = new IntersectionObserver(
        async(entries) => {
            if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
                loadingMore.value = true;
                page.value++;
                await getDataByCategory(route.params.slug, page.value);
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