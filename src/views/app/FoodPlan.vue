<template>
    <div>
        <Bar :title="'السجل الغذائي'" :plus="false" :path="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">الخطة الغذائية</h2>
            <div class="mb-6" v-for="(item,index) in foodPlan" :key="index">
                <p class="text-xs font-light text-blue-800 mb-2">{{Object.keys(item)[0]}}</p>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1">

                        <router-link tag="div" :to="`/daily-food?date=${Object.keys(item)[0]}`"
                                     v-if="hasKey(getKeys(Object.values(item)[0]),'meals')">
                            <p class="text-base text-blue-800 mb-2">الوجبات</p>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/meal.jpg" alt="">
                        </router-link>
                        <router-link tag="div" to="/add-meal" v-else>
                            <p class="text-base text-blue-800 mb-2">الوجبات</p>
                            <div class="bg-white-900 flex items-center justify-center py-2 px-3 rounded-10px progress-bars custom-box">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-plus w-8">
                                    <path fill="#cbcbcb"
                                          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                          class=""></path>
                                </svg>
                            </div>
                        </router-link>
                    </div>
                    <div class="w-1/3 px-1">
                        <div v-if="hasKey(getKeys(Object.values(item)[0]),'water')">
                            <Slider :value="parseInt(getValue(Object.values(item)[0], 'water'))"/>
                        </div>
                        <router-link tag="div" to="/add-water" v-else>
                            <p class="text-base text-blue-800 mb-2">مقدار الماء</p>
                            <div class="bg-white-900 flex items-center justify-center py-2 px-3 rounded-10px progress-bars custom-box">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-plus w-8">
                                    <path fill="#cbcbcb"
                                          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                          class=""></path>
                                </svg>
                            </div>
                        </router-link>
                    </div>
                    <div class="w-1/3 px-1">
                        <router-link tag="div" :to="`/daily-drugs?date=${Object.keys(item)[0]}`"
                                     v-if="hasKey(getKeys(Object.values(item)[0]),'medicines')">
                            <p class="text-base text-blue-800 mb-2">الدواء</p>
                            <img class="custom-box w-full object-cover rounded-10px" src="@/assets/img/drug-img.jpg"
                                 alt="">
                        </router-link>
                        <router-link tag="div" to="/add-drug" v-else>
                            <p class="text-base text-blue-800 mb-2">الدواء</p>
                            <div class="bg-white-900 flex items-center justify-center py-2 px-3 rounded-10px progress-bars custom-box">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-plus w-8">
                                    <path fill="#cbcbcb"
                                          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                          class=""></path>
                                </svg>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Slider from '../../components/app/VueSlider'
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                foodPlan: null
            }
        },
        components: {
            Slider,
            Bar
        },
        computed: {
            // sortedArray: function () {
            //     return this.foodPlan = _.orderBy(this.foodPlan, Object.keys(this.foodPlan)[0], ['acs']);
            // }
        },
        methods: {
            getKeys(arr) {
                let keys = [];
                arr.forEach((x) => {
                    keys.push(Object.keys(x)[0]);
                });
                return keys;
            },
            hasKey(arr, name) {
                return arr.indexOf(name) >= 0;
            },
            getValue(arr, key) {
                return arr.find((x) => {
                    return x[key]
                })[key];
            }
        },
        created() {
            this.axios.get('/mobile/food/plan')
                .then(response => (this.foodPlan = response.data.data))
        }
    }
</script>
<style lang="scss">
    .custom-box {
        height: 90px;
    }
</style>
