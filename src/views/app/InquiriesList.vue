<template>
    <div>
        <Bar :title="'الاستفسارات'" :plus="true" :path="'/add-ticket'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">قائمة استفساراتي</h2>
            <ul class="flex flex-wrap items-center -mx-2 mb-8">
                <li class="w-1/2 px-2 text-center cursor-pointer" @click.prevent="selectTab(1)"
                    :class="selectedTab===1?'active':''">
                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                        <span class="text-base font-medium">خدمة عملاء</span>
                    </div>
                </li>
                <li class="w-1/2 px-2 text-center cursor-pointer" @click.prevent="selectTab(2)"
                    :class="selectedTab===2?'active':''">
                    <div class="bg-white-900 text-primary-900 rounded-25px py-2">
                        <span class="text-base font-medium">أخصائي تغذية</span>
                    </div>
                </li>
            </ul>
            <div class="mb-20">
                <router-link tag="div" :to="`/ticket-details/${item.id}`" v-for="(item,index) in inquiries" :key="index">
                    <CustomCheckbox :index="item.id" :title="item.title" :date="item.created_at"/>
                </router-link>
            </div>
            <div class="flex items-center flex-wrap">
                <router-link tag="span" to="/add-ticket"
                             class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3 text-center">
                    اضافة تذكرة
                </router-link>
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
                selectedTab: 1,
                inquiries: [],
                inquiriesList: []
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
            }
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
