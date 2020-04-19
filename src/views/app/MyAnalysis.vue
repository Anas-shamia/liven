<template>
    <div>
        <Bar :title="'تحاليلي'"  :close="'/profile'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <div class="mb-8" v-for="(item,index) in sortedArray" :key="index">
                <div class="flex items-center mb-3">
                    <h2 class="flex-grow text-blue-800 font-medium text-base"></h2>
                    <span class="text-xs p-color">{{item.created_at}}</span>
                </div>
                <div class="relative">
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
                    <img class="w-full rounded-10px object-cover analyse-img" :src="item.url" alt="image">
                </div>
                <p class="text-base text-blue-800 mt-3" >{{item.notes}}</p>
            </div>
            <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="analyze.length === 0">لا يوجد تحاليل لعرضها</h2>
            <div class="flex items-center flex-wrap">
                <router-link tag="span" to="/add-analyse" class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3 text-center">اضافة تحليل</router-link>
            </div>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/analyze'"/>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    import ConfirmDelete from '../../components/ConfirmDelete';
    export default {
        data(){
            return{
                myId: null,
                openDelete: false,
                analyze:[]
            }
        },
        components: {
            Bar,
            ConfirmDelete
        },
        methods:{
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
            },
        },
        created() {
            this.axios.get('/mobile/analyze/all')
                .then(response => (this.analyze = response.data.data))
        },
        computed: {
            sortedArray: function () {
                return this.analyze = _.orderBy(this.analyze, ['id'], ['desc']);
            }
        },
    }
</script>
<style scoped lang="scss">
    .analyse-img{
        height: 250px;
    }
</style>
