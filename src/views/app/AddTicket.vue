<template>
    <div>
        <Bar :title="'الاستفسارات'" :close="'/inquiries-list'"/>
        <div class="mobile-padding py-4 min-h-screen bg-gray-100">
            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">تذكرة جديدة</h2>
            <ValidationObserver ref="addTicket">
                <form @submit.prevent="handleSubmit">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="title" name="title" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">العنوان</label>
                        <input type="text"
                               class="w-3/4 bg-white-900 rounded-25px py-3 border border-transparent px-6 focus:outline-none"
                               placeholder="عنوان الاستفسار" v-model="form.title"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="category_id" name="Type" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">النوع</label>
                        <v-select class="w-3/4 bg-white-900 rounded-25px py-3 px-6 appoint-select"
                                  :options="options"
                                  label="name"
                                  placeholder="ما هو النوع" :dir="dirLang" v-model="form.category_id"
                                  :class="{ 'has-danger': errors.length }">
                        </v-select>
                        <p class="message-danger" v-if="ticketError">please select Type</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="description"
                                        name="Message"
                                        rules="required"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">الرسالة</label>
                        <textarea
                                class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                placeholder="ضع رسالتك هنا"
                                :class="{ 'has-danger': errors.length }"
                                v-model="form.description"></textarea>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button v-if="user !=='116'" type="submit"
                                class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3"
                                :disabled="loading">ارسال
                        </button>
                    </div>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">تمت الاضافة بنجاح</p>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>
<script>
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            Bar
        },
        data() {
            return {
                success: false,
                loading: false,
                options: [],
                ticket: null,
                ticketError: false,
                form: {
                    title: null,
                    category_id: null,
                    description: null,
                },
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.ticketError = true;
                let $fields = _.cloneDeep(this.form);
                $fields.category_id = $fields.category_id ? $fields.category_id.id : null;
                this.$refs['addTicket'].validate().then((result) => {
                    if (result) {
                        this.loading = true;

                        let $url = '/mobile/ticket';
                        let $id = this.$route.params.id;
                        let $type = this.$route.params.type;

                        if ($type === 'edit') {
                            $url = `/mobile/ticket/update/${$id}`;
                        }


                        this.axios.post($url, $fields).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                title: null,
                                category_id: null,
                                description: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/inquiries-list');
                            }, 3000);
                            this.$refs['addTicket'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addTicket'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
            user() {
                return localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;
            }
        },
        created() {
            let $id = this.$route.params.id;
            this.axios.get('/mobile/categories/all')
                .then(response => {
                    this.options = response.data.data;
                    this.form.category_id = this.options.find(x => x.id == 1);
                });
            if ($id) {
                this.axios.get(`/mobile/ticket/${$id}`)
                    .then(response => {
                        this.ticket = response.data.data[0];
                        this.form = {
                            title: this.ticket.title,
                            description: this.ticket.description,
                        };
                        this.form.category_id = this.options.find(x => x.id === this.ticket.category_id);
                    });
            }
        }
    }
</script>

