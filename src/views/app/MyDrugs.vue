<template>
    <div>
        <Bar :title="'أدويتي'" :close="'/profile'" :plus="true" :path="'/add-medicine'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                <p class="p-3 text-base text-blue-800 font-medium">تمت الحذف بنجاح</p>
            </div>
            <div class="py-4 drug-box" v-for="(item,index) in sortedArray" :key="index">
                <p class="text-xs p-color mb-2">{{item.updated_at}}</p>
                <h4 class="text-base text-blue-800 font-medium mb-2">{{item.name}}</h4>
                <div class="flex items-center -mx-2">
                    <div class="w-1/2 px-2 relative">
                        <button class="absolute top-0 rtl:left-0 ltr:right-0 px-4 py-2" @click="openDeleteModal(item.id)">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                                 role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                 class="svg-inline--fa fa-trash-alt w-4">
                                <path fill="#ff0000"
                                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                      class=""></path>
                            </svg>
                        </button>
                        <router-link tag="div" :to="`/edit-medicine/edit/${item.id}`" v-if="item.url">
                            <img class="custom-box w-full object-cover rounded-10px" :src="item.url" alt="durg-img">
                        </router-link>
                        <router-link v-else tag="p" :to="`/edit-medicine/edit/${item.id}`">
                            لا يوجد صورة للدواء
                        </router-link>
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
                            <CustomCheckbox2 :medicine_id="item.id" :id="`drug${index}0`" :index="index" :title="'نعم'"
                                             :initialValue="0"
                                             v-model="item.status"/>
                        </div>
                        <div class="w-1/4">
                            <CustomCheckbox2 :medicine_id="item.id" :id="`drug${index}1`" :index="index" :title="'لا'"
                                             :initialValue="1"
                                             v-model="item.status"/>
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="!myDrugs.length">لا يوجد أدوية
                لعرضها</h2>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/medicine/item'"
                       :msg="'سيتم حذف جميع السجلات المتعلقة بهذا الدواء'"/>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import CustomCheckbox2 from '../../components/app/CustomCheckbox2'
    import ConfirmDelete from '../../components/ConfirmDelete';

    export default {
        data() {
            return {
                myDrugs: null,
                success: false,
                myId: null,
                openDelete: false,
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
            CustomCheckbox2,
            ConfirmDelete
        },
        methods: {
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
            },
        },
        created() {
            this.axios.get('/mobile/medicine/items/list')
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
