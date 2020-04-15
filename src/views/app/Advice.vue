<template>
    <div>
        <Bar :title="'النصائح'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">

            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">قائمة النصائح</h2>
            <div class="bg-white-900 rounded-25px text-center py-3 mb-4" v-for="(item,index) in advice" :key="index" v-if="advice.length">
                <p class="text-xs font-light text-blue-800 w-4/5 mx-auto">
                    {{item.title}}
                </p>
            </div>
            <p class="text-center text-blue-800 font-medium text-base mb-8" v-else>لا يوجد نصائح لعرضها</p>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        data() {
            return {
                advice: []
            }
        },
        components: {
            Bar
        },
        created() {
            this.axios.get('/mobile/advice/all')
                .then(response => (this.advice = response.data.data))
        }
    }
</script>
