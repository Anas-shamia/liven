<template>
    <div>
        <Bar :title="'اضافة دواء'" :close="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="addDrug">
                <form @submit.prevent="handleSubmit" class="mt-4">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="medicine_id" name="medicine" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الدواء</label>
                        <v-select class="w-3/4 bg-white-900 rounded-25px py-3 px-6 appoint-select"
                                  :options="options"
                                  label="name"
                                  placeholder="الدواء" :dir="dirLang" v-model="form.medicine_id"
                                  :class="{ 'has-danger': errors.length }">
                        </v-select>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="timing" name="timing" rules="required"
                                        v-slot="{ errors, touched }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الوقت</label>
                        <datetime type="time"
                                  class="theme-purple w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                                  :class="{ 'has-danger': (errors.length && touched) }"
                                  v-model="form.timing"
                                  :placeholder="form.timing?form.timing:'وقت الدواء'" use12-hour></datetime>
                        <p class="message-danger" v-if="touched">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="notes"
                                        name="notes"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">ملاحظة</label>
                        <textarea
                                class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                placeholder="ضع ملاحظتك هنا"
                                :class="{ 'has-danger': errors.length }"
                                v-model="form.notes"></textarea>
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button type="submit"
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
                selected: null,
                options: [],
                success: false,
                loading: false,
                drug: null,
                form: {
                    medicine_id: null,
                    timing: null,
                    notes: null,
                }
            }
        },
        methods: {
            getTiming(n) {
                if (n < 10) {
                    return '0' + n;
                } else {
                    return n
                }
            },
            isValidDate(d) {
                return d instanceof Date && !isNaN(d);
            },
            handleSubmit() {
                const $this = this;
                this.$refs['addDrug'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        let form = _.cloneDeep(this.form);
                        form.medicine_id = form.medicine_id.id;
                        if (this.isValidDate(new Date(form.timing))) {
                            const $timing = new Date(form.timing);
                            const ampm = $timing.getHours() >= 12 ? 'pm' : 'am';
                            const $hours = ($timing.getHours() > 12 || $timing.getHours() === 0) ? ($timing.getHours() === 0 ? 12 : $timing.getHours() - 12) : $timing.getHours();
                            form.timing = this.getTiming($hours) + ':' + this.getTiming($timing.getMinutes()) + ' ' + ampm;
                        }
                        let $url = '/mobile/medicine';
                        let $id = this.$route.params.id;
                        let $type = this.$route.params.type;
                        if ($type === 'edit') {
                            $url = `/mobile/medicine/update/${$id}`;
                        }
                        this.axios.post($url, form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                medicine_id: null,
                                timing: null,
                                notes: null
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/food-plan');
                            }, 2000);
                            this.$refs['addDrug'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addDrug'].setErrors(error.response.data.errors);
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
        },
        created() {
            this.axios.get('/mobile/medicine/items/list')
                .then(response => {
                    let $options = response.data.data.filter(x => x.status === 0);
                    this.options = $options;
                });
            let $id = this.$route.params.id;
            if ($id) {
                this.axios.get(`/mobile/medicine/${$id}`)
                    .then(response => {
                        this.drug = response.data.data;
                        this.form = {
                            timing: this.drug.timing,
                            notes: this.drug.notes,
                        };
                        this.form.medicine_id = this.options.find(x => x.id === this.drug.medicine_id);
                    });
            }
        }
    }
</script>
