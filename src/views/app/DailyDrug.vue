<template>
    <div>
        <Bar :title="'أدوية اليوم'" :close="'/food-plan'" :plus="true" :path="'/add-drug'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">أدوية اليوم</h2>
            <div class="py-4 drug-box" v-for="(item,index) in sortedArray" :key="index">
                <p class="text-xs p-color mb-2">{{item.date}}</p>
                <h4 class="text-base text-blue-800 font-medium mb-2">{{item.name}}</h4>
                <div class="flex -mx-2">
                    <div class="w-1/2 px-2 relative">
                        <button class="absolute top-0 rtl:left-0 ltr:right-0 px-4 py-2"
                                @click="openDeleteModal(item.id)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                 role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-trash-alt w-4">
                                <path fill="#ff0000"
                                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                      class=""></path>
                            </svg>
                        </button>
                        <router-link tag="div"  :to="`/edit-drug/edit/${item.id}`">
                            <img class="custom-box w-full object-cover rounded-10px" v-if="item.image" :src="item.image"
                                 alt="durg-img">
                            <img class="custom-box w-full object-cover rounded-10px" v-else src="@/assets/img/drug-img.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="w-1/2 px-2">
                        <p class="text-sm text-blue-800 font-medium">ملاحظات</p>
                        <p class="text-xxs p-color">{{item.notes}}</p>
                        <!--                        <p class="text-sm text-blue-800 font-medium">عدد المرات</p>-->
                        <!--                        <p class="flex items-center">-->
                        <!--                            <span class="text-sm font-medium p-color whitespace-no-wrap 5sm:whitespace-normal">{{item.count}}</span>-->
                        <!--                        </p>-->

                    </div>
                </div>
            </div>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/medicine'"/>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import CustomCheckbox2 from '../../components/app/CustomCheckbox2'
    import ConfirmDelete from '../../components/ConfirmDelete';

    export default {
        data() {
            return {
                openDelete: false,
                myDrugs: null,
                myId: null,
            }
        },
        components: {
            Bar,
            CustomCheckbox2,
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
        created() {
            const date = new Date(this.$route.query.date);
            const $date = {date: this.formatDate(date)};
            this.axios.post('/mobile/medicine/by/date', $date).then((res) => {
                console.log(res);
                this.myDrugs = res.data.data;
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 422) {
                    }
                }
            });
        },
        computed: {
            sortedArray: function () {
                return this.myDrugs = _.orderBy(this.myDrugs, ['id'], ['desc']);
            }
        },
    }
</script>
<style lang="scss" scoped>
    .drug-box {
        border-bottom: 1px solid #D1CDD8;
    }
</style>
