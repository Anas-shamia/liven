<template>
    <div>
        <Bar :title="'المواعيد'" :plus="true" :path="'/appointment'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">قائمة المواعيد</h2>
            <div v-for="(item,index) in appointments" :key="index" class="appointments-item flex items-center relative">
                <CustomCheckbox :index="index" :title="` اليوم ${item.names}`" :date="`${item.to} - ${item.from}`"/>
                <button class="absolute left-0" @click="openDeleteModal(item.id)">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                         role="img"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                         class="svg-inline--fa fa-trash-alt w-4">
                        <path fill="#ff0000"
                              d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                              class=""></path>
                    </svg>
                </button>
            </div>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/appointment/reserve'"/>
    </div>
</template>
<script>
    import CustomCheckbox from '../../components/CustomCheckbox'
    import Bar from '../../components/app/Bar';
    import ConfirmDelete from '../../components/ConfirmDelete';

    export default {
        components: {
            CustomCheckbox,
            Bar,
            ConfirmDelete
        },
        data() {
            return {
                appointments: [],
                appointments2: [
                    {
                        title: 'مشكلة في قياس السكر',
                        date: 'Today , 02:15PM'
                    },
                ],
                openDelete: false,
                myId: null,
            }
        },
        methods: {
            loadAppointments() {
                this.axios.get('/mobile/appointment/reserved')
                    .then(response => (this.appointments = response.data.data))
            },
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
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
