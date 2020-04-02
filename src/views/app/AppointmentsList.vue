<template>
    <div>
        <Bar :title="'المواعيد'" :plus="true" :path="'/appointment'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">قائمة المواعيد</h2>
            <div v-for="(item,index) in appointments" :key="index" class="appointments-item">
                <CustomCheckbox :index="index" :title="` اليوم ${item.day}`" :date="`${item.from} - ${item.to}`"/>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomCheckbox from '../../components/CustomCheckbox'
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            CustomCheckbox,
            Bar
        },
        data() {
            return {
                appointments: [],
                appointments2: [
                    {
                        title: 'مشكلة في قياس السكر',
                        date: 'Today , 02:15PM'
                    },
                ]
            }
        },
        methods: {
            loadAppointments() {
                this.axios.get('/mobile/appointment')
                    .then(response => (this.appointments = response.data.data))
            },
        },
        created() {
            this.loadAppointments();
        }
    }
</script>

<style lang="scss">
    .appoint-date {
        color: #9A9CB8;
    }
    .appointments-item .appoint-date {
        direction: ltr;
        text-align: right;
    }
</style>
