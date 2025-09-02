<template>
    <div class="breadcrumb">
        <ol>
            <li>
                <a href="/">
                    <FontAwesomeIcon icon="house" />
                    <p>Phim mới</p>
                </a>
            </li>
            <!-- <li> > Phim hành động</li>
            <li>xxx</li> -->
        </ol>
    </div>
</template>
<script setup></script>
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