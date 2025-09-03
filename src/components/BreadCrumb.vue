<template>
    <div class="breadcrumb">
        <ol>
            <li>
                <a href="/">
                    <FontAwesomeIcon icon="house" />
                    <p>Phim mới</p>
                    <div class="breadcrumb-child" v-for="bc in breadcrumb" :key="bc.name">
                        <a v-if="bc.slug" href=""> > {{ bc.name }}</a>
                    </div>
                </a>
            </li>
            <!-- <li> > Phim hành động</li>
            <li>xxx</li> -->
        </ol>
    </div>
</template>
<script setup>
defineProps({
    breadcrumb: {
        type: Array,
        required: true
    }
})
</script>
<style scoped>
ol {
    display: flex;
    flex-direction: row;
    margin: 0;
}
.breadcrumb {
    width: 100%;
    background: #000;
    padding: 15px 0px;
}
.breadcrumb ol a {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--third-color);
    text-decoration: none;
    gap: 5px;
}
.breadcrumb p {
    margin: 0px;
}
</style>