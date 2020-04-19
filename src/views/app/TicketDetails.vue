<template>
    <div v-if="details">
        <Bar :title="`تذكرة  #${details.id}`" :close="'/inquiries-list'"/>

        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
           <div class="pb-4 border-b border-gray-200">
               <h2 class="text-blue-800 text-xl mb-2">{{details.title}}</h2>
               <p class="text-sm text-gray-700 mb-3">{{details.updated_at}}</p>
               <p class="text-base text-gray-700 mb-2">الوصف</p>
               <p class="text-lg text-blue-800 mb-3">
                   {{details.description}}
               </p>
           </div>
            <div v-if="details.replays.length">
                <div class="py-4 border-b border-gray-200" v-for="(item,index) in details.replays" :key="index">
                    <p class="text-base text-gray-700 mb-2">طبيب Liven</p>
                    <p class="text-lg text-blue-800 mb-3">{{item.replay_text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';
    export default {
        data(){
            return{
                details: null,
            }
        },
        components:{
            Bar
        },
        created() {
            let $id = this.$route.params.id;
            this.axios.get(`/mobile/ticket/replays?ticket_id=${$id}`)
                .then(response => (this.details = response.data.data[0]))
        }
    }
</script>
