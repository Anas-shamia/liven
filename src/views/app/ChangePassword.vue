<template>
    <div>
        <Bar :title="'تغيير كلمة المرور'" :close="'/profile'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="changePassword">
                <form @submit.prevent="handleSubmit" class="mt-4">
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="old_password" name="old Password" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">كلمة المرور القديمة</label>
                        <input type="password" class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="كلمة المرور القديمة" v-model="form.old_password"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="password" name="password" rules="required"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">كلمة المرور الجديدة</label>
                        <input type="password" class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="كلمة المرور الجديدة" v-model="form.password"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div"
                                        vid="password_confirmation" name="password" rules="required|confirmed:password"
                                        v-slot="{ errors }">
                        <label class="w-1/4 text-base text-blue-800 rtl:pl-8 ltr:pr-8">تأكيد كلمة المرور</label>
                        <input type="password" class="w-3/4 bg-white-900 rounded-25px py-3 px-6 focus:outline-none"
                               placeholder="تأكيد كلمة المرور" v-model="form.password_confirmation"
                               :class="{ 'has-danger': errors.length }">
                        <p class="message-danger">{{ errors[0] }}</p>
                    </ValidationProvider>
                    <div class="flex items-center flex-wrap">
                        <button type="submit"
                                class="w-full text-white-900 text-base font-medium bg-blue-800 rounded-25px py-3"
                                :disabled="loading">ارسال
                        </button>
                    </div>
                    <div class="bg-green-100 mt-4 rounded-10px text-center" v-if="success">
                        <p class="p-3 text-base text-blue-800 font-medium">تمت التعديل بنجاح</p>
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
                form: {
                    old_password: null,
                    password: null,
                    password_confirmation: null,
                }
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['changePassword'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/mobile/user/password/update', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                old_password: null,
                                password: null,
                                password_confirmation: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                            }, 2000);
                            this.$refs['changePassword'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['changePassword'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        },

    }
</script>
