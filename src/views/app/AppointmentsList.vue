<template>
   <div>
       <Bar :title="'المواعيد'" :plus="true" :path="'/appointment'"/>
       <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
           <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">قائمة المواعيد</h2>
           <div v-for="(item,index) in appointments" :key="index">
               <CustomCheckbox :index="index" :title="item.title" :date="item.date"/>
           </div>
       </div>
   </div>
</template>
<script>
    import CustomCheckbox from '../../components/CustomCheckbox'
    import Bar from '../../components/app/Bar';
    export default {
        components:{
            CustomCheckbox,
            Bar
        },
        data(){
            return{
                appointments:[
                    {
                        title: 'مشكلة في قياس السكر',
                        date: 'Today , 02:15PM'
                    },
                    {
                        title: 'استفسار عن الوجبات الغذائية',
                        date: 'Today , 08:00PM'
                    },
                    {
                        title: 'تمرين رياضي مناسب',
                        date: 'Today , 08:00PM'
                    }
                ]
            }
        }
    }
</script>
<style scoped lang="scss">
    .appoint-date {
        color: #9A9CB8;
    }
</style>
