<template>
    <div>
        <Bar :title="'المواعيد'" :close="'/appointments'"/>
        <div class="mobile-padding custom-padding pb-4 min-h-screen bg-gray-100">
            <h2 class="text-2xl font-medium text-blue-800 mb-8 text-center">موعد جديد</h2>
            <ValidationObserver ref="addAppointment">
                <form @submit.prevent="handleSubmit" class="mt-4">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="appointment_id" name="appointment_id" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">المواعيد</label>
                        <v-select class="w-3/4 bg-white-900 rounded-25px py-3 px-6 appoint-select"
                                  :options="options"
                                  label="concatenated"
                                  placeholder="المواعيد" :dir="dirLang" v-model="form.appointment_id"
                                  :class="{ 'has-danger': errors.length }">
                        </v-select>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>

                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="title" name="title" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">العنوان</label>
                        <input type="text" class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="العنوان" v-model="form.title"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>

                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="notes"
                                        name="notes"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">الرسالة</label>
                        <textarea
                                class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                placeholder="ضع رسالتك هنا"
                                :class="{ 'has-danger': errors.length }"
                                v-model="form.notes"></textarea>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button type="submit"
                                class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3">ارسال
                        </button>
                    </div>
                    <p class="message-danger">{{serveErrors}}</p>
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
                popover: {
                    visibility: 'focus',
                },
                options: [],
                serveErrors: null,
                theDay: null,
                dates: {
                    minDate: new Date(this.getToday()),
                    days: [1, 4, 7]
                },
                form: {
                    appointment_id: null,
                    title: null,
                    notes: null,
                },
                success: false,
                loading: false,
            }
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
        },
        methods: {
            getToday() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                return this.theDay = today;
            },
            loadAppointments() {
                this.axios.get('/mobile/appointment')
                    .then(response => (this.options = response.data.data))
            },
            handleSubmit() {
                const $this = this;
                this.$refs['addAppointment'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        let form = _.cloneDeep(this.form);
                        form.appointment_id = form.appointment_id.id;
                        this.axios.post('/mobile/appointment', form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                appointment_id: null,
                                title: null,
                                notes: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/appointments');
                            }, 3000);
                            this.$refs['addAppointment'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.serveErrors = 'لديك موعد في هذا اليوم';
                                }
                            }
                        });
                    }
                });
            },
        },
        created() {
            this.getToday();
            this.loadAppointments();
        }
    }
</script>
<style scoped lang="scss">
    input {
        border: 1px solid transparent;
    }

</style>

