import { ref } from "vue";

let baseImageUrl = ref();

export function setBaseImageUrl(url) {
    if (!baseImageUrl.value) {
        baseImageUrl.value = url
    }
    console.log(baseImageUrl.value)
}

export function getBaseImageUrl() {
    return baseImageUrl.value
}