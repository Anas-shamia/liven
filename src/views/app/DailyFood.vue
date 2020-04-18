<template>
    <div>
        <Bar :title="'وجبات اليوم'" :back="'/food-plan'" :plus="true" :path="'/add-meal'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">وجبات اليوم</h2>
            <p class="text-xl font-light text-blue-800 mb-4">{{mealDate}}</p>
            <div class="mb-6" v-if="breakFast.length">
                <div class="flex items-center">
                    <p class="text-sm flex-grow font-light text-blue-800 mb-2">فطور</p>
                </div>
                <div class="flex flex-wrap -mx-2">
                    <div class="w-1/3 px-1 mb-2" v-for="(item ,index) in breakFast" :key="index" v-if="item.image_url">
                        <div class="bg-white-900 rounded-10px relative">
                            <button class="absolute top-0 rtl:left-0 ltr:right-0 p-2" @click="openDeleteModal(item.id)">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                     role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-trash-alt w-4">
                                    <path fill="#ff0000"
                                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                          class=""></path>
                                </svg>
                            </button>
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
                        <div class="bg-white-900 rounded-10px relative">
                            <button class="absolute top-0 rtl:left-0 ltr:right-0 p-2" @click="openDeleteModal(item.id)">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                     role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-trash-alt w-4">
                                    <path fill="#ff0000"
                                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                          class=""></path>
                                </svg>
                            </button>
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
                        <div class="bg-white-900 rounded-10px relative">
                            <button class="absolute top-0 rtl:left-0 ltr:right-0 p-2" @click="openDeleteModal(item.id)">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                     role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-trash-alt w-4">
                                    <path fill="#ff0000"
                                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                          class=""></path>
                                </svg>
                            </button>
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
                        <div class="bg-white-900 rounded-10px relative">
                            <button class="absolute top-0 rtl:left-0 ltr:right-0 p-2" @click="openDeleteModal(item.id)">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                     role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                     class="svg-inline--fa fa-trash-alt w-4">
                                    <path fill="#ff0000"
                                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                          class=""></path>
                                </svg>
                            </button>
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.image_url" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/meal'"/>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import ConfirmDelete from '../../components/ConfirmDelete';
    export default {
        data() {
            return {
                myId: null,
                foodPlan: null,
                openDelete: false,
                meals: [],
            }
        },
        components: {
            Bar,
            ConfirmDelete
        },
        methods: {
            formatDate($date) {
                const _date = $date;
                return (new Date(_date).getDate() + '/' + (new Date(_date).getMonth() + 1) + '/' + new Date(_date).getFullYear());
            },
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
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
