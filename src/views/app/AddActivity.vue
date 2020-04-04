<template>
    <div>
        <Bar :title="'اضافة نشاط'" :close="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="addActivity">
                <form @submit.prevent="handleSubmit">
                    <div class="flex flex-wrap">
                        <h4 class="w-full text-base text-blue-800 mb-6">نوع النشاط</h4>
                        <div class="w-1/3 mb-4" v-for="(item,index) in meals" :key="index">
                            <CustomCheckbox :index="index" :title="item.title" v-model="form.type"/>
                        </div>
                    </div>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="interval" name="interval" rules="integer|required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">مدة النشاط</label>
                        <input type="text" class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="مدة النشاط بالدقيقة" v-model="form.interval"
                               :class="{ 'has-danger': errors.length }">
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
                                  placeholder="وقت النشاط" use12-hour></datetime>
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
    import CustomCheckbox from '../../components/app/CustomCheckbox'
    import Bar from '../../components/app/Bar';

    export default {
        components: {
            CustomCheckbox,
            Bar
        },
        data() {
            return {
                meals: [
                    {
                        title: 'جري'
                    },
                    {
                        title: 'مشي'
                    },
                    {
                        title: 'العاب قوى'
                    },
                    {
                        title: 'لياقة'
                    }
                ],
                success: false,
                loading: false,
                form: {
                    type: '1',
                    timing: null,
                    interval: null,
                    notes: null
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
            handleSubmit() {
                const $this = this;
                this.$refs['addActivity'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        let form = _.cloneDeep(this.form);
                        form.type = parseInt(form.type);
                        const $timing = new Date(form.timing);
                        const ampm = $timing.getHours() >= 12 ? 'pm' : 'am';
                        const $hours = ($timing.getHours() > 12 || $timing.getHours() === 0) ? ($timing.getHours() === 0 ? 12 : $timing.getHours() - 12) : $timing.getHours();
                        form.timing = this.getTiming($hours) + ':' + this.getTiming($timing.getMinutes()) + ' ' + ampm;
                        this.axios.post('/mobile/activity', form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                type: null,
                                timing: null,
                                interval: null,
                                notes: null
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/');
                            }, 2000);
                            this.$refs['addActivity'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addActivity'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        }
    }
</script>
<style scoped lang="scss">
    input,
    .vdatetime {
        border: 1px solid transparent;
    }

</style>
