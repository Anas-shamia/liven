<template>
    <div>
        <Bar :title="'اضافة ماء'" :close="'/'"/>
        <div class="mobile-padding pb-4 custom-padding min-h-screen bg-gray-100">
            <ValidationObserver ref="addWater">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-8">
                        <h4 class="text-base text-blue-800 mb-4">عدد الأكواب اليوم</h4>
                        <div class="bg-white-900 py-2 px-3 rounded-10px">
                            <div class="mb-2 flex items-center">
                                <p class="flex-grow">
                                    <span class="text-4xl font-bold text-blue-800">{{ form.water_today }}</span>
                                    <span class="text-xs text-blue-800 px-2">كوب ماء</span>
                                </p>
                                <img src="@/assets/img/cup.svg" alt="icon">
                            </div>
                            <vue-slider v-model="form.water_today" v-bind="options" :direction="dirLang"></vue-slider>
                        </div>
                    </div>
                    <ValidationProvider class="flex items-center flex-wrap mb-4" tag="div" vid="notes"
                                        name="notes"
                                        v-slot="{ errors }">
                        <label class="w-full text-base text-blue-800 rtl:pl-8 ltr:pr-8 mb-4">ملاحظة</label>
                        <textarea type="text"
                                  class="w-full bg-white-900 rounded-10px py-3 px-6 app-textarea focus:outline-none resize-none"
                                  placeholder="ضع ملاحظتك هنا" v-model="form.notes"
                                  :class="{ 'has-danger': errors.length }"></textarea>
                    </ValidationProvider>

                    <div class="flex items-center flex-wrap">
                        <button type="submit"
                                v-if="user !== '116'"
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
                options: {
                    min: 0,
                    max: 10,
                    height: 8,
                },
                success: false,
                loading: false,
                form: {
                    water_today: 0,
                    notes: null
                }
            }
        },
        computed: {
            dirLang() {
                return this.$i18n.locale === 'en' ? 'ltr' : 'rtl';
            },
            user() {
                return localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;
            }
        },
        methods: {
            handleSubmit() {
                const $this = this;
                this.$refs['addWater'].validate().then((result) => {
                    if (result) {
                        this.loading = true;
                        this.axios.post('/mobile/water', this.form).then((res) => {
                            this.success = true;
                            this.loading = false;
                            this.form = {
                                water_today: null,
                                notes: null,
                            };
                            setTimeout(function () {
                                $this.success = false;
                                $this.$router.push('/food-plan');
                            }, 2000);
                            this.$refs['addWater'].reset();
                        }).catch((error) => {
                            this.loading = false;
                            if (error.response) {
                                if (error.response.status === 422) {
                                    this.$refs['addWater'].setErrors(error.response.data.errors);
                                }
                            }
                        });
                    }
                });
            },
        }
    }
</script>
<style lang="scss">
    .vue-slider-process,
    .vue-slider-rail {
        background-color: #9766AB !important;
    }

    .vue-slider-rail {
        background-color: #F5F2F5 !important;
    }

    .vue-slider-dot-handle {
        background-color: #14123D !important;
        box-shadow: none !important;
    }

    .vue-slider-dot-tooltip-inner {
        background-color: #9766AB !important;
        border-color: #9766AB !important;
    }
</style>
