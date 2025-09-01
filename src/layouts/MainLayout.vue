<template>
    <div class="">
        <Header />
        <main>
            <router-view />
        </main>
    </div>
</template>
<script>
import Header from './Header.vue';
export default {
    name: 'MainLayout',
    components: {
        Header,
    }
}
</script>