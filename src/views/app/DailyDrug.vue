<template>
    <div>
        <Bar :title="'أدوية اليوم'" :close="'/food-plan'" :plus="true" :path="'/add-drug'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">أدوية اليوم</h2>
            <div class="py-4 drug-box" v-for="(item,index) in sortedArray" :key="index">
                <p class="text-xs p-color mb-2">{{item.date}}</p>
                <h4 class="text-base text-blue-800 font-medium mb-2">{{item.medicine.name}}</h4>
                <div class="flex -mx-2">
                    <div class="w-1/2 px-2">
                        <img class="custom-box w-full object-cover rounded-10px" :src="item.medicine.url" alt="durg-img">
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
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import CustomCheckbox2 from '../../components/app/CustomCheckbox2'

    export default {
        data() {
            return {
                myDrugs: null,
            }
        },
        components: {
            Bar,
            CustomCheckbox2
        },
        methods: {
            formatDate($date) {
                const _date = $date;
                return (new Date(_date).getDate() + '/' + (new Date(_date).getMonth() + 1) + '/' + new Date(_date).getFullYear());
            },
        },
        created() {
            const date = new Date(this.$route.query.date);
            const $date = {date: this.formatDate(date)};
            this.axios.post('/mobile/medicine/by/date', $date).then((res) => {
                this.myDrugs = res.data.data
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
