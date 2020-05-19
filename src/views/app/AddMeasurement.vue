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
                        <input type="tel" inputmode="numeric" pattern="[0-9]*"
                               class="w-4/6 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="قياس السكر" v-model="form.value" :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="date" name="date" rules="required"
                                        v-slot="{ errors}">
                        <label class="w-2/6 text-base text-blue-800 rtl:pl-8 ltr:pr-8">التاريخ</label>
                        <div class="w-4/6 bg-white-900 rounded-25px py-3 px-6 focus:outline-none border border-transparent"
                             :class="myError?'has-danger':'' ">
                            <datetime
                                    class="theme-purple "

                                    v-model="form.date"
                                    @input="formatDate(form.date)"
                                    :max-datetime="new Date().toISOString()"
                                    zone="Asia/Jerusalem"
                                    value-zone="Asia/Jerusalem"
                                    :placeholder="form.date?form.date:'التاريخ'"></datetime>
                        </div>
                        <p class="message-danger" v-if="myError">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="timing" name="timing" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-2/6 text-base text-blue-800 rtl:pl-8 ltr:pr-8">الوقت</label>
                        <div class="w-4/6 bg-white-900 rounded-25px py-3 px-6 border border-transparent focus:outline-none"
                             :class="myError2?'has-danger':'' ">
                            <datetime type="time"
                                      class="theme-purple"
                                      v-model="form.timing"
                                      @input="changeStatus()"
                                      :placeholder="form.timing?form.timing:'الوقت'" use12-hour></datetime>
                        </div>
                        <p class="message-danger" v-if="myError2">{{ errors[0] }}</p>
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
                myError: false,
                myError2: false,
                diabetes: null,
                form: {
                    id: null,
                    value: null,
                    timing: null,
                    date: null,
                }
            }
        },
        methods: {
            isValidDate(d) {
                return d instanceof Date && !isNaN(d);
            },
            formatDate(x) {
                if (this.isValidDate(new Date(x))) {
                    const $date = new Date(x);
                    this.form.date = $date.getDate() + '/' + ($date.getMonth() + 1) + '/' + $date.getFullYear();
                    this.myError = false;
                }
            },
            changeStatus() {
                this.myError2 = false;
            },
            handleSubmit() {
                const $this = this;
                this.$refs['addSugar'].validate().then((result) => {
                    this.myError = !this.form.date;
                    this.myError2 = !this.form.timing;

                    if (result) {
                        this.loading = true;
                        this.myError = false;
                        this.myError2 = false;
                        let form = _.cloneDeep(this.form);
                        if (this.isValidDate(new Date(form.timing))) {
                            const $timing = new Date(form.timing);
                            form.timing = $timing.getHours() + ':' + $timing.getMinutes();
                        }

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
                            this.myError = false;
                            this.myError2 = false;
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
        },
        created() {
            let $id = this.$route.params.id;
            if ($id) {
                this.axios.get(`/mobile/diabetes/${$id}`)
                    .then(response => {
                        this.diabetes = response.data.data;
                        this.form = {
                            value: this.diabetes.value,
                            timing: this.diabetes.timing,
                            date: this.diabetes.date,
                        };
                    });
            }
        }
    }
</script>
<style scoped lang="scss">
    input,
    .vdatetime {
        border: 1px solid transparent;
    }

</style>
