<template>
    <div>
        <Bar :title="'الاستفسارات'" :plus="true" :path="'/add-ticket'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">قائمة استفساراتي</h2>
            <ul class="flex flex-wrap items-center -mx-2 mb-8 justify-center">
                <li class="w-1/2 px-2 text-center cursor-pointer" @click.prevent="selectTab(1)"
                    :class="selectedTab===1?'active':''">
                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                        <span class="text-base font-medium">خدمة عملاء</span>
                    </div>
                </li>
                <!--                <li class="w-1/2 px-2 text-center cursor-pointer" @click.prevent="selectTab(2)"-->
                <!--                    :class="selectedTab===2?'active':''">-->
                <!--                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">-->
                <!--                        <span class="text-base font-medium">أخصائي تغذية</span>-->
                <!--                    </div>-->
                <!--                </li>-->
            </ul>
            <div class="mb-20">
                <div class="flex items-center relative" v-for="(item,index) in inquiries" :key="index">
                    <router-link class="w-full" tag="div" :to="`/ticket-details/${item.id}`">
                        <CustomCheckbox class="flex-grow pl-14" :index="item.id" :title="item.title"
                                        :date="item.created_at" :checked="item.status===0 ? false: true"/>
                    </router-link>
                    <router-link class="pl-4" tag="p" :to="`/edit-ticket/edit/${item.id}`" v-if="item.status !==1">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                             class="svg-inline--fa fa-edit w-5">
                            <path fill="currentColor"
                                  d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                                  class=""></path>
                        </svg>
                    </router-link>
                    <button class="" @click="openDeleteModal(item.id)" v-if="!item.replays">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt"
                             role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                             class="svg-inline--fa fa-trash-alt w-4">
                            <path fill="#ff0000"
                                  d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                  class=""></path>
                        </svg>
                    </button>
                    <p class="text-primary-900 pr-6" v-if="item.status ===1">مغلق</p>
                </div>

            </div>
            <div class="flex items-center flex-wrap">
                <router-link tag="span" to="/add-ticket"
                             class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3 text-center">
                    اضافة تذكرة
                </router-link>
            </div>
        </div>
        <ConfirmDelete v-if="openDelete" @close="openDelete = false" :id="myId" :url="'/mobile/ticket'"/>
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
                selectedTab: 1,
                inquiries: [],
                inquiriesList: [],
                myId: null,
                openDelete: false,
            }
        },
        methods: {
            selectTab(index) {
                this.selectedTab = index;
            },
            // getInquiries(id) {
            //     this.inquiries = [];
            //     this.axios.get(`/mobile/ticket?category_id=${id}`)
            //         .then(response => (this.inquiries = response.data.data))
            // }
            loadInquiries() {
                this.axios.get('/mobile/ticket/all')
                    .then(response => (this.inquiriesList = response.data.data))
            },
            listInquiries() {
                this.inquiries = this.inquiriesList.filter(x => {
                    return x.category_id === this.selectedTab
                })
            },
            openDeleteModal(id) {
                this.myId = id;
                this.openDelete = !this.openDelete;
            },
        },
        watch: {
            selectedTab() {
                // this.getInquiries($val)
                this.listInquiries()
            },
            inquiriesList() {
                this.listInquiries();
            }
        },
        mounted() {
            // this.getInquiries(this.selectedTab);
            this.loadInquiries();
        }
    }
</script>
<style scoped lang="scss">
    .active {
        > div {
            background-color: #693574;
            color: #fff;
        }
    }
</style>
