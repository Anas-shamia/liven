<template>
    <div>
        <Bar :title="'أدويتي'" :close="'/profile'" :plus="true" :path="'/add-medicine'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <div class="py-4 drug-box" v-for="(item,index) in sortedArray" :key="index">
                <p class="text-xs p-color mb-2">{{item.updated_at}}</p>
                <h4 class="text-base text-blue-800 font-medium mb-2">{{item.name}}</h4>
                <div class="flex items-center -mx-2">
                    <div class="w-1/2 px-2">
                        <img class="custom-box w-full object-cover rounded-10px" :src="item.url" alt="durg-img">
                    </div>
                    <div class="w-1/2 px-2">
                        <p class="text-sm text-blue-800 font-medium">عدد المرات</p>
                        <p class="flex items-center">
                            <span class="text-sm font-medium p-color whitespace-no-wrap 5sm:whitespace-normal">{{item.count}}</span>
                        </p>
                        <p class="text-sm text-blue-800 font-medium">ملاحظات</p>
                        <p class="text-xxs p-color">{{item.notes}}</p>
                    </div>
                </div>
                <div class="mt-2">
                    <p class="text-sm font-medium text-blue-800 mb-2">الدواء الحالى</p>
                    <div class="flex items-center">
                        <div class="w-1/4">
                            <CustomCheckbox2 :medicine_id="item.id" :id="`drug${index}0`" :index="index" :title="'نعم'" :initialValue="0"
                                            v-model="item.status"/>
                        </div>
                        <div class="w-1/4">
                            <CustomCheckbox2 :medicine_id="item.id" :id="`drug${index}1`" :index="index" :title="'لا'" :initialValue="1"
                                             v-model="item.status"/>
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="!myDrugs.length">لا يوجد أدوية
                لعرضها</h2>
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
                option: [
                    {
                        title: 'نعم'
                    },
                    {
                        title: 'لا'
                    },
                ],
            }
        },
        components: {
            Bar,
            CustomCheckbox2
        },
        created() {
            this.axios.get('/mobile/medicine/list')
                .then(response => (this.myDrugs = response.data.data))
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
