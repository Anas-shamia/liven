<template>
    <div>
        <Bar :title="'قياس السكر'" :close="'/measurement'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <h2 class="text-xl font-medium text-blue-800 mb-6 text-center">اضافة قياس سكر</h2>
            <ValidationObserver ref="addSugar">
                <form @submit.prevent="handleSubmit">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="value" name="sugar" rules="required|integer"
                                        v-slot="{ errors }">
                        <label class="w-2/6 text-base text-blue-800 rtl:pl-8 ltr:pr-8">قياس السكر</label>
                        <input type="text" class="w-4/6 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="قياس السكر" v-model="form.value" :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="date" name="date" rules="required"
                                        v-slot="{ errors, touched }">
                        <label class="w-2/6 text-base text-blue-800 rtl:pl-8 ltr:pr-8">التاريخ</label>
                        <datetime
                                class="theme-purple w-4/6 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                                :class="{ 'has-danger': (errors.length && touched) }"
                                v-model="form.date"
                                placeholder="التاريخ" use12-hour></datetime>
                        <p class="message-danger" v-if="touched">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="timing" name="timing" rules="required"
                                        v-slot="{ errors, touched }">
                        <label class="w-2/6 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الوقت</label>
                        <datetime type="time"
                                  class="theme-purple w-4/6 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                                  :class="{ 'has-danger': (errors.length && touched) }"
                                  v-model="form.timing"
                                  placeholder="الوقت" use12-hour></datetime>
                        <p class="message-danger" v-if="touched">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap mt-50%">
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
        data() {
            return {
                success: false,
                loading: false,
                form: {
                    id: null,
                    value: null,
                    timing: null,
                    date: null,
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['addSugar'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        let form = _.cloneDeep(this.form);
                        const $timing = new Date(form.timing);
                        const $date = new Date(form.date);
                        form.timing = $timing.getHours() + ':' + $timing.getMinutes();
                        // const ampm = $timing.getHours() >= 12 ? 'pm' : 'am';
                        // const $hours = ($timing.getHours() > 12 || $timing.getHours() === 0) ? ($timing.getHours() === 0 ? 12 : $timing.getHours() - 12) : $timing.getHours();
                        // form.timing = this.getTiming($hours) + ':' + this.getTiming($timing.getMinutes()) + ' ' + ampm;
                        form.date = $date.getDate() + '/' + ($date.getMonth() + 1) + '/' + $date.getFullYear();
                        let $url = '/mobile/diabetes';
                        let $id = this.$route.params.id;
                        let $type = this.$route.params.type;
                        if ($type === 'edit') {
                            $url = '/mobile/diabetes/update';
                            form.id = $id;

                        }
                        this.axios.post($url, form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                value: null,
                                timing: null,
                                date: null
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/measurement')
                            }, 2000);
                            this.$refs['addSugar'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addSugar'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        },
        components: {
            Bar
        }
    }
</script>
<style scoped lang="scss">
    input,
    .vdatetime {
        border: 1px solid transparent;
    }

</style>
