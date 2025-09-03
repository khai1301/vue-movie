<template>
    <div class="heading-block">
        <div class="heading">
            <div class="caption">
                {{ contentHeading.descriptionHead }}
            </div>
            <div class="filter-box">
                <ul>
                    <li>
                        <select name="category" id="" class="form-control">
                            <option value="">Thể loại</option>
                            <option
                            v-for="cat in dataCategory" 
                            :key="cat.id"
                            :value="cat.name" 
                            >{{ cat.name }}</option>
                        </select>
                    </li>
                    <li>
                        <select name="country" id="" class="form-control">
                            <option value="">Quốc gia</option>
                            <option
                                v-for="country in dataCountry" 
                                :key="country.id"
                                :value="country.name" 
                            >
                            {{ country.name }}
                            </option>
                        </select>
                    </li>
                    <li>
                        <select name="year" id="" class="form-control">
                            <option value="">Năm phát hành</option>
                            <option
                                v-for="year in dataYear" 
                                :key="year.id"
                                :value="year.year" 
                            >
                            {{ year.year }}
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getDataCategory, getDataCountry, getDataYear } from '@/services/HeaderServices'
const dataCategory = ref([]);
const dataCountry = ref([])
const dataYear = ref([])

onMounted(async () => {
  const resCate = await getDataCategory();
  dataCategory.value = resCate.data.items;

  const resCountry = await getDataCountry();
  dataCountry.value = resCountry.data.items;
  
  const resYear = await getDataYear();
  dataYear.value = resYear.data.items;

})
defineProps({
    contentHeading: {
        type: Object,
        required: true,
    }
})
</script>
<style scoped>
.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.heading .caption {
    font-size: 44px;
    color: var(--third-color);
}
.filter-box .form-control {
    padding: 5px;
    background: #303030;
    border: 1px solid #4c4c4c;
    color: var(--primary-color);
    font-weight: 600;
    border-radius: 5px;
}
.filter-box .form-control:focus {
    border-color: var(--third-color);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}
.filter-box .form-control option {
    font-weight: 400;
}
.filter-box ul {
    display: flex;
    flex-direction: row;
}
.filter-box li {
    margin-left: 5px;
}
</style>