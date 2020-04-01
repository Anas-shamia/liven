<template>
    <div>
        <Bar :title="'وجبات اليوم'" :close="'/food-plan'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">وجبات اليوم</h2>
            <p class="text-xl font-light text-blue-800 mb-4">{{mealDate}}</p>
            <div class="mb-6" v-if="breakFast.length">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">فطور</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1 mb-2" v-for="(item ,index) in breakFast" :key="index" v-if="item.image_url">
                        <div class="bg-white-900 rounded-10px">
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.image_url" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-6" v-if="lunch.length">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">غداء</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1 mb-2" v-for="(item ,index) in lunch" :key="index" v-if="item.image_url">
                        <div class="bg-white-900 rounded-10px">
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.image_url" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-6" v-if="dinner.length">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">عشاء</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1 mb-2" v-for="(item ,index) in dinner" :key="index" v-if="item.image_url">
                        <div class="bg-white-900 rounded-10px">
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.image_url" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-6" v-if="snacks.length">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">وجبات خفيفة</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1 mb-2" v-for="(item ,index) in snacks" :key="index" v-if="item.image_url">
                        <div class="bg-white-900 rounded-10px">
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.image_url" alt="">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                foodPlan: null,
                meals: [],
            }
        },
        components: {
            Bar
        },
        methods: {
            formatDate($date) {
                const _date = $date;
                return (new Date(_date).getDate() + '/' + (new Date(_date).getMonth() + 1) + '/' + new Date(_date).getFullYear());
            },
        },
        computed: {
            mealDate() {
                return this.meals.length ? this.meals[0].date : '';
            },
            mealsToday() {
                return this.meals.length ? this.meals[0].meals_today : [];
            },
            breakFast() {
                if (this.mealsToday.length) {
                    return this.mealsToday.filter(x => {
                        return x.type == 1;
                    });
                } else {
                    return [];
                }
            },
            lunch() {
                if (this.mealsToday.length) {
                    return this.mealsToday.filter(x => {
                        return x.type == 2;
                    });
                } else {
                    return [];
                }
            },
            dinner() {
                if (this.mealsToday.length) {
                    return this.mealsToday.filter(x => {
                        return x.type == 3;
                    });
                } else {
                    return [];
                }
            },
            snacks() {
                if (this.mealsToday.length) {
                    return this.mealsToday.filter(x => {
                        return x.type == 4;
                    });
                } else {
                    return [];
                }
            }


        },
        created() {
            const date = new Date(this.$route.query.date);
            const $date = {date: this.formatDate(date)};
            this.axios.post('/mobile/meal/by/date', $date).then((res) => {
                this.meals = res.data.data
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 422) {
                    }
                }
            });

        }

    }
</script>
<style lang="scss">
    .custom-box {
        height: 90px;
    }
</style>
