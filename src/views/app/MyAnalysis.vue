<template>
    <div>
        <Bar :title="'تحاليلي'"  :close="'/profile'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <div class="mb-8" v-for="(item,index) in analyze" :key="index">
                <div class="flex items-center mb-3">
                    <h2 class="flex-grow text-blue-800 font-medium text-base"></h2>
                    <span class="text-xs p-color">{{item.created_at}}</span>
                </div>
                <img class="w-full rounded-10px object-cover analyse-img" :src="item.url" alt="image">
                <p class="text-base text-blue-800 mt-3">{{item.notes}}</p>
            </div>
            <h2 class="text-center text-blue-800 font-medium text-base mb-8" v-if="analyze.length === 0">لا يوجد تحاليل لعرضها</h2>
            <div class="flex items-center flex-wrap">
                <router-link tag="span" to="/add-analyse" class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3 text-center">اضافة تحليل</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data(){
            return{
                analyze:[]
            }
        },
        components: {
            Bar
        },
        created() {
            this.axios.get('/mobile/analyze/all')
                .then(response => (this.analyze = response.data.data))
        }
    }
</script>
<style scoped lang="scss">
    .analyse-img{
        height: 250px;
    }
</style>
